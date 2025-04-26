import { BASE_URL } from "@/constants/auth";

const fetchInstance = async (
  url: string,
  options: RequestInit = {}
): Promise<any> => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed: ${response.status} ${errorText}`);
    }

    const contentType = response.headers.get("Content-Type");
    if (contentType?.includes("application/json")) {
      return await response.json();
    } else {
      return await response.text();
    }
  } catch (error) {
    console.error(`❌ Fetch failed for ${url}:`, error);
    throw error;
  }
};

const instance = {
  get: (url: string, options: RequestInit = {}) =>
    fetchInstance(url, { ...options, method: "GET" }),
  post: (url: string, options: RequestInit = {}) =>
    fetchInstance(url, { ...options, method: "POST" }),
  put: (url: string, options: RequestInit = {}) =>
    fetchInstance(url, { ...options, method: "PUT" }),
  patch: (url: string, options: RequestInit = {}) =>
    fetchInstance(url, { ...options, method: "PATCH" }),
  delete: (url: string, options: RequestInit = {}) =>
    fetchInstance(url, { ...options, method: "DELETE" }),
};

export default instance;
