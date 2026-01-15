import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import { UploadManagerProvider } from "../lib/upload-manager";
import { FloatingUploadPanel } from "../components/floating-upload-panel";
import { CacheManager } from "../components/cache-manager";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "S3cretBox - Your Encrypted S3-Powered Cloud Vault",
  description:
    "Securely manage your AWS S3 files with local encryption, zero backend storage, and complete privacy control. Built with modern web technologies for maximum security.",
  icons: {
    icon: "/a%26a-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <ThemeProvider defaultTheme="system">
          <UploadManagerProvider>
            <CacheManager>
              {children}
              <FloatingUploadPanel />
            </CacheManager>
          </UploadManagerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
