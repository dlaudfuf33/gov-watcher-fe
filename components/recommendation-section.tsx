import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, TrendingUp, Flag } from "lucide-react";
import PoliticianCard from "@/components/politician-card";
import { Politicians } from "@/lib/politiciansData";

export default function RecommendationSection() {
  // 추천 의원 데이터 (실제로는 API 호출 등으로 가져올 수 있음)
  const relatedMembers = Politicians.slice(0, 4);
  const activeMembers = Politicians.slice(4, 8);
  const newMembers = Politicians.slice(8, 12);

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">추천 의원</h2>

      <Tabs defaultValue="related">
        <TabsList className="mb-6">
          <TabsTrigger value="related" className="flex items-center">
            <Brain className="h-4 w-4 mr-2" />
            관심 법안 기반
          </TabsTrigger>
          <TabsTrigger value="active" className="flex items-center">
            <TrendingUp className="h-4 w-4 mr-2" />
            최근 활동 활발
          </TabsTrigger>
          <TabsTrigger value="new" className="flex items-center">
            <Flag className="h-4 w-4 mr-2" />첫 발의 초선 의원
          </TabsTrigger>
        </TabsList>

        <TabsContent value="related">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>
                이 법안에 관심 있다면 이 의원도 관심 가질 수 있어요!
              </CardTitle>
              <CardDescription>
                최근 관심 있게 본 법안과 관련된 의원들을 추천해 드립니다.
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedMembers.map((politician) => (
              <PoliticianCard key={politician.id} politician={politician} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>최근 활동이 활발한 의원</CardTitle>
              <CardDescription>
                최근 한 달간 법안 발의, 토론 참여 등 활동이 많은 의원들입니다.
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {activeMembers.map((politician) => (
              <PoliticianCard key={politician.id} politician={politician} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="new">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>첫 발의에 도전한 초선 의원</CardTitle>
              <CardDescription>
                처음으로 법안을 발의한 초선 의원들을 소개합니다.
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newMembers.map((politician) => (
              <PoliticianCard key={politician.id} politician={politician} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
