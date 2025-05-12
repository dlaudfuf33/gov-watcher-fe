"use client";

import { useState, useRef, useEffect } from "react";
import { Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface QuadrantShareButtonProps {
  url?: string;
  title?: string;
  description?: string;
  className?: string;
}

export function QuadrantShareButton({
  url = typeof window !== "undefined" ? window.location.href : "",
  title = "정부야모하니 - 입법 참여 플랫폼",
  description = "대한민국 입법 참여 플랫폼에서 법안을 확인하고 의견을 남겨보세요.",
  className,
}: QuadrantShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeQuadrant, setActiveQuadrant] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  // 버튼 위치를 기준으로 메뉴 위치 계산
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.top + rect.height / 2,
        left: rect.left + rect.width / 2,
      });
    }
  }, [isOpen]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("클립보드 복사 실패:", err);
    }
  };

  const handleShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const encodedDesc = encodeURIComponent(description);

    let shareUrl = "";

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
        break;
      case "instagram":
        // 인스타그램은 직접 공유 URL이 없어 일반적으로 모바일 앱으로 연결
        alert("인스타그램은 모바일 앱에서 공유해주세요.");
        return;
      case "github":
        // GitHub 공유는 일반적으로 없지만, 프로필로 연결할 수 있음
        shareUrl = "https://github.com/";
        break;
      case "discord":
        // Discord 공유 URL
        shareUrl = `https://discord.com/channels/@me`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
  };

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 공유 옵션 정의
  const shareOptions = [
    {
      id: "instagram",
      name: "인스타그램",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      color: "bg-gradient-to-tr from-purple-600 to-pink-500",
      textColor: "text-white",
      onClick: () => handleShare("instagram"),
    },
    {
      id: "twitter",
      name: "트위터",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      ),
      color: "bg-[#1DA1F2]",
      textColor: "text-white",
      onClick: () => handleShare("twitter"),
    },
    {
      id: "github",
      name: "깃허브",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      ),
      color: "bg-gray-900",
      textColor: "text-white",
      onClick: () => handleShare("github"),
    },
    {
      id: "discord",
      name: "디스코드",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
        </svg>
      ),
      color: "bg-[#5865F2]",
      textColor: "text-white",
      onClick: () => handleShare("discord"),
    },
  ];

  return (
    <div className={cn("relative", className)} ref={menuRef}>
      <Button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 z-10 relative",
          isOpen ? "bg-white shadow-md" : "bg-white shadow-md"
        )}
      >
        <Share2 className="h-4 w-4 text-gray-700" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* 배경 오버레이 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* 4분할 원형 메뉴 */}
            <motion.div
              className="fixed z-[9999] w-32 h-32"
              style={{
                top: menuPosition.top,
                left: menuPosition.left,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="relative w-full h-full">
                {/* 중앙 공유 아이콘 */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center z-10 shadow-md">
                  <Share2 className="h-4 w-4 text-gray-700" />
                </div>

                {/* 4분할 영역 */}
                <div className="w-full h-full">
                  {shareOptions.map((option, index) => {
                    // 각 사분면의 위치 계산
                    const isTopLeft = index === 0;
                    const isTopRight = index === 1;
                    const isBottomLeft = index === 2;
                    const isBottomRight = index === 3;

                    return (
                      <motion.div
                        key={option.id}
                        className={cn(
                          "absolute w-1/2 h-1/2 flex items-center justify-center cursor-pointer transition-colors duration-200",
                          isTopLeft && "top-0 left-0 rounded-tl-full",
                          isTopRight && "top-0 right-0 rounded-tr-full",
                          isBottomLeft && "bottom-0 left-0 rounded-bl-full",
                          isBottomRight && "bottom-0 right-0 rounded-br-full",
                          activeQuadrant === option.id
                            ? option.color
                            : "bg-white"
                        )}
                        onMouseEnter={() => setActiveQuadrant(option.id)}
                        onMouseLeave={() => setActiveQuadrant(null)}
                        onClick={option.onClick}
                        whileHover={{ scale: 1.05 }}
                        style={{
                          transformOrigin: isTopLeft
                            ? "bottom right"
                            : isTopRight
                            ? "bottom left"
                            : isBottomLeft
                            ? "top right"
                            : "top left",
                        }}
                      >
                        <div
                          className={cn(
                            "flex items-center justify-center",
                            activeQuadrant === option.id
                              ? option.textColor
                              : "text-gray-600",
                            isTopLeft && "ml-3 mb-3",
                            isTopRight && "mr-3 mb-3",
                            isBottomLeft && "ml-3 mt-3",
                            isBottomRight && "mr-3 mt-3"
                          )}
                        >
                          {option.icon}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
