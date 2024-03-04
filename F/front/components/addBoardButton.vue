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

const router = useRouter()
const check = async() => {
  const cookie = await getCookieFetch() 

  const response = await Fetch('token/isValidToken',{cookie})
  // getCookie === undefined ? cookieError(getCookie,router,"로그인 후 이용해주세요","error") : router.push('addBoard')
}
</script>

<style lang="scss" scoped></style>
