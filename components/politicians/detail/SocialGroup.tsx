"use client";

import { useState } from "react";
import {
  Phone,
  Mail,
  Twitter,
  Facebook,
  Youtube,
  Globe,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { PoliticianDetail } from "@/types/politiciansType";
import { toast } from "react-toastify";

interface SocialLink {
  name: string;
  icon: React.ReactNode;
  url: string | (() => void);
  color: string;
  isAction?: boolean;
  isAvailable?: boolean;
}

interface SocialMediaIconsProps {
  politicianDetail: PoliticianDetail;
}

export default function SocialMediaIcons({
  politicianDetail,
}: SocialMediaIconsProps) {
  const [activeIcon, setActiveIcon] = useState<string | null>(null);

  const isValidUrl = (url: string | null | undefined): boolean => {
    return url !== null && url !== undefined && url !== "";
  };

  const handlePhoneCopy = () => {
    if (politicianDetail?.contact?.phone) {
      navigator.clipboard.writeText(politicianDetail.contact.phone);
      toast("📋 클립보드에 복사되었어요!");
    }
  };

  const socialLinks: SocialLink[] = [
    {
      name: "전화번호",
      icon: <Phone className="h-5 w-5" />,
      url: handlePhoneCopy,
      color: "bg-green-600",
      isAction: true,
      isAvailable: isValidUrl(politicianDetail?.contact?.phone),
    },
    {
      name: "이메일",
      icon: <Mail className="h-5 w-5" />,
      url: `mailto:${politicianDetail?.contact?.email || ""}`,
      color: "bg-red-500",
      isAvailable: isValidUrl(politicianDetail?.contact?.email),
    },
    {
      name: "트위터",
      icon: <Twitter className="h-5 w-5" />,
      url: politicianDetail?.sns?.twitter || "#",
      color: "bg-blue-400",
      isAvailable: isValidUrl(politicianDetail?.sns?.twitter),
    },
    {
      name: "페이스북",
      icon: <Facebook className="h-5 w-5" />,
      url: politicianDetail?.sns?.facebook || "#",
      color: "bg-blue-600",
      isAvailable: isValidUrl(politicianDetail?.sns?.facebook),
    },
    {
      name: "유튜브",
      icon: <Youtube className="h-5 w-5" />,
      url: politicianDetail?.sns?.youtube || "#",
      color: "bg-red-600",
      isAvailable: isValidUrl(politicianDetail?.sns?.youtube),
    },
    {
      name: "블로그",
      icon: <Globe className="h-5 w-5" />,
      url: politicianDetail?.contact?.homepage || "#",
      color: "bg-emerald-500",
      isAvailable: isValidUrl(politicianDetail?.contact?.homepage),
    },
  ];

  return (
    <div className="flex items-center justify-center gap-4 my-4 relative">
      {socialLinks.map((social) => (
        <div
          key={social.name}
          className="relative"
          onMouseEnter={() => setActiveIcon(social.name)}
          onMouseLeave={() => setActiveIcon(null)}
        >
          {/* Tooltip */}
          <div
            className={cn(
              "absolute -top-10 left-1/2 transform -translate-x-1/2 z-10 transition-all duration-200 ease-in-out",
              activeIcon === social.name
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-1 pointer-events-none"
            )}
          >
            <div
              className={cn(
                "px-2 py-1 rounded text-white text-xs whitespace-nowrap",
                social.isAvailable ? social.color : "bg-gray-500"
              )}
            >
              {social.isAvailable ? social.name : `${social.name} 없음`}
            </div>
            <div
              className={cn(
                "w-2 h-2 rotate-45 absolute -bottom-1 left-1/2 transform -translate-x-1/2",
                social.isAvailable ? social.color : "bg-gray-500"
              )}
            ></div>
          </div>

          {/* Icon - Either as action or link */}
          {social.isAction ? (
            <button
              onClick={
                social.isAvailable && typeof social.url === "function"
                  ? social.url
                  : () => {}
              }
              disabled={!social.isAvailable}
              className={cn(
                "flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ease-in-out transform",
                activeIcon === social.name && social.isAvailable
                  ? cn(social.color, "text-white shadow-lg scale-110")
                  : social.isAvailable
                  ? "bg-white text-gray-600 shadow-md hover:shadow-lg hover:animate-bounce-subtle cursor-pointer"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              )}
            >
              {social.isAvailable ? (
                social.icon
              ) : (
                <XCircle className="h-5 w-5" />
              )}
            </button>
          ) : (
            <a
              href={
                social.isAvailable && typeof social.url === "string"
                  ? social.url
                  : "#"
              }
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => !social.isAvailable && e.preventDefault()}
              className={cn(
                "flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ease-in-out transform",
                activeIcon === social.name && social.isAvailable
                  ? cn(social.color, "text-white shadow-lg scale-110")
                  : social.isAvailable
                  ? "bg-white text-gray-600 shadow-md hover:shadow-lg hover:animate-bounce-subtle cursor-pointer"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              )}
            >
              {social.isAvailable ? (
                social.icon
              ) : (
                <XCircle className="h-5 w-5" />
              )}
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
