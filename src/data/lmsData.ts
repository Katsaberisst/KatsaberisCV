export type UserRole = "student" | "teacher";

export interface LMSUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  enrolledAt: string;
}

export type MaterialType = "presentation" | "pdf" | "link" | "guide";

export interface EducationalMaterial {
  id: string;
  title: string;
  category: "Algorithms & Logic" | "Web Development" | "EdTech & Robotics" | "Data & Databases";
  type: MaterialType;
  description: string;
  duration: string;
  url: string;
  author: string;
  addedAt: string;
  slideDeck?: {
    slideNumber: number;
    title: string;
    content: string;
    codeSnippet?: string;
  }[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0-based index
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  category: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  passingScore: number; // e.g. 70
  questions: QuizQuestion[];
}

export interface MaterialViewRecord {
  id: string;
  userId: string;
  studentName: string;
  studentEmail: string;
  materialId: string;
  materialTitle: string;
  category: string;
  firstViewedAt: string;
  lastViewedAt: string;
  viewCount: number;
}

export interface QuizAnswerDetail {
  questionId: string;
  questionText: string;
  options: string[];
  selectedOption: number;
  correctOption: number;
  isCorrect: boolean;
  explanation: string;
}

export interface QuizAttemptRecord {
  id: string;
  quizId: string;
  quizTitle: string;
  category: string;
  userId: string;
  studentName: string;
  studentEmail: string;
  attemptNumber: number;
  score: number; // percentage
  totalQuestions: number;
  correctCount: number;
  passed: boolean;
  completedAt: string;
  answers: QuizAnswerDetail[];
}

export const INITIAL_USERS: LMSUser[] = [
  {
    id: "user-teacher-1",
    name: "Stelios Katsaberis",
    email: "katsaberisst@hotmail.com",
    role: "teacher",
    avatar: "SK",
    enrolledAt: "2024-01-10T09:00:00Z",
  },
  {
    id: "user-student-1",
    name: "Alex Morgan",
    email: "alex.morgan@student.edu",
    role: "student",
    avatar: "AM",
    enrolledAt: "2024-02-01T10:30:00Z",
  },
  {
    id: "user-student-2",
    name: "Elena Vasiliou",
    email: "elena.vasiliou@student.edu",
    role: "student",
    avatar: "EV",
    enrolledAt: "2024-02-05T11:15:00Z",
  },
  {
    id: "user-student-3",
    name: "Dimitris Nikolaou",
    email: "dimitris.nikolaou@student.edu",
    role: "student",
    avatar: "DN",
    enrolledAt: "2024-02-12T14:20:00Z",
  },
];

export const INITIAL_MATERIALS: EducationalMaterial[] = [
  {
    id: "mat-1",
    title: "Algorithmic Complexity & Big-O Notation",
    category: "Algorithms & Logic",
    type: "presentation",
    description:
      "Comprehensive slide deck analyzing time and space complexity, asymptotic bounds, and algorithmic efficiency in high school Informatics (ΑΕΠΠ).",
    duration: "6 Interactive Slides",
    url: "#",
    author: "Stelios Katsaberis",
    addedAt: "2024-02-10T10:00:00Z",
    slideDeck: [
      {
        slideNumber: 1,
        title: "Introduction to Algorithm Efficiency",
        content:
          "An algorithm's performance is measured not by wall-clock time alone, but by how required resources (time and memory) scale as input size N grows toward infinity.",
      },
      {
        slideNumber: 2,
        title: "The Big-O Hierarchy",
        content:
          "From best to worst: O(1) Constant < O(log N) Logarithmic < O(N) Linear < O(N log N) Linearithmic < O(N²) Quadratic < O(2^N) Exponential.",
        codeSnippet: "// Binary search example: O(log N)\nfunction binarySearch(arr, target) {\n  let low = 0, high = arr.length - 1;\n  while (low <= high) {\n    const mid = Math.floor((low + high) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) low = mid + 1;\n    else high = mid - 1;\n  }\n  return -1;\n}",
      },
      {
        slideNumber: 3,
        title: "Linear Search vs. Binary Search",
        content:
          "For unsorted arrays, linear search takes O(N) steps. For sorted collections, binary search halves the search space each step, achieving logarithmic O(log N) operations.",
      },
      {
        slideNumber: 4,
        title: "Sorting Algorithms Overview",
        content:
          "Bubble Sort & Insertion Sort operate in O(N²) worst-case time. Merge Sort and Quick Sort achieve O(N log N) by dividing and conquering sub-problems.",
      },
      {
        slideNumber: 5,
        title: "Space Complexity & Memory Allocation",
        content:
          "Auxiliary memory includes temporary variables, stack frames from recursive calls, and dynamically allocated structures like arrays and linked lists.",
      },
      {
        slideNumber: 6,
        title: "Key Takeaways for Students",
        content:
          "Always identify the dominant operation in loops. Nested independent loops multiply complexities: O(N * M) or O(N²). Avoid premature optimization without benchmarking.",
      },
    ],
  },
  {
    id: "mat-2",
    title: "Next.js App Router Architecture & Server Components",
    category: "Web Development",
    type: "guide",
    description:
      "A technical reference manual detailing React Server Components (RSC), Turbopack streaming, server actions, and caching hierarchies.",
    duration: "10 mins read",
    url: "#",
    author: "Stelios Katsaberis",
    addedAt: "2024-02-14T09:30:00Z",
    slideDeck: [
      {
        slideNumber: 1,
        title: "React Server Components (RSC)",
        content:
          "RSC execute exclusively on the server, producing serialized UI primitives without adding JavaScript bundle weight to the client.",
      },
      {
        slideNumber: 2,
        title: "When to use 'use client'",
        content:
          "Reserve client boundaries for interactivity: event listeners (onClick, onChange), React state (useState, useReducer), browser APIs, and effects (useEffect).",
        codeSnippet: "'use client';\nimport { useState } from 'react';\n\nexport function Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>;\n}",
      },
      {
        slideNumber: 3,
        title: "Data Fetching & Streaming",
        content:
          "Next.js allows streaming partial UI with Suspense boundaries, rendering fallback skeletons while data resolves asynchronously.",
      },
    ],
  },
  {
    id: "mat-3",
    title: "Visual Programming: Scratch & Blockly Pedagogical Guide",
    category: "EdTech & Robotics",
    type: "pdf",
    description:
      "Instructional curriculum guide for primary and secondary education teachers, focusing on block-based computational thinking and BEBRAS challenge preparation.",
    duration: "Downloadable PDF (4 Slides)",
    url: "#",
    author: "Stelios Katsaberis",
    addedAt: "2024-02-18T14:00:00Z",
    slideDeck: [
      {
        slideNumber: 1,
        title: "Visual Block Metaphors",
        content:
          "Blocks act as syntactic guardrails, eliminating typing syntax errors so young learners focus purely on logical flow, sequence, loops, and conditions.",
      },
      {
        slideNumber: 2,
        title: "Transition to Text-Based Python",
        content:
          "Bridging block logic to Python: mapping 'Repeat Until' to 'while not', 'For Each' to 'for in', and block variables to Python primitives.",
        codeSnippet: "# Python equivalent of Scratch Repeat 5:\nfor step in range(5):\n    move_forward(10)\n    turn_right(90)",
      },
      {
        slideNumber: 3,
        title: "BEBRAS Contest Alignment",
        content:
          "Structuring classroom mini-challenges that teach graph traversal, pattern recognition, and decomposition without requiring complex code.",
      },
    ],
  },
  {
    id: "mat-4",
    title: "Relational Database Design & MySQL CRUD Optimization",
    category: "Data & Databases",
    type: "presentation",
    description:
      "Core principles of normalization (1NF, 2NF, 3NF), foreign key constraints, index creation, and safe prepared SQL queries.",
    duration: "5 Interactive Slides",
    url: "#",
    author: "Stelios Katsaberis",
    addedAt: "2024-02-22T11:00:00Z",
    slideDeck: [
      {
        slideNumber: 1,
        title: "Relational Schemas & Entities",
        content:
          "Designing tables with primary keys, ensuring entity integrity, and mapping one-to-many and many-to-many relationships through junction tables.",
      },
      {
        slideNumber: 2,
        title: "Writing Safe CRUD Queries",
        content:
          "Always prevent SQL injection by using prepared statements and parameterized inputs rather than raw string concatenation.",
        codeSnippet: "-- Safe prepared statement query\nPREPARE stmt FROM 'SELECT id, title, score FROM quiz_attempts WHERE user_id = ?';\nSET @student_id = 'user-student-1';\nEXECUTE stmt USING @student_id;",
      },
      {
        slideNumber: 3,
        title: "Database Indexing Guidelines",
        content:
          "Index columns frequently queried in WHERE clauses or JOIN conditions to convert O(N) full table scans into O(log N) B-Tree lookups.",
      },
    ],
  },
];

export const INITIAL_QUIZZES: Quiz[] = [
  {
    id: "quiz-1",
    title: "Algorithmic Problem Solving & Data Structures",
    category: "Algorithms & Logic",
    description:
      "Assess fundamental knowledge in algorithmic complexity, array traversals, stacks, queues, and search routines.",
    difficulty: "Intermediate",
    passingScore: 70,
    questions: [
      {
        id: "q1-1",
        question: "What is the worst-case time complexity of searching for an item in a sorted array using Binary Search?",
        options: ["O(1)", "O(log N)", "O(N)", "O(N²)"],
        correctAnswer: 1,
        explanation:
          "Binary Search divides the remaining search interval in half with each iteration, yielding logarithmic O(log N) time.",
      },
      {
        id: "q1-2",
        question: "Which data structure follows the LIFO (Last-In, First-Out) principle?",
        options: ["Queue", "Stack", "Binary Tree", "Hash Table"],
        correctAnswer: 1,
        explanation:
          "A Stack operates under LIFO: the last element pushed onto the stack is the first element popped off.",
      },
      {
        id: "q1-3",
        question: "In Python or structured pseudocode, what will a loop 'for i in range(1, 10, 2)' iterate over?",
        options: ["[1, 2, 3, 4, 5]", "[1, 3, 5, 7, 9]", "[2, 4, 6, 8, 10]", "[1, 2, 4, 8]"],
        correctAnswer: 1,
        explanation:
          "range(start, stop, step) starts at 1, increments by 2, and stops before reaching 10: producing 1, 3, 5, 7, 9.",
      },
      {
        id: "q1-4",
        question: "Which of the following sorting algorithms guarantees O(N log N) worst-case time complexity?",
        options: ["Bubble Sort", "Insertion Sort", "Merge Sort", "Selection Sort"],
        correctAnswer: 2,
        explanation:
          "Merge Sort divides the array recursively and merges sorted halves, maintaining O(N log N) in best, average, and worst cases.",
      },
      {
        id: "q1-5",
        question: "What is the primary condition required to execute Binary Search on an array?",
        options: [
          "The array elements must be unique.",
          "The array must be sorted in ascending or descending order.",
          "The array length must be a power of 2.",
          "The array must contain positive integers only.",
        ],
        correctAnswer: 1,
        explanation:
          "Binary Search relies on comparing the midpoint to determine whether the target lies in the lower or upper half, which strictly requires sorted order.",
      },
    ],
  },
  {
    id: "quiz-2",
    title: "Next.js & Modern Web Engineering",
    category: "Web Development",
    description:
      "Test your understanding of React 19, Server Components, client state isolation, and Tailwind CSS layouts.",
    difficulty: "Advanced",
    passingScore: 75,
    questions: [
      {
        id: "q2-1",
        question: "Which directive must be added at the top of a Next.js file to enable useState or browser event handlers?",
        options: ["'use server'", "'use client'", "'use react'", "'use browser'"],
        correctAnswer: 1,
        explanation:
          "The 'use client' directive designates the boundary where React switches from Server Component to Client Component execution.",
      },
      {
        id: "q2-2",
        question: "Why do React Server Components improve application performance?",
        options: [
          "They compile JavaScript into WebAssembly automatically.",
          "Their code and dependencies do not increase client-side JavaScript bundle size.",
          "They bypass database queries completely.",
          "They disable all CSS processing.",
        ],
        correctAnswer: 1,
        explanation:
          "Server Components execute on the server and stream serialized virtual DOM nodes, reducing client bundle size to zero for those components.",
      },
      {
        id: "q2-3",
        question: "In Tailwind CSS v4, how is dark mode variant applied when using a class-based approach?",
        options: [
          "Using `@custom-variant dark (&:where(.dark, .dark *))`",
          "By adding `darkMode: 'media'` in package.json",
          "By setting `enableDark=true` on the HTML body",
          "By injecting an external SCSS mixin",
        ],
        correctAnswer: 0,
        explanation:
          "Tailwind CSS v4 introduces `@custom-variant dark (&:where(.dark, .dark *))` to easily support `.dark` class triggers alongside system themes.",
      },
      {
        id: "q2-4",
        question: "What is the main benefit of Next.js Turbopack over traditional Webpack bundlers?",
        options: [
          "It only compiles in production mode.",
          "It is written in Rust and provides incremental, near-instant HMR and fast compilation.",
          "It eliminates the need for TypeScript.",
          "It generates native mobile APK files.",
        ],
        correctAnswer: 1,
        explanation:
          "Turbopack is written in Rust with engine-level caching, resulting in compilation speeds up to 10x faster than Webpack.",
      },
    ],
  },
  {
    id: "quiz-3",
    title: "EdTech & Computational Thinking Foundations",
    category: "EdTech & Robotics",
    description:
      "Examine foundational knowledge regarding BEBRAS tasks, visual-to-text programming transition, and digital learning pedagogy.",
    difficulty: "Beginner",
    passingScore: 60,
    questions: [
      {
        id: "q3-1",
        question: "What are the four core pillars of Computational Thinking?",
        options: [
          "Decomposition, Pattern Recognition, Abstraction, and Algorithm Design",
          "Typing, Printing, Compiling, and Debugging",
          "Hardware, Software, Firmware, and Cloud",
          "Input, Output, Storage, and Processing",
        ],
        correctAnswer: 0,
        explanation:
          "Computational Thinking consists of breaking down problems (Decomposition), finding trends (Pattern Recognition), focusing on essentials (Abstraction), and writing step-by-step solutions (Algorithms).",
      },
      {
        id: "q3-2",
        question: "What makes block-based tools like Scratch ideal for beginner programmers?",
        options: [
          "They produce faster machine code than C++.",
          "They eliminate syntax errors by allowing only logically valid puzzle-piece connections.",
          "They are strictly restricted to university-level computer science.",
          "They do not allow loops or variables.",
        ],
        correctAnswer: 1,
        explanation:
          "Snapping shaped blocks prevents syntax errors (missing semicolons, misplaced brackets), enabling learners to focus entirely on logic.",
      },
      {
        id: "q3-3",
        question: "In the context of the international BEBRAS competition, what is evaluated?",
        options: [
          "Speed of typing source code on a keyboard",
          "Algorithmic reasoning and problem-solving without needing coding syntax",
          "Knowledge of computer repair hardware",
          "Ability to design graphic user interfaces in Figma",
        ],
        correctAnswer: 1,
        explanation:
          "BEBRAS evaluates computational and logical thinking through accessible scenario-based tasks without requiring prior programming language knowledge.",
      },
    ],
  },
];

export const INITIAL_VIEW_RECORDS: MaterialViewRecord[] = [
  {
    id: "view-1",
    userId: "user-student-2",
    studentName: "Elena Vasiliou",
    studentEmail: "elena.vasiliou@student.edu",
    materialId: "mat-1",
    materialTitle: "Algorithmic Complexity & Big-O Notation",
    category: "Algorithms & Logic",
    firstViewedAt: "2024-02-15T14:22:00Z",
    lastViewedAt: "2024-02-20T16:10:00Z",
    viewCount: 4,
  },
  {
    id: "view-2",
    userId: "user-student-2",
    studentName: "Elena Vasiliou",
    studentEmail: "elena.vasiliou@student.edu",
    materialId: "mat-3",
    materialTitle: "Visual Programming: Scratch & Blockly Pedagogical Guide",
    category: "EdTech & Robotics",
    firstViewedAt: "2024-02-18T10:05:00Z",
    lastViewedAt: "2024-02-18T10:35:00Z",
    viewCount: 1,
  },
  {
    id: "view-3",
    userId: "user-student-3",
    studentName: "Dimitris Nikolaou",
    studentEmail: "dimitris.nikolaou@student.edu",
    materialId: "mat-1",
    materialTitle: "Algorithmic Complexity & Big-O Notation",
    category: "Algorithms & Logic",
    firstViewedAt: "2024-02-19T09:12:00Z",
    lastViewedAt: "2024-02-23T11:45:00Z",
    viewCount: 2,
  },
  {
    id: "view-4",
    userId: "user-student-3",
    studentName: "Dimitris Nikolaou",
    studentEmail: "dimitris.nikolaou@student.edu",
    materialId: "mat-4",
    materialTitle: "Relational Database Design & MySQL CRUD Optimization",
    category: "Data & Databases",
    firstViewedAt: "2024-02-24T18:00:00Z",
    lastViewedAt: "2024-02-24T18:40:00Z",
    viewCount: 1,
  },
];

export const INITIAL_ATTEMPT_RECORDS: QuizAttemptRecord[] = [
  {
    id: "attempt-1",
    quizId: "quiz-1",
    quizTitle: "Algorithmic Problem Solving & Data Structures",
    category: "Algorithms & Logic",
    userId: "user-student-2",
    studentName: "Elena Vasiliou",
    studentEmail: "elena.vasiliou@student.edu",
    attemptNumber: 1,
    score: 80,
    totalQuestions: 5,
    correctCount: 4,
    passed: true,
    completedAt: "2024-02-21T15:30:00Z",
    answers: [
      {
        questionId: "q1-1",
        questionText: "What is the worst-case time complexity of searching for an item in a sorted array using Binary Search?",
        options: ["O(1)", "O(log N)", "O(N)", "O(N²)"],
        selectedOption: 1,
        correctOption: 1,
        isCorrect: true,
        explanation: "Binary Search operates in logarithmic O(log N) time.",
      },
      {
        questionId: "q1-2",
        questionText: "Which data structure follows the LIFO (Last-In, First-Out) principle?",
        options: ["Queue", "Stack", "Binary Tree", "Hash Table"],
        selectedOption: 1,
        correctOption: 1,
        isCorrect: true,
        explanation: "A Stack operates under LIFO.",
      },
      {
        questionId: "q1-3",
        questionText: "In Python or structured pseudocode, what will a loop 'for i in range(1, 10, 2)' iterate over?",
        options: ["[1, 2, 3, 4, 5]", "[1, 3, 5, 7, 9]", "[2, 4, 6, 8, 10]", "[1, 2, 4, 8]"],
        selectedOption: 1,
        correctOption: 1,
        isCorrect: true,
        explanation: "Produces odd numbers starting at 1 up to 9.",
      },
      {
        questionId: "q1-4",
        questionText: "Which of the following sorting algorithms guarantees O(N log N) worst-case time complexity?",
        options: ["Bubble Sort", "Insertion Sort", "Merge Sort", "Selection Sort"],
        selectedOption: 0,
        correctOption: 2,
        isCorrect: false,
        explanation: "Bubble sort has O(N²) worst-case complexity, while Merge Sort guarantees O(N log N).",
      },
      {
        questionId: "q1-5",
        questionText: "What is the primary condition required to execute Binary Search on an array?",
        options: [
          "The array elements must be unique.",
          "The array must be sorted in ascending or descending order.",
          "The array length must be a power of 2.",
          "The array must contain positive integers only.",
        ],
        selectedOption: 1,
        correctOption: 1,
        isCorrect: true,
        explanation: "Strictly requires sorted elements.",
      },
    ],
  },
  {
    id: "attempt-2",
    quizId: "quiz-3",
    quizTitle: "EdTech & Computational Thinking Foundations",
    category: "EdTech & Robotics",
    userId: "user-student-3",
    studentName: "Dimitris Nikolaou",
    studentEmail: "dimitris.nikolaou@student.edu",
    attemptNumber: 1,
    score: 100,
    totalQuestions: 3,
    correctCount: 3,
    passed: true,
    completedAt: "2024-02-25T17:15:00Z",
    answers: [
      {
        questionId: "q3-1",
        questionText: "What are the four core pillars of Computational Thinking?",
        options: [
          "Decomposition, Pattern Recognition, Abstraction, and Algorithm Design",
          "Typing, Printing, Compiling, and Debugging",
          "Hardware, Software, Firmware, and Cloud",
          "Input, Output, Storage, and Processing",
        ],
        selectedOption: 0,
        correctOption: 0,
        isCorrect: true,
        explanation: "Decomposition, Pattern Recognition, Abstraction, and Algorithm Design.",
      },
      {
        questionId: "q3-2",
        questionText: "What makes block-based tools like Scratch ideal for beginner programmers?",
        options: [
          "They produce faster machine code than C++.",
          "They eliminate syntax errors by allowing only logically valid puzzle-piece connections.",
          "They are strictly restricted to university-level computer science.",
          "They do not allow loops or variables.",
        ],
        selectedOption: 1,
        correctOption: 1,
        isCorrect: true,
        explanation: "Eliminates syntax errors via snapped visual blocks.",
      },
      {
        questionId: "q3-3",
        questionText: "In the context of the international BEBRAS competition, what is evaluated?",
        options: [
          "Speed of typing source code on a keyboard",
          "Algorithmic reasoning and problem-solving without needing coding syntax",
          "Knowledge of computer repair hardware",
          "Ability to design graphic user interfaces in Figma",
        ],
        selectedOption: 1,
        correctOption: 1,
        isCorrect: true,
        explanation: "Evaluates pure algorithmic reasoning through challenge puzzles.",
      },
    ],
  },
];
