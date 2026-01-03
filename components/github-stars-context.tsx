"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

const GITHUB_API = "https://api.github.com/repos/itshover/itshover";
const CACHE_KEY = "github-stars-cache";
const CACHE_DURATION = 600000; // 10 minutes in ms

interface StarsCacheData {
  stars: number;
  timestamp: number;
}

interface GithubStarsContextType {
  stars: number | null;
}

const GithubStarsContext = createContext<GithubStarsContextType>({
  stars: null,
});

export function useGithubStars() {
  return useContext(GithubStarsContext);
}

function getCachedStars(): number | null {
  if (typeof window === "undefined") return null;
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const data: StarsCacheData = JSON.parse(cached);
      if (Date.now() - data.timestamp < CACHE_DURATION) {
        return data.stars;
      }
    }
  } catch {
    // Ignore localStorage errors
  }
  return null;
}

export function GithubStarsProvider({ children }: { children: ReactNode }) {
  const [stars, setStars] = useState<number | null>(() => getCachedStars());

  useEffect(() => {
    // Skip fetch if we have valid cached data
    if (stars !== null) return;

    const controller = new AbortController();

    fetch(GITHUB_API, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "itshover-website",
      },
      signal: controller.signal,
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.stargazers_count != null) {
          const count = data.stargazers_count;
          setStars(count);
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ stars: count, timestamp: Date.now() }),
          );
        }
      })
      .catch(() => {});

    return () => controller.abort();
  }, [stars]);

  return (
    <GithubStarsContext.Provider value={{ stars }}>
      {children}
    </GithubStarsContext.Provider>
  );
}
