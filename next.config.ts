/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone", // standalone 모드
  images: {
    unoptimized: true, // 이미지 최적화 비활성화 (raspi에 sharp 설치 귀찮음)
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        // destination: "http://192.168.123.103:8080/v1/:path*",
        destination: "https://govwhatsup.com/api/v1/:path*",
      },
    ];
  },
};

export default nextConfig;
