"use client";

import * as React from "react";
import { Command } from "cmdk";
import {
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { motion } from "motion/react";
import { ICONS } from "@/lib/icons";
import { useRouter } from "next/navigation";
import { useCommandMenu } from "./command-menu-context";
import { LINKS } from "@/constants";
import ArrowNarrowRightIcon from "@/icons/arrow-narrow-right-icon";

export const CommandMenu = () => {
  const { isOpen, setIsOpen } = useCommandMenu();
  const router = useRouter();
  const dialogRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const timeoutId = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen(!isOpen);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;

  return (
    <div className="bg-background/80 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs">
      <motion.div
        ref={dialogRef}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        className="bg-popover text-popover-foreground w-full max-w-[450px] overflow-hidden rounded-xl border shadow-2xl"
      >
        <Command className="w-full">
          <CommandInput placeholder="Type a command or search..." autoFocus />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>

            <CommandGroup heading="Socials">
              <CommandItem
                className="gap-4"
                onSelect={() => {
                  window.open(LINKS.GITHUB, "_blank");
                  setIsOpen(false);
                }}
              >
                <ArrowNarrowRightIcon className="h-4 w-4" />
                GitHub
              </CommandItem>
              <CommandItem
                className="gap-4"
                onSelect={() => {
                  window.open(LINKS.TWITTER, "_blank");
                  setIsOpen(false);
                }}
              >
                <ArrowNarrowRightIcon className="h-4 w-4" />X formerly Twitter
              </CommandItem>
            </CommandGroup>

            <CommandGroup heading="Icons">
              {ICONS.map((icon) => (
                <CommandItem
                  key={icon.name}
                  className="gap-4"
                  onSelect={() => {
                    router.push(icon.path);
                    setIsOpen(false);
                  }}
                >
                  <ArrowNarrowRightIcon className="h-4 w-4" />
                  {icon.name}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading="Support">
              <CommandItem className="gap-4">
                <ArrowNarrowRightIcon className="h-4 w-4" />
                Facing issue?
              </CommandItem>
              <CommandItem className="gap-4">
                <ArrowNarrowRightIcon className="h-4 w-4" />
                Request feature
              </CommandItem>
              <CommandItem className="gap-4">
                <ArrowNarrowRightIcon className="h-4 w-4" />
                Report bugF
              </CommandItem>
              <CommandItem className="gap-4">
                <ArrowNarrowRightIcon className="h-4 w-4" />
                Contribute
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </motion.div>
    </div>
  );
};
