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

export const getCookieFetch = async (cookieResponse: BaseResponse) => {
  const response = await $fetch("/api/cookie", {
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
