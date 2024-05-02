import { jwtDecode } from "jwt-decode";

export const jwedecoded = (token:string) => {
  const decoded = jwtDecode(token)
  return decoded
}