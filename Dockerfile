# 1단계: 빌드용
FROM node:22-alpine AS builder

WORKDIR /app

# 패키지 설치
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

# 소스 복사
COPY . .

# Next.js 빌드
RUN pnpm build

# 2단계: 런타임용
FROM node:22-alpine

WORKDIR /app

# curl 설치
RUN apk add --no-cache curl
# pnpm 설치
RUN npm install -g pnpm

# 빌드 결과물 복사
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# server.js 패치
RUN sed -i 's/process.env.HOSTNAME/process.env.HOST/' server.js

# 포트 열기
ENV PORT=3000
EXPOSE 3000

# 서버 직접 실행
CMD ["node", "server.js"]