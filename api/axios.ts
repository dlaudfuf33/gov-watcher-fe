// api/axios.ts
import axios from "axios";

// 서버 컴포넌트용 ()
export const serverAxios = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://gov-watcher-be:8080/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 클라이언트 컴포넌트용 ()
export const clientAxios = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://gov-watcher-be:8080/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 (선택)
clientAxios.interceptors.request.use((config) => {
  // 예: 토큰 추가
  // config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 응답 인터셉터 (선택)
clientAxios.interceptors.response.use(
  (response) => response,
  (err) => {
    const url = err.config?.url || "";
    const fullUrl = `${err.config?.baseURL || ""}${url}`;
    // console.error(
    //   `🚨 Failed call API (${err.code || err.message}) → ${fullUrl}`
    // );
    return Promise.reject(err);
  }
);
