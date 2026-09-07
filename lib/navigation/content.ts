import { ESG_REPORT_URL } from "@/lib/our-impact/content";

export const impactMegaMenuItems = [
  {
    title: "Environment",
    href: "/our-impact",
    description: "Water stewardship, renewable energy, and waste reduction programs.",
  },
  {
    title: "People & Communities",
    href: "/our-impact",
    description: "Worker welfare, training, and community programs.",
  },
  {
    title: "Governance & Certifications",
    href: "/our-impact",
    description: "Certifications, compliance systems, and governance structures.",
  },
];

export const primaryNavItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Manufacturing", href: "/facility" },
  { label: "Careers", href: "/careers" },
] as const;

export const footerColumns = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Manufacturing", href: "/facility" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "Casual Wear", href: "/products" },
      { label: "Streetwear", href: "/products" },
      { label: "Activewear", href: "/products" },
      { label: "Denim", href: "/products" },
      { label: "Kidswear", href: "/products" },
      { label: "Boutique", href: "/products" },
    ],
  },
  {
    title: "Our Impact",
    links: [
      { label: "Environment", href: "/our-impact" },
      { label: "People & Communities", href: "/our-impact" },
      { label: "Governance & Certifications", href: "/our-impact" },
      { label: "ESG Reports", href: ESG_REPORT_URL },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "LinkedIn", href: "https://www.linkedin.com/company/jaguar-pvt-ltd/", external: true },
    ],
  },
] as const;

export const legalLinks = [
  { label: "Privacy Policy", href: "#privacy" },
  { label: "Terms", href: "#terms" },
  { label: "Cookie Preferences", href: "#cookies" },
  { label: "Modern Slavery Statement", href: "#modern-slavery" },
] as const;

export const localeOptions = [
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "ar", label: "Arabic", nativeLabel: "العربية" },
  { code: "zh", label: "Chinese", nativeLabel: "中文" },
  { code: "es", label: "Spanish", nativeLabel: "Español" },
  { code: "fr", label: "French", nativeLabel: "Français" },
  { code: "de", label: "German", nativeLabel: "Deutsch" },
] as const;
