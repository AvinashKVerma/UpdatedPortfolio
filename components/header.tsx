"use client"

import { useState } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session } = useSession()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          Avinash K R Verma
        </Link>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-4">
          <ModeToggle />
          <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="#about" className="text-sm font-medium hover:text-accent transition-colors">
            About
          </Link>
          <Link href="#skills" className="text-sm font-medium hover:text-accent transition-colors">
            Skills
          </Link>
          <Link href="#projects" className="text-sm font-medium hover:text-accent transition-colors">
            Projects
          </Link>
          <Link href="#experience" className="text-sm font-medium hover:text-accent transition-colors">
            Experience
          </Link>
          <Link href="#education" className="text-sm font-medium hover:text-accent transition-colors">
            Education
          </Link>
          <Link href="#contact" className="text-sm font-medium hover:text-accent transition-colors">
            Contact
          </Link>
          {session && (
            <Link href="/admin" className="text-sm font-medium hover:text-accent transition-colors">
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

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <nav className="flex flex-col p-4 space-y-3 bg-background">
            <Link
              href="#about"
              className="text-sm font-medium p-2 hover:bg-accent/10 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="#skills"
              className="text-sm font-medium p-2 hover:bg-accent/10 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Skills
            </Link>
            <Link
              href="#projects"
              className="text-sm font-medium p-2 hover:bg-accent/10 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </Link>
            <Link
              href="#experience"
              className="text-sm font-medium p-2 hover:bg-accent/10 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Experience
            </Link>
            <Link
              href="#education"
              className="text-sm font-medium p-2 hover:bg-accent/10 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Education
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium p-2 hover:bg-accent/10 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            {session && (
              <Link
                href="/admin"
                className="text-sm font-medium p-2 hover:bg-accent/10 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
            )}
            {!session ? (
              <Link href="/api/auth/signin" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full">
                  Sign In
                </Button>
              </Link>
            ) : (
              <Link href="/api/auth/signout" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full">
                  Sign Out
                </Button>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
