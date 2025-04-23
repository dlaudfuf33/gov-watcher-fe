import { Politicians } from "@/lib/politiciansData";
import PoliticianDetailClient from "@/components/politician-detail/politician-detail-client";
import { notFound } from "next/navigation";

interface PoliticianDetailPageProps {
  params: {
    id: string;
  };
}

export default async function PoliticianDetailPage({
  params,
}: PoliticianDetailPageProps) {
  // 실제 구현에서는 API 호출 등으로 데이터를 가져올 수 있음
  // 서버 컴포넌트에서 데이터 페칭 수행
  const politician = Politicians.find((m) => m.id === params.id);

  // 정치인을 찾지 못한 경우 404 페이지로 리다이렉트
  if (!politician) {
    notFound();
  }

  // 추가 데이터 페칭 예시 (실제 구현 시 필요한 API 호출)
  // const politicalHistory = await fetchPoliticalHistory(params.id)
  // const billActivities = await fetchBillActivities(params.id)
  // const relatedNews = await fetchRelatedNews(params.id)

  // 모든 데이터를 클라이언트 컴포넌트에 전달
  return <PoliticianDetailClient politician={politician} />;
}
