import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { NextAuthProvider } from "@/components/auth-provider";
import "./globals.css";
import { Providers } from "./providers";
import { ToastProvider } from "@heroui/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Avinash K R Verma | Software Engineer",
  description:
    "Building performant, scalable, and user-centric web applications",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <NextAuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <Providers>
              <ToastProvider />
              <Header />
              {children}
              <Footer />
            </Providers>
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
