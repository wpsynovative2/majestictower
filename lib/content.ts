/**
 * Every piece of copy, figure and asset reference used on the site.
 * Sourced from majestictower.patilbuilders.in — the project facts are kept
 * identical to the original; only the presentation differs.
 */

export const project = {
  name: "Majestic Tower",
  developer: "Patil Builders",
  tagline: "The Majestic Experience",
  configuration: "2 BHK, 3 BHK",
  configurationShort: "2 & 3 BHK",
  priceFrom: "₹ 72.80 L",
  priceFromLong: "₹ 72.80 Lakhs Onwards",
  locality: "Nallasopara (West), Mumbai",
  localityShort: "Nalasopara West",
  rera: "P99000079138",
  reraAuthority: "MahaRERA",
  reraUrl: "https://maharera.maharashtra.gov.in",
  seoTitle: "Majestic Tower | 2 & 3 BHK Flats in Nalasopara West, Mumbai",
  seoDescription:
    "Premium 2 & 3 BHK flats by Patil Builders in Nalasopara West, Mumbai. Starting ₹72.80L with 15+ luxury amenities. MahaRERA: P99000079138.",
} as const;

export const contact = {
  phoneDisplay: "+91 9702090090",
  phoneRaw: "+919702090090",
  phoneTel: "tel:+919702090090",
  whatsapp:
    "https://api.whatsapp.com/send?phone=919702090090&text=Hi%2C%20I%27m%20interested%20in%20Majestic%20Tower%2C%20Nalasopara%20West.",
  email: "info@patilbuilders.in",
  emailHref: "mailto:info@patilbuilders.in",
  addressLine: "Majestic Tower Sales Lounge, Opp. DMart, Nalasopara West",
  addressFull:
    "Majestic Tower Sales Lounge, Opp. DMart, Nalasopara West, Maharashtra 401203",
  hours: [
    { days: "Mon – Sat", time: "8:00 am – 6:00 pm" },
    { days: "Sunday", time: "11:00 am – 9:00 pm" },
  ],
  instagram: "https://www.instagram.com/patil_builders/",
  geo: { lat: 19.4137037, lng: 72.8169724 },
} as const;

export const mapEmbedUrl =
  "https://www.google.com/maps?q=19.4137037,72.8169724&hl=en&z=16&output=embed";
export const mapDirectionsUrl =
  "https://www.google.com/maps/dir/?api=1&destination=19.4137037,72.8169724";

/**
 * Header / in-page navigation. `href` is root-relative so the same links work
 * from /thank-you as well as the home page; on "/" the browser treats them as
 * a same-document hash and simply scrolls. `id` is the section element's id.
 */
export const navLinks = [
  { label: "Overview", id: "overview", href: "/#overview" },
  { label: "Residences", id: "residences", href: "/#residences" },
  { label: "Amenities", id: "amenities", href: "/#amenities" },
  { label: "Connectivity", id: "connectivity", href: "/#connectivity" },
  { label: "Gallery", id: "gallery", href: "/#gallery" },
  { label: "Contact", id: "contact", href: "/#contact" },
] as const;

/** The four headline facts shown on the original hero strip. */
export const heroFacts = [
  { label: "Location", value: project.locality },
  { label: "RERA No.", value: project.rera },
  { label: "Price", value: "₹ 72.80L Onwards" },
  { label: "Configuration", value: "2BHK, 3BHK" },
] as const;

export const overview = {
  eyebrow: "Overview",
  titleLead: "The",
  titleAccent: "Majestic",
  titleTrail: "Experience",
  body: "For over two decades, Majestic Estates has been the premier destination for those seeking the extraordinary in luxury real estate. Our curated portfolio represents the pinnacle of architectural excellence and refined living. We don’t just sell properties; we craft experiences that resonate with the most discerning clientele. Our white-glove service ensures that every aspect of your real estate journey exceeds expectations.",
} as const;

export type SpecIcon =
  | "structure"
  | "open"
  | "air"
  | "cctv"
  | "parking"
  | "lobby"
  | "solar"
  | "water";

/** Structure & build specifications listed on the original site. */
export const specifications: { title: string; icon: SpecIcon }[] = [
  { title: "RCC Frame Structure", icon: "structure" },
  { title: "Maximum Open Spaces", icon: "open" },
  { title: "Well-Ventilated Apartments", icon: "air" },
  { title: "24/7 CCTV Surveillance", icon: "cctv" },
  { title: "Ramp Parking", icon: "parking" },
  { title: "Grand Entrance Lobby", icon: "lobby" },
  { title: "Solar Panels on Terrace", icon: "solar" },
  { title: "Rainwater Harvesting", icon: "water" },
];

export type AmenityIcon =
  | "garden"
  | "track"
  | "plantation"
  | "amphitheatre"
  | "yoga"
  | "swing"
  | "play"
  | "senior"
  | "turf"
  | "pool"
  | "gym"
  | "parking"
  | "gazebo"
  | "hall"
  | "shower";

export const amenities: { title: string; icon: AmenityIcon }[] = [
  { title: "Podium Garden", icon: "garden" },
  { title: "Fitness Track", icon: "track" },
  { title: "Dense Plantation", icon: "plantation" },
  { title: "Amphitheatre", icon: "amphitheatre" },
  { title: "Yoga Lawn", icon: "yoga" },
  { title: "Kid’s Swings", icon: "swing" },
  { title: "Kid’s Play Area", icon: "play" },
  { title: "Senior Citizen Corner", icon: "senior" },
  { title: "Turf", icon: "turf" },
  { title: "Swimming Pool", icon: "pool" },
  { title: "Fully Equipped Gym", icon: "gym" },
  { title: "Ramp Parking", icon: "parking" },
  { title: "Gazebo", icon: "gazebo" },
  { title: "Multipurpose Hall", icon: "hall" },
  { title: "Shower Area", icon: "shower" },
];

export type UnitPlan = {
  id: string;
  name: string;
  config: "2BHK" | "3BHK";
  image: string;
};

/** 3D unit plans, in the order and with the names used on the original site. */
export const unitPlans: UnitPlan[] = [
  {
    id: "3bhk-1",
    name: "Spacious & Stylish Living",
    config: "3BHK",
    image: "/images/3BHK UNIT 1.png",
  },
  {
    id: "3bhk-3",
    name: "Modern Comfort Living",
    config: "3BHK",
    image: "/images/3BHK UNIT 3.png",
  },
  {
    id: "3bhk-4",
    name: "Luxury Family Residence",
    config: "3BHK",
    image: "/images/3BHK UNIT 4.png",
  },
  {
    id: "2bhk-5",
    name: "Spacious & Stylish Living",
    config: "2BHK",
    image: "/images/2BHK UNIT 5.png",
  },
  {
    id: "2bhk-6",
    name: "Modern Comfort Living",
    config: "2BHK",
    image: "/images/2BHK UNIT 6.png",
  },
  {
    id: "2bhk-9",
    name: "Luxury Family Residence",
    config: "2BHK",
    image: "/images/2BHK UNIT 9.png",
  },
  {
    id: "2bhk-10",
    name: "Modern Comfort Living",
    config: "2BHK",
    image: "/images/2BHK UNIT 10.png",
  },
];

/** The 2D drawings shown under "Floor Plan" on the original site. */
export const layoutPlans = [
  {
    id: "plan-2bhk",
    name: "Spacious & Stylish Living",
    config: "2BHK",
    image: "/images/2bhk.png",
  },
  {
    id: "plan-3bhk",
    name: "Modern Comfort Living",
    config: "3BHK",
    image: "/images/3bhk.jpg",
  },
  {
    id: "plan-structure",
    name: "Building Structure Plan",
    config: "Tower",
    image: "/images/MAJESTIC TOWER BUILDING STRUCTURE PLAN.jpg",
  },
];

export type LandmarkIcon = "school" | "temple" | "hospital" | "retail";

export type LandmarkGroup = {
  id: string;
  label: string;
  short: string;
  icon: LandmarkIcon;
  items: string[];
};

export const landmarkGroups: LandmarkGroup[] = [
  {
    id: "school",
    label: "Schools",
    short: "Schools",
    icon: "school",
    items: [
      "Narayana School",
      "Rahul International School",
      "Little Flower’s English High School",
      "Sacred Heart High School",
      "St. Francis De Sales High School",
      "St. Stanislaus High School & Jr. College",
      "St. Mary’s English High School",
      "Evergreen High School",
    ],
  },
  {
    id: "temple",
    label: "Temples",
    short: "Temples",
    icon: "temple",
    items: [
      "Shani Mandir",
      "Shree Sai Mataji Mandir",
      "Kali Mandir",
      "Mahakali Temple",
      "Shree Sai Datta Temple",
      "Shankar Mahadev Temple",
      "Sai Baba Temple",
    ],
  },
  {
    id: "hospital",
    label: "Hospitals",
    short: "Hospitals",
    icon: "hospital",
    items: [
      "Vasai Virar Municipality Hospital",
      "Ashirwad Nursing Home",
      "Alliance Hospital",
      "Om Sai Hospital",
      "Manorama Nursing Home",
      "Ozone Multispeciality Hospital",
      "Vaarush Multispeciality Hospital",
    ],
  },
  {
    id: "retail",
    label: "Mall, Entertainment & Shopping",
    short: "Shopping",
    icon: "retail",
    items: [
      "D Mart",
      "Domino’s",
      "The Capital Mall",
      "Reliance Digital",
      "Trends",
      "Burger King",
      "KFC",
    ],
  },
];

export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  /** Drives the tile's aspect ratio inside the masonry columns. */
  ratio: "landscape" | "portrait" | "square";
};

export const gallery: GalleryItem[] = [
  {
    src: "/images/front.jpg",
    alt: "Majestic Tower street-side elevation seen past flowering trees",
    caption: "The Elevation",
    ratio: "landscape",
  },
  {
    src: "/images/Gate.jpg",
    alt: "Entrance approach to Majestic Tower",
    caption: "Grand Entrance",
    ratio: "portrait",
  },
  {
    src: "/images/podium.jpg",
    alt: "Aerial view of the podium deck with pool, sports court and gardens",
    caption: "Podium Deck",
    ratio: "landscape",
  },
  {
    src: "/images/Pool copy.jpg",
    alt: "Swimming pool with sun loungers and parasols",
    caption: "Swimming Pool",
    ratio: "landscape",
  },
  {
    src: "/images/01.jpg",
    alt: "Majestic Tower elevation lit at dusk",
    caption: "Evening Elevation",
    ratio: "portrait",
  },
  {
    src: "/images/09.jpg",
    alt: "Aerial view of Majestic Tower and its landscaped podium",
    caption: "Aerial View",
    ratio: "landscape",
  },
  {
    src: "/images/16.jpg",
    alt: "Dense planting and flowering shrubs along the podium edge",
    caption: "Dense Plantation",
    ratio: "square",
  },
  {
    src: "/images/19.jpg",
    alt: "Gazebo deck with benches set among flowering planting",
    caption: "Gazebo & Seating",
    ratio: "landscape",
  },
  {
    src: "/images/20.jpg",
    alt: "Children’s play circle and jogging track on the podium",
    caption: "Play Area & Track",
    ratio: "landscape",
  },
  {
    src: "/images/21.jpg",
    alt: "Landscaped courtyard with jacaranda trees and stone paving",
    caption: "Landscaped Court",
    ratio: "portrait",
  },
  {
    src: "/images/copy.jpg",
    alt: "Majestic Tower entrance lobby interior",
    caption: "Entrance Lobby",
    ratio: "landscape",
  },
];

export const gallerySection = {
  eyebrow: "Gallery",
  titleLead: "Exclusive",
  titleAccent: "Gallery",
  body: "Beyond traditional real estate, we offer a suite of premium services designed to elevate your property experience.",
} as const;

export const contactSection = {
  eyebrow: "Contact Us",
  titleLead: "Contact",
  titleAccent: "Majestic",
  body: "Our team of luxury real estate specialists is ready to assist you in finding your perfect property or answering any questions you may have, offering personalized guidance, expert insights, and dedicated support at every step of your journey to ensure a seamless and rewarding experience.",
  mapTitleLead: "Find Us on",
  mapTitleAccent: "Google Maps",
  mapBody: "Visit our location or explore the neighborhood on the map below.",
} as const;

/** Steps a buyer actually walks through with the sales team. */
export const journey = [
  {
    step: "01",
    title: "Enquire",
    body: "Share your name and number. A Majestic Tower specialist calls you back with pricing, availability and payment plans.",
  },
  {
    step: "02",
    title: "Visit the Site",
    body: "Walk the sales lounge opposite DMart, see the layouts in person and take in the podium deck and elevation.",
  },
  {
    step: "03",
    title: "Choose Your Home",
    body: "Compare the 2 and 3 BHK layouts, floor levels and views, then pick the residence that fits your family.",
  },
  {
    step: "04",
    title: "Book with Confidence",
    body: "Complete your booking on a MahaRERA-registered project — P99000079138 — with documentation support throughout.",
  },
] as const;

export const faqs = [
  {
    q: "What configurations are available at Majestic Tower?",
    a: "Majestic Tower offers premium 2 BHK and 3 BHK residences in Nalasopara West, Mumbai, starting at ₹72.80 Lakhs onwards.",
  },
  {
    q: "What is the MahaRERA registration number for Majestic Tower?",
    a: "The MahaRERA registration number for Majestic Tower is P99000079138, verifiable at maharera.maharashtra.gov.in.",
  },
  {
    q: "Where is Majestic Tower located?",
    a: "Majestic Tower is located opposite D-Mart in Nalasopara West, Mumbai, close to schools, hospitals, temples, and shopping centres including The Capital Mall.",
  },
  {
    q: "Who is the developer of Majestic Tower?",
    a: "Majestic Tower is developed by Patil Builders, offering premium residential living with a focus on open spaces, ventilation, and modern amenities in Nalasopara West.",
  },
  {
    q: "What amenities are available at Majestic Tower?",
    a: "Majestic Tower features 15+ amenities including a podium garden, amphitheatre, yoga lawn, swimming pool, fully equipped gym, kids’ play area, senior citizen corner, multipurpose hall, and ramp parking.",
  },
  {
    q: "What is the starting price of flats at Majestic Tower?",
    a: "Flats at Majestic Tower start at ₹72.80 Lakhs onwards for 2 BHK and 3 BHK configurations.",
  },
  {
    q: "How do I contact Majestic Tower for enquiries?",
    a: "You can contact Majestic Tower at +91 9702090090, email info@patilbuilders.in, use the enquiry form on the website, or message via WhatsApp.",
  },
] as const;

/** Confirmation page shown after any form is submitted successfully. */
export const thankYou = {
  eyebrow: "Enquiry Received",
  title: "Thank you",
  body: "Your details are with our sales desk. A Majestic Tower specialist will call you shortly to talk through pricing, availability and the next steps.",
  steps: [
    {
      step: "01",
      title: "We call you back",
      body: "Usually within one working day, during sales lounge hours.",
    },
    {
      step: "02",
      title: "We share the details",
      body: "Current price list, available floors and the payment plan that suits you.",
    },
    {
      step: "03",
      title: "We book your visit",
      body: "See the layouts and the podium deck in person, at a time you pick.",
    },
  ],
  urgent: "In a hurry? Call or WhatsApp us directly — we answer during lounge hours.",
} as const;

export const footer = {
  blurb:
    "Redefining luxury real estate with unparalleled service and the world’s most prestigious properties, we deliver an elevated experience tailored to discerning clients who seek excellence, exclusivity, and sophistication in every detail. From curated property selections to bespoke advisory, our commitment is to provide exceptional value, seamless transactions, and a truly refined journey into the finest living and investment opportunities available.",
  disclaimer:
    "Disclaimer : The information, plans, specifications, images, configuration, dimensions, facilities and other details contained herein are indicative of the kind of development that is proposed by the Promoter and the intended recipient/reader/viewer/interested party should note that these are to be treated as purely provisional and informative and as such only tentative subject to approval of authorities or otherwise and the Promoter reserves the right to make changes and alterations at its sole discretion. None of the images, material, stock photography, projections, elevations, details, descriptions and other information that are displayed/contained herein, should be deemed to be or constitute advertisements, solicitations, marketing, offer for sale, invitation to offer, invitation to acquire, including within the purview of the Real Estate (Development and Regulation) Act, 2016 (“RERA”). This advertisement is purely conceptual and purchase in this project shall be governed by the terms and conditions of the Agreement for Sale. While every reasonable care has been taken in fashioning this advertisement, Any intended recipient/reader/viewer/interested party should verify all the information with the Promoter prior to purchase in the project, the Promoter cannot be held responsible for any inaccuracies or omissions. The Promoter shall not be responsible for any action taken by the intended recipient/reader/viewer/interested party relying on such material/information on the Website and brochures and any information provided by Real Estate Agent/Broker/ Channel Partner without independently verifying with the Promoter. *T&C Apply",
  copyright: "© 2025 Copyrights by MAJESTIC TOWER All Rights Reserved",
  credit: {
    label: "Design And Developed BY : SYNOVATIVE",
    href: "https://synovative.in",
  },
} as const;

/** Privacy Commitment popup — full text as published on the original site. */
export const privacyPolicy = {
  title: "Privacy Commitment",
  titleAccent: "Majestic Tower",
  paragraphs: [
    "At Majestic Tower, a premium real estate project by Patil Builders, we value your privacy and are committed to safeguarding your personal information. This Privacy Policy outlines how we collect, use, and protect the data you share with us when interacting with our website or services.",
    "When you visit our website or submit an enquiry, we may collect basic personal details such as your name, phone number, email address, and property preferences. This information enables us to respond to your queries, provide accurate project-related details, and enhance your overall experience with Majestic Tower.",
    "We strictly maintain the confidentiality of your personal data and do not sell, trade, or rent your information to third parties. Your details may only be shared with our trusted partners, authorized representatives, or service providers when required to assist you with property-related services or to fulfill your enquiry effectively.",
    "Our website may use cookies and similar tracking technologies to improve functionality, analyze user behavior, and optimize performance. You have the option to manage or disable cookies at any time through your browser settings.",
    "We implement appropriate technical and organizational measures to ensure your data is protected against unauthorized access, misuse, or disclosure. We strive to comply with all applicable data protection laws and regulations.",
    "By accessing our website and submitting your information, you agree to the terms outlined in this Privacy Policy and consent to the collection and use of your data accordingly.",
    "Additionally, by providing your contact details, you authorize us to communicate with you via WhatsApp, SMS, RCS, phone calls, or email regarding project updates, promotional offers, important notifications, and responses to your enquiries.",
  ],
  accept: "Accept & Continue",
} as const;

export const consentLabel =
  "By checking this box, you agree to our Privacy Policy and consent to be contacted with relevant updates.";

export const configurationOptions = ["2 BHK", "3 BHK", "Not Sure..."] as const;

/** Trust points that scroll in the ticker under the hero. */
export const tickerItems = [
  "MahaRERA P99000079138",
  "15+ Curated Amenities",
  "2 & 3 BHK Residences",
  "Opposite DMart, Nalasopara West",
  "RCC Frame Structure",
  "Solar Panels on Terrace",
  "Rainwater Harvesting",
  "24/7 CCTV Surveillance",
] as const;

/** Point this at the real brochure PDF once it is available. */
export const brochureUrl =
  process.env.NEXT_PUBLIC_BROCHURE_URL || "/majestic-tower-brochure.pdf";
