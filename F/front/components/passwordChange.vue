<template>
  <div class="flex justify-center items-center h-screen">
    <div
      class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 w-3/12 p-12"
    >
      <h1 class="text-black flex justify-center text-3xl">passwordChange</h1>
      <div class="mt-8">
        <label
          for="Password"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >changeYourPassword</label
        >
        <input
          v-model="firstPasswrod"
          type="password"
          id="first_name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="*********"
          required
        />
      </div>
      <div class="mt-8">
        <label
          for="Password"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >PasswordCheck</label
        >
        <input
          v-model="secondPasswrod"
          type="password"
          id="first_name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="*********"
          required
        />
      </div>
      <div
        class="text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-7 cursor-pointer"
        @click="check"
      >
        확인
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BaseResponse } from "~/types/basetype";

const firstPasswrod = ref("");
const secondPasswrod = ref("");
const router = useRouter();
const route = useRoute();

const check = async () => {
  const userInfo = {
    email: route.query.queryKey,
    password: firstPasswrod.value,
  };

  if (
    firstPasswrod.value !== secondPasswrod.value ||
    firstPasswrod.value === "" ||
    secondPasswrod.value === ""
  ) {
    alert("다시한번 비밀번호를 확인해주세요");
    firstPasswrod.value = "";
    secondPasswrod.value = "";
  } else {
    const response: BaseResponse = (await Fetch(
      "user/passwordChange",
      userInfo
    )) as BaseResponse;
    success(response, router, "비밀번호 변경에 성공하였습니다.", "success");
  }
};
</script>

<style lang="scss" scoped></style>
