"use client";

import { Lock, Cloud } from "lucide-react";

export function AuthLoader() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900 flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="relative mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-zinc-600 to-zinc-800 dark:from-zinc-400 dark:to-zinc-200 rounded-3xl flex items-center justify-center shadow-2xl animate-pulse">
            <Lock className="w-10 h-10 text-white dark:text-zinc-900" />
          </div>
          <div className="absolute -top-3 -right-3 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center animate-bounce">
            <Cloud className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* App Name */}
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
          S3cret<span className="text-zinc-600 dark:text-zinc-400">Box</span>
        </h1>

        {/* Loading Text */}
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
          Securing your connection...
        </p>

        {/* Animated Dots */}
        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce [animation-delay:0ms]"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:150ms]"></div>
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce [animation-delay:300ms]"></div>
        </div>

        {/* Progress Bar */}
        <div className="mt-8 w-64 mx-auto">
          <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-emerald-500/30 rounded-full animate-ping [animation-delay:0s]"></div>
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-blue-500/30 rounded-full animate-ping [animation-delay:1s]"></div>
          <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-purple-500/30 rounded-full animate-ping [animation-delay:2s]"></div>
          <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-emerald-500/20 rounded-full animate-ping [animation-delay:1.5s]"></div>
        </div>
      </div>
    </div>
  );
}
