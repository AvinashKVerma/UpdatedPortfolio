"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { FiMenu, FiX } from "react-icons/fi";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@heroui/react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { data: session } = useSession();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
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
    <header className="top-0 z-50 sticky bg-background/95 backdrop-blur px-4 sm:px-3 md:px-6 border-b w-full">
      <div className="flex justify-between xl:justify-between items-center mx-auto w-full max-w-7xl h-16">
        {/* Logo visible below md and above xl */}
        <Link
          href="/"
          className="md:hidden block xl:block font-bold text-lg md:text-xl whitespace-nowrap"
        >
          Avinash Kumar Verma
        </Link>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <ModeToggle />
          <Button
            variant="light"
            onPress={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </Button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex justify-evenly items-center gap-2 lg:gap-6 w-full">
          {navItems.map(({ id, label }) => (
            <Link
              key={id}
              href={`#${id}`}
              className={`text-[12px] md:text-sm transition-colors duration-150 ease-in-out ${
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

      {/* Mobile Navigation */}
      <div
        className={`md:hidden absolute top-16 left-0 right-0 z-40 bg-background shadow-md border-t transition-all duration-300 transform ${
          isMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-2 opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col space-y-2 p-4">
          {navItems.map(({ id, label }) => (
            <Link
              key={id}
              href={`#${id}`}
              className={`p-2 rounded-md font-medium text-sm transition-colors ${
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
    </header>
  );
}
