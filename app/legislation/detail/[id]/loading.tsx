import LegislationDetailSkeleton from "@/components/legislation/LegislationDetailSkeleton";

export default function LoadingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-blue-50">
      <main className="flex-1 container mx-auto px-4 py-8">
        <LegislationDetailSkeleton />
      </main>
    </div>
  );
}
