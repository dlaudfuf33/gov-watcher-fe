# 1단계: 빌드용
FROM node:22-alpine AS builder

WORKDIR /app

# package.json, pnpm-lock.yaml 복사
COPY package.json pnpm-lock.yaml ./

# 패키지 설치
RUN npm install -g pnpm && pnpm install

# 앱 소스 복사
COPY . .

# next build
RUN pnpm build

# 2단계: 런타임용
FROM node:22-alpine

WORKDIR /app

# production dependencies만 설치
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --prod

# 빌드 결과물 복사
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/next.config.ts next.config.ts
COPY --from=builder /app/package.json package.json

# ENV 설정 (포트 등)
ENV PORT=3000
EXPOSE 3000

# Next.js 앱 실행
CMD ["node", ".next/standalone/server.js"]