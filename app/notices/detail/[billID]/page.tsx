export const dynamic = "force-static";
import NoticeDetailClient from "@/components/notice/NoticeDetailClient";

export default async function Page({ params }: { params: { billID: string } }) {
  return <NoticeDetailClient billID={params.billID} />;
}
