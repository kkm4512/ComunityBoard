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
    
    if (error instanceof Error && 'response' in error){
      const typedError = error.response as ErrorType
      return {
        error: typedError._data.error,
        statusCode: typedError._data.statusCode,
        message: typedError._data.message,
      }
    }
    
  }
};
