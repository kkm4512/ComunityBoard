import cookie from "cookie";
type Cookies = { accessToken?: string | undefined };
export default defineEventHandler((e: any) => {
  const req = e.req;
  const cookies: Cookies = cookie.parse(req.headers.cookie || "");
  const accessToken = cookies.accessToken;
  setCookie(e, "accessToken", accessToken ?? "", {
    maxAge: 0
  });
});
