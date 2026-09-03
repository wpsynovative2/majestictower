/**
 * Majestic Tower — lead receiver.
 *
 * Deployed as a Google Apps Script Web App. The Next.js forms POST JSON here;
 * this script verifies the reCAPTCHA v3 token, appends a row to the Google
 * Sheet, and emails the sales inbox.
 *
 * ---------------------------------------------------------------------------
 * SETUP (once)
 * ---------------------------------------------------------------------------
 * 1. Create a Google Sheet. Copy its ID from the URL:
 *      https://docs.google.com/spreadsheets/d/<THIS_IS_THE_ID>/edit
 * 2. Extensions → Apps Script. Replace Code.gs with this file.
 * 3. Project Settings → Script properties → add:
 *      SHEET_ID           <your sheet id>
 *      SHEET_NAME         Leads
 *      NOTIFY_EMAIL       sales@yourdomain.com,manager@yourdomain.com
 *      RECAPTCHA_SECRET   <reCAPTCHA v3 SECRET key>
 *      RECAPTCHA_MIN_SCORE 0.5
 *      REQUIRE_RECAPTCHA  true
 *      SHARED_TOKEN       (optional) a random string the site must send
 * 4. Run `setup` once from the editor and approve the permission prompts.
 * 5. Deploy → New deployment → Web app
 *      Execute as:        Me
 *      Who has access:    Anyone
 *    Copy the /exec URL into NEXT_PUBLIC_LEAD_ENDPOINT in .env.local.
 *
 * Re-deploy (Deploy → Manage deployments → edit → Version: New version)
 * after any code change, or the live URL keeps serving the old script.
 */

/* -------------------------------------------------------------- properties */

function prop_(key, fallback) {
  var value = PropertiesService.getScriptProperties().getProperty(key);
  return value === null || value === '' ? fallback : value;
}

var HEADERS = [
  'Timestamp (IST)',
  'Name',
  'Mobile',
  'Email',
  'Configuration',
  'Source',
  'Page URL',
  'Referrer',
  'Consent',
  'reCAPTCHA Score',
  'Submitted At (ISO)',
];

/* ------------------------------------------------------------------ helpers */

function jsonOut_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function sheet_() {
  var id = prop_('SHEET_ID', '');
  if (!id) throw new Error('SHEET_ID script property is not set.');

  var book = SpreadsheetApp.openById(id);
  var name = prop_('SHEET_NAME', 'Leads');
  var sheet = book.getSheetByName(name);

  if (!sheet) {
    sheet = book.insertSheet(name);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length)
      .setFontWeight('bold')
      .setBackground('#0D2318')
      .setFontColor('#F8F2E3');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/** Normalises "+91 98765 43210" → "9876543210". */
function normalizeMobile_(raw) {
  var digits = String(raw || '').replace(/[^\d]/g, '');
  if (digits.length === 12 && digits.indexOf('91') === 0) return digits.slice(2);
  if (digits.length === 11 && digits.indexOf('0') === 0) return digits.slice(1);
  if (digits.length === 13 && digits.indexOf('091') === 0) return digits.slice(3);
  return digits;
}

function isValidMobile_(raw) {
  return /^[6-9]\d{9}$/.test(normalizeMobile_(raw));
}

function isValidEmail_(raw) {
  return /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(String(raw || '').trim());
}

function istStamp_(date) {
  return Utilities.formatDate(date, 'Asia/Kolkata', 'dd MMM yyyy, hh:mm a') + ' IST';
}

function escapeHtml_(value) {
  return String(value === null || value === undefined ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ------------------------------------------------------- reCAPTCHA v3 check */

/**
 * Verifies the token with Google. Returns { ok, score, reason }.
 * Set REQUIRE_RECAPTCHA=false to accept submissions without a token (useful
 * while you are still wiring the keys up).
 */
function verifyRecaptcha_(token, expectedAction) {
  var secret = prop_('RECAPTCHA_SECRET', '');
  var required = String(prop_('REQUIRE_RECAPTCHA', 'true')) === 'true';

  if (!secret) {
    return required
      ? { ok: false, score: null, reason: 'RECAPTCHA_SECRET is not configured.' }
      : { ok: true, score: null, reason: 'reCAPTCHA disabled (no secret).' };
  }

  if (!token) {
    return required
      ? { ok: false, score: null, reason: 'Missing reCAPTCHA token.' }
      : { ok: true, score: null, reason: 'reCAPTCHA token absent, not required.' };
  }

  var response = UrlFetchApp.fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'post',
    payload: { secret: secret, response: token },
    muteHttpExceptions: true,
  });

  var result;
  try {
    result = JSON.parse(response.getContentText());
  } catch (err) {
    return { ok: !required, score: null, reason: 'Could not parse reCAPTCHA response.' };
  }

  if (!result.success) {
    return {
      ok: false,
      score: null,
      reason: 'reCAPTCHA rejected: ' + (result['error-codes'] || []).join(', '),
    };
  }

  var minScore = parseFloat(prop_('RECAPTCHA_MIN_SCORE', '0.5'));
  var score = typeof result.score === 'number' ? result.score : null;

  if (score !== null && score < minScore) {
    return { ok: false, score: score, reason: 'Score ' + score + ' below ' + minScore + '.' };
  }

  // Action mismatch is a soft signal — log it but do not block the lead.
  if (expectedAction && result.action && result.action !== expectedAction) {
    console.warn('reCAPTCHA action mismatch: ' + result.action + ' != ' + expectedAction);
  }

  return { ok: true, score: score, reason: 'Verified.' };
}

/* ---------------------------------------------------------------- doPost */

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
  } catch (err) {
    return jsonOut_({ ok: false, error: 'Server busy, please try again.' });
  }

  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonOut_({ ok: false, error: 'Empty request body.' });
    }

    var data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (err) {
      // Fall back to a classic form-encoded post.
      data = e.parameter || {};
    }

    // Optional shared secret, so only your site can write to the sheet.
    var sharedToken = prop_('SHARED_TOKEN', '');
    if (sharedToken && data.sharedToken !== sharedToken) {
      return jsonOut_({ ok: false, error: 'Unauthorised.' });
    }

    // Honeypot: real users never fill this in.
    if (data.company) {
      return jsonOut_({ ok: true, skipped: 'honeypot' });
    }

    var name = String(data.name || '').trim();
    var phone = normalizeMobile_(data.phone);
    var email = String(data.email || '').trim();

    if (!name) return jsonOut_({ ok: false, error: 'Name is required.' });
    if (!isValidMobile_(phone)) {
      return jsonOut_({ ok: false, error: 'Enter a valid 10-digit Indian mobile number.' });
    }
    if (!isValidEmail_(email)) {
      return jsonOut_({ ok: false, error: 'Enter a valid email address.' });
    }

    var captcha = verifyRecaptcha_(data.recaptchaToken, data.recaptchaAction);
    if (!captcha.ok) {
      console.warn('Blocked submission: ' + captcha.reason);
      return jsonOut_({ ok: false, error: 'Spam check failed. Please try again.' });
    }

    var now = new Date();
    var row = [
      data.submittedAt || istStamp_(now),
      name,
      "'" + phone, // leading quote keeps Sheets from dropping a leading zero
      email,
      data.configuration || 'Not specified',
      data.source || 'Website',
      data.pageUrl || '',
      data.referrer || '',
      data.consent ? 'Yes' : 'No',
      captcha.score === null ? 'n/a' : captcha.score,
      data.submittedAtIso || now.toISOString(),
    ];

    sheet_().appendRow(row);
    sendNotification_(row, captcha);

    return jsonOut_({ ok: true, message: 'Lead recorded.' });
  } catch (err) {
    console.error(err);
    return jsonOut_({ ok: false, error: 'Server error: ' + err.message });
  } finally {
    lock.releaseLock();
  }
}

/** A GET on the /exec URL is handy for confirming the deployment is live. */
function doGet() {
  return jsonOut_({ ok: true, service: 'Majestic Tower lead receiver' });
}

/* ------------------------------------------------------------- notification */

function sendNotification_(row, captcha) {
  var recipients = prop_('NOTIFY_EMAIL', '');
  if (!recipients) return;

  var name = row[1];
  var phone = String(row[2]).replace(/^'/, '');
  var email = row[3];

  var rows = HEADERS.map(function (header, index) {
    var value = String(row[index]).replace(/^'/, '');
    return (
      '<tr>' +
      '<td style="padding:9px 14px;border-bottom:1px solid #EFE7D2;color:#0D2318;' +
      'font-size:12px;font-weight:600;white-space:nowrap;">' +
      escapeHtml_(header) +
      '</td>' +
      '<td style="padding:9px 14px;border-bottom:1px solid #EFE7D2;color:#3d4a42;' +
      'font-size:13px;word-break:break-all;">' +
      escapeHtml_(value) +
      '</td>' +
      '</tr>'
    );
  }).join('');

  var html =
    '<div style="font-family:Segoe UI,Helvetica,Arial,sans-serif;background:#FDFAF3;padding:24px;">' +
    '<div style="max-width:600px;margin:0 auto;background:#fff;border:1px solid #EFE7D2;border-radius:16px;overflow:hidden;">' +
    '<div style="background:#0D2318;padding:22px 24px;">' +
    '<p style="margin:0;color:#DDB25F;font-size:11px;letter-spacing:2px;text-transform:uppercase;">Majestic Tower</p>' +
    '<h1 style="margin:6px 0 0;color:#F8F2E3;font-size:21px;font-weight:600;">New Website Enquiry</h1>' +
    '</div>' +
    '<div style="padding:20px 24px;">' +
    '<p style="margin:0 0 16px;color:#3d4a42;font-size:14px;">' +
    '<strong>' + escapeHtml_(name) + '</strong> just submitted an enquiry. ' +
    'Call back on <a href="tel:+91' + escapeHtml_(phone) + '" style="color:#BE5A2E;">+91 ' + escapeHtml_(phone) + '</a>.' +
    '</p>' +
    '<table style="width:100%;border-collapse:collapse;border:1px solid #EFE7D2;border-radius:10px;overflow:hidden;">' +
    rows +
    '</table>' +
    '<div style="margin-top:18px;">' +
    '<a href="tel:+91' + escapeHtml_(phone) + '" style="display:inline-block;background:#BE5A2E;color:#fff;' +
    'text-decoration:none;padding:11px 20px;border-radius:999px;font-size:13px;font-weight:600;margin-right:8px;">Call Now</a>' +
    '<a href="https://wa.me/91' + escapeHtml_(phone) + '" style="display:inline-block;background:#0D2318;color:#F8F2E3;' +
    'text-decoration:none;padding:11px 20px;border-radius:999px;font-size:13px;font-weight:600;">WhatsApp</a>' +
    '</div>' +
    '<p style="margin:18px 0 0;color:#8b958e;font-size:11px;">' +
    'Spam score: ' + escapeHtml_(captcha.score === null ? 'n/a' : captcha.score) +
    ' — ' + escapeHtml_(captcha.reason) +
    '</p>' +
    '</div></div></div>';

  MailApp.sendEmail({
    to: recipients,
    subject: 'New Enquiry — ' + name + ' (' + phone + ') — ' + row[5],
    htmlBody: html,
    body:
      'New enquiry from ' + name + '\n' +
      'Mobile: ' + phone + '\n' +
      'Email: ' + email + '\n' +
      'Configuration: ' + row[4] + '\n' +
      'Source: ' + row[5] + '\n' +
      'Page: ' + row[6] + '\n' +
      'Time: ' + row[0],
    replyTo: isValidEmail_(email) ? email : undefined,
    name: 'Majestic Tower Website',
  });
}

/* ----------------------------------------------------------------- utilities */

/** Run once from the editor to create the sheet and grant permissions. */
function setup() {
  var sheet = sheet_();
  Logger.log('Sheet ready: ' + sheet.getName() + ' (' + sheet.getLastRow() + ' rows)');
  Logger.log('Notify email: ' + prop_('NOTIFY_EMAIL', '(not set)'));
  Logger.log('reCAPTCHA required: ' + prop_('REQUIRE_RECAPTCHA', 'true'));
}

/** Writes a fake lead so you can confirm the sheet and the email both work. */
function testSubmission() {
  var response = doPost({
    postData: {
      contents: JSON.stringify({
        name: 'Test Lead',
        phone: '9876543210',
        email: 'test@example.com',
        configuration: '2 BHK',
        source: 'Manual Test',
        pageUrl: 'https://majestictower.example/',
        referrer: '',
        consent: true,
        submittedAt: istStamp_(new Date()),
        submittedAtIso: new Date().toISOString(),
        recaptchaToken: '',
        recaptchaAction: 'manual_test',
      }),
    },
  });
  Logger.log(response.getContent());
}
