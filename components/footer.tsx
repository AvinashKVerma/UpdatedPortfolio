import Link from "next/link";
import { FaLinkedinIn } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { CiMail } from "react-icons/ci";

export default function Footer() {
  return (
    <footer className="py-6 md:py-8 border-t">
      <div className="flex md:flex-row flex-col justify-between items-center gap-4 px-4 md:px-6 container">
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} Avinash K R Verma. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/AvinashKVerma"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiGithub className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            href="https://www.linkedin.com/in/avinashkverma/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link target="_blank" href="mailto:avinashverma078@gmail.com">
            <CiMail className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
            <span className="sr-only">Email</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
