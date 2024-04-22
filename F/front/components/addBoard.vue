<template>
  <div>
    <div class="flex justify-center h-[50%] mt-[2rem]">
      <div
        class="flex flex-col mt-2 items-center w-[70rem] h-[45rem] bg-slate-200 rounded-xl"
      >
        <input
          type="text"
          v-model="title"
          class="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-[50%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-[2rem] text-center"
          placeholder="제목추가"
          required
        />

        <input
          type="text"
          v-model="description"
          class="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-[50%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-center h-[500px] mt-[0.5rem]"
          placeholder="본문"
          required
        />
        <select
          v-model="selectedOption"
          type="text"
          class="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-[50%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-center mt-[0.5rem]"
          placeholder="유형"
        >
          <option value="undefined">UNDEFINED</option>
          <option value="any">ANY</option>
          <option value="ts">TS</option>
          <option value="js">JS</option>
          <option value="frontend">FRONTEND</option>
          <option value="backend">BACKEND</option>
        </select>
        <div class="flex w-1/2 justify-center items-center">
          <label
            for="file_input"
            class="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 px-4 py-2 text-center"
          >
            {{ fileName || "파일선택" }}
          </label>
          <input
            @change="changedImage"
            class="hidden"
            id="file_input"
            type="file"
            accept="image/*"
          />
          <div v-if="imageSrc" class="mt-4">
            <img :src="imageSrc" alt="Image Preview" class="w-1/3 rounded-lg" />
          </div>
        </div>

        <button
          @click="check"
          class="mt-2 ml-[48%] bg-slate-600 rounded-xl text-white text-sm w-[40px] h-[30px] mb-[1rem]"
        >
          완료
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * 1. jwtFetch 할떄 보낼때 자동으로 헤더에 accessToken보낼수있게하기
 */

import type { BaseResponse } from "~/types/basetype";

const router = useRouter();

const title = ref("");
const description = ref("");
const selectedOption = ref("");
const image = ref<string | null>("");
const fileName = ref<string | null>(null);
const imageSrc = ref<null | any>(null); // 이미지 미리보기 URL을 저장
const files = ref<File | null>(null)

function changedImage(e: Event) {
  const inputElement = e.target as HTMLInputElement; // 타입 단언
  if (inputElement && inputElement.files && inputElement.files.length > 0) {
    const file = inputElement.files[0]; // 파일 가져오기
    files.value = file
    image.value = file.name; // 파일 이름 설정
    fileName.value = image.value; // 파일 이름 설정

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target) {
        imageSrc.value = e.target.result; // 이미지 미리보기 URL 설정
      }
    };
    reader.readAsDataURL(file); // 파일을 읽어 Data URL로 변환 시작
  } else {
    // 파일이 선택되지 않은 경우
    fileName.value = "";
    imageSrc.value = null;
  }
}

const check = async () => {
  const formData = new FormData();
  formData.append("title", title.value);
  formData.append("description", description.value);
  formData.append(
    "selectedOption",
    selectedOption.value === "" ? "Any" : selectedOption.value
  );

  if (files.value) {
    formData.append("file", files.value);
    
  }

  /**
   * 1. 근데 여기 부분은 errorNoResponse해서 error페이지로 넘길게아니라, 이전페이지인 addBoard페이지로 다시 넘기면될거같은데 확인하기
   */

  if (formData.get("title") === "" || formData.get("description") === "") {
    errorNoResponse(router, "제목과 본문은 빈 문자열일 수 없습니다.", "error");
    return;
  }

  const response: BaseResponse = (await imageFetch(
    "board/create",
    formData
  )) as BaseResponse;

  successError(
    response,
    router,
    "정상적으로 생성 되었습니다.",
    "success",
    "로그인 되어있지않은 상태입니다.",
    "error"
  );
};
</script>

<style scoped></style>
