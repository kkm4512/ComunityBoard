import type { ErrorType } from "~/types/Errortype";
import type { BaseResponse } from "~/types/basetype";

export const Fetch = async (endPoint: string, bodyData: Object) => {
  try {
    const cookie = await getCookieFetch()
    const response = await $fetch(endPoint, {
      baseURL: "http://localhost:3001",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${cookie}`,
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

export const patchFetch = async (endPoint: string, bodyData: Object) => {
  try {
    const cookie = await getCookieFetch()
    const response = await $fetch(endPoint, {
      baseURL: "http://localhost:3001",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${cookie}`,
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

export const jwtFetch = async (endPoint: string) => {
  try {
    const cookie = await getCookieFetch()
    const response = await $fetch(endPoint, {
      baseURL: "http://localhost:3001",
      method: "POST",
      headers: {
        "Authorization": `Bearer ${cookie}`,
      },
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
//accessToken값 받아오지 못하면 종료
export const setCookieFetch = async (
  cookieResponse: BaseResponse
): Promise<void> => {
  if (!cookieResponse.accessToken){
    return
  }
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
