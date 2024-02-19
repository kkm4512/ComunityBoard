export interface BaseResponse<T> {
  error: string;
  statusCode: number;
  success: boolean;
}

export function errorORsucecss<T>(response: BaseResponse<T>, router: any) {
  if (response.success === true) {
    router.push({
      name: "success",
      query: { sucecssMessage: "로그인에 성공하였습니다." },
    });
  } else {
    router.push({
      name: "error",
      query: { errorMessage: response.error },
    });
  }
}
