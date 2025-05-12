"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PoliticianDetail } from "@/types/politiciansType";

interface PoliticianBasicInfoProps {
  politicianDetail: PoliticianDetail;
}

export default function PoliticianPoliticalHistory({
  politicianDetail,
}: PoliticianBasicInfoProps) {
  const termHistory =
    politicianDetail.terms?.map((term) => ({
      term: `${term.unit}대`,
      party: term.party,
      district: term.constituency,
      position: term.jobTitle || "국회의원",
      committees: term.committees ? term.committees.split(",") : [],
    })) ?? [];

  return (
    <Card className="border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          🗳️ 정치 이력
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={termHistory[0]?.term.replace("대", "") || ""}>
          <TabsList className="mb-4 bg-gray-50">
            {termHistory.map((term) => (
              <TabsTrigger key={term.term} value={term.term.replace("대", "")}>
                {term.term}
              </TabsTrigger>
            ))}
          </TabsList>

          {termHistory.map((term) => (
            <TabsContent key={term.term} value={term.term.replace("대", "")}>
              <div className="space-y-3">
                <InfoRow
                  label="소속 정당"
                  value={
                    <Badge
                      className={
                        term.party.includes("민주")
                          ? "bg-party-blue-bg text-party-blue-text"
                          : "bg-party-red-bg text-party-red-text"
                      }
                    >
                      {term.party}
                    </Badge>
                  }
                />
                <InfoRow label="지역구" value={term.district} />
                <InfoRow label="직책" value={term.position} />
                <div className="grid grid-cols-3 py-2">
                  <span className="text-gray-500 text-sm">상임위원회</span>
                  <div className="col-span-2 flex flex-wrap gap-1">
                    {term.committees.length > 0 ? (
                      term.committees.map((committee) => (
                        <Badge
                          key={committee}
                          variant="outline"
                          className="bg-gray-50"
                        >
                          {committee}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-gray-400 text-sm">없음</span>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-3 border-b border-gray-100 py-2">
      <span className="text-gray-500 text-sm">{label}</span>
      <span className="col-span-2">{value}</span>
    </div>
  );
}
