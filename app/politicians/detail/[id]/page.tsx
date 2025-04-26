import PoliticianDetailClient from "@/components/politicians/detail/PoliticianDetailClient";
import { notFound } from "next/navigation";
import { getPoliticianById } from "@/api/politicians/PoliticiansAPI";
interface PoliticianDetailPageProps {
  params: {
    id: number;
  };
}

export default async function PoliticianDetailPage({
  params,
}: PoliticianDetailPageProps) {
  const [politicianDetail] = await Promise.all([getPoliticianById(params)]);

  // 정치인을 찾지 못한 경우 404 페이지로 리다이렉트
  if (politicianDetail.data.profile.id === null) {
    notFound();
  }

  // 모든 데이터를 클라이언트 컴포넌트에 전달
  return <PoliticianDetailClient politicianDetail={politicianDetail.data} />;
}
