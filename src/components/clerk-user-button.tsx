"use client";

import { UserButton } from "@clerk/nextjs";

export function ClerkUserButton() {
  return (
    <div className="w-10 h-10 rounded-lg border-2 border-zinc-300 dark:border-zinc-700 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center">
      <UserButton
        appearance={{
          elements: {
            avatarBox: "w-6 h-6",
            userButtonPopoverCard:
              "shadow-xl border-zinc-200 dark:border-zinc-700",
            userButtonPopoverMain: "bg-white dark:bg-zinc-900",
            userButtonPopoverFooter: "bg-zinc-50 dark:bg-zinc-800",
          },
        }}
      />
    </div>
  );
}
