"use client";

import { logout } from "@/actions/auth";
import { authLinks, navLinks } from "@/app/shared/ui/navbar/data";
import { navLinkType } from "@/app/shared/ui/navbar/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import SearchBar from "./search-bar";
import { LogOut, User, NotebookPen, Sparkles, Menu, X } from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";

export default function Navbar({ userId }: { userId: string | undefined }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const currentPath = usePathname();

  const isActive = (href: string) =>
    href === currentPath
      ? "text-blue-500 font-semibold border-b-2 border-blue-500 pb-1"
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

  useEffect(() => {
    setMenuOpen(false);
    setMobileMenuOpen(false);
  }, [userId]);

  return (
    <nav className="w-full backdrop-blur-sm bg-white shadow-md fixed top-0 z-50 transition-all duration-300 dark:bg-zinc-900 dark:text-gray-200 dark:backdrop-blur-sm dark:shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-x-5">
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-bold text-gray-900 hover:text-blue-600 transition dark:text-gray-200 dark:hover:text-blue-600 dark:transition"
          >
            <Sparkles className="w-6 h-6" />
            VOXA
          </Link>

          <div className="hidden md:flex flex-1 justify-center items-center gap-6">
            {userId
              ? navLinks.map((link: navLinkType) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`transition-colors duration-200 ${isActive(
                      link.href
                    )}`}
                  >
                    {link.icon ? (
                      <link.icon className="w-5 h-5  dark:text-gray-200 dark:hover:text-blue-600 dark:transition" />
                    ) : (
                      <span>{link.label}</span>
                    )}
                  </Link>
                ))
              : null}

            {userId && (
              <div className="w-[90%] mx-auto flex gap-5">
                <SearchBar />
                <ThemeToggle />
              </div>
            )}

            {!userId && (
              <div className="flex items-center gap-x-5 ml-auto dark:text-gray-200">
                {authLinks.map((link: navLinkType) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-600 ${isActive(
                      link.href
                    )}`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {userId && (
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

            <div className="hidden md:block relative">
              {userId && (
                <>
                  <button
                    ref={menuButtonRef}
                    className="text-gray-700 hover:text-blue-500 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-600 dark:transition"
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
                      className="absolute right-0 mt-2 w-36 bg-white border shadow-md rounded-md overflow-hidden z-50 dark:bg-zinc-900 dark:text-gray-200 dark:border-zinc-700"
                    >
                      <Link
                        href={`/profile/${userId}`}
                        className="flex gap-3 px-5 py-2 hover:bg-gray-100 text-gray-700 transition dark:text-gray-200 dark:hover:bg-gray-800"
                      >
                        <User className="w-5 h-5" /> Profile
                      </Link>
                      <Link
                        href="/diaries"
                        className="flex gap-3 px-5 py-2 hover:bg-gray-100 text-gray-700 transition dark:text-gray-200 dark:hover:bg-gray-800"
                      >
                        <NotebookPen className="w-5 h-5" /> Diaries
                      </Link>
                      <form action={logout}>
                        <button className="w-full flex gap-3 px-5 py-2 text-left text-red-500 hover:bg-gray-100 transition">
                          <LogOut className="w-5 h-5" /> Log out
                        </button>
                      </form>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {mobileMenuOpen && userId && (
        <div
          ref={mobileRef}
          className="md:hidden bg-white border-t shadow-md w-full absolute top-16 left-0 z-50 dark:bg-zinc-900 dark:text-gray-200"
        >
          <div className="px-4 py-3 border-b">
            <SearchBar />
          </div>

          {navLinks.map((link: navLinkType) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-3 border-b flex items-center gap-2 transition ${isActive(
                link.href
              )} hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-200`}
            >
              {link.icon && <link.icon className="w-5 h-5" />} {link.label}
            </Link>
          ))}

          <Link
            href={`/profile/${userId}`}
            className={`px-4 py-3 border-b flex items-center gap-2 transition ${isActive(
              `/profile/${userId}`
            )} hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-200`}
          >
            <User className="w-5 h-5" /> Profile
          </Link>

          <Link
            href="/diaries"
            className={`px-4 py-3 border-b flex items-center gap-2 transition ${isActive(
              "/diaries"
            )} hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-200`}
          >
            <NotebookPen className="w-5 h-5" /> Diaries
          </Link>
          <div
            className={`mx-2 py-2 border-b flex items-center transition
             hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-800 dark:text-gray-200`}
          >
            <ThemeToggle /> Theme Mode
          </div>
          <form action={logout}>
            <button className="w-full px-4 py-3 text-left text-red-500 hover:bg-gray-100 hover:text-red-600 flex items-center gap-2 transition">
              <LogOut className="w-5 h-5" /> Log out
            </button>
          </form>
        </div>
      )}

      {!userId && (
        <div className="md:hidden bg-white border-t shadow-md w-full absolute top-16 left-0 z-50 flex justify-center gap-4 px-4 py-3 dark:bg-zinc-900 dark:text-gray-200">
          {authLinks.map((link: navLinkType) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-gray-700 hover:text-blue-500 transition dark:text-gray-200 dark:hover:text-blue-400 ${isActive(
                link.href
              )}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
