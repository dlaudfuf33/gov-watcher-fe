export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-md text-white py-2 text-xs z-50 ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          <div>
            <h3 className="text-xs font-bold mb-1">정부야모하니</h3>
            <p className="text-xs text-gray-300">
              국회의원 정보와 입법예고된 법안을 쉽고 빠르게 확인하고, 시민
              의견을 남길 수 있는 서비스입니다.
            </p>
            <p className="text-xs text-gray-300">
              모든 데이터는{" "}
              <a
                href="https://pal.assembly.go.kr/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-300 hover:text-blue-200"
              >
                국회입법예고
              </a>
              및{" "}
              <a
                href="https://opennet.assembly.go.kr/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-300 hover:text-blue-200"
              >
                열린국회정보
              </a>
              로부터 수집되었습니다.
            </p>
          </div>
          <div className="flex-col">
            <div className="flex-row">
              <ul className="space-y-1">
                <li>
                  <a
                    href="https://pal.assembly.go.kr/napal/main/contents.do?menuNo=1100024"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    국회 입법 예고
                  </a>
                </li>
                <li>
                  <a
                    href="https://opinion.lawmaking.go.kr/gcom/gcomMain"
                    className="text-xs text-gray-300 hover:text-white transition-colors"
                  >
                    국민참여입법센터
                  </a>
                </li>
                <li>
                  <a
                    href="https://petitions.assembly.go.kr/"
                    className="text-xs text-gray-300 hover:text-white transition-colors"
                  >
                    국민전자청원
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h3 className="text-xs font-bold mb-1">CONTACT</h3>
            <ul className="space-y-1 text-gray-300">
              <li>E-mail : govwhatsup@gmail.com</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700/50 mt-1 pt-0.5 text-center text-gray-400 text-[9px]">
          <p>© 2025 정부야모하니.</p>
        </div>
      </div>
    </footer>
  );
}
