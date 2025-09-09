import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from "@/components/ConvexClientProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import NavBar from "@/components/NavBar";
import ErrorBoundary from "@/components/ErrorBoundary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TaskFlow - Modern Task Management",
  description:
    "A modern task management application built with Next.js, Convex, and Clerk",
  icons: {
    icon: "/convex.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background min-h-screen font-sans antialiased`}
      >
        <ClerkProvider dynamic>
          <ConvexClientProvider>
            <ErrorBoundary>
              <div className="relative flex min-h-screen flex-col">
                <NavBar />
                <main className="flex-1">
                  <div className="container mx-auto px-4 py-8">{children}</div>
                </main>
                <footer className="border-t py-6 md:py-0">
                  <div className="container flex items-center justify-between px-4 md:h-16">
                    <p className="text-muted-foreground text-sm">
                      Built with Next.js, Convex, and Clerk
                    </p>
                    <p className="text-muted-foreground text-sm">
                      © 2025 TaskFlow. All rights reserved.
                    </p>
                  </div>
                </footer>
              </div>
            </ErrorBoundary>
            <Toaster
              position="bottom-center"
              toastOptions={{
                duration: 4000,
              }}
            />
          </ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
