<template>
  <div>
    <button
      type="button"
      class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 size-[100px]"
      style="width: 100px; height: 100px"
      @click="check"
    >
      게시글 작성
    </button>
  </div>
</template>

<script setup lang="ts">
import type { BaseResponse } from '~/types/basetype';
import { useCookieAccessTokenStore } from '#imports';
const router = useRouter()

const check = async() => {
  const {cookieAccessTokenStore} = handlePiniaCookie(useCookieAccessTokenStore)
  const response = await jwtFetch('token/isValidToken') as BaseResponse

  if (!cookieAccessTokenStore.accessToken) {
    errorNoResponse(router,"로그인 되지않았습니다.","error")
    return
  }
  successError(response,router,"","addBoard","로그인 되지않았습니다.","error");
}

/**
 
 * 2. header에 담아서 잘 보낸거같은데 백엔드에서는 jwt 프로바이드 하라고함
 */
</script>

<style lang="scss" scoped></style>
