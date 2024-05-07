import type { ErrorType } from "~/types/Errortype";
import type { BaseResponse } from "~/types/basetype";

export const Fetch = async (endPoint: string, bodyData: Object) => {
  try {
    const cookie = await getCookieFetch();
    const response = await $fetch(endPoint, {
      baseURL: "http://localhost:3001",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie}`,
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

interface BodyData {
  title: string;
  description: string;
  selectedOption: string;
  image: string;
}

export const imageFetch = async (endPoint: string, bodyData: FormData) => {
  try {
    const cookie = await getCookieFetch();

    const response = await fetch(`http://localhost:3001/${endPoint}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cookie}`,
        // 'Content-Type': 'multipart/form-data'는 자동으로 설정됩니다. 직접 지정하지 않는 것이 좋습니다.
      },
      body: bodyData, // 이미 완성된 FormData 사용
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const imagePatchFetch = async (endPoint: string, bodyData: FormData) => {
  try {
    const cookie = await getCookieFetch();

    const response = await fetch(`http://localhost:3001/${endPoint}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
      body: bodyData, // 이미 완성된 FormData 사용
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const patchFetch = async (endPoint: string, bodyData: Object) => {
  try {
    const cookie = await getCookieFetch();
    const response = await $fetch(endPoint, {
      baseURL: "http://localhost:3001",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie}`,
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
    const cookie = await getCookieFetch();
    const response = await $fetch(endPoint, {
      baseURL: "http://localhost:3001",
      method: "POST",
      headers: {
        Authorization: `Bearer ${cookie}`,
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

export const jwtDataFetch = async (endPoint: string, bodydata: {}) => {
  try {
    const cookie = await getCookieFetch();
    const response = await $fetch(endPoint, {
      baseURL: "http://localhost:3001",
      method: "POST",
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
      body: bodydata,
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

export const jwtDeleteFetch = async (endPoint: string, bodyData: {}) => {
  try {
    const cookie = await getCookieFetch();
    const response = await $fetch(endPoint, {
      baseURL: "http://localhost:3001",
      method: "DELETE",
      body: bodyData,
      headers: {
        Authorization: `Bearer ${cookie}`,
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
  if (!cookieResponse.accessToken) {
    return;
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

interface FormDatas {
  formData: {
    [key:string] : string | Blob
  }
}
//이미지포함 데이터 보낼때 
export const formDatasArray = (formData: { [key: string]: string | Blob }) => {
  const formDats = new FormData();

  for (let i in formData) {
    const value = formData[i];
    formDats.append(i, value);
  }


  return formDats;
};
