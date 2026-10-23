export interface Project {
  id: string;
  title: string;
  description: string;
  category: "React / Full-Stack" | "Vanilla JS" | "AngularJS" | "WordPress & PHP" | "Next.js & Vercel";
  githubUrl: string;
  liveUrl?: string;
  tags: string[];
  highlights: string[];
  deploymentNote?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  type: string;
  location: string;
  description: string;
  responsibilities: string[];
  skills: string[];
  isCurrent?: boolean;
}

export interface EducationItem {
  degree: string;
  field: string;
  institution: string;
  period: string;
  status: "Completed" | "In Progress";
  description: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  items: {
    name: string;
    level: "Advanced" | "Proficient" | "Familiar";
    note?: string;
  }[];
}

export const PERSONAL_INFO = {
  name: "Stelios Katsaberis",
  initials: "SK",
  headline: "Web Developer & IT Education Professional",
  shortRole: "Web Developer & Informatics Educator",
  location: "Greece • Available for Remote & Hybrid Roles",
  availability: "Available for Projects & Teaching",
  summary:
    "Computer Science graduate (B.Sc. in Digital Systems, University of Piraeus) and International Business post-graduate (M.Sc., Democritus University of Thrace). Experienced in modern web development (React, Next.js, PHP, MySQL), e-commerce & ERP administration, AI-assisted development tools (Codex, Anti-gravity), and computer science education.",
  bio: [
    "I hold a Bachelor of Science in Digital Systems from the University of Piraeus and a Master of Science in International Economic & Business Relations from Democritus University of Thrace. This dual background provides a solid engineering foundation in computer systems paired with a practical understanding of commercial and organizational workflows.",
    "As an active educator, I serve as a Substitute Informatics Teacher in Public Primary Education and have spent over a decade tutoring secondary school students for the competitive Panhellenic National Examinations in Informatics (ΑΕΠΠ). I specialize in breaking down complex algorithmic concepts and computational logic into intuitive, structured knowledge.",
    "On the technical front, I develop web applications utilizing React, Next.js, vanilla JavaScript, PHP, and custom MySQL databases, with extensive hands-on experience in WooCommerce, WordPress, Magento 2, and ERP systems. I actively integrate modern AI tools, including Codex and Anti-gravity (AGY), into my daily workflow to accelerate prototyping, code review, and high-quality software delivery.",
  ],
  contacts: {
    email: "katsaberisst@hotmail.com",
    github: "https://github.com/katsaberisst",
    linkedin: "https://www.linkedin.com/in/stelios-katsaberis-1b8913268/",
  },
  stats: [
    { label: "Years in Tech & Education", value: "10+" },
    { label: "Academic Degrees", value: "B.Sc. & M.Sc." },
    { label: "Core Competency", value: "Web & Informatics" },
    { label: "AI Workflows", value: "Codex & Anti-gravity" },
  ],
};

export const EDUCATION_LIST: EducationItem[] = [
  {
    degree: "B.Sc. in Digital Systems",
    field: "Computer Science & Telecommunications Systems",
    institution: "University of Piraeus",
    period: "2005 – 2012",
    status: "Completed",
    description:
      "Core computer science curriculum covering software engineering, object-oriented programming, relational databases (SQL), algorithms, data structures, computer networks, and digital communication systems.",
  },
  {
    degree: "M.Sc. in International Economic & Business Relations",
    field: "E-Commerce Strategy & Business Administration",
    institution: "Democritus University of Thrace (DUTH)",
    period: "2012 – 2015",
    status: "Completed",
    description:
      "Advanced studies in digital commerce economics, strategic organizational management, business workflow optimization, and cross-border commercial frameworks.",
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "frontend",
    name: "Frontend Development",
    items: [
      { name: "HTML5 & CSS3", level: "Advanced", note: "Semantic structure, responsive layouts, accessibility" },
      { name: "JavaScript (ES6+)", level: "Advanced", note: "DOM manipulation, asynchronous programming, modern ES syntax" },
      { name: "React", level: "Advanced", note: "Hooks, component architecture, state management" },
      { name: "Next.js", level: "Proficient", note: "App Router, SSR, Turbopack, static optimization" },
      { name: "AngularJS", level: "Proficient", note: "Two-way data binding, directives, SPA architecture" },
      { name: "Tailwind CSS", level: "Advanced", note: "Utility-first design, dark mode, responsive styling" },
    ],
  },
  {
    id: "backend-cms",
    name: "Backend & CMS",
    items: [
      { name: "PHP", level: "Advanced", note: "Custom scripts, procedural & OOP backend logic" },
      { name: "MySQL (Custom CRUD)", level: "Advanced", note: "Schema design, relational queries, prepared statements" },
      { name: "WordPress", level: "Advanced", note: "Bespoke themes, custom plugins, admin extensions" },
      { name: "Magento 2", level: "Proficient", note: "E-commerce administration, module management, catalog operations" },
      { name: "WooCommerce", level: "Advanced", note: "Store configuration, payment gateways, product data feeds" },
      { name: "REST APIs", level: "Advanced", note: "API integration, JSON data consumption, endpoints" },
    ],
  },
  {
    id: "ai-tools",
    name: "AI Tools & Modern Workflows",
    items: [
      { name: "Codex", level: "Advanced", note: "AI-assisted code synthesis, unit testing, and refactoring" },
      { name: "Anti-gravity (AGY)", level: "Advanced", note: "Agentic coding workflows, task orchestration, rapid prototyping" },
      { name: "AI Code Generation", level: "Advanced", note: "Prompt engineering, automated debugging, documentation" },
      { name: "Vercel Deployment", level: "Advanced", note: "Continuous integration, edge preview channels, production builds" },
    ],
  },
  {
    id: "tools-logistics",
    name: "Tools & Logistics",
    items: [
      { name: "Git & GitHub", level: "Advanced", note: "Version control, branching strategies, collaborative workflows" },
      { name: "JSON Server", level: "Advanced", note: "Mock REST API prototyping and dynamic state simulation" },
      { name: "ERP Administration", level: "Advanced", note: "Inventory syncing, order flows, enterprise data operations" },
      { name: "E-Commerce Management", level: "Advanced", note: "Catalog maintenance, multi-thousand SKU optimization" },
      { name: "Adobe Photoshop", level: "Proficient", note: "Web asset design, graphic optimization, UI mockups" },
    ],
  },
  {
    id: "edtech",
    name: "Informatics & IT Training",
    items: [
      { name: "Primary Education Informatics", level: "Advanced", note: "School curriculum, digital literacy, lab coordination" },
      { name: "High School Informatics (ΑΕΠΠ)", level: "Advanced", note: "Panhellenic Exam algorithmic coaching, structured logic" },
      { name: "Scratch & Blockly", level: "Advanced", note: "Visual block-based programming pedagogy for young learners" },
      { name: "BEBRAS Coordinator", level: "Advanced", note: "International Computational Thinking Challenge" },
      { name: "EU Code Week Coordinator", level: "Advanced", note: "Interactive coding workshops and school-wide events" },
    ],
  },
  {
    id: "languages",
    name: "Languages",
    items: [
      { name: "Greek", level: "Advanced", note: "Native Speaker" },
      { name: "English", level: "Advanced", note: "C2 Proficient (Professional Working Fluency)" },
    ],
  },
];

export const EXPERIENCE_LIST: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Substitute Informatics Teacher",
    organization: "Ministry of Education / Public Primary Schools",
    period: "2020 – Present",
    type: "Public Education",
    location: "Greece",
    description:
      "Instructing elementary students in foundational computer science, computational thinking, algorithmic logic, and safe internet practices. Coordinating school IT labs and technology initiatives.",
    responsibilities: [
      "Designed and delivered hands-on lessons in visual programming using Scratch and Blockly.",
      "Coordinated participation in the BEBRAS International Challenge on Informatics and Computational Thinking.",
      "Organized school-wide coding activities for European Code Week (EU Code Week).",
      "Maintained school computer laboratory hardware, operating systems, local networks, and digital educational tools.",
    ],
    skills: ["Informatics Pedagogy", "Scratch", "Blockly", "Computational Thinking", "BEBRAS", "CodeWeek", "IT Support"],
    isCurrent: true,
  },
  {
    id: "exp-2",
    role: "Private Programming Tutor (ΑΕΠΠ / High School Level)",
    organization: "Independent Educational Practice",
    period: "2011 – Present",
    type: "Mentorship & Tutoring",
    location: "Greece / Remote",
    description:
      "Preparing senior secondary school students for the Panhellenic National Examinations in Informatics ('Ανάπτυξη Εφαρμογών σε Προγραμματιστικό Περιβάλλον' - ΑΕΠΠ).",
    responsibilities: [
      "Guided over 50+ students in mastering algorithm design, flowcharts, structured programming, and core data structures (arrays, stacks, queues).",
      "Developed structured pedagogical theory summaries, custom practice exercises, and full mock exam papers.",
      "Taught search and sorting algorithms with a focus on code trace analysis and optimization.",
      "Conducted 1-on-1 tutoring sessions with a consistent record of high scores in the national exams.",
    ],
    skills: ["Algorithm Design", "Data Structures", "Structured Programming", "Panhellenic Exams (ΑΕΠΠ)", "Educational Mentoring"],
    isCurrent: true,
  },
  {
    id: "exp-3",
    role: "E-Commerce & ERP Administrator",
    organization: "AutoNetParts & Yantes",
    period: "2014 – 2019",
    type: "Corporate",
    location: "Greece",
    description:
      "Administered online retail operations across Magento 2 and WordPress/WooCommerce platforms, overseeing multi-thousand SKU catalogs and ERP synchronization routines.",
    responsibilities: [
      "Maintained product catalogs, pricing rules, inventory levels, and order workflows.",
      "Developed custom PHP and MySQL scripts for data imports, exports, and automated synchronization with internal ERP databases.",
      "Customized front-end theme components and configured functional extensions for Magento 2 and WooCommerce.",
      "Monitored server health, resolved database issues, and supported daily commercial workflows.",
    ],
    skills: ["Magento 2", "WooCommerce", "WordPress", "PHP", "MySQL", "ERP Administration", "E-Commerce Operations"],
  },
  {
    id: "exp-4",
    role: "IT Support Official",
    organization: "Regional Authority of Eastern Macedonia & Thrace",
    period: "2013 – 2014",
    type: "Public Sector",
    location: "Greece",
    description:
      "Provided Tier 1 and Tier 2 technical support for hardware, networks, and internal software systems across regional administrative departments.",
    responsibilities: [
      "Configured, diagnosed, and repaired desktop computers, printers, network switches, and peripheral devices.",
      "Assisted administrative personnel with office software, departmental database applications, and operating systems.",
      "Executed scheduled backups and routine system maintenance procedures.",
    ],
    skills: ["IT Support", "Hardware Diagnostics", "Network Configuration", "Windows/Linux", "Public Sector"],
  },
];

export const PROJECTS_LIST: Project[] = [
  {
    id: "project-1",
    title: "Educational Administration Dashboard",
    description:
      "A modular, interactive educational administration dashboard built with React and JSON Server. Designed for collaborative team environments with full Git version control, state-driven UI modules, and dynamic student/course analytics. Deployed on Vercel for fast edge rendering.",
    category: "React / Full-Stack",
    githubUrl: "https://github.com/stelios-katsaberis/TeamProjectReact-main_3",
    liveUrl: "https://github.com/stelios-katsaberis/TeamProjectReact-main_3",
    deploymentNote: "Deployed on Vercel • React & JSON Server",
    tags: ["React", "JSON Server", "REST API", "Git Collaboration", "Modular UI", "Vercel"],
    highlights: [
      "Engineered reusable React components with clean props interfaces and reactive state management.",
      "Simulated production REST endpoints using JSON Server with mock relational student and course entities.",
      "Collaborated through structured Git branch workflows, pull requests, and peer code reviews.",
      "Optimized for fast client-side performance and seamless responsiveness.",
    ],
  },
  {
    id: "project-2",
    title: "Interactive Area Calculator",
    description:
      "A high-precision geometric computation single-page application built using pure vanilla JavaScript (ES6+), semantic HTML5, and responsive CSS3. Designed for zero-dependency speed and interactive mathematical modeling.",
    category: "Vanilla JS",
    githubUrl: "https://github.com/stelios-katsaberis/project2",
    liveUrl: "https://github.com/stelios-katsaberis/project2",
    deploymentNote: "Single-Page Web Application",
    tags: ["JavaScript (ES6+)", "HTML5", "CSS3", "DOM API", "Zero Dependency"],
    highlights: [
      "Direct DOM manipulation with instant response times and zero external framework overhead.",
      "Robust input sanitization and dynamic geometric calculation algorithms.",
      "Fluid responsive layout with accessible keyboard controls.",
    ],
  },
  {
    id: "project-3",
    title: "Unit Converter Application",
    description:
      "A multi-metric scientific conversion web app built with AngularJS, JavaScript, and HTML5. Implements real-time two-way data binding for instantaneous cross-unit calculations across length, mass, and temperature dimensions.",
    category: "AngularJS",
    githubUrl: "https://github.com/stelios-katsaberis/converterApp",
    liveUrl: "https://github.com/stelios-katsaberis/converterApp",
    deploymentNote: "AngularJS SPA",
    tags: ["AngularJS", "JavaScript", "Two-Way Data Binding", "HTML5", "SPA"],
    highlights: [
      "Real-time reactive conversion algorithms leveraging AngularJS two-way data binding.",
      "Extensible conversion matrix supporting imperial, metric, and scientific units.",
      "Clean, functional interface with instantaneous recalculation on user input.",
    ],
  },
  {
    id: "project-4",
    title: "Custom WordPress Theme & Plugin with MySQL CRUD",
    description:
      "A full-stack custom WordPress solution incorporating custom post types, custom MySQL tables, and secure CRUD operations. Built from scratch without heavy page-builders for maximum performance and bespoke data management.",
    category: "WordPress & PHP",
    githubUrl: "https://github.com/Katsaberisst",
    liveUrl: "https://github.com/Katsaberisst",
    deploymentNote: "Custom PHP & MySQL Engine",
    tags: ["WordPress", "PHP", "MySQL CRUD", "Theme Architecture", "Custom Plugin"],
    highlights: [
      "Created direct MySQL CRUD handlers with prepared statements and WordPress nonces for security.",
      "Developed lightweight custom PHP theme templates adhering to WordPress coding standards.",
      "Designed tailored admin dashboard panels for custom entity management.",
    ],
  },
  {
    id: "project-5",
    title: "Portfolio & Interactive LMS Portal",
    description:
      "This official portfolio website and interactive Learning Management System (LMS) portal built with Next.js 16 (App Router), React 19, and Tailwind CSS. Deployed on Vercel with automatic ISR caching from GitHub API and integrated student/teacher portals.",
    category: "Next.js & Vercel",
    githubUrl: "https://github.com/Katsaberisst/KatsaberisCV",
    liveUrl: "https://github.com/Katsaberisst/KatsaberisCV",
    deploymentNote: "Live on Vercel • Next.js 16 & React 19",
    tags: ["Next.js 16", "React 19", "Tailwind CSS", "GitHub API", "Vercel", "LMS Portal"],
    highlights: [
      "Leveraged Next.js App Router with ISR caching ({ next: { revalidate: 3600 } }) for GitHub API data.",
      "Integrated Student Hub and Teacher Analytics portal with interactive slide decks and quizzes.",
      "Developed utilizing modern AI-assisted engineering with Codex and Anti-gravity (AGY).",
    ],
  },
];
