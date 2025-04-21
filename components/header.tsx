"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="top-0 z-50 sticky bg-background/95 backdrop-blur px-4 md:px-20 border-b w-full">
      <div className="flex justify-between items-center mx-auto h-16 container">
        <Link
          href="/"
          className="font-bold text-lg md:text-xl whitespace-nowrap"
        >
          Avinash Kumar Verma
        </Link>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <ModeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {[
            "about",
            "skills",
            "projects",
            "experience",
            "education",
            "contact",
          ].map((section) => (
            <Link
              key={section}
              href={`#${section}`}
              className="font-medium hover:text-accent text-sm transition-colors"
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </Link>
          ))}

          {session && (
            <Link
              href="/admin"
              className="font-medium hover:text-accent text-sm transition-colors"
            >
              Admin
            </Link>
          )}

          <ModeToggle />
          {!session ? (
            <Link href="/api/auth/signin">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
          ) : (
            <Link href="/api/auth/signout">
              <Button variant="outline" size="sm">
                Sign Out
              </Button>
            </Link>
          )}
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden top-16 right-0 left-0 z-40 absolute bg-background shadow-md border-t transition-all duration-200">
          <nav className="flex flex-col space-y-2 p-4">
            {[
              "about",
              "skills",
              "projects",
              "experience",
              "education",
              "contact",
            ].map((section) => (
              <Link
                key={section}
                href={`#${section}`}
                className="hover:bg-accent/10 p-2 rounded-md font-medium text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Link>
            ))}

            {session && (
              <Link
                href="/admin"
                className="hover:bg-accent/10 p-2 rounded-md font-medium text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
            )}

            <div className="flex justify-between items-center mt-2">
              <ModeToggle />
              {!session ? (
                <Link
                  href="/api/auth/signin"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button variant="outline" size="sm" className="mt-2 w-full">
                    Sign In
                  </Button>
                </Link>
              ) : (
                <Link
                  href="/api/auth/signout"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button variant="outline" size="sm" className="mt-2 w-full">
                    Sign Out
                  </Button>
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
