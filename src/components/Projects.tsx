import React from "react";
import ProjectsClient from "./ProjectsClient";
import ProjectsSkeleton from "./ProjectsSkeleton";
import { fetchGitHubRepos } from "@/data/github";

export { ProjectsSkeleton };

/**
 * Projects Server Component
 * Fetches the latest 6 public repositories from GitHub API with Next.js ISR revalidation (3600s).
 */
export default async function Projects() {
  const { repos, error, isFallback, rateLimitRemaining } = await fetchGitHubRepos();

  return (
    <ProjectsClient
      initialRepos={repos}
      error={error}
      isFallback={isFallback}
      rateLimitRemaining={rateLimitRemaining}
    />
  );
}
