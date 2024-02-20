export interface BaseResponse {
  error?: string | undefined;
  statusCode?: number | undefined;
  success?: Boolean | undefined;
}

export function errorORsucecss(
  response: BaseResponse,
  router: any,
  success: string
) {

  if (response.success === true) {
    router.push({
      name: "success",
      query: { successMessage: success },
    });
  } else {
    router.push({
      name: "error",
      query: { errorMessage: response.error },
    });
  }
}

export function error(response: BaseResponse, router: any, errorMessage: string,path:string) {
  if (!response.success) {
    router.push({
      name: path,
      query: { errorMessage: response.error },
    });
  }
}

export function success(response: BaseResponse, router: any, successMessage: string,path:string) {
  if (response.success) {
    router.push({
      name: path,
      query: { successMessage: successMessage },
    });
  }
}
