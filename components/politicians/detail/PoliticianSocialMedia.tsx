"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Twitter, Facebook, Youtube, Rss } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PoliticianDetail } from "@/types/politiciansType";

interface PoliticianBasicInfoProps {
  politicianDetail: PoliticianDetail;
}

export default function PoliticianSocialMedia({
  politicianDetail,
}: PoliticianBasicInfoProps) {
  const socialMedia = {
    twitter: politicianDetail?.sns?.twitter || "",
    facebook: politicianDetail?.sns?.facebook || "",
    youtube: politicianDetail?.sns?.youtube || "",
    homepage: politicianDetail?.contact?.homepage || "",
  };

  const mediaItems = [
    {
      name: "트위터",
      icon: <Twitter className="h-4 w-4 mr-2 text-blue-400" />,
      link: socialMedia.twitter,
    },
    {
      name: "페이스북",
      icon: <Facebook className="h-4 w-4 mr-2 text-blue-600" />,
      link: socialMedia.facebook,
    },
    {
      name: "유튜브",
      icon: <Youtube className="h-4 w-4 mr-2 text-red-600" />,
      link: socialMedia.youtube,
    },

    {
      name: "홈페이지",
      icon: <Globe className="h-4 w-4 mr-2 text-purple-600" />,
      link: socialMedia.homepage,
    },
  ];

  return (
    <Card className="border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">🌐 SNS</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mediaItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between border-b border-gray-100 py-2 last:border-0"
            >
              <div className="flex items-center">
                {item.icon}
                <span>{item.name}</span>
              </div>
              {item.link ? (
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="h-7 text-xs">
                    바로가기
                  </Button>
                </a>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  disabled
                  className="h-7 text-xs"
                >
                  없음
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
