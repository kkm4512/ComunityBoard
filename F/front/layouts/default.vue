<template>
  <div class="bg-slate-500 flex flex-col min-h-screen border-red-500 border-2">
    <Header />

    <NuxtPage />
    <div class="border-red-500 border-2 ml-[73%]">
      <add-board-button />
    </div>

    <footer class="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
      <div
        class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between"
      >
        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400"
          >© 2023
          <a href="https://flowbite.com/" class="hover:underline">Flowbite™</a
          >. All Rights Reserved.
        </span>
        <ul
          class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0"
        >
          <li>
            <a href="#" class="hover:underline me-4 md:me-6">About</a>
          </li>
          <li>
            <a href="#" class="hover:underline me-4 md:me-6">Privacy Policy</a>
          </li>
          <li>
            <a href="#" class="hover:underline me-4 md:me-6">Licensing</a>
          </li>
          <li>
            <a href="#" class="hover:underline">Contact</a>
          </li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<script setup>
import Header from "~/components/header.vue";
import { useCookieAccessTokenStore } from "~/stores/cookie";

/**
 * [ 지금 나의 문제점 ]
 * 1. server/api/getCookie에서 쿠키를 파싱해와서 저장함
 * 2. headerComponent에 해당 cookie값을 props로 보냄
 * 3. default.vue파일에서 해당 cookie값의 존재 유무에따라 로그인의 유무룰 판단함
 * 4. 근데 로그인하고 쿠키가 분명 박혔는데
 * 5. default.vue에서는 리프레쉬를 해야 리렌더링을하고, 그래야 로그인이 되었다고 판단함
 * 6. 어떻하지?
 */
</script>

<style lang="scss" scoped></style>
