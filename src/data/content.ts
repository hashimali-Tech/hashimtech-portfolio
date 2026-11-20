/**
 * ALL PORTFOLIO CONTENT LIVES HERE.
 * Strict Rule: Empty strings ("") or empty arrays ([]) MUST hide their corresponding
 * UI elements completely on the site. No placeholder or unconfirmed facts ever show.
 */

export interface Profile {
  name: string;
  brand: string;
  headline: string;
  heroGreeting: string;
  heroName: string;
  heroSubtitle: string;
  heroDescription: string;
  intro: string;
  location: string;
  linkedin: string;
  github: string;
  email: string;
  resumeUrl: string;
  avatarHero: string;
  avatarAbout: string;
}

export interface Education {
  degree: string;
  school: string;
  period: string;
  details: string;
}

export interface ExperienceItem {
  company: string;
  location: string;
  role: string;
  period: string;
  type: string;
  bullets: string[];
}

export interface SkillGroup {
  title: string;
  emoji: string;
  items: string[];
}

export interface ServiceItem {
  icon: string;
  title: string;
  description: string;
}

export interface ProjectMedia {
  src: string;
  src800: string;
  alt: string;
  caption: string;
  w: number;
  h: number;
}

export interface ProjectItem {
  id: string;
  title: string;
  kind: string;
  visibility: "public" | "private";
  summary: string;
  audience: string;
  stack: string[];
  workflows: string[];
  limits: string[];
  screenshot: ProjectMedia;
  code: ProjectMedia;
  contribution: string;
  repoUrl: string;
  liveUrl: string;
}

export const profile: Profile = {
  name: "Hashim Ali",
  brand: "HashimTech",
  headline: "Software engineer building full-stack business applications",
  heroGreeting: "Hey, Welcome!",
  heroName: "I'm Hashim Ali",
  heroSubtitle: "Full-Stack Developer | AI Enthusiast",
  heroDescription:
    "It's great to have you here. Let's build something amazing together!",
  intro:
    "I build web, mobile and desktop software for everyday business work: inventory, invoicing, commerce and more. I'm studying BSIT in Lahore and based in Gujranwala, Pakistan.",
  location: "Gujranwala, Punjab, Pakistan",
  linkedin: "https://www.linkedin.com/in/hashimali-tech/",
  github: "https://github.com/hashimali-Tech",
  email: "", // Empty string hides email button/link
  resumeUrl: "", // Empty string hides resume button/link
  avatarHero: "/profile/hashim-hero.webp",
  avatarAbout: "/profile/hashim-about.webp",
};

export const about: string[] = [
  "I'm a software engineer and BSIT student who likes turning messy day-to-day business processes into software people can actually use.",
  "My work centers on full-stack development: React interfaces, Node.js and Express back ends, and MongoDB data. I also work with AI features, including calling AI APIs and connecting AI models to web applications.",
];

export const education: Education = {
  degree: "Bachelor of Science in Information Technology (BSIT)",
  school: "Punjab University Lahore",
  period: "2023 – 2027 (expected)",
  details: "",
};

export const experience: ExperienceItem[] = [
  {
    company: "Dev Valley Software House and Incubation Centre",
    location: "Gujranwala, Pakistan",
    role: "", // Empty: role title remains hidden
    period: "", // Empty: period remains hidden
    type: "", // Empty: employment type remains hidden
    bullets: [], // Empty: bullet list remains hidden
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    emoji: "🎨",
    items: ["React", "JavaScript", "TypeScript", "HTML5", "CSS3", "Tailwind CSS", "Next.js", "Vite"],
  },
  {
    title: "Backend",
    emoji: "⚙️",
    items: ["Node.js", "Express.js", "REST APIs", "Authentication", "Payment Gateway Integration"],
  },
  {
    title: "Database",
    emoji: "🗄️",
    items: ["MongoDB", "Mongoose", "SQLite", "MySQL"],
  },
  {
    title: "Mobile & Desktop",
    emoji: "📱",
    items: ["React Native", "Expo", "Electron"],
  },
  {
    title: "AI Integration",
    emoji: "🤖",
    items: ["AI API Integration", "LLM Integration", "Prompt Engineering", "Model Fine-Tuning", "Locally Trained AI Models"],
  },
  {
    title: "Tools & Workflow",
    emoji: "🛠️",
    items: ["Git", "GitHub", "VS Code", "Postman", "npm", "MERN Stack"],
  },
];

export const services: ServiceItem[] = [
  {
    icon: "🌐",
    title: "Full-Stack Web Development",
    description:
      "End-to-end web applications with React frontends, Node.js backends, and MongoDB databases built for performance and scalability.",
  },
  {
    icon: "🎨",
    title: "Frontend Development",
    description:
      "Pixel-perfect, responsive interfaces with React, Next.js and Tailwind CSS — fast, accessible and visually sharp.",
  },
  {
    icon: "⚙️",
    title: "Backend API Development",
    description:
      "Robust REST APIs with Express.js, secure authentication, payment integrations and clean data architecture.",
  },
  {
    icon: "🤖",
    title: "AI Integration",
    description:
      "Connecting AI APIs and locally trained models to real-world applications — from chatbots to intelligent data processing.",
  },
  {
    icon: "🧠",
    title: "AI-Powered App Development",
    description:
      "Building smart applications with LLM integration, prompt engineering and AI-enhanced workflows.",
  },
  {
    icon: "📱",
    title: "Mobile App Development",
    description:
      "Cross-platform mobile applications using React Native and Expo, sharing logic with existing web codebases.",
  },
];

export const projects: ProjectItem[] = [
  {
    id: "inventory",
    title: "Inventory Management",
    kind: "Desktop application",
    visibility: "public",
    summary:
      "A desktop management app built with Electron, React and SQLite for tracking stock, creating sale invoices, generating reports, managing customer accounts and backing up data, with support for both English and Urdu interfaces.",
    audience: "Small retail and wholesale shops that need offline-first inventory and invoice management.",
    stack: ["Electron", "React", "SQLite", "Node.js"],
    workflows: [
      "Track product stock levels, categories and pricing",
      "Generate, validate and print sale invoices with customer balances",
      "Switch between English and Urdu interface layouts",
      "Backup and restore local SQLite database files",
    ],
    limits: [
      "The dashboard shows sample data from a single demo invoice.",
      "The documented sample flow used a temporary local review adapter.",
    ],
    screenshot: {
      src: "/projects/inventory-dashboard-1600.webp",
      src800: "/projects/inventory-dashboard-800.webp",
      alt: "Inventory Management desktop application dashboard showing sample sales and product statistics",
      caption: "Dashboard screenshot with sample data.",
      w: 1920,
      h: 953,
    },
    code: {
      src: "/projects/inventory-invoice-save-1600.webp",
      src800: "/projects/inventory-invoice-save-800.webp",
      alt: "Code excerpt of invoice validation and save handler in InvoiceManagement.jsx",
      caption: "Code excerpt: InvoiceManagement.jsx, lines 781–850. Invoice validation and save.",
      w: 1380,
      h: 1330,
    },
    contribution: "",
    repoUrl: "",
    liveUrl: "",
  },
  {
    id: "eshop",
    title: "E-SHOP Updated",
    kind: "Web application",
    visibility: "public",
    summary:
      "An e-commerce web app with a React and Vite front end and an Express and Mongoose back end. The repository also contains AI integration code.",
    audience: "Shoppers browsing a product catalog, and the store that sells to them.",
    stack: ["React", "Vite", "Redux Toolkit Query", "Express", "Mongoose", "MongoDB"],
    workflows: [
      "Sign in with email and password",
      "Search and filter products through a typed API client",
      "Load categories, filter options and single product pages",
    ],
    limits: [
      "The screenshot shows the login screen only.",
      "Product fetching, MongoDB authentication and checkout were not exercised in that capture.",
    ],
    screenshot: {
      src: "/projects/eshop-updated-login-1600.webp",
      src800: "/projects/eshop-updated-login-800.webp",
      alt: "E-SHOP Updated login screen with email and password fields over a store background",
      caption: "Login screen preview. Checkout is not shown.",
      w: 1920,
      h: 897,
    },
    code: {
      src: "/projects/eshop-product-api-1600.webp",
      src800: "/projects/eshop-product-api-800.webp",
      alt: "Code excerpt of the Redux Toolkit Query product API client in ProductApi.js",
      caption: "Code excerpt: ProductApi.js, lines 1–64. Product API client.",
      w: 1380,
      h: 1222,
    },
    contribution: "",
    repoUrl: "",
    liveUrl: "",
  },

  /*
   * PRIVATE PROJECT TEMPLATE: FoodApp (restaurant POS / ERP).
   * Keep it out of the public site until you approve it. To publish:
   * 1. Confirm your contribution and that the My Restaurant branding is OK to show.
   * 2. Put the image in /public/projects/ and fill in this entry.
   * 3. Change visibility to "public".
   *
   * {
   *   id: "foodapp",
   *   title: "FoodApp (Restaurant POS / ERP)",
   *   kind: "Web / POS application",
   *   visibility: "private",
   *   summary: "A POS and restaurant management system for table orders, billing, and kitchen tracking.",
   *   audience: "Restaurant staff and cashiers handling live dine-in and takeaway orders.",
   *   stack: ["React", "Node.js", "Express", "MongoDB"],
   *   workflows: [
   *     "Order taking and table occupancy tracking",
   *     "Kitchen ticket generation and status updates",
   *     "Bill calculation and receipt printing"
   *   ],
   *   limits: ["Internal demo only."],
   *   screenshot: {
   *     src: "/projects/foodapp-placeholder.webp",
   *     src800: "/projects/foodapp-placeholder-800.webp",
   *     alt: "FoodApp POS interface",
   *     caption: "FoodApp interface preview.",
   *     w: 1920,
   *     h: 1080
   *   },
   *   code: {
   *     src: "/projects/foodapp-code-placeholder.webp",
   *     src800: "/projects/foodapp-code-placeholder-800.webp",
   *     alt: "FoodApp code excerpt",
   *     caption: "Code excerpt: OrderController.js",
   *     w: 1920,
   *     h: 1080
   *   },
   *   contribution: "",
   *   repoUrl: "",
   *   liveUrl: ""
   * }
   */
];

export const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];
