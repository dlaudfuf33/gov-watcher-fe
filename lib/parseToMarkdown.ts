export function parseToMarkdown(content: string): string {
  const lines = content
    .split("\n")
    .map((line) => line.trim()) // 개행 시 공백 제거
    .filter((line) => line.length > 0); // 빈 줄 제거

  let markdown = "";
  let currentSection = "";

  for (const line of lines) {
    // 제목 구분
    if (
      line.includes("제안이유") ||
      line.includes("주요내용") ||
      line.includes("기대효과")
    ) {
      currentSection = line;
      markdown += `\n\n## **${line}**\n\n`;
    }

    // 주요내용의 번호 매김 항목 (가. 나. 다.)
    else if (/^[가-힣]\.\s/.test(line)) {
      markdown += `- **${line.slice(0, 2)}** ${line.slice(2)}\n`;
    }

    // 일반 문단 처리
    else {
      markdown += `${line}\n\n`;
    }
  }

  return markdown.trim();
}
