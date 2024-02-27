//쿠키 분석

import cookie from 'cookie';
type Cookies = {accessToken?:string}
export default defineEventHandler((e:any)=>{
  const req = e.req
  const cookies: Cookies = cookie.parse(req.headers.cookie || '')
  console.log(cookies.accessToken)
})