/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "i.ytimg.com",
      "yt3.googleusercontent.com",
      "lh3.googleusercontent.com",
    ],
  },

  // 세션 관리 관련 설정
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
