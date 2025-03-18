"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { User } from "lucide-react"; // Profile icon

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    setActiveSection(pathname);
  }, [pathname]);

  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-10 py-5 bg-transparent z-50">
      {/* Logo on the Left */}
      <div className="text-white text-4xl font-extrabold tracking-wide">Consultancy</div>

      {/* Navbar Links on the Right */}
      <div className="flex items-center space-x-6">
      <Link key="home" href={`/`}>
              <span
                className={`px-4 py-2 rounded-full font-semibold transition-all cursor-pointer ${
                  activeSection === `/`
                    ? "bg-white text-black shadow-md"
                    : "text-white hover:bg-white hover:text-black"
                }`}
              >
                Home
              </span>
            </Link>
        {["AboutUs", "ContactUs"].map((section) => {
          const link = section.toLowerCase().replace(" ", "-");
          return (
            <Link key={section} href={`/${link}`}>
              <span
                className={`px-4 py-2 rounded-full font-semibold transition-all cursor-pointer ${
                  activeSection === `/${link}`
                    ? "bg-white text-black shadow-md"
                    : "text-white hover:bg-white hover:text-black"
                }`}
              >
                {section}
              </span>
            </Link>
          );
        })}

        {/* Profile Icon */}
        <Link href="/profile">
          <User className="text-white cursor-pointer hover:opacity-80" size={24} />
        </Link>
      </div>
    </nav>
  );
}
