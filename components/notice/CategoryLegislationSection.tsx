"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Eye, FolderOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

// 더미 데이터
const categoryData = {
  education: [
    {
      id: 1,
      title: "고등교육법 일부개정법률안",
      proposer: "김지수",
      party: "민주당",
      date: "2023-05-15",
      comments: 42,
      views: 531,
      detailLink: "",
    },
    {
      id: 2,
      title: "학교폭력예방법 일부개정법률안",
      proposer: "이민준",
      party: "국민의힘",
      date: "2023-05-12",
      comments: 78,
      views: 892,
      detailLink: "",
    },
    {
      id: 3,
      title: "사립학교법 일부개정법률안",
      proposer: "박서연",
      party: "정의당",
      date: "2023-05-10",
      comments: 36,
      views: 412,
      detailLink: "",
    },
  ],
  economy: [
    {
      id: 1,
      title: "중소기업 지원법 일부개정법률안",
      proposer: "최준호",
      party: "민주당",
      date: "2023-05-14",
      comments: 56,
      views: 678,
      detailLink: "",
    },
    {
      id: 2,
      title: "금융소비자 보호법 일부개정법률안",
      proposer: "정다은",
      party: "국민의힘",
      date: "2023-05-11",
      comments: 63,
      views: 724,
      detailLink: "",
    },
    {
      id: 3,
      title: "공정거래법 일부개정법률안",
      proposer: "김현우",
      party: "정의당",
      date: "2023-05-09",
      comments: 47,
      views: 583,
      detailLink: "",
    },
  ],
  welfare: [
    {
      id: 1,
      title: "노인복지법 일부개정법률안",
      proposer: "이지은",
      party: "민주당",
      date: "2023-05-13",
      comments: 51,
      views: 612,
      detailLink: "",
    },
    {
      id: 2,
      title: "장애인복지법 일부개정법률안",
      proposer: "박민석",
      party: "국민의힘",
      date: "2023-05-10",
      comments: 68,
      views: 743,
      detailLink: "",
    },
    {
      id: 3,
      title: "아동복지법 일부개정법률안",
      proposer: "김소연",
      party: "정의당",
      date: "2023-05-08",
      comments: 42,
      views: 521,
      detailLink: "",
    },
  ],
  environment: [
    {
      id: 1,
      title: "대기환경보전법 일부개정법률안",
      proposer: "정태호",
      party: "민주당",
      date: "2023-05-12",
      comments: 45,
      views: 567,
      detailLink: "",
    },
    {
      id: 2,
      title: "자원순환기본법 일부개정법률안",
      proposer: "이수진",
      party: "국민의힘",
      date: "2023-05-09",
      comments: 39,
      views: 482,
      detailLink: "",
    },
    {
      id: 3,
      title: "환경영향평가법 일부개정법률안",
      proposer: "김동현",
      party: "정의당",
      date: "2023-05-07",
      comments: 31,
      views: 423,
      detailLink: "",
    },
  ],
  defense: [
    {
      id: 1,
      title: "병역법 일부개정법률안",
      proposer: "박준영",
      party: "민주당",
      date: "2023-05-11",
      comments: 87,
      views: 934,
      detailLink: "",
    },
    {
      id: 2,
      title: "국방개혁법 일부개정법률안",
      proposer: "김태우",
      party: "국민의힘",
      date: "2023-05-08",
      comments: 64,
      views: 712,
      detailLink: "",
    },
    {
      id: 3,
      title: "군인사법 일부개정법률안",
      proposer: "이지훈",
      party: "정의당",
      date: "2023-05-06",
      comments: 52,
      views: 631,
      detailLink: "",
    },
  ],
};

interface CategoryLegislationSectionProps {
  onViewMore: () => void;
}

export default function CategoryLegislationSection({
  onViewMore,
}: CategoryLegislationSectionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("defense");
  const router = useRouter();

  const handleCategoryMore = () => {
    router.push(`/legislation/category/${activeTab}`);
  };

  const categoryIcons = {
    defense: "🛡️",
    education: "📚",
    economy: "💰",
    welfare: "🏥",
    environment: "🌱",
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-green-400 to-teal-500 p-2 rounded-lg text-white">
            <FolderOpen className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-bold">카테고리별 입법예고안</h2>
        </div>
        <Button
          variant="outline"
          className="border-blue-500 text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200 font-semibold inline-flex items-center gap-1 px-4 py-2 rounded-full shadow-sm"
          onClick={handleCategoryMore}
        >
          ﹢더 보기 <span className="text-sm">➔</span>
        </Button>
      </div>

      <Tabs
        defaultValue="defense"
        onValueChange={setActiveTab}
        className="bg-white rounded-xl shadow-md p-4"
      >
        <TabsList className="grid grid-cols-5 mb-6 bg-gray-100 p-1 rounded-lg">
          {Object.keys(categoryData).map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-md transition-all duration-300"
            >
              <span className="mr-2">
                {categoryIcons[category as keyof typeof categoryIcons]}
              </span>
              {category === "defense"
                ? "국방"
                : category === "education"
                ? "교육"
                : category === "economy"
                ? "경제"
                : category === "welfare"
                ? "복지"
                : "환경"}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(categoryData).map(([category, legislations]) => (
          <TabsContent key={category} value={category} className="space-y-4">
            {isLoading
              ? Array.from({ length: 3 }).map((_, idx) => (
                  <Card
                    key={idx}
                    className="bg-gray-100 animate-pulse shadow-md"
                  >
                    <CardContent className="p-4 space-y-4">
                      <div className="h-6 bg-gray-300 rounded w-3/4" />
                      <div className="flex justify-between">
                        <div className="h-4 bg-gray-300 rounded w-1/3" />
                        <div className="h-4 bg-gray-300 rounded w-1/4" />
                      </div>
                      <div className="flex justify-between items-centser mt-2">
                        <div className="flex gap-4">
                          <div className="h-4 w-8 bg-gray-300 rounded" />
                          <div className="h-4 w-8 bg-gray-300 rounded" />
                        </div>
                        <div className="h-8 w-24 bg-gray-300 rounded" />
                      </div>
                    </CardContent>
                  </Card>
                ))
              : legislations.map((legislation, index) => (
                  <motion.div
                    key={legislation.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-white border-opacity-70 shadow hover:shadow-lg hover:scale-[1.01] transition-all duration-300 rounded-lg overflow-hidden">
                      <CardContent className="p-4 space-y-2">
                        <div>
                          <h3 className="font-bold text-gray-800">
                            {legislation.title}
                          </h3>
                          <div className="flex justify-between">
                            <p className="text-sm text-gray-500">
                              {legislation.proposer} ({legislation.party})
                            </p>
                            <p className="text-sm text-gray-500">
                              {legislation.date}
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-4 w-4" />
                              <span>{legislation.comments}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              <span>{legislation.views}</span>
                            </div>
                          </div>
                          <section className="flex gap-2">
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md flex-1"
                              onClick={() =>
                                router.push(
                                  `/legislation/detail/${legislation.id}`
                                )
                              }
                            >
                              자세히 보기
                            </Button>
                            <Button
                              asChild
                              size="sm"
                              className="bg-white text-blue-600 border border-blue-500 hover:bg-blue-200 shadow-sm flex-1"
                            >
                              <a
                                href={legislation.detailLink}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                의견 내러 가기
                              </a>
                            </Button>
                          </section>{" "}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
