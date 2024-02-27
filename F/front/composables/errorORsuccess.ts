import type { BaseResponse } from "~/types/basetype";

export type CookieFunction = (arg: BaseResponse) => Promise<void>;

// 성공시 a라우터로 보내기
export async function success(
  response: BaseResponse,
  router: any,
  queryVal: string,
  path: string
) {
  if (response.success) {
    router.push({
      name: path,
      query: { queryKey: queryVal },
    });
  }
}

//실패시 a라우터로 보내기
export function error(
  response: BaseResponse,
  router: any,
  queryVal: string,
  path: string
) {
  if (response.error) {
    router.push({
      name: path,
      query: { queryKey: queryVal },
    });
  }
}

/** 
1. success,error 함수를 묶음
2. error 인자의 유무로 success,error를 나눔
3. path는 각각 달라질수있음
4. 성공시켰을때 getFetchCokkie 함수 실행
5. 클라이언트 쿠키에 저장시키 
 */
export async function successError(
  response: BaseResponse,
  router: any,
  sucecssQueryVal?: string | undefined,
  successPath?: string | undefined,
  errorQueryVal?: string | undefined,
  errorPath?: string | undefined
) {
  if (!response.error) {
    success(
      response,
      router,
      sucecssQueryVal ?? "성공",
      successPath ?? "success"
    );
    await getCookieFetch(response);
    getCookieCheckFetch(response)

  } else if (response.error) {
    error(response, router, errorQueryVal ?? "실패", errorPath ?? "error");
  }
}
