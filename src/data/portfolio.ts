export interface Project {
  id: string;
  title: string;
  description: string;
  category: "React / Full-Stack" | "Vanilla JS" | "AngularJS" | "WordPress & PHP";
  githubUrl: string;
  liveUrl?: string;
  tags: string[];
  highlights: string[];
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
  status: "In Progress" | "Completed";
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
  headline: "Remote Software & Next.js Developer | EdTech & IT Training Specialist | AI & Data Enthusiast",
  shortRole: "Software Engineer & EdTech Specialist",
  location: "Greece (UTC+2 / UTC+3) • Open to 100% Remote Roles Worldwide",
  availability: "Available for Remote Work",
  summary:
    "Computer Science (B.Sc., Digital Systems, University of Piraeus) and International Business (M.Sc., DUTH) graduate, currently pursuing postgraduate studies in Advanced Digital Technologies (focusing on AI and Data). Experienced in full-stack web development, e-commerce administration, and computer science education.",
  bio: [
    "I combine a rigorous technical foundation in computer science and digital systems with deep expertise in web engineering, content management systems, and algorithmic thinking.",
    "Currently pursuing advanced postgraduate studies in Advanced Digital Technologies (focusing on AI and Data), I am transitioning into 100% remote software engineering, AI-enabled product development, and specialized educational technology/IT training roles.",
    "Over a decade of experience spanning high-school programming tutoring (national curriculum ΑΕΠΠ), primary informatics education, and large-scale e-commerce/ERP administration has honed my ability to build clean, maintainable systems and communicate complex technical concepts with utmost clarity.",
  ],
  contacts: {
    email: "katsaberisst@hotmail.com",
    github: "https://github.com/katsaberisst",
    linkedin: "https://www.linkedin.com/in/stelios-katsaberis-1b8913268/",
  },
  stats: [
    { label: "Years in Tech & Education", value: "10+" },
    { label: "Target Roles", value: "100% Remote" },
    { label: "Core Stacks", value: "React & Next.js" },
    { label: "Advanced Studies", value: "AI & Data Focus" },
  ],
};

export const EDUCATION_LIST: EducationItem[] = [
  {
    degree: "Postgraduate Studies (M.Sc.)",
    field: "Advanced Digital Technologies (Focusing on AI and Data)",
    institution: "Hellenic Open University / Academic Partner",
    period: "2024 - Present",
    status: "In Progress",
    description:
      "Deepening expertise in state-of-the-art artificial intelligence, machine learning architectures, data engineering pipelines, and intelligent systems integration.",
  },
  {
    degree: "Master of Science (M.Sc.)",
    field: "International Economic & Business Relations",
    institution: "Democritus University of Thrace (DUTH)",
    period: "2015 - 2017",
    status: "Completed",
    description:
      "Strategic business management, e-commerce economics, organizational workflow optimization, and cross-border project management.",
  },
  {
    degree: "Bachelor of Science (B.Sc.)",
    field: "Digital Systems (Computer Science & Telecommunications)",
    institution: "University of Piraeus",
    period: "2006 - 2011",
    status: "Completed",
    description:
      "Foundational computer science, software engineering, databases (SQL), computer networks, algorithms, object-oriented programming, and telecommunications.",
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "software",
    name: "Software & Web",
    items: [
      { name: "React", level: "Advanced", note: "Hooks, Context, State Management" },
      { name: "Next.js", level: "Advanced", note: "App Router, SSR, Turbopack" },
      { name: "JavaScript (ES6+)", level: "Advanced", note: "Async/Await, Functional, DOM" },
      { name: "Tailwind CSS", level: "Advanced", note: "Responsive UI, Dark Mode" },
      { name: "HTML5 & CSS3", level: "Advanced", note: "Semantic Layouts, Accessibility" },
      { name: "AngularJS", level: "Proficient", note: "Two-way binding, Directives" },
      { name: "TypeScript", level: "Proficient", note: "Type safety, Interfaces" },
    ],
  },
  {
    id: "backend-data",
    name: "Backend, CMS & Data",
    items: [
      { name: "PHP", level: "Advanced", note: "Custom scripts, OOP, Backend logic" },
      { name: "MySQL (Custom CRUD)", level: "Advanced", note: "Complex queries, Relational schema" },
      { name: "WordPress", level: "Advanced", note: "Custom themes, Bespoke plugins" },
      { name: "Magento 2", level: "Proficient", note: "E-Commerce administration & modules" },
      { name: "WooCommerce", level: "Advanced", note: "Store setup, API, Payment hooks" },
      { name: "REST APIs", level: "Advanced", note: "Integration, JSON serialization" },
      { name: "Python", level: "Familiar", note: "Scripting, AI/Data foundations" },
    ],
  },
  {
    id: "edtech",
    name: "EdTech & Teaching",
    items: [
      { name: "Scratch & Blockly", level: "Advanced", note: "Visual programming pedagogy" },
      { name: "BEBRAS Coordinator", level: "Advanced", note: "Computational Thinking contest" },
      { name: "EU Code Week Coordinator", level: "Advanced", note: "National & school-level events" },
      { name: "High School Informatics (ΑΕΠΠ)", level: "Advanced", note: "Panhellenic Exam Preparation" },
      { name: "Curriculum Design", level: "Proficient", note: "Informatics syllabus & assessments" },
      { name: "Remote Education Tools", level: "Advanced", note: "Interactive digital classroom" },
    ],
  },
  {
    id: "tools",
    name: "Tools & Methodology",
    items: [
      { name: "Git & GitHub", level: "Advanced", note: "Branching, Pull Requests, CI/CD basics" },
      { name: "JSON Server", level: "Advanced", note: "Rapid API prototyping" },
      { name: "Adobe Photoshop", level: "Proficient", note: "UI assets, Digital mockups" },
      { name: "Agile & Remote Workflows", level: "Advanced", note: "Asynchronous teamwork, Jira/Trello" },
    ],
  },
  {
    id: "languages",
    name: "Languages",
    items: [
      { name: "Greek", level: "Advanced", note: "Native Speaker" },
      { name: "English", level: "Advanced", note: "C2 Proficient (Professional Fluency)" },
    ],
  },
];

export const EXPERIENCE_LIST: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Substitute Informatics Teacher",
    organization: "Ministry of Education / Primary Education Schools",
    period: "2020 - Present",
    type: "Public Education",
    location: "Greece",
    description:
      "Delivering core informatics, computational thinking, and software logic education to elementary school students. Spearheading school technology initiatives and European coding campaigns.",
    responsibilities: [
      "Designed and instructed hands-on curriculum in visual programming (Scratch, Blockly) and introductory Python.",
      "Served as official Coordinator for BEBRAS International Computational Thinking Challenge and EU Code Week.",
      "Maintained classroom IT lab hardware, networks, and remote learning platforms.",
      "Facilitated digital safety, algorithm visualization, and creative problem-solving workshops.",
    ],
    skills: ["Scratch", "Blockly", "Python", "Computational Thinking", "BEBRAS", "CodeWeek", "IT Pedagogy"],
    isCurrent: true,
  },
  {
    id: "exp-2",
    role: "Private Programming Tutor (ΑΕΠΠ / High School Level)",
    organization: "Independent Educational Practice",
    period: "2011 - Present",
    type: "Mentorship & Tutoring",
    location: "Greece / Remote",
    description:
      "Mentoring senior secondary students for the competitive Panhellenic National Examinations in Informatics ('Ανάπτυξη Εφαρμογών σε Προγραμματιστικό Περιβάλλον' - ΑΕΠΠ).",
    responsibilities: [
      "Coached over 50+ students in algorithmic problem-solving, structured programming, and complex data structures (stacks, queues, search/sort algorithms).",
      "Created comprehensive pedagogical materials, custom mock exam sets, and algorithmic diagnostic quizzes.",
      "Provided 1-on-1 personalized remote and in-person instruction with top-percentile student success rates.",
    ],
    skills: ["Algorithmic Design", "Data Structures", "Structured Programming", "Panhellenic Exams (ΑΕΠΠ)", "Mentoring"],
    isCurrent: true,
  },
  {
    id: "exp-3",
    role: "E-Commerce & ERP Administrator",
    organization: "AutoNetParts & Yantes",
    period: "2014 - 2019",
    type: "Full-Time Corporate",
    location: "Greece",
    description:
      "Managed multi-thousand SKU catalog operations across Magento 2 and WooCommerce stores. Built custom database routines and maintained synchronization with internal ERP platforms.",
    responsibilities: [
      "Developed custom PHP/MySQL backend scripts to automate inventory synchronization, order pipelines, and product feeds.",
      "Maintained and customized front-end themes and extensions for Magento 2 and WordPress/WooCommerce.",
      "Monitored server uptime, database queries, and implemented performance caching strategies.",
      "Coordinated digital marketing assets and product catalog metadata optimization.",
    ],
    skills: ["Magento 2", "WooCommerce", "WordPress", "PHP", "MySQL", "ERP Integration", "E-Commerce"],
  },
  {
    id: "exp-4",
    role: "IT Support Official",
    organization: "Regional Authority of Eastern Macedonia & Thrace",
    period: "2013 - 2014",
    type: "Public Sector Technical Role",
    location: "Greece",
    description:
      "Delivered Tier 1/2 hardware, operating system, and network infrastructure support across regional governmental departments.",
    responsibilities: [
      "Configured, deployed, and troubleshot workstations, network switches, peripherals, and internal database client applications.",
      "Performed scheduled backups, security updates, and automated system maintenance routines.",
      "Provided technical guidance and user assistance to civil service personnel.",
    ],
    skills: ["IT Support", "Network Administration", "Hardware Diagnostics", "Windows/Linux Systems", "Public Sector"],
  },
];

export const PROJECTS_LIST: Project[] = [
  {
    id: "project-1",
    title: "Educational Dashboard Application",
    description:
      "A modular, interactive educational administration dashboard built with React and JSON Server. Designed for collaborative team environments with full Git version control, state-driven UI modules, and dynamic student/course analytics.",
    category: "React / Full-Stack",
    githubUrl: "https://github.com/stelios-katsaberis/TeamProjectReact-main_3",
    tags: ["React", "JSON Server", "REST API", "Git Collaboration", "Modular UI"],
    highlights: [
      "Engineered reusable React components with clean props interfaces and reactive states.",
      "Simulated production REST endpoints using JSON Server with mock relational entities.",
      "Collaborated via Git branch workflows, pull requests, and code reviews.",
    ],
  },
  {
    id: "project-2",
    title: "Interactive Area Calculator",
    description:
      "A high-precision geometric computation single-page application built using pure vanilla JavaScript (ES6+), semantic HTML5, and responsive CSS3. Designed for zero-dependency speed and interactive mathematical modeling.",
    category: "Vanilla JS",
    githubUrl: "https://github.com/stelios-katsaberis/project2",
    tags: ["JavaScript (ES6+)", "HTML5", "CSS3", "DOM API", "Zero Dependency"],
    highlights: [
      "Direct DOM manipulation with microsecond response times and zero external bundles.",
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
    tags: ["AngularJS", "JavaScript", "Two-Way Data Binding", "HTML5", "SPA"],
    highlights: [
      "Real-time reactive conversion algorithms leveraging AngularJS two-way binding.",
      "Extensible conversion matrix supporting imperial, metric, and specialized units.",
      "Minimalist interface with instant recalculation on keystroke.",
    ],
  },
  {
    id: "project-4",
    title: "Custom WordPress Theme & Plugin with MySQL CRUD",
    description:
      "A full-stack custom WordPress solution incorporating custom post types, custom MySQL tables, and secure CRUD operations. Built from scratch without heavy page-builders for maximum performance and bespoke data management.",
    category: "WordPress & PHP",
    githubUrl: "https://github.com/stelios-katsaberis",
    tags: ["WordPress", "PHP", "MySQL CRUD", "Theme Architecture", "Custom Plugin"],
    highlights: [
      "Created direct MySQL CRUD handlers with prepared statements and nonces for security.",
      "Developed lightweight custom PHP theme templates adhering to WordPress coding standards.",
      "Designed tailored admin dashboard panels for custom entity management.",
    ],
  },
];
