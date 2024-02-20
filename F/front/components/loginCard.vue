<template>
  <div class="flex justify-center items-center h-screen">
    <div
      class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 w-3/12 p-12"
    >
      <h1 class="text-white flex justify-center text-3xl">Login</h1>
      <div class="mt-8">
        <label
          for="Email"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Email</label
        >
        <input
          v-model="email"
          type="text"
          id="first_name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="nayoun440@naver.com"
          required
        />
      </div>
      <div class="mt-8">
        <label
          for="Password"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Password</label
        >
        <input
          v-model="password"
          type="password"
          id="first_name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="*********"
          required
        />
      </div>
      <div class="flex justify-between p-2">
        <NuxtLink to="/passwordFind">
          <div class="text-white cursor-pointer hover:text-blue-300 mt-5">
            비밀번호찾기
          </div>
        </NuxtLink>
        <NuxtLink to="/signUp">
          <div class="text-white cursor-pointer hover:text-blue-300 mt-5">
            회원가입
          </div>
        </NuxtLink>
      </div>
      <div
        class="text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5"
        @click="checked"
      >
        로그인
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { errorORsucecss } from "~/composables/errorORsuccess";
import { useRouter } from "vue-router";
import type { BaseResponse } from "~/composables/errorORsuccess";

const email = ref("");
const password = ref("");
const router = useRouter();

const checked = async () => {
  const userInfo = {
    email: email.value,
    password: password.value,
  };
  console.log(userInfo)

  const response: BaseResponse = await $fetch("user/login", {
    baseURL: "http://localhost:3001",
    method: "POST",
    body: userInfo,
  });


  errorORsucecss(response, router,"로그인에 성공하였습니다.");
};
</script>

<style lang="scss" scoped></style>
~/composables/errorORsuccess~/composables/errorORsuccess