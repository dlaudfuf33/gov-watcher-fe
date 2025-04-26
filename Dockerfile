# 1단계: 빌드
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

COPY . .
RUN pnpm build

# 2단계: 런타임
FROM node:22-alpine

WORKDIR /app

# pnpm만 설치
RUN npm install -g pnpm

# 빌드 결과물 복사 (이게 진짜 중요!)
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# 환경변수
ENV PORT=3000
EXPOSE 3000

# Next.js standalone 서버 실행
CMD ["node", "server.js"]