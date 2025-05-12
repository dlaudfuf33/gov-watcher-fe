"use client";

import { useState, useEffect } from "react";
import { suggestionApi } from "@/api/suggestion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ThumbsUp } from "lucide-react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

interface Suggestion {
  id: number;
  title: string;
  content: string;
  type: string;
  category: string;
  status: "pending" | "reviewing" | "completed" | "rejected";
  date: string;
  votes: number;
  hasVoted?: boolean;
}

export default function SuggestionList() {
  const [visitorId, setVisitorId] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const loadFingerprint = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      setVisitorId(result.visitorId);
    };
    loadFingerprint();
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      setIsLoading(true);
      try {
        const data = await suggestionApi.fetchSuggestions(filter);
        setSuggestions(
          data.map((s: any) => ({
            ...s,
            title:
              s.content.length > 30
                ? s.content.slice(0, 30) + "..."
                : s.content,
          }))
        );
      } catch (err) {
        console.error("건의사항 목록 로딩 실패", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuggestions();
  }, [filter]);

  const handleVote = async (id: number) => {
    if (!visitorId) return;
    const item = suggestions.find((s) => s.id === id);
    const up = !item?.hasVoted;
    try {
      const updated = await suggestionApi.voteSuggestion(id, up, visitorId);
      setSuggestions((prev) =>
        prev.map((s) =>
          s.id === id
            ? {
                ...s,
                votes: up ? s.votes + 1 : s.votes - 1,
                hasVoted: up,
              }
            : s
        )
      );
    } catch (err) {
      console.error("추천 실패", err);
    }
  };

  const filteredSuggestions =
    filter === "all"
      ? suggestions
      : suggestions.filter((suggestion) => suggestion.status === filter);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 border-yellow-200"
          >
            검토 대기
          </Badge>
        );
      case "reviewing":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200"
          >
            검토 중
          </Badge>
        );
      case "completed":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            완료
          </Badge>
        );
      case "rejected":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200"
          >
            반려
          </Badge>
        );
      default:
        return null;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "feature":
        return (
          <Badge className="bg-purple-100 text-purple-800">기능 요청</Badge>
        );
      case "bug":
        return <Badge className="bg-red-100 text-red-800">버그 신고</Badge>;
      case "improvement":
        return <Badge className="bg-blue-100 text-blue-800">개선 제안</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">기타</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">건의사항 목록</h2>
          <Skeleton className="h-10 w-40" />
        </div>
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-3">
            <div className="flex justify-between">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-6 w-20" />
            </div>
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-16 w-full" />
            <div className="flex justify-between items-center">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-20" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">건의사항 목록</h2>
        <div className="flex gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
            className={filter === "all" ? "bg-blue-600" : ""}
          >
            전체
          </Button>
          <Button
            variant={filter === "pending" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("pending")}
            className={filter === "pending" ? "bg-yellow-600" : ""}
          >
            대기
          </Button>
          <Button
            variant={filter === "reviewing" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("reviewing")}
            className={filter === "reviewing" ? "bg-blue-600" : ""}
          >
            검토중
          </Button>
          <Button
            variant={filter === "completed" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("completed")}
            className={filter === "completed" ? "bg-green-600" : ""}
          >
            완료
          </Button>
        </div>
      </div>

      {filteredSuggestions.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>표시할 건의사항이 없습니다.</p>
        </div>
      ) : (
        filteredSuggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className="border rounded-lg p-4 space-y-3 bg-white hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-lg">{suggestion.title}</h3>
              {getStatusBadge(suggestion.status)}
            </div>
            <div className="flex gap-2 items-center text-sm text-gray-500">
              <span>{suggestion.date}</span>
              <span>•</span>
              {getTypeBadge(suggestion.type)}
              <Badge variant="outline">{suggestion.category}</Badge>
            </div>
            <p className="text-gray-700">{suggestion.content}</p>
            <div className="flex justify-between items-center pt-2">
              <Button
                variant="outline"
                size="sm"
                className={`flex items-center gap-1 ${
                  suggestion.hasVoted
                    ? "bg-blue-50 text-blue-600 border-blue-200"
                    : ""
                }`}
                onClick={() => handleVote(suggestion.id)}
              >
                <ThumbsUp className="h-4 w-4" />
                <span>추천 {suggestion.votes}</span>
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
