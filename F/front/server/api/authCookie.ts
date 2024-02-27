//쿠키 분석

import cookie from 'cookie';
import { useAuthStore } from '~/stores/auth';
type Cookies = {accessToken?:string}
export default defineEventHandler((e:any)=>{
  const req = e.req
  const cookies: Cookies = cookie.parse(req.headers.cookie || '')
  const accessToken = cookies.accessToken
  const auth = useAuthStore();
  if ( accessToken ) {
    auth.isAuthenticated = true
  }

})