// api/axios.ts
import axios from "axios";

// 서버 컴포넌트용 (Next 서버에서 백엔드 API로 직접 호출)
export const serverAxios = axios.create({
  baseURL: "https://govwhatsup.com/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 클라이언트 컴포넌트용 (브라우저 → Next → 프록시 → 백엔드)
export const clientAxios = axios.create({
  baseURL: "https://govwhatsup.com/api",
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
