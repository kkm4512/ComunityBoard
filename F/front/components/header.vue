<template>
  <nav class="bg-white border-gray-200 dark:bg-gray-900">
    <div
      class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
    >
      <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          class="h-8"
          alt="Flowbite Logo"
        />
        <span
          class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
          >WTComunity</span
        >
      </a>
      <button
        data-collapse-toggle="navbar-default"
        type="button"
        class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-default"
        aria-expanded="false"
      >
        <span class="sr-only">Open main menu</span>
        <svg
          class="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>
      <div class="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul
          class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
        >
          <li>
            <a
              href="/"
              class="block py-2 px-3 text-black bg-blue-700 rounded md:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
              aria-current="page"
              >인기글</a
            >
          </li>
          <li>
            <a
              href="#"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >문의</a
            >
          </li>
          <li>
            <a
              href="https://github.com/kkm4512/ComunityBoard"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >github</a
            >
          </li>
          <li>
            <a
              v-if="!cookieAccessTokenStore.accessToken"
              href="/login"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >로그인 / 회원가입</a
            >
            <a
              v-if="cookieAccessTokenStore.accessToken"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent cursor-pointer"
              @click="signOut"
              >로그아웃</a
            >
          </li>
          <NuxtLink :to="`${accessToken.id}/detail`" v-if="accessToken">
            <li class="cursor-pointer hover:text-blue-500">
              <div class="w-1/5" v-if="profile">
                <img :src="profile"/>
              </div>
            </li>
          </NuxtLink>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useCookieAccessTokenStore } from "~/stores/cookie";
import { jwtDecode } from "jwt-decode";
import { useRoute } from "vue-router"
const route = useRoute()
let profile = ref<null | string>(null)

interface AccessToken {
  id: number;
  email: string;
  nickname: string;
  iat: number;
  exp: number;
}

//id값 db에서 받아오기
const accessToken = ref<AccessToken | null>(null);
const { cookieAccessTokenStore } = handlePiniaCookie(useCookieAccessTokenStore);

onMounted( () => {
  getProfile()
} )

watch( () => route.path, (newPath, oldPath) => {
    if (newPath !== oldPath) {
      getProfile()
    }
} )


async function getProfile(){
  const email = jwtDecode<{email:string}>(cookieAccessTokenStore.accessToken).email
  const response = await Fetch("user/getProfile",{email})
  response ? profile.value = 'http://localhost:3001' + response : profile.value = "http://localhost:3001/public/default/default.jpg"
}

watch(() => cookieAccessTokenStore.accessToken, (newAccessToken) => {
  if (newAccessToken) {
    accessToken.value = jwtDecode(newAccessToken);
  } else {
    accessToken.value = null;
  }
}, { immediate: true });

/**
 * 1. 로그인에 실패해도 쿠키에 accessToken 부분이 undefined로 채워짐
 * 2. 로그인에 실패했을때 쿠키에 저장 아예 못시키게 하기
 */
const signOut = async () => {
  await removeCookieFetch();
  cookieAccessTokenStore.accessToken = "";
};
</script>

<style></style>
