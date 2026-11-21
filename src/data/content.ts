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
    id: "student-teacher-management-system",
    title: "Student-Teacher Management System",
    kind: "Full-Stack Web Application",
    visibility: "public",
    summary:
      "A comprehensive full-stack institutional management platform for student enrollment, faculty course allocations, academic records, and administrative dashboards.",
    audience: "Academic institutions, instructors, and students managing classroom records and schedules.",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "Tailwind CSS"],
    workflows: [
      "Manage student enrollments and centralized academic records",
      "Coordinate teacher class allocations and administrative portals",
      "Robust Express REST API architecture with secure MongoDB data persistence",
    ],
    limits: [],
    screenshot: { src: "", src800: "", alt: "", caption: "", w: 0, h: 0 },
    code: { src: "", src800: "", alt: "", caption: "", w: 0, h: 0 },
    contribution: "",
    repoUrl: "https://github.com/hashimali-Tech/student-teacher-management-system",
    liveUrl: "",
  },
  {
    id: "mern-todo-list",
    title: "MERN Task Management App",
    kind: "MERN Stack Application",
    visibility: "public",
    summary:
      "A full-stack task and productivity management system featuring complete CRUD operations, status filtering, and real-time database state synchronization.",
    audience: "Professionals, developers, and teams organizing everyday tasks and sprint deliverables.",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    workflows: [
      "Create, prioritize, update, and organize daily tasks and deliverables",
      "Perform instant state updates with dynamic status category filtering",
      "Persist user task data with MongoDB and Express backend controllers",
    ],
    limits: [],
    screenshot: { src: "", src800: "", alt: "", caption: "", w: 0, h: 0 },
    code: { src: "", src800: "", alt: "", caption: "", w: 0, h: 0 },
    contribution: "",
    repoUrl: "https://github.com/hashimali-Tech/mern-todo-list",
    liveUrl: "",
  },
  {
    id: "python-ai-practice-projects",
    title: "Python AI & Machine Learning Suite",
    kind: "AI & Machine Learning",
    visibility: "public",
    summary:
      "Applied Python algorithmic models, machine learning routines, and data processing scripts designed for real-world artificial intelligence experimentation.",
    audience: "Developers and AI practitioners studying applied machine learning pipelines and Python automation.",
    stack: ["Python", "Machine Learning", "Data Processing", "NumPy", "Pandas"],
    workflows: [
      "Implement data normalization and exploratory feature transformations",
      "Train, tune, and evaluate machine learning predictive models",
      "Modular Python scripts structured for reproducible algorithmic experimentation",
    ],
    limits: [],
    screenshot: { src: "", src800: "", alt: "", caption: "", w: 0, h: 0 },
    code: { src: "", src800: "", alt: "", caption: "", w: 0, h: 0 },
    contribution: "",
    repoUrl: "https://github.com/hashimali-Tech/python-ai-practice-projects",
    liveUrl: "",
  },
  {
    id: "google-colab-ai-work",
    title: "Google Colab AI Research & Notebooks",
    kind: "Deep Learning & Data Science",
    visibility: "public",
    summary:
      "Cloud-based Jupyter and Google Colab environments experimenting with deep learning architectures, neural networks, and GPU-accelerated computing.",
    audience: "Machine learning engineers and researchers reviewing collaborative data notebooks.",
    stack: ["Google Colab", "Jupyter", "PyTorch", "TensorFlow", "Deep Learning"],
    workflows: [
      "Train and test neural network architectures using cloud GPU acceleration",
      "Analyze and visualize multidimensional datasets with interactive graphs",
      "Document reproducible experimental findings in structured Colab notebooks",
    ],
    limits: [],
    screenshot: { src: "", src800: "", alt: "", caption: "", w: 0, h: 0 },
    code: { src: "", src800: "", alt: "", caption: "", w: 0, h: 0 },
    contribution: "",
    repoUrl: "https://github.com/hashimali-Tech/Google-Clobs-Work",
    liveUrl: "",
  },
  {
    id: "modern-web-calculator",
    title: "Modern Responsive Web Calculator",
    kind: "Frontend Web Application",
    visibility: "public",
    summary:
      "A responsive, precision web calculator application featuring an elegant glassmorphism dark aesthetic, keyboard input shortcuts, and expression history.",
    audience: "Users and developers seeking an aesthetic, responsive calculation tool for everyday operations.",
    stack: ["JavaScript", "HTML5", "CSS3 / Modern UI", "DOM Manipulation"],
    workflows: [
      "Perform chained mathematical expressions with real-time error prevention",
      "Full keyboard support with smooth tactile button animations",
      "Responsive glassmorphism UI optimized across desktop, tablet, and mobile",
    ],
    limits: [],
    screenshot: { src: "", src800: "", alt: "", caption: "", w: 0, h: 0 },
    code: { src: "", src800: "", alt: "", caption: "", w: 0, h: 0 },
    contribution: "",
    repoUrl: "https://github.com/hashimali-Tech/modern-web-calculator",
    liveUrl: "",
  },
  {
    id: "elegant-analog-wall-clock",
    title: "Elegant Analog Wall Clock & Animations",
    kind: "Interactive Web Graphics",
    visibility: "public",
    summary:
      "A precision digital simulation of an analog wall clock with smooth continuous sweep hand physics, CSS hardware acceleration, and SVG dial styling.",
    audience: "Designers and frontend enthusiasts studying smooth CSS animation mechanics and web timing APIs.",
    stack: ["JavaScript", "CSS3 Animations", "HTML5 Canvas", "UI Design"],
    workflows: [
      "Sync real-time device hours, minutes, and seconds with sub-second accuracy",
      "Smooth continuous second hand rotation with CSS hardware acceleration",
      "High-contrast minimalist dial with scalable vector graphic rendering",
    ],
    limits: [],
    screenshot: { src: "", src800: "", alt: "", caption: "", w: 0, h: 0 },
    code: { src: "", src800: "", alt: "", caption: "", w: 0, h: 0 },
    contribution: "",
    repoUrl: "https://github.com/hashimali-Tech/elegant-analog-wall-clock",
    liveUrl: "",
  },
  {
    id: "ai-study-multi-agent-app",
    title: "AI Multi-Agent Study App",
    kind: "Full-Stack Application",
    visibility: "public",
    summary:
      "A study-focused full-stack application built with React and Tailwind CSS, integrating an AI model trained locally.",
    audience: "Students and researchers seeking structured, AI-assisted study guidance.",
    stack: ["React", "Tailwind CSS", "AI model integration"],
    workflows: [
      "Access study-focused interface built with React and Tailwind CSS",
      "Interact with a locally trained AI model for study assistance",
      "Navigate clean, responsive workflows optimized for focused learning",
    ],
    limits: [],
    screenshot: {
      src: "",
      src800: "",
      alt: "",
      caption: "",
      w: 0,
      h: 0,
    },
    code: {
      src: "",
      src800: "",
      alt: "",
      caption: "",
      w: 0,
      h: 0,
    },
    contribution: "",
    repoUrl: "",
    liveUrl: "",
  },
  {
    id: "ai-symptom-information-and-appointments",
    title: "AI Symptom Information & Appointments",
    kind: "MERN Application",
    visibility: "public",
    summary:
      "A MERN application combining AI-assisted symptom information with patient and doctor meeting scheduling.",
    audience: "Patients coordinating informational guidance and scheduling consultations with doctors.",
    stack: ["MongoDB", "Express.js", "React", "Node.js", "ChatGPT API"],
    workflows: [
      "Explore AI-assisted symptom information workflows",
      "Schedule and coordinate meetings between patients and doctors",
      "Manage persistent user and consultation data through MongoDB",
    ],
    limits: [],
    screenshot: {
      src: "",
      src800: "",
      alt: "",
      caption: "",
      w: 0,
      h: 0,
    },
    code: {
      src: "",
      src800: "",
      alt: "",
      caption: "",
      w: 0,
      h: 0,
    },
    contribution: "",
    repoUrl: "",
    liveUrl: "",
  },
  {
    id: "mern-e-commerce-platform",
    title: "MERN E-Commerce Platform",
    kind: "MERN Web Application",
    visibility: "public",
    summary:
      "An e-commerce web application built with the MERN stack, including payment gateway integration and authentication features.",
    audience: "Shoppers purchasing products online and store managers handling catalog orders.",
    stack: ["MongoDB", "Express.js", "React", "Node.js", "Payment integration"],
    workflows: [
      "Browse product catalogs with category filters",
      "Authenticate accounts securely with email credentials",
      "Process transactions with integrated payment gateways",
    ],
    limits: [],
    screenshot: {
      src: "",
      src800: "",
      alt: "",
      caption: "",
      w: 0,
      h: 0,
    },
    code: {
      src: "",
      src800: "",
      alt: "",
      caption: "",
      w: 0,
      h: 0,
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
