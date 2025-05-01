"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Eye, FolderOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { legislationApi, Legislation } from "@/api/legislation";
import CategoryLegislationSkeleton from "./CategoryLegislationSkeleton";

interface CategoryLegislationSectionProps {
  onViewMore: () => void;
}

export default function CategoryLegislationSection({
  onViewMore,
}: CategoryLegislationSectionProps) {
  const [activeTab, setActiveTab] = useState("defense");
  const [isLoading, setIsLoading] = useState(false);
  const [categoryData, setCategoryData] = useState<
    Record<string, Legislation[]>
  >({});
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await legislationApi.getCategoryLegislations(activeTab);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCategoryData((prev) => ({ ...prev, [activeTab]: data }));
      setIsLoading(false);
    };

    if (!categoryData[activeTab]) {
      fetchData();
    }
  }, [activeTab]);

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
          {["defense", "education", "economy", "welfare", "environment"].map(
            (category) => (
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
            )
          )}
        </TabsList>

        {["defense", "education", "economy", "welfare", "environment"].map(
          (category) => (
            <TabsContent key={category} value={category} className="space-y-4">
              {isLoading ? (
                Array.from({ length: 3 }).map((_, idx) => (
                  <CategoryLegislationSkeleton key={idx} />
                ))
              ) : (categoryData[category]?.length ?? 0) === 0 ? (
                <p className="w-full h-full text-center text-gray-500 py-6">
                  해당 카테고리에 대한 입법예고안이 없습니다.
                </p>
              ) : (
                (categoryData[category] || []).map((legislation, index) => (
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
                              <span>{legislation.opinionCounts}</span>
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
                                href={legislation.opinionUrl}
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
                ))
              )}
            </TabsContent>
          )
        )}
      </Tabs>
    </section>
  );
}
