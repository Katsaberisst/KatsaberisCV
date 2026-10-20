export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  homepage: string | null;
  size?: number;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  forks_count: number;
  open_issues_count: number;
  topics?: string[];
  default_branch?: string;
}

export interface FetchReposResult {
  repos: GitHubRepo[];
  error: string | null;
  isFallback: boolean;
  rateLimitRemaining?: string | null;
}

export const GITHUB_USERNAME = "Katsaberisst";
export const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`;

/**
 * Fallback static snapshot of Katsaberisst's repositories
 * Ensures zero downtime and robust rendering if GitHub API encounters rate limits or network issues.
 */
export const FALLBACK_REPOS: GitHubRepo[] = [
  {
    id: 868471201,
    name: "KatsaberisCV",
    full_name: "Katsaberisst/KatsaberisCV",
    html_url: "https://github.com/Katsaberisst/KatsaberisCV",
    description: "My CV personal Site, using antigravity",
    fork: false,
    url: "https://api.github.com/repos/Katsaberisst/KatsaberisCV",
    created_at: "2026-10-06T12:00:00Z",
    updated_at: "2026-10-08T13:03:28Z",
    pushed_at: "2026-10-08T13:03:28Z",
    homepage: null,
    stargazers_count: 0,
    watchers_count: 0,
    language: "TypeScript",
    forks_count: 0,
    open_issues_count: 0,
  },
  {
    id: 635267320,
    name: "You-Dont-Know-JS",
    full_name: "Katsaberisst/You-Dont-Know-JS",
    html_url: "https://github.com/Katsaberisst/You-Dont-Know-JS",
    description: "A book series (2 published editions) on the JS language.",
    fork: true,
    url: "https://api.github.com/repos/Katsaberisst/You-Dont-Know-JS",
    created_at: "2023-05-02T10:00:00Z",
    updated_at: "2026-04-29T03:57:32Z",
    pushed_at: "2026-04-29T03:57:32Z",
    homepage: null,
    stargazers_count: 0,
    watchers_count: 0,
    language: null,
    forks_count: 0,
    open_issues_count: 0,
  },
  {
    id: 800000003,
    name: "1.-Getting-Started",
    full_name: "Katsaberisst/1.-Getting-Started",
    html_url: "https://github.com/Katsaberisst/1.-Getting-Started",
    description: "Introductory Python code repository and computational problem-solving exercises.",
    fork: false,
    url: "https://api.github.com/repos/Katsaberisst/1.-Getting-Started",
    created_at: "2024-05-12T13:00:00Z",
    updated_at: "2024-05-12T13:19:32Z",
    pushed_at: "2024-05-12T13:19:32Z",
    homepage: null,
    stargazers_count: 0,
    watchers_count: 0,
    language: "Python",
    forks_count: 0,
    open_issues_count: 0,
  },
  {
    id: 751965181,
    name: "cryptography",
    full_name: "Katsaberisst/cryptography",
    html_url: "https://github.com/Katsaberisst/cryptography",
    description: "first save before menu creation",
    fork: false,
    url: "https://api.github.com/repos/Katsaberisst/cryptography",
    created_at: "2024-02-02T20:00:00Z",
    updated_at: "2024-02-02T20:44:58Z",
    pushed_at: "2024-02-02T20:44:58Z",
    homepage: null,
    stargazers_count: 0,
    watchers_count: 0,
    language: "JavaScript",
    forks_count: 0,
    open_issues_count: 0,
  },
  {
    id: 635266491,
    name: "HTML-CSS",
    full_name: "Katsaberisst/HTML-CSS",
    html_url: "https://github.com/Katsaberisst/HTML-CSS",
    description: "Personal Repository for HTML and CSS Examples",
    fork: true,
    url: "https://api.github.com/repos/Katsaberisst/HTML-CSS",
    created_at: "2023-05-02T10:28:13Z",
    updated_at: "2023-05-02T10:28:14Z",
    pushed_at: "2022-12-06T08:06:06Z",
    homepage: null,
    stargazers_count: 0,
    watchers_count: 0,
    language: null,
    forks_count: 0,
    open_issues_count: 0,
  },
  {
    id: 635266348,
    name: "Javascript",
    full_name: "Katsaberisst/Javascript",
    html_url: "https://github.com/Katsaberisst/Javascript",
    description: "Παραδείγματα σε Javascript",
    fork: true,
    url: "https://api.github.com/repos/Katsaberisst/Javascript",
    created_at: "2023-05-02T10:27:52Z",
    updated_at: "2023-05-02T10:27:52Z",
    pushed_at: "2022-12-06T08:06:46Z",
    homepage: null,
    stargazers_count: 0,
    watchers_count: 0,
    language: null,
    forks_count: 0,
    open_issues_count: 0,
  },
];

/**
 * Server-side GitHub data fetcher with Next.js caching and revalidation
 */
export async function fetchGitHubRepos(): Promise<FetchReposResult> {
  try {
    const res = await fetch(GITHUB_API_URL, {
      // 1 hour cache lifetime: prevents hitting the 60 req/hr unauthenticated rate limit
      next: { revalidate: 3600 },
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "Katsaberis-Portfolio-Nextjs",
      },
    });

    const rateLimitRemaining = res.headers.get("x-ratelimit-remaining");

    if (!res.ok) {
      const errorMsg = `GitHub API status ${res.status}: ${res.statusText}`;
      console.warn(`[GitHub API] ${errorMsg}`);
      return {
        repos: FALLBACK_REPOS,
        error: errorMsg,
        isFallback: true,
        rateLimitRemaining,
      };
    }

    const data = await res.json();
    if (!Array.isArray(data)) {
      return {
        repos: FALLBACK_REPOS,
        error: "Unexpected response format from GitHub API",
        isFallback: true,
        rateLimitRemaining,
      };
    }

    return {
      repos: data,
      error: null,
      isFallback: false,
      rateLimitRemaining,
    };
  } catch (err: any) {
    console.error("[GitHub API] Fetch error:", err);
    return {
      repos: FALLBACK_REPOS,
      error: err?.message || "Network error fetching repositories",
      isFallback: true,
    };
  }
}

/**
 * Infer or format primary language and return corresponding color badges
 */
export function getLanguageInfo(repo: { language: string | null; name: string }) {
  let lang = repo.language;
  if (!lang) {
    const lowerName = repo.name.toLowerCase();
    if (lowerName.includes("javascript") || lowerName.includes("js")) {
      lang = "JavaScript";
    } else if (lowerName.includes("html") || lowerName.includes("css")) {
      lang = "HTML / CSS";
    } else if (lowerName.includes("python") || lowerName.includes("py")) {
      lang = "Python";
    } else if (lowerName.includes("typescript") || lowerName.includes("ts")) {
      lang = "TypeScript";
    } else {
      lang = "Code";
    }
  }

  switch (lang.toLowerCase()) {
    case "typescript":
      return {
        label: "TypeScript",
        dotColor: "bg-blue-500",
        badgeClass:
          "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/60",
      };
    case "javascript":
      return {
        label: "JavaScript",
        dotColor: "bg-amber-400",
        badgeClass:
          "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/60",
      };
    case "python":
      return {
        label: "Python",
        dotColor: "bg-emerald-500",
        badgeClass:
          "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60",
      };
    case "html":
    case "html / css":
    case "css":
      return {
        label: "HTML / CSS",
        dotColor: "bg-orange-500",
        badgeClass:
          "bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800/60",
      };
    case "php":
      return {
        label: "PHP",
        dotColor: "bg-indigo-500",
        badgeClass:
          "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/60",
      };
    default:
      return {
        label: lang,
        dotColor: "bg-neutral-500",
        badgeClass:
          "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700",
      };
  }
}

/**
 * Safe, user-friendly fallback descriptions
 */
export function getRepoDescription(repo: { description: string | null; name: string }): string {
  if (repo.description && repo.description.trim().length > 0) {
    return repo.description.trim();
  }
  const lowerName = repo.name.toLowerCase();
  if (lowerName.includes("getting-started")) {
    return "Introductory Python code repository, algorithmic drills, and computational problem-solving exercises.";
  }
  return "Public repository hosted on GitHub containing source code, documentation, and implementation modules.";
}

/**
 * Format ISO date string into readable short date
 */
export function formatRepoDate(isoString: string): string {
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return "Recently updated";
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "Recently updated";
  }
}
