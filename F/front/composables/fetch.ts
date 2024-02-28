import type { ErrorType } from "~/types/Errortype";
import type { BaseResponse } from "~/types/basetype";

export const Fetch = async (endPoint: string, bodyData: Object) => {
  try {
    const response = await $fetch(endPoint, {
      baseURL: "http://localhost:3001",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: bodyData,
    });

    return response;
  } catch (error: unknown) {
    if (error instanceof Error && "response" in error) {
      const typedError = error.response as ErrorType;
      return {
        error: typedError._data.error,
        statusCode: typedError._data.statusCode,
        message: typedError._data.message,
      };
    }
  }
};

//쿠키 세팅
export const setCookieFetch = async (
  cookieResponse: BaseResponse
): Promise<void> => {
  await $fetch("/api/cookie", {
    baseURL: "http://localhost:3000",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    query: {
      queryKey: cookieResponse.accessToken,
    },
  });
};

//쿠키 가져오기
export const getCookieFetch = async (): Promise<any> => {
  const cookie = await $fetch("/api/getCookie", {
    baseURL: "http://localhost:3000",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return cookie;
};

//쿠키삭제
export const removeCookieFetch = async (): Promise<void> => {
  await $fetch("/api/removeCookie", {
    baseURL: "http://localhost:3000",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
