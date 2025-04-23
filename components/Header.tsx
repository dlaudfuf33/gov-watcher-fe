"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-[#f5f5f5] backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold">
            정부야
            <span className="bg-gradient-to-r from-blue-500 to-red-500 text-transparent bg-clip-text">
              뭐하니
            </span>
          </span>
        </Link>
        <nav className="hidden md:flex space-x-8">
          <Link
            href="/"
            className="text-gray-700 hover:text-blue-500 transition-colors"
          >
            홈
          </Link>
          <Link
            href="/notices"
            className="text-gray-700 hover:text-blue-500 transition-colors"
          >
            입법예고
          </Link>
          <Link
            href="/politicians"
            className="text-gray-700 hover:text-blue-500 transition-colors"
          >
            국회의원
          </Link>
          {/* <Link
            href="#"
            className="text-gray-700 hover:text-blue-500 transition-colors"
          >
            후원하기
          </Link> */}
        </nav>
        <div className="md:hidden relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700"
            aria-label="메뉴 열기"
            title="메뉴 열기"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-md py-2 transition-opacity duration-200 ease-out z-50">
              <Link
                href="/"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                홈
              </Link>
              <Link
                href="/notices"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                입법예고
              </Link>
              <Link
                href="/politicians"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                국회의원
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
