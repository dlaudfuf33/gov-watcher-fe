import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

export default function VisualizationSection() {
  return (
    <section className="mb-12 ">
      <h2 className="text-2xl font-bold mb-6">국회 현황</h2>

      <Tabs defaultValue="party">
        <TabsList className="mb-4">
          <TabsTrigger value="party">정당별 의원 수</TabsTrigger>
          <TabsTrigger value="region">지역구 분포</TabsTrigger>
          <TabsTrigger value="demographics">성별/나이대</TabsTrigger>
        </TabsList>

        <TabsContent value="party">
          <Card>
            <CardHeader>
              <CardTitle>정당별 의원 수 비율</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center">
                <div className="w-full max-w-md">
                  {/* 정당별 의원 수 비율 시각화 */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                        <span>더불어민주당</span>
                      </div>
                      <span className="font-bold">172명 (57.3%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-500 h-2.5 rounded-full"
                        style={{ width: "57.3%" }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                        <span>국민의힘</span>
                      </div>
                      <span className="font-bold">114명 (38.0%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-red-500 h-2.5 rounded-full"
                        style={{ width: "38.0%" }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
                        <span>정의당</span>
                      </div>
                      <span className="font-bold">6명 (2.0%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-yellow-500 h-2.5 rounded-full"
                        style={{ width: "2.0%" }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-purple-500 rounded-full mr-2"></div>
                        <span>기본소득당</span>
                      </div>
                      <span className="font-bold">1명 (0.3%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-purple-500 h-2.5 rounded-full"
                        style={{ width: "0.3%" }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-gray-500 rounded-full mr-2"></div>
                        <span>무소속</span>
                      </div>
                      <span className="font-bold">7명 (2.3%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-gray-500 h-2.5 rounded-full"
                        style={{ width: "2.3%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="region">
          <Card>
            <CardHeader>
              <CardTitle>지역구 분포 지도</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center">
                <div className="text-center">
                  <div className="mb-4">
                    <Image
                      src="/placeholder.svg?height=200&width=300"
                      alt="대한민국 지역구 지도"
                      width={300}
                      height={200}
                      className="mx-auto"
                    />
                  </div>
                  <p className="text-sm text-gray-500">
                    지역별 의원 수 분포를 확인하세요
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demographics">
          <Card>
            <CardHeader>
              <CardTitle>성별/나이대 비율</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium mb-4 text-center">
                    성별 비율
                  </h3>
                  <div className="flex justify-center">
                    <div className="relative w-40 h-40">
                      {/* 원형 차트 대신 간단한 시각화 */}
                      <div className="absolute inset-0 rounded-full border-8 border-blue-500"></div>
                      <div
                        className="absolute inset-0 rounded-full border-8 border-pink-500"
                        style={{
                          clipPath:
                            "polygon(50% 50%, 50% 0, 100% 0, 100% 100%, 50% 100%)",
                        }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-sm font-medium">남성 83%</div>
                          <div className="text-sm font-medium">여성 17%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4 text-center">
                    나이대 분포
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>30대</span>
                      <span className="font-bold">5%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-green-500 h-2.5 rounded-full"
                        style={{ width: "5%" }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span>40대</span>
                      <span className="font-bold">15%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-green-500 h-2.5 rounded-full"
                        style={{ width: "15%" }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span>50대</span>
                      <span className="font-bold">35%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-green-500 h-2.5 rounded-full"
                        style={{ width: "35%" }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span>60대</span>
                      <span className="font-bold">38%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-green-500 h-2.5 rounded-full"
                        style={{ width: "38%" }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span>70대 이상</span>
                      <span className="font-bold">7%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-green-500 h-2.5 rounded-full"
                        style={{ width: "7%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}
