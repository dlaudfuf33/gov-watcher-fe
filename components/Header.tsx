"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu, X, User, Bell, Sun, Moon, Link } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-md" : "bg-white"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
          <a
            href="/"
            className="flex items-center gap-2"
            onClick={() => router.push("/")}
          >
            <div className="bg-gradient-to-tr from-indigo-600 to-rose-600 text-white p-2 rounded-lg">
              <span className="font-bold">정모</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              정부야모하니
            </span>
          </a>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a
            href="/legislation"
            className="text-sm font-medium hover:text-blue-600 transition-colors relative group"
          >
            입법예고안
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a
            href="/politicians"
            className="text-sm font-medium hover:text-blue-600 transition-colors relative group"
          >
            국회의원
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a
            href="/"
            className="text-sm font-medium hover:text-blue-600 transition-colors relative group"
          >
            통계
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a
            href="#"
            className="text-sm font-medium hover:text-blue-600 transition-colors relative group"
          >
            커뮤니티
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>

        <div className="flex items-center gap-3">
          {/* <div className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="법안 검색..."
              className="w-[200px] pl-8 md:w-[300px] border-gray-200 focus:border-blue-500 rounded-full transition-all"
            />
          </div> */}

          {/* 다크모드 토글 */}
          {/* <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-blue-100 hover:text-blue-600 transition-colors"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button> */}

          {/* 알림 버튼 */}
          {/* <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-blue-100 hover:text-blue-600 transition-colors"
          >
            <Bell className="h-5 w-5" />
          </Button> */}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-blue-100 hover:text-blue-600 transition-colors"
              >
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 p-2 rounded-xl shadow-lg border-gray-200"
            >
              <DropdownMenuItem className="rounded-lg cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition-colors">
                로그인
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-lg cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition-colors">
                회원가입
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="border-t md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                <a
                  href="/legislation"
                  className="text-sm font-medium hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-blue-50"
                >
                  입법예고안
                </a>
                <a
                  href="/politician"
                  className="text-sm font-medium hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-blue-50"
                >
                  국회의원
                </a>
                <a
                  href="/"
                  className="text-sm font-medium hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-blue-50"
                >
                  통계
                </a>
                <a
                  href="#"
                  className="text-sm font-medium hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-blue-50"
                >
                  커뮤니티
                </a>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
