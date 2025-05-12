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
};

export default nextConfig;
