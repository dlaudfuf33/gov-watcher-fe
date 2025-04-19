import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface PopularBill {
  id: string;
  title: string;
  proposer: string;
  party: string;
  views: number;
  opinions: number;
  category: string;
}

export default function PopularBills() {
  const popularBills: PopularBill[] = [
    {
      id: "1",
      title: "청소년 보호법 일부개정법률안",
      proposer: "홍길동",
      party: "더불어민주당",
      views: 12500,
      opinions: 3240,
      category: "복지",
    },
    {
      id: "2",
      title: "기후위기 대응을 위한 탄소중립·녹색성장 기본법 일부개정법률안",
      proposer: "김철수",
      party: "국민의힘",
      views: 9800,
      opinions: 2150,
      category: "환경",
    },
    {
      id: "3",
      title: "디지털 플랫폼 이용자 보호에 관한 법률안",
      proposer: "이영희",
      party: "정의당",
      views: 8700,
      opinions: 1980,
      category: "경제",
    },
    {
      id: "4",
      title: "인공지능 윤리 및 규제에 관한 법률안",
      proposer: "박민수",
      party: "더불어민주당",
      views: 7600,
      opinions: 1540,
      category: "과학기술",
    },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "복지":
        return "bg-blue-100 text-blue-800";
      case "환경":
        return "bg-green-100 text-green-800";
      case "경제":
        return "bg-amber-100 text-amber-800";
      case "과학기술":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPartyColor = (party: string) => {
    switch (party) {
      case "더불어민주당":
        return "text-blue-600";
      case "국민의힘":
        return "text-red-600";
      case "정의당":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="space-y-4">
      {popularBills.map((bill) => (
        <div
          key={bill.id}
          className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-lg mb-1">
                <Link
                  href={`/notices/${bill.id}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {bill.title}
                </Link>
              </h3>
              <div className="flex items-center gap-2 mb-2">
                <span className={`font-medium ${getPartyColor(bill.party)}`}>
                  {bill.proposer}
                </span>
                <span className="text-gray-500 text-sm">{bill.party}</span>
              </div>
              <Badge className={`${getCategoryColor(bill.category)}`}>
                {bill.category}
              </Badge>
            </div>
            <div className="text-right text-sm text-gray-500">
              <div>👁️ {bill.views.toLocaleString()}명</div>
              <div>💬 {bill.opinions.toLocaleString()}개</div>
            </div>
          </div>
        </div>
      ))}
      <div className="text-center mt-4">
        <Link
          href="/notices"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          더 많은 법안 보기 →
        </Link>
      </div>
    </div>
  );
}
