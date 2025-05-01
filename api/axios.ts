// api/axios.ts
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 (선택)
instance.interceptors.request.use((config) => {
  // 예: 토큰 추가
  // config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 응답 인터셉터 (선택)
instance.interceptors.response.use(
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

export default instance;
