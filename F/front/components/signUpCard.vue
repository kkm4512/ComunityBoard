<template>
  <div class="flex justify-center items-center h-screen">
    <div
      class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 w-3/12 p-12"
    >
      <h1 class="text-black flex justify-center text-3xl">SignUp</h1>
      <div class="mt-8">
        <label
          for="Email"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Email</label
        >
        <input
          v-model="userEmail"
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
          v-model="userPassword"
          type="password"
          id="first_name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="*********"
          required
        />
      </div>
      <div class="mt-8">
        <label
          for="Nickname"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Nickname</label
        >
        <input
          v-model="userNickname"
          type="text"
          id="first_name"
          class="bg-gray-50 border border-gray -300 t ext-gray-90 0 text-sm rounded- lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="John"
          required
        />
        <label
          for="file_input"
          class="mb-2 mt-5 text-sm font-medium text-gray-900 dark:text-white border-2 flex justify-center"
          >{{ "Profile" }}</label
        >
        <input
          @change="changedImage"
          type="file"
          id="file_input"
          class="hidden"
          accept="image/*"
        />
        <div v-if="imgSrc" class="mt-4 flex justify-center">
          <img
            :src="imgSrc"
            alt="Image Preview"
            class="w-1/3 rounded-lg border-2 caret-transparent"
          />
        </div>
      </div>
      <div class="flex justify-between p-2">
        <NuxtLink to="/passwordFind">
          <div class="text-black cursor-pointer hover:text-blue-300 mt-5">
            비밀번호찾기
          </div>
        </NuxtLink>
        <NuxtLink to="/login">
          <div class="text-black cursor-pointer hover:text-blue-300 mt-5">
            로그인하러가기
          </div>
        </NuxtLink>
      </div>
      <div
        class="text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5 cursor-pointer"
        @click="checked"
      >
        확인
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { mdiImageSearch } from "@mdi/js";
import type { BaseResponse } from "~/types/basetype";

const userEmail = ref("");
const userPassword = ref("");
const userNickname = ref("");
const router = useRouter();
const imgSrc = ref();
const files = ref<File | null>(null);

function changedImage(e: Event) {
  const inputElement = e.target as HTMLInputElement;
  const file = inputElement.files ? inputElement.files[0] : null;
  files.value = file;
  const reader = new FileReader();
  reader.onload = (e: ProgressEvent<FileReader>) => {
    imgSrc.value = e.target?.result;
  };
  if (file) reader.readAsDataURL(file);
}

const checked = async () => {
  const formData = new FormData();

  formData.append("email", userEmail.value);
  formData.append("password", userPassword.value);
  formData.append("nickname", userNickname.value);
  if (files.value) {
    formData.append("file", files.value);
  }

  const response: BaseResponse = (await Fetch(
    "user/signUp",
    formData
  )) as BaseResponse;

  //쿠키 세팅
  await setCookieFetch(response);

  //쿠키 pinia 저장
  await setCookieStore();

  successError(
    response,
    router,
    "회원가입에 성공했습니다.",
    "success",
    "이메일이 중복되었거나, 형식이 올바르지 않습니다.",
    "error"
  );
};
</script>

<style lang="scss" scoped></style>
