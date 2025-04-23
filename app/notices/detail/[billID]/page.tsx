import NoticeDetailClient from "@/components/NoticeDetailClient";

export default function Page({ params }: { params: { billID: string } }) {
  return <NoticeDetailClient billID={params.billID} />;
}
