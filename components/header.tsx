"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@heroui/react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { data: session } = useSession();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { id: "about", label: "About" },
    { id: "github-contributions", label: "GitHub Contributions" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    navItems.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);

            const newUrl = `#${id}`;
            if (window.location.hash !== newUrl) {
              history.replaceState(null, "", newUrl);
            }
          }
        },
        { threshold: 0.5 }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [navItems]);

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
          <Button variant="light" onPress={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map(({ id, label }) => (
            <Link
              key={id}
              href={`#${id}`}
              className={`text-sm transition-colors ${
                activeSection === id
                  ? "text-red-500 font-bold"
                  : "hover:text-accent font-medium"
              }`}
            >
              {label}
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
              <Button variant="bordered" size="sm">
                Sign In
              </Button>
            </Link>
          ) : (
            <Link href="/api/auth/signout">
              <Button variant="bordered" size="sm">
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
            {navItems.map(({ id, label }) => (
              <Link
                key={id}
                href={`#${id}`}
                className={`p-2 rounded-md font-medium text-sm ${
                  activeSection === id
                    ? "bg-accent/20 text-primary font-bold"
                    : "hover:bg-accent/10"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
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
                  <Button variant="bordered" size="sm" className="mt-2 w-full">
                    Sign In
                  </Button>
                </Link>
              ) : (
                <Link
                  href="/api/auth/signout"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button variant="bordered" size="sm" className="mt-2 w-full">
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
