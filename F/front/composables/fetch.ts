export const Fetch = async(endPoint:string,bodyData:Object) => {
  const response = await $fetch(endPoint, {
    baseURL: "http://localhost:3001",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: bodyData,
  });

  return response
};
