import type { ErrorType } from "~/types/Errortype";

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
    console.error("Fetch error:", error0); // 로깅을 위해 콘솔에 에러 출력
    console.log("errorResponse: ",error.response)
  }
};
