const GITHUB_API = "https://api.github.com/repos/itshover/itshover";
const CACHE_DURATION = 3600; // 1 hour in seconds

export async function getGithubStars(): Promise<number> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const resp = await fetch(GITHUB_API, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "itshover-website",
      },
      next: { revalidate: CACHE_DURATION },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!resp.ok) {
      return 0;
    }

    const data = await resp.json();
    return data.stargazers_count ?? 0;
  } catch {
    return 0;
  }
}
