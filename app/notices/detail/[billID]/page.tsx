import NoticeDetailClient from "@/components/notice/NoticeDetailClient";

export default function Page({ params }: { params: { billID: string } }) {
  return <NoticeDetailClient billID={params.billID} />;
}
