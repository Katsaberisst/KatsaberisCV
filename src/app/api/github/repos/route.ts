import { NextResponse } from "next/server";
import { fetchGitHubRepos } from "@/data/github";

export const revalidate = 3600;

export async function GET() {
  const result = await fetchGitHubRepos();
  return NextResponse.json({
    ...result,
    cachedAt: new Date().toISOString(),
  });
}
