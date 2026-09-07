export type SiteSearchEntry = {
  id: string;
  title: string;
  href: string;
  snippet: string;
  keywords: string[];
};

export type SiteSearchResult = {
  id: string;
  title: string;
  href: string;
  snippet: string;
};

const siteSearchIndex: SiteSearchEntry[] = [
  {
    id: "home",
    title: "Home",
    href: "/",
    snippet: "Knitwear manufacturing across knitted fabric, sewing, and finished programs in casual wear, streetwear, activewear, denim, kidswear, and boutique.",
    keywords: ["home", "knitwear", "knitting", "manufacturing", "apparel", "capabilities"],
  },
  {
    id: "about",
    title: "About",
    href: "/about",
    snippet: "Company overview, strategy, mission, policies, and history.",
    keywords: ["about", "company", "overview", "glance", "history", "strategy", "mission", "policy"],
  },
  {
    id: "about-at-a-glance",
    title: "Jaguar at a Glance",
    href: "/about#at-a-glance",
    snippet: "Footprint, history, and company scale.",
    keywords: ["about", "glance", "overview", "history", "footprint"],
  },
  {
    id: "about-strategy",
    title: "Our Strategy",
    href: "/about#strategy",
    snippet: "Strategic priorities — capacity, categories, and compliance-led growth.",
    keywords: ["strategy", "growth", "investment", "capacity", "compliance"],
  },
  {
    id: "about-mission",
    title: "Mission",
    href: "/about#mission",
    snippet: "Purpose, values, and partnership principles.",
    keywords: ["mission", "values", "purpose", "partnership"],
  },
  {
    id: "about-company-policy",
    title: "Company Policy",
    href: "/about#company-policy",
    snippet: "Ethics, labor standards, environmental responsibility, and governance.",
    keywords: ["policy", "ethics", "compliance", "governance", "labor", "standards"],
  },
  {
    id: "about-history",
    title: "History",
    href: "/about#history",
    snippet: "Jaguar’s journey from 1962 to vertically integrated knitwear manufacturing.",
    keywords: ["history", "timeline", "journey", "1962", "growth"],
  },
  {
    id: "products",
    title: "Products",
    href: "/products",
    snippet: "Six knitwear categories on one page — casual wear, streetwear, activewear, denim, kidswear, and boutique.",
    keywords: ["products", "categories", "casual wear", "streetwear", "activewear", "denim", "kidswear", "boutique"],
  },
  {
    id: "casual-wear",
    title: "Casual Wear",
    href: "/products#casual-wear",
    snippet: "Everyday apparel — tees, polos, loungewear, and soft-hand separates.",
    keywords: ["casual wear", "lounge wear", "basics", "everyday apparel"],
  },
  {
    id: "streetwear",
    title: "Streetwear",
    href: "/products#streetwear",
    snippet: "Urban apparel with premium construction and brand-led drops.",
    keywords: ["streetwear", "urban apparel", "drops", "hoodies"],
  },
  {
    id: "activewear",
    title: "Activewear",
    href: "/products#activewear",
    snippet: "Performance leggings, training tops, and sport layers.",
    keywords: ["activewear", "sportswear", "leggings", "performance apparel"],
  },
  {
    id: "denim",
    title: "Denim",
    href: "/products#denim",
    snippet: "Jeans, jackets, and skirts with wash development and shade control.",
    keywords: ["denim", "jeans", "denim wash", "five pocket"],
  },
  {
    id: "kidswear",
    title: "Kidswear",
    href: "/products#kidswear",
    snippet: "Children's apparel with soft-hand construction and compliance focus.",
    keywords: ["kidswear", "children's apparel", "kids clothing"],
  },
  {
    id: "boutique",
    title: "Boutique",
    href: "/products#boutique",
    snippet: "Small-batch programs with low minimums and refined construction.",
    keywords: ["boutique", "low moq", "small batch"],
  },
  {
    id: "our-impact",
    title: "Our Impact",
    href: "/our-impact",
    snippet: "Environment, people, and governance programs on one sustainability page.",
    keywords: ["impact", "esg", "sustainability", "environment"],
  },
  {
    id: "environment",
    title: "Environment",
    href: "/our-impact#environment",
    snippet: "Water stewardship and renewable energy programs.",
    keywords: ["environment", "water", "renewable", "solar"],
  },
  {
    id: "people",
    title: "People & Communities",
    href: "/our-impact#people",
    snippet: "Worker welfare and community programs.",
    keywords: ["people", "communities", "worker welfare", "training"],
  },
  {
    id: "governance",
    title: "Governance & Certifications",
    href: "/our-impact#governance",
    snippet: "GOTS, OEKO-TEX, WRAP, and compliance programs.",
    keywords: ["governance", "certifications", "GOTS", "OEKO-TEX", "WRAP", "compliance"],
  },
  {
    id: "facility",
    title: "Manufacturing",
    href: "/facility",
    snippet: "Jaguar (Pvt) Ltd in Faisalabad, Ava Marie, Sweet Threads, and design houses in Spain, Germany, and the UK.",
    keywords: ["manufacturing", "facility", "facilities", "map", "footprint", "locations", "morocco", "uk", "pakistan", "spain", "germany", "ava marie", "sweet threads", "design", "development"],
  },
  {
    id: "facility-footprint",
    title: "Global footprint",
    href: "/facility#footprint",
    snippet: "Interactive map of Jaguar manufacturing and design locations.",
    keywords: ["map", "footprint", "locations", "global"],
  },
  {
    id: "facility-design",
    title: "Design & Development",
    href: "/facility#design",
    snippet: "Design houses in Spain, Germany, and the United Kingdom.",
    keywords: ["design", "development", "spain", "germany", "uk"],
  },
  {
    id: "facility-list",
    title: "All facilities",
    href: "/facility#facilities",
    snippet: "Jaguar (Pvt) Ltd, Ava Marie, and Sweet Threads manufacturing sites.",
    keywords: ["facilities", "ava marie", "sweet threads", "faisalabad"],
  },
  {
    id: "facility-capabilities",
    title: "Process & Capabilities",
    href: "/facility#capabilities",
    snippet: "In-house departments from knitting and dyeing through sewing, packing, and QA.",
    keywords: ["process", "capabilities", "departments", "knitting", "sewing"],
  },
  {
    id: "careers",
    title: "Careers",
    href: "/careers",
    snippet: "Current openings, internships, and workplace culture.",
    keywords: ["careers", "jobs", "hiring", "culture", "openings", "internship"],
  },
  {
    id: "careers-culture",
    title: "Life at Jaguar",
    href: "/careers#culture",
    snippet: "Workplace culture, safety, and continuous improvement.",
    keywords: ["culture", "workplace", "safety", "life at jaguar"],
  },
  {
    id: "careers-internships",
    title: "Internships",
    href: "/careers#internships",
    snippet: "Supervised internships in sustainability, quality, and commercial functions.",
    keywords: ["internship", "intern", "graduate"],
  },
  {
    id: "careers-benefits",
    title: "Benefits",
    href: "/careers#benefits",
    snippet: "Training, growth across functions, and industrial workplace standards.",
    keywords: ["benefits", "training", "growth"],
  },
  {
    id: "careers-open-roles",
    title: "Current openings",
    href: "/careers#open-roles",
    snippet: "Live job listings with last date of application.",
    keywords: ["jobs", "openings", "vacancies", "hiring"],
  },
  {
    id: "contact",
    title: "Contact",
    href: "/contact",
    snippet: "RFI and RFQ form for sourcing conversations.",
    keywords: ["contact", "rfi", "rfq", "inquiry", "sourcing"],
  },
];

function normalize(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, " ").trim();
}

export function searchSiteContent(query: string): SiteSearchResult[] {
  const normalizedQuery = normalize(query);

  if (!normalizedQuery) {
    return siteSearchIndex.slice(0, 8).map(({ id, title, href, snippet }) => ({
      id,
      title,
      href,
      snippet,
    }));
  }

  const tokens = normalizedQuery.split(" ").filter(Boolean);

  return siteSearchIndex
    .map((entry) => {
      const haystack = normalize([entry.title, entry.snippet, ...entry.keywords].join(" "));
      let score = 0;

      if (haystack.includes(normalizedQuery)) score += 8;
      for (const token of tokens) {
        if (haystack.includes(token)) score += 2;
      }

      return { entry, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map(({ entry }) => ({
      id: entry.id,
      title: entry.title,
      href: entry.href,
      snippet: entry.snippet,
    }));
}
