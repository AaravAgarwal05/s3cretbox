"use client";

import { SquareThemeToggle } from "./square-theme-toggle";

export function TopRightControls() {
  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
      <SquareThemeToggle />
    </div>
  );
}
