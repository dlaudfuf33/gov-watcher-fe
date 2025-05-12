import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PartyDistributionChart from "@/components/charts/PartyDistributionChart";
import GenderAgeChart from "@/components/charts/GenderAgeChart";
import { dashboardApi } from "@/api/dashboard";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default async function PoliticianVisualizationSection() {
  const [partyDistributionResponse, demographicStatsResponse] =
    await Promise.all([
      dashboardApi.getPartyDistribution(),
      dashboardApi.getDemographicStats(),
    ]);

  return (
    <section className="mb-12 ">
      <Tabs defaultValue="party">
        <TabsList className="mb-4 bg-gray-100 p-1 rounded-lg">
          <TabsTrigger
            value="party"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-md transition-all duration-300"
          >
            정당별 의원 수
          </TabsTrigger>
          <TabsTrigger
            value="demographics"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-md transition-all duration-300"
          >
            성별/나이대
          </TabsTrigger>
          {/* <TabsTrigger value="region">지역구 분포</TabsTrigger> */}
        </TabsList>

        <TabsContent value="party">
          <Card>
            <CardHeader>
              <CardTitle>정당별 의원 수 비율</CardTitle>
            </CardHeader>
            <CardContent>
              <PartyDistributionChart
                butions={partyDistributionResponse.data.partyData}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demographics">
          <Card>
            <CardHeader>
              <CardTitle>국회의원 성별 / 연령대 분포</CardTitle>
            </CardHeader>
            <CardContent>
              <GenderAgeChart stats={demographicStatsResponse.data} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}
