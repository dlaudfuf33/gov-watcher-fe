import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-[#f5f5f5] backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold">
            정부야
            <span className="bg-gradient-to-r from-blue-500 to-red-500 text-transparent bg-clip-text">
              뭐하니
            </span>
          </span>
        </Link>
        <nav className="hidden md:flex space-x-8">
          <Link
            href="/"
            className="text-gray-700 hover:text-blue-500 transition-colors"
          >
            홈
          </Link>
          <Link
            href="/notices"
            className="text-gray-700 hover:text-blue-500 transition-colors"
          >
            입법예고
          </Link>
          <Link
            href="#"
            className="text-gray-700 hover:text-blue-500 transition-colors"
          >
            인기 법안
          </Link>
          <Link
            href="#"
            className="text-gray-700 hover:text-blue-500 transition-colors"
          >
            내 의견
          </Link>
        </nav>
        <div className="md:hidden">
          <button
            type="button"
            className="text-gray-700"
            aria-label="메뉴 열기"
            title="메뉴 열기"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
