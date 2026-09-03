import type { AmenityIcon, LandmarkIcon, SpecIcon } from "@/lib/content";

type IconProps = { className?: string };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Svg({ className = "h-6 w-6", children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} {...stroke}>
      {children}
    </svg>
  );
}

/* ---------------------------------------------------------------- amenities */

const amenityPaths: Record<AmenityIcon, React.ReactNode> = {
  garden: (
    <>
      <path d="M12 21v-7" />
      <path d="M12 14c0-3 2-5 5-5 0 3-2 5-5 5Z" />
      <path d="M12 14c0-3-2-5-5-5 0 3 2 5 5 5Z" />
      <path d="M4 21h16" />
    </>
  ),
  track: (
    <>
      <ellipse cx="12" cy="12" rx="9" ry="5.5" />
      <ellipse cx="12" cy="12" rx="4.5" ry="2" />
      <circle cx="12" cy="6.5" r="1" />
    </>
  ),
  plantation: (
    <>
      <path d="M12 21V9" />
      <path d="M12 12c-3.2 0-5-2-5-5 3.2 0 5 2 5 5Z" />
      <path d="M12 15c3.2 0 5-2 5-5-3.2 0-5 2-5 5Z" />
      <path d="M5 21h14" />
    </>
  ),
  amphitheatre: (
    <>
      <path d="M3 18h18" />
      <path d="M5 18a7 7 0 0 1 14 0" />
      <path d="M8 18a4 4 0 0 1 8 0" />
      <path d="M12 8V5" />
    </>
  ),
  yoga: (
    <>
      <circle cx="12" cy="5.5" r="2" />
      <path d="M12 8v5" />
      <path d="m6 19 6-6 6 6" />
      <path d="M5 13h14" />
    </>
  ),
  swing: (
    <>
      <path d="M4 4h16" />
      <path d="M8 4v9" />
      <path d="M16 4v9" />
      <rect x="6" y="13" width="12" height="2.5" rx="1" />
      <path d="M5 20h14" />
    </>
  ),
  play: (
    <>
      <path d="m3 18 9-11 9 11" />
      <path d="M3 18h18" />
      <path d="M9 18v-4h6v4" />
    </>
  ),
  senior: (
    <>
      <circle cx="10" cy="5.5" r="2" />
      <path d="M10 8v6l-2 6" />
      <path d="m10 14 3 6" />
      <path d="M17 8v12" />
    </>
  ),
  turf: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="1.5" />
      <path d="M12 6v12" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M3 9.5h2.5v5H3M21 9.5h-2.5v5H21" />
    </>
  ),
  pool: (
    <>
      <path d="M3 17c1.6 0 1.6 1.2 3.2 1.2S7.8 17 9.4 17s1.6 1.2 3.2 1.2S14.2 17 15.8 17s1.6 1.2 3.2 1.2" />
      <path d="M7 15V6a2 2 0 0 1 4 0" />
      <path d="M14 15V6a2 2 0 0 1 4 0" />
      <path d="M7 10h4M14 10h4" />
    </>
  ),
  gym: (
    <>
      <path d="M4 9v6M20 9v6M7 7v10M17 7v10" />
      <path d="M7 12h10" />
    </>
  ),
  parking: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <path d="M10 16V8h2.8a2.6 2.6 0 0 1 0 5.2H10" />
    </>
  ),
  gazebo: (
    <>
      <path d="m3 10 9-6 9 6" />
      <path d="M5 10v10M19 10v10" />
      <path d="M5 20h14" />
      <path d="M5 13h14" />
    </>
  ),
  hall: (
    <>
      <path d="M3 20V9l9-5 9 5v11" />
      <path d="M3 20h18" />
      <path d="M9 20v-5h6v5" />
      <path d="M9 11h6" />
    </>
  ),
  shower: (
    <>
      <path d="M5 12h14" />
      <path d="M12 12V6a2.5 2.5 0 0 1 5 0" />
      <path d="M8 16v1M12 16v2M16 16v1" />
    </>
  ),
};

export function AmenityGlyph({ name, className }: { name: AmenityIcon; className?: string }) {
  return <Svg className={className}>{amenityPaths[name]}</Svg>;
}

/* ----------------------------------------------------------- specifications */

const specPaths: Record<SpecIcon, React.ReactNode> = {
  structure: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1.5" />
      <path d="M4 9h16M4 15h16M12 3v18" />
    </>
  ),
  open: (
    <>
      <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
      <circle cx="12" cy="12" r="2" />
    </>
  ),
  air: (
    <>
      <path d="M3 8h11a3 3 0 1 0-3-3" />
      <path d="M3 12h15a3 3 0 1 1-3 3" />
      <path d="M3 16h8" />
    </>
  ),
  cctv: (
    <>
      <path d="M3 7.5 16 4l1.5 5.5L4.5 13Z" />
      <path d="M6 13v3a3 3 0 0 0 3 3h2" />
      <circle cx="18.5" cy="18" r="2.5" />
    </>
  ),
  parking: (
    <>
      <path d="M3 18h6l6-9h6" />
      <circle cx="7" cy="18" r="2" />
      <path d="M13 18h8" />
    </>
  ),
  lobby: (
    <>
      <path d="M4 21V6l8-3 8 3v15" />
      <path d="M4 21h16" />
      <path d="M10 21v-6a2 2 0 0 1 4 0v6" />
      <path d="M7 10h2M15 10h2" />
    </>
  ),
  solar: (
    <>
      <circle cx="12" cy="7" r="3" />
      <path d="M12 1v1.5M12 11.5V13M6 7H4.5M19.5 7H18M7.8 2.8 6.7 1.7M17.3 12.3l-1.1-1.1M16.2 2.8l1.1-1.1M6.7 12.3l1.1-1.1" />
      <path d="M4 21h16l-2-5H6Z" />
    </>
  ),
  water: (
    <>
      <path d="M12 3s5.5 6.1 5.5 10a5.5 5.5 0 0 1-11 0C6.5 9.1 12 3 12 3Z" />
      <path d="M9.5 13.5a2.5 2.5 0 0 0 2.5 2.5" />
    </>
  ),
};

export function SpecGlyph({ name, className }: { name: SpecIcon; className?: string }) {
  return <Svg className={className}>{specPaths[name]}</Svg>;
}

/* --------------------------------------------------------------- landmarks */

const landmarkPaths: Record<LandmarkIcon, React.ReactNode> = {
  school: (
    <>
      <path d="m3 8 9-4 9 4-9 4Z" />
      <path d="M7 10.5V16c0 1.7 2.2 3 5 3s5-1.3 5-3v-5.5" />
      <path d="M21 8v5" />
    </>
  ),
  temple: (
    <>
      <path d="m12 2 4 4H8Z" />
      <path d="M6 21V9l6-3 6 3v12" />
      <path d="M4 21h16" />
      <path d="M10 21v-5a2 2 0 0 1 4 0v5" />
    </>
  ),
  hospital: (
    <>
      <rect x="4" y="4" width="16" height="17" rx="2" />
      <path d="M12 8.5v6M9 11.5h6" />
      <path d="M9 21v-3h6v3" />
    </>
  ),
  retail: (
    <>
      <path d="M4 8h16l-1 12H5Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </>
  ),
};

export function LandmarkGlyph({ name, className }: { name: LandmarkIcon; className?: string }) {
  return <Svg className={className}>{landmarkPaths[name]}</Svg>;
}

/* ------------------------------------------------------------------ misc UI */

export function PhoneIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M5 3h3.5l1.8 4.4-2.2 1.6a12.5 12.5 0 0 0 6.9 6.9l1.6-2.2L21 15.5V19a2 2 0 0 1-2.2 2A16.8 16.8 0 0 1 3 5.2 2 2 0 0 1 5 3Z" />
    </Svg>
  );
}

export function WhatsAppIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 15L2 22l5.2-1.5A9.9 9.9 0 1 0 12.04 2Zm0 1.9a8 8 0 1 1-4.1 14.9l-.3-.2-3 .9.9-2.9-.2-.3a8 8 0 0 1 6.7-12.4Zm4.6 10.2c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.1-.2 0-.4.1-.5l.5-.6c.1-.2.1-.3 0-.5l-.7-1.7c-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.8.8-1 1.9-.6 3a10.8 10.8 0 0 0 5 5c1.2.5 2.3.6 3.1.2.4-.2.8-.6 1-1 .1-.4.1-.8 0-.9l-.4-.2Z" />
    </svg>
  );
}

export function MailIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </Svg>
  );
}

export function PinIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </Svg>
  );
}

export function ClockIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </Svg>
  );
}

export function DownloadIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M12 3v11" />
      <path d="m7.5 10.5 4.5 4 4.5-4" />
      <path d="M4 20h16" />
    </Svg>
  );
}

export function CalendarIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="3.5" y="5" width="17" height="16" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </Svg>
  );
}

export function CloseIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <Svg className={className}>
      <path d="m6 6 12 12M18 6 6 18" />
    </Svg>
  );
}

export function CheckIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <Svg className={className}>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </Svg>
  );
}

export function InstagramIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="0.8" fill="currentColor" />
    </Svg>
  );
}

export function SparkIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M12 3.5 13.6 9l5.4 1.6-5.4 1.7L12 17.8l-1.6-5.5L5 10.6 10.4 9Z" />
    </Svg>
  );
}
