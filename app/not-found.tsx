"use client";

import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { SquareThemeToggle } from "../components/square-theme-toggle";
import {
  ArrowLeft,
  Home,
  Search,
  AlertTriangle,
  Compass,
  RefreshCw,
  CloudOff,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleGoBack = () => {
    router.back();
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-orange-50/30 to-zinc-100 dark:from-zinc-950 dark:via-orange-950/20 dark:to-zinc-900">
      {/* Fixed Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <SquareThemeToggle />
      </div>

      <div className="flex items-center justify-center min-h-screen p-6">
        <div className="max-w-2xl mx-auto text-center">
          {/* Animated 404 Icon */}
          <div className="relative mb-8">
            <div className="w-32 h-32 mx-auto mb-6 relative">
              {/* Background Circle */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-emerald-200 dark:from-orange-900/30 dark:to-emerald-800/30 rounded-full animate-pulse"></div>

              {/* Main Icon */}
              <div className="absolute inset-4 bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center shadow-lg">
                <CloudOff className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-bounce">
                <AlertTriangle className="w-3 h-3 text-white" />
              </div>

              <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-yellow-500 rounded-full animate-pulse"></div>
            </div>

            {/* 404 Text */}
            <div className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-emerald-600 dark:from-orange-400 dark:to-emerald-400 mb-4 tracking-tighter">
              404
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">
                Oops! Page Not Found
              </h1>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
                We couldn&apos;t find the page you&apos;re looking for. It might
                have been moved, deleted, or you entered the wrong URL.
              </p>
            </div>

            {/* Suggestions */}
            <div className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm rounded-2xl p-6 border border-zinc-200 dark:border-zinc-700">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center justify-center">
                <Compass className="w-5 h-5 mr-2" />
                What you can do:
              </h2>
              <div className="grid gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                  Check the URL for any typos
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                  Go back to the previous page
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                  Visit the home page to explore your buckets
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                  Refresh the page to try again
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-3">
                  <Home className="w-4 h-4 mr-2" />
                  Go to Home
                </Button>
              </Link>

              <Button
                onClick={handleGoBack}
                variant="outline"
                className="rounded-xl border-2 border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 px-6 py-3"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>

              <Button
                onClick={handleRefresh}
                variant="ghost"
                className="rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 px-6 py-3"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>

            {/* Search Suggestion */}
            <div className="pt-4">
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3">
                Or search for what you&apos;re looking for:
              </p>
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search buckets, files..."
                  className="w-full pl-10 pr-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-200"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      // TODO: Implement search functionality
                      router.push("/");
                    }
                  }}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="pt-8 text-xs text-zinc-400 dark:text-zinc-500">
              <p>
                Need help? Contact support or check our{" "}
                <Link
                  href="#"
                  className="text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  documentation
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 bg-emerald-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-orange-500 rounded-full animate-ping opacity-40"></div>
        <div className="absolute bottom-32 left-20 w-3 h-3 bg-emerald-300 rounded-full animate-pulse opacity-50"></div>
        <div className="absolute bottom-20 right-10 w-1.5 h-1.5 bg-orange-400 rounded-full animate-ping opacity-60"></div>

        {/* Larger decorative circles */}
        <div className="absolute top-1/4 -left-20 w-40 h-40 bg-gradient-to-br from-orange-100/20 to-transparent rounded-full"></div>
        <div className="absolute bottom-1/4 -right-20 w-32 h-32 bg-gradient-to-bl from-emerald-100/20 to-transparent rounded-full"></div>
      </div>
    </div>
  );
}
