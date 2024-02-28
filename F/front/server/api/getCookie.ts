//쿠키 분석
/**
 * 1. 어찌저찌 쿠키 받는것까진함
 * 2. 쿠키를 pinia에 저장시키고
 * 3. 모든 페이지에서 전역적으로 해당 pinia에 저장되있는
 * 4. jwt 토큰정보를 파싱하고, 맞다면
 * 5. 로그인/회원가입 부분이 -> 로그아웃 으로 보이게하기
 */

import cookie from "cookie";
type Cookies = { accessToken?: string };
export default defineEventHandler((e: any) => {
  const req = e.req;
  const cookies: Cookies = cookie.parse(req.headers.cookie || "");
  const accessToken = cookies.accessToken;
  return accessToken
});
