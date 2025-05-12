"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Eye, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { legislationApi, Legislation } from "@/api/legislation";
import DeadlineLegislationSkeleton from "@/components/legislation/DeadlineLegislationSkeleton";

interface DeadlineLegislationSectionProps {
  onViewMore: () => void;
}

export default function DeadlineLegislationSection({
  onViewMore,
}: DeadlineLegislationSectionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [legislations, setLegislations] = useState<Legislation[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const { data } = await legislationApi.getLegislations({
        isServer: false,
        page: 1,
        size: 6,
        primarySort: "DEADLINE",
        secondarySort: "NONE",
      });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLegislations(data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-red-400 to-pink-500 p-2 rounded-lg text-white">
            <Clock className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-bold">마감 임박 입법예고안</h2>
        </div>
        <Button
          variant="outline"
          className="border-blue-500 text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200 font-semibold inline-flex items-center gap-1 px-4 py-2 rounded-full shadow-sm"
          onClick={onViewMore}
        >
          ﹢더 보기 <span className="text-sm">➔</span>
        </Button>
      </div>

      <div className="grid gap-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <DeadlineLegislationSkeleton key={index} />
          ))
        ) : legislations.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            표시할 입법예고안이 없습니다.
          </p>
        ) : (
          legislations.map((legislation, index) => (
            <motion.div
              key={legislation.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden bg-white border-opacity-70 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] rounded-xl">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="flex items-center justify-center p-4 bg-gradient-to-br from-red-50 to-pink-50 md:w-24">
                      <Badge
                        variant={
                          legislation.daysLeft <= 2 ? "destructive" : "default"
                        }
                        className={`text-lg font-bold px-3 py-1 ${
                          legislation.daysLeft <= 2
                            ? "bg-gradient-to-r from-red-500 to-pink-500"
                            : "bg-gradient-to-r from-orange-500 to-amber-500"
                        }`}
                      >
                        D-{legislation.daysLeft}
                      </Badge>
                    </div>

                    <div className="flex-1 p-4 space-y-2">
                      <div>
                        <h3 className="font-bold text-gray-800">
                          {legislation.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {legislation.proposer} ({legislation.party})
                        </p>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            <span>{legislation.opinionCounts}</span>
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
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </section>
  );
}
