"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function SuggestionFAQ() {
  const faqs = [
    {
      question: "건의사항은 어떻게 처리되나요?",
      answer:
        "제출된 건의사항은 검토 후 우선순위에 따라 처리됩니다. 처리 상태는 '검토 대기', '검토 중', '완료', '반려' 등으로 표시되며, 건의사항 목록에서 확인하실 수 있습니다.",
    },
    {
      question: "익명으로 건의사항을 제출할 수 있나요?",
      answer:
        "네, 익명으로 건의사항을 제출하실 수 있습니다. 건의사항 작성 시 '익명으로 제출하기' 옵션을 선택하시면 됩니다. 다만, 익명으로 제출하시면 처리 결과를 개별적으로 알려드리기 어려울 수 있습니다.",
    },
    {
      question: "건의사항 처리에 얼마나 시간이 걸리나요?",
      answer:
        "건의사항의 유형과 복잡도에 따라 처리 시간이 다를 수 있습니다. 간단한 UI 개선은 빠르게 적용될 수 있지만, 새로운 기능 추가나 대규모 변경은 더 많은 시간이 소요될 수 있습니다.",
    },
    {
      question: "내 건의사항이 반려되었어요. 이유가 무엇인가요?",
      answer:
        "건의사항이 반려되는 주요 이유로는 1) 기술적 제약, 2) 서비스 방향성과의 불일치, 3) 이미 개발 중인 유사 기능, 4) 리소스 제약 등이 있습니다. 반려된 건의사항에 대해 더 자세한 설명이 필요하시면 고객센터로 문의해주세요.",
    },
    {
      question: "정보의 출처는 어디인가요?",
      answer:
        "서비스에서 제공하는 데이터는 국회, 정부 부처, 공공데이터포털 등 공식 API와 공개 자료를 바탕으로 수집 및 가공됩니다. 각 데이터는 최신성을 유지하기 위해 주기적으로 갱신됩니다.",
    },
    {
      question: "다른 사용자의 건의사항에 추천을 할 수 있나요?",
      answer:
        "네, 다른 사용자가 제출한 건의사항에 추천을 할 수 있습니다. 건의사항 목록에서 '추천' 버튼을 클릭하시면 됩니다. 추천 수가 많은 건의사항은 우선적으로 검토될 수 있습니다.",
    },
    {
      question: "건의사항 외에 문의사항이 있으면 어떻게 해야 하나요?",
      answer:
        "일반적인 문의사항이나 긴급한 문제나 버그 신고는 'devmyryl@gmail.com' 이메일로 연락주시면 최대한 빠르게 조치하겠습니다.",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">자주 묻는 질문</h2>
      <Accordion type="single" collapsible className="space-y-2">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border rounded-lg px-4"
          >
            <AccordionTrigger className="text-left font-medium py-4">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-700 pb-4">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
