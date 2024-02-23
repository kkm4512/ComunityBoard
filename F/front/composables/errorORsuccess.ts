import type { BaseResponse } from "~/types/basetype";

//성공시 a라우터로 보내기
export function success(response: BaseResponse, router: any, path: string) {
  if (response.success) {
    router.push({
      name: path,
      query: { successMessage: response.message },
    });
  }
}

//실패시 a라우터로 보내기
export function error(response: BaseResponse, router: any, path: string) {
  if (response.error) {
    console.log(response);
    router.push({
      name: path,
      query: { errorMessage: response.message },
    });
  }
}

//성공시 a라우터로 보내는데 어떤 query 보내고싶을때
export function successQuery(
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
