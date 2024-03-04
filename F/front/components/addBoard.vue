<template>
  <div>
    <div class="flex justify-center h-[1000px]">
      <div
        class="flex flex-col border-2 border-black mt-2 items-center w-[80%] bg-slate-200 rounded-xl"
      >
        <input
          type="text"
          v-model="title"
          class="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[50%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-4 text-center"
          placeholder="제목추가"
          required
        />

        <input
          type="text"
          v-model="description"
          class="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[50%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-center h-[500px]"
          placeholder="본문"
          required
        />
        <select
          v-model="selectedOption"
          type="text"
          class="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[50%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-center"
          placeholder="유형"
          required
        >
          <option value="ts">TS</option>
          <option value="js">JS</option>
          <option value="frontend">FRONTEND</option>
          <option value="backend">BACKEND</option>
        </select>
        <input
          type="tel"
          id="phone"
          class="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[50%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500mb-2 text-center h-[50px]"
          placeholder="사진"
        />
        <button
          @click="check"
          class="mt-2 ml-[48%] bg-slate-600 rounded-xl text-white text-sm w-[40px] h-[30px]"
        >
          완료
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Router } from "vue-router";
const router = Router();

const title = ref("");
const description = ref("");
const selectedOption = ref("");

const check = async () => {
  const data = {
    title: title.value,
    description: description.value,
    selectedOption: selectedOption.value,
  };

  const response = await Fetch("board/create", data);
  successError(response);
};
</script>

<style scoped></style>
