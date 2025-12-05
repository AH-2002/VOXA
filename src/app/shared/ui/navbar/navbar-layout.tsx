"use client";

import { logout } from "@/actions/auth";
import { authLinks, navLinks } from "@/app/shared/ui/navbar/data";
import { navLinkType } from "@/app/shared/ui/navbar/types";
import { UserType } from "@/app/users/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import SearchBar from "./search-bar";
import { LogOut, User, NotebookPen, Sparkles, Menu, X } from "lucide-react";

export default function NavbarLayout({ user }: { user: UserType | undefined }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const currentPath = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const isActive = (href: string) =>
    href === currentPath
      ? "text-blue-500 font-semibold border-b-2 border-blue-500"
      : "text-gray-700 hover:text-blue-500";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
      if (
        mobileRef.current &&
        !mobileRef.current.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full backdrop-blur-sm bg-white/70 shadow-md fixed top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-bold text-gray-900 hover:text-blue-600 transition"
          >
            <Sparkles className="w-6 h-6" />
            VOXA
          </Link>

          <div className="hidden md:flex items-center gap-6 flex-1 ml-10">
            {user
              ? navLinks.map((link: navLinkType) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`transition-colors duration-200 ${isActive(
                      link.href
                    )}`}
                  >
                    {link.icon ? (
                      <link.icon className="w-5 h-5" />
                    ) : (
                      <span>{link.label}</span>
                    )}
                  </Link>
                ))
              : authLinks.map((link: navLinkType) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`transition-colors duration-200 ${isActive(
                      link.href
                    )}`}
                  >
                    {link.label}
                  </Link>
                ))}
            {user && (
              <div className="w-[80%] mx-auto">
                <SearchBar />
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {user && (
              <div className="md:hidden">
                <button
                  className="text-gray-700 hover:text-blue-500 transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </button>
              </div>
            )}

            {user && (
              <div className="hidden md:block relative">
                <button
                  ref={menuButtonRef}
                  className="text-gray-700 hover:text-blue-500 transition-colors duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpen((prev) => !prev);
                  }}
                >
                  ⋮
                </button>

                {menuOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 w-36 bg-white border shadow-md rounded-md overflow-hidden z-50"
                  >
                    <Link
                      href={`/profile/${user._id}`}
                      className="flex gap-x-5 px-5 py-2 hover:bg-gray-100 text-gray-700 transition"
                    >
                      <User className="w-5 h-5" /> Profile
                    </Link>
                    <Link
                      href="/diaries"
                      className="flex gap-x-5 px-5 py-2 hover:bg-gray-100 text-gray-700 transition"
                    >
                      <NotebookPen className="w-5 h-5" /> Diaries
                    </Link>
                    <form action={logout}>
                      <button className="w-full flex gap-x-5 text-left px-5 py-2 hover:bg-gray-100 text-red-500 transition">
                        <LogOut className="w-5 h-5" /> Log out
                      </button>
                    </form>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {mobileMenuOpen && user && (
        <div
          ref={mobileRef}
          className="md:hidden bg-white border-t shadow-md w-full absolute top-16 left-0 z-50"
        >
          <div className="flex flex-col">
            <div className="px-4 py-3 border-b">
              <SearchBar />
            </div>

            {navLinks.map((link: navLinkType) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-3 border-b flex items-center gap-2 transition ${isActive(
                  link.href
                )} hover:bg-gray-100`}
              >
                {link.icon && <link.icon className="w-5 h-5" />} {link.label}
              </Link>
            ))}

            <Link
              href={`/profile/${user._id}`}
              className={`px-4 py-3 border-b flex items-center gap-2 transition ${isActive(
                `/profile/${user._id}`
              )} hover:bg-gray-100`}
            >
              <User className="w-5 h-5" /> Profile
            </Link>
            <Link
              href="/diaries"
              className={`px-4 py-3 border-b flex items-center gap-2 transition ${isActive(
                "/diaries"
              )} hover:bg-gray-100`}
            >
              <NotebookPen className="w-5 h-5" /> Diaries
            </Link>
            <form action={logout}>
              <button className="w-full px-4 py-3 text-left text-red-500 hover:bg-gray-100 hover:text-red-600 flex items-center gap-2 transition">
                <LogOut className="w-5 h-5" /> Log out
              </button>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
}
