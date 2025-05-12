import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { dashboardApi } from "@/api/dashboard";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import LegislationChart from "../charts/LegislationChart";

ChartJS.register(ArcElement, Tooltip, Legend);

export default async function BillVisualizationSection() {
  const [committeeStatsResponse] = await Promise.all([
    dashboardApi.getCommitteeStats(),
  ]);
  const [partyBillStatsResponse] = await Promise.all([
    dashboardApi.getPartyBillStats(),
  ]);
  console.log(partyBillStatsResponse.data);

  return (
    <section className="mb-12 ">
      <Tabs defaultValue="committee">
        <TabsList className="">
          <TabsTrigger
            value="committee"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-md transition-all duration-300"
          >
            위원회별
          </TabsTrigger>
          <TabsTrigger
            value="party"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-md transition-all duration-300"
          >
            정당별
          </TabsTrigger>
        </TabsList>

        <TabsContent value="committee">
          <Card>
            <CardHeader>
              <CardTitle>위원회별 분포</CardTitle>
            </CardHeader>
            <CardContent>
              <LegislationChart props={committeeStatsResponse.data} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="party">
          <Card>
            <CardHeader>
              <CardTitle>정당별 분포</CardTitle>
            </CardHeader>
            <CardContent>
              <LegislationChart props={partyBillStatsResponse.data} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}
