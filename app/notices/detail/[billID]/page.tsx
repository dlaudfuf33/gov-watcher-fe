export const dynamic = "force-static";
import NoticeDetailClient from "@/components/notice/NoticeDetailClient";

export default async function Page({ params }: { params: { billID: string } }) {
  const resolvedParams = await params;
  const billID = resolvedParams.billID;

  return <NoticeDetailClient billID={params.billID} />;
}
