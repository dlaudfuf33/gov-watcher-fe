"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnimatedLikeButtonProps {
  initialCount?: number;
  onLike?: (liked: boolean) => void;
  size?: "sm" | "md" | "lg";
  className?: string;
  showCount?: boolean;
  colorScheme?: "blue" | "red" | "purple" | "gradient";
}

export function AnimatedLikeButton({
  initialCount = 0,
  onLike,
  size = "md",
  className,
  showCount = true,
  colorScheme = "gradient",
}: AnimatedLikeButtonProps) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(initialCount);
  const [isAnimating, setIsAnimating] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  // 버튼 크기에 따른 스타일 설정
  const sizeStyles = {
    sm: {
      button: "h-8 px-3 text-xs",
      icon: "h-3.5 w-3.5",
      particles: "w-16 h-16",
    },
    md: {
      button: "h-10 px-4 text-sm",
      icon: "h-4 w-4",
      particles: "w-24 h-24",
    },
    lg: {
      button: "h-12 px-5 text-base",
      icon: "h-5 w-5",
      particles: "w-32 h-32",
    },
  };

  // 색상 스키마에 따른 스타일 설정
  const colorStyles = {
    blue: {
      base: "border-blue-200 text-blue-600",
      active: "bg-blue-50 border-blue-300",
      hover: "hover:bg-blue-50 hover:border-blue-300",
      icon: "text-blue-600",
      activeIcon: "text-blue-600",
      particles: ["#3b82f6", "#60a5fa", "#93c5fd"],
    },
    red: {
      base: "border-red-200 text-red-600",
      active: "bg-red-50 border-red-300",
      hover: "hover:bg-red-50 hover:border-red-300",
      icon: "text-red-600",
      activeIcon: "text-red-600",
      particles: ["#ef4444", "#f87171", "#fca5a5"],
    },
    purple: {
      base: "border-purple-200 text-purple-600",
      active: "bg-purple-50 border-purple-300",
      hover: "hover:bg-purple-50 hover:border-purple-300",
      icon: "text-purple-600",
      activeIcon: "text-purple-600",
      particles: ["#8b5cf6", "#a78bfa", "#c4b5fd"],
    },
    gradient: {
      base: "border-blue-200 text-blue-600",
      active: "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-300",
      hover: "hover:bg-blue-50 hover:border-blue-300",
      icon: "text-blue-600",
      activeIcon:
        "bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent",
      particles: ["#3b82f6", "#6366f1", "#8b5cf6"],
    },
  };

  const handleLike = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setLiked((prev) => !prev);
    setCount((prev) => (liked ? prev - 1 : prev + 1));

    if (!liked) {
      createParticles();
    }

    if (onLike) {
      onLike(!liked);
    }

    // 애니메이션 완료 후 상태 초기화
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  const createParticles = () => {
    if (!particlesRef.current || !buttonRef.current) return;

    const particlesContainer = particlesRef.current;
    particlesContainer.innerHTML = "";

    const buttonRect = buttonRef.current.getBoundingClientRect();
    const centerX = buttonRect.width / 2;
    const centerY = buttonRect.height / 2;

    // 파티클 생성
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement("div");
      particle.className = "absolute rounded-full";

      // 랜덤 크기 (3px ~ 6px)
      const size = Math.random() * 3 + 3;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      // 랜덤 색상
      const colors = colorStyles[colorScheme].particles;
      particle.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];

      // 랜덤 위치 (중앙에서 시작)
      particle.style.left = `${centerX}px`;
      particle.style.top = `${centerY}px`;

      // 랜덤 방향으로 이동하는 애니메이션
      const angle = Math.random() * Math.PI * 2;
      const distance = 30 + Math.random() * 40;
      const destinationX = centerX + Math.cos(angle) * distance;
      const destinationY = centerY + Math.sin(angle) * distance;

      // 파티클 추가
      particlesContainer.appendChild(particle);

      // 애니메이션 적용
      particle.animate(
        [
          { opacity: 1, transform: "scale(1)" },
          {
            opacity: 0,
            transform: `translate(${destinationX - centerX}px, ${
              destinationY - centerY
            }px) scale(0)`,
          },
        ],
        {
          duration: 700 + Math.random() * 300,
          easing: "cubic-bezier(0.2, 0.9, 0.3, 1)",
          fill: "forwards",
        }
      );
    }
  };

  return (
    <div className="relative inline-block">
      <motion.button
        ref={buttonRef}
        onClick={handleLike}
        className={cn(
          "relative overflow-hidden rounded-full border flex items-center justify-center gap-1.5 transition-all duration-300",
          sizeStyles[size].button,
          colorStyles[colorScheme].base,
          liked
            ? colorStyles[colorScheme].active
            : colorStyles[colorScheme].hover,
          className
        )}
        whileTap={{ scale: 0.95 }}
        disabled={isAnimating}
      >
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={liked ? "liked" : "unliked"}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Heart
                className={cn(
                  sizeStyles[size].icon,
                  liked
                    ? colorStyles[colorScheme].activeIcon
                    : colorStyles[colorScheme].icon,
                  liked ? "fill-current" : "fill-none"
                )}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {showCount && (
          <AnimatePresence mode="wait">
            <motion.span
              key={count}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "font-medium",
                liked && colorStyles[colorScheme].activeIcon
              )}
            >
              {count}
            </motion.span>
          </AnimatePresence>
        )}

        {/* 물결 효과 */}
        {liked && (
          <motion.div
            initial={{ scale: 0, opacity: 0.7 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 rounded-full bg-current"
            style={{ backgroundColor: colorStyles[colorScheme].particles[0] }}
          />
        )}
      </motion.button>

      {/* 파티클 컨테이너 */}
      <div
        ref={particlesRef}
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none",
          sizeStyles[size].particles
        )}
      ></div>
    </div>
  );
}
