"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { SquareThemeToggle } from "@/components/square-theme-toggle";
import { AuthLoader } from "@/components/auth-loader";
import { SignInButton, useAuth } from "@clerk/nextjs";
import {
  Shield,
  FolderOpen,
  Monitor,
  Lock,
  Cloud,
  User,
  Key,
  Upload,
  Download,
  Trash2,
  Github,
  Mail,
  AlertTriangle,
  Zap,
  BookOpen,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      // Add a small delay to show the loader for better UX
      const timer = setTimeout(() => {
        if (isSignedIn) {
          router.push("/dashboard");
        } else {
          setIsChecking(false);
        }
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isLoaded, isSignedIn, router]);

  // Show loader while checking authentication
  if (!isLoaded || isChecking) {
    return (
      <>
        <div className="fixed top-4 right-4 z-50">
          <SquareThemeToggle />
        </div>
        <AuthLoader />
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900">
        {/* Fixed Theme Toggle Button */}
        <div className="fixed top-4 right-4 z-50">
          <SquareThemeToggle />
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-200/20 to-zinc-400/20 dark:from-zinc-800/20 dark:to-zinc-600/20" />
          <div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-40' />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-20">
            <div className="text-center">
              <div className="flex justify-center items-center mb-8">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-r from-zinc-600 to-zinc-800 dark:from-zinc-400 dark:to-zinc-200 rounded-2xl flex items-center justify-center shadow-lg">
                    <Lock className="w-8 h-8 text-white dark:text-zinc-900" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                    <Cloud className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>

              <h1 className="text-4xl sm:text-6xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
                S3cret
                <span className="text-zinc-600 dark:text-zinc-400">Box</span>
              </h1>

              <p className="text-xl sm:text-2xl text-zinc-600 dark:text-zinc-400 mb-8 max-w-3xl mx-auto">
                Your encrypted S3-powered cloud vault
              </p>

              <p className="text-lg text-zinc-500 dark:text-zinc-500 mb-10 max-w-2xl mx-auto">
                Securely manage your AWS S3 files with local encryption, zero
                backend storage, and complete privacy control.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <SignInButton>
                  <Button
                    size="lg"
                    className="bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <Shield className="w-5 h-5 mr-2" />
                    Get Started Securely
                  </Button>
                </SignInButton>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/aws-guide">
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-2 border-blue-300 dark:border-blue-700 px-8 py-6 text-lg font-semibold rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-all duration-200 w-full"
                    >
                      <BookOpen className="w-5 h-5 mr-2" />
                      AWS Setup Guide
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-zinc-300 dark:border-zinc-700 px-8 py-6 text-lg font-semibold rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all duration-200"
                  >
                    <Github className="w-5 h-5 mr-2" />
                    View on GitHub
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AWS Pricing Alert */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Alert className="border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20">
            <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            <AlertTitle className="text-orange-800 dark:text-orange-200 font-semibold">
              AWS Pricing Notice
            </AlertTitle>
            <AlertDescription className="text-orange-700 dark:text-orange-300">
              While S3cretBox is free to use, AWS S3 is a paid service. You may
              incur AWS charges for storage, downloads, or requests if you
              exceed the free tier limits.
            </AlertDescription>
          </Alert>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <Badge
              variant="secondary"
              className="mb-6 px-4 py-2 text-sm font-medium"
            >
              Features
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
              Built for Security & Simplicity
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Everything you need to manage your S3 files securely, without
              compromising on privacy or ease of use.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all duration-200 shadow-sm hover:shadow-md">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <CardTitle className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                  🔐 Locally Encrypted AWS Access
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Your AWS credentials are encrypted with your personal PIN and
                  stored only in your browser. No server-side storage means
                  maximum security.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all duration-200 shadow-sm hover:shadow-md">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <FolderOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                  🗂️ Visual File Explorer for Multiple Buckets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Navigate through all your S3 buckets with an intuitive, modern
                  interface. Upload, download, and organize files effortlessly.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all duration-200 shadow-sm hover:shadow-md">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Monitor className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                  🧠 No Backend — Everything Runs in Your Browser
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Complete client-side operation means zero data collection, no
                  tracking, and full control over your information and privacy.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-zinc-100/50 dark:bg-zinc-900/50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge
                variant="secondary"
                className="mb-6 px-4 py-2 text-sm font-medium"
              >
                How It Works
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                Get Started in 3 Simple Steps
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                Start managing your S3 files securely in minutes with our
                streamlined setup process.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-zinc-900 dark:bg-zinc-100 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                    <User className="w-8 h-8 text-white dark:text-zinc-900" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    1
                  </div>
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">
                  Login via Clerk
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Secure, passwordless authentication powered by Clerk. No
                  passwords to remember, maximum security guaranteed.
                </p>
              </div>

              <div className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-zinc-900 dark:bg-zinc-100 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                    <Key className="w-8 h-8 text-white dark:text-zinc-900" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    2
                  </div>
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">
                  Enter & Encrypt Your AWS Credentials
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Input your AWS credentials and create a secret PIN. Everything
                  is encrypted locally in your browser.
                </p>
              </div>

              <div className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-zinc-900 dark:bg-zinc-100 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                    <Zap className="w-8 h-8 text-white dark:text-zinc-900" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    3
                  </div>
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">
                  Manage Your Files Visually
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Upload, download, delete, and organize your S3 files through
                  an intuitive, modern interface.
                </p>
              </div>
            </div>

            <div className="flex justify-center items-center mt-12 space-x-8 text-zinc-400 dark:text-zinc-600">
              <Upload className="w-6 h-6" />
              <div className="h-px bg-zinc-300 dark:bg-zinc-700 w-8"></div>
              <Download className="w-6 h-6" />
              <div className="h-px bg-zinc-300 dark:bg-zinc-700 w-8"></div>
              <Trash2 className="w-6 h-6" />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-zinc-900 dark:bg-zinc-950 text-zinc-400 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="col-span-2">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-zinc-700 rounded-lg flex items-center justify-center mr-3">
                    <Lock className="w-4 h-4 text-zinc-300" />
                  </div>
                  <span className="text-xl font-bold text-zinc-200">
                    S3cretBox
                  </span>
                </div>
                <p className="text-zinc-500 max-w-md leading-relaxed">
                  Your secure, privacy-first S3 file manager. Built with modern
                  web technologies for maximum security and ease of use.
                </p>
              </div>

              <div>
                <h4 className="text-zinc-200 font-semibold mb-4">Resources</h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="hover:text-zinc-200 transition-colors duration-200 flex items-center"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      GitHub Repository
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-zinc-200 transition-colors duration-200 flex items-center"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Support Email
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-zinc-200 font-semibold mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="hover:text-zinc-200 transition-colors duration-200"
                    >
                      Terms of Use
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-zinc-200 transition-colors duration-200"
                    >
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-zinc-800 dark:border-zinc-700 mt-8 pt-8 text-center">
              <p className="text-zinc-500">
                © 2025 S3cretBox. Built with ❤️ for secure cloud storage
                management.
              </p>
              <p className="text-zinc-600 text-sm mt-2">
                This application does not store your data. All operations are
                performed client-side.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
