export interface BaseResponse {
  name?: string
  error?: string
  statusCode?: number
  success?: Boolean
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

export function error(response: BaseResponse, router: any,path:string) {
  if (response.error) {
    console.log(response)
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


