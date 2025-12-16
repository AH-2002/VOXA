"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { UserType } from "@/app/users/types";
import { SearchSkeleton } from "../skeletons/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setResults([]);
    setActiveIndex(-1);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setResults([]);
        setActiveIndex(-1);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setActiveIndex(-1);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setLoading(true);
      const res = await fetch(`/api/search?q=${query}`);
      const data = await res.json();
      setResults(data);
      setLoading(false);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && activeIndex === -1 && query.trim().length > 0) {
      window.location.href = `/search?q=${query}`;
      return;
    }

    if (results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % results.length);
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev <= 0 ? results.length - 1 : prev - 1));
    }

    if (e.key === "Enter" && activeIndex >= 0) {
      window.location.href = `/profile/${results[activeIndex]._id}`;
    }
  };

  return (
    <div ref={wrapperRef} className="relative w-full flex flex-col">
      <div className="flex items-center gap-2 w-full mx-auto">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Find friends ..."
          value={query}
          className="flex-1"
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <Link href={`/search?q=${query}`}>
          <Button
            variant="submit"
            onClick={() => {
              setResults([]);
              setActiveIndex(-1);
            }}
            className="dark:bg-transparent dark:text-gray-200 dark:hover:text-gray-200 dark:hover:bg-blue-600 dark:transition"
          >
            <Search className="w-full h-5" />
          </Button>
        </Link>
      </div>

      {(results.length > 0 || loading) && (
        <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-80 overflow-y-auto dark:text-gray-200 dark:bg-zinc-900 dark:border-zinc-700">
          {loading ? (
            <SearchSkeleton />
          ) : (
            results.map((user, idx) => (
              <a
                key={user._id}
                href={`/profile/${user._id}`}
                className={`flex items-center gap-3 px-4 py-2 transition ${
                  activeIndex === idx
                    ? "bg-gray-200 dark:bg-gray-700"
                    : "hover:bg-gray-800 dark:hover:bg-gray-700"
                }`}
              >
                <img
                  src={user.profile_picture || "/user-picture.webp"}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span>
                  {user.first_name} {user.last_name}
                </span>
              </a>
            ))
          )}
        </div>
      )}
    </div>
  );
}
