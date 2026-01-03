"use client";

import { useGithubStars } from "./github-stars-context";
import CountUp from "./count-up";
import { LINKS } from "@/constants";

const GithubStars = () => {
  const { stars } = useGithubStars();

  return (
    <button
      onClick={() => window.open(LINKS.GITHUB, "_blank")}
      className="border-border bg-background hover:bg-accent hover:text-accent-foreground flex w-fit items-center gap-2 rounded-full border px-4 py-2 shadow-sm transition-colors duration-300"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-4 w-4 text-yellow-500"
      >
        <path d="M12 2l2.85 5.78 6.38.93-4.62 4.5 1.09 6.35L12 16.6l-5.7 3 1.09-6.35-4.62-4.5 6.38-.93L12 2z" />
      </svg>

      <span className="text-muted-foreground text-sm font-medium">
        <CountUp
          from={0}
          to={stars ?? 0}
          separator=","
          direction="up"
          duration={1}
          className="count-up-text"
        />
      </span>
    </button>
  );
};

export default GithubStars;
