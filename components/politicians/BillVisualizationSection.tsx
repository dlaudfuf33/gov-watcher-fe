import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCategoryStats } from "@/api/home/HomeAPI";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import LegislationChart from "../charts/LegislationChart";

ChartJS.register(ArcElement, Tooltip, Legend);

export default async function BillVisualizationSection() {
  const [categoryStatsResponse] = await Promise.all([getCategoryStats()]);

  return (
    <section className="mb-12 ">
      <Tabs defaultValue="category">
        <TabsList className="">
          <TabsTrigger value="category">카테고리별</TabsTrigger>
        </TabsList>

        <TabsContent value="category">
          <Card>
            <CardHeader>
              <CardTitle>법안 카테고리별 분포</CardTitle>
            </CardHeader>
            <CardContent>
              <LegislationChart props={categoryStatsResponse.data} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="">
          <Card>
            <CardHeader>
              <CardTitle></CardTitle>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}
