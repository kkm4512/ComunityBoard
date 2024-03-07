<template>
  <div class="w-[30%] z-10 bg-white rounded-xl">
    <div class="flex justify-end mt-2">
      <button
        type="button"
        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
        data-modal-hide="default-modal"
      >
        <svg
          class="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
        <span class="sr-only">Close modal</span>
      </button>
    </div>
    <input
      type="text"
      class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-center text-lg"
      :value="board.title"
      required
    />
    <input
      type="text"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-center h-[30rem]"
      :value="board.description"
      required
    />
    <div class="flex justify-center items-center mb-2">
      <select
        v-model="selectedOption"
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
    </div>
    <input
      type="button"
      class="bg-blue-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-center cursor-pointer"
      value="수정"
      required
    />
  </div>
</template>

<script setup lang="ts">
import type { responseBoard } from "~/types/boardtype";

const selectedOption = ref("");

/**
 * 1. X버튼을 클릭하면 patchCard가 꺼지고, dropDownMenu도 꺼져야함.. 내일하자 어휴
 */

const props = defineProps<{
  board: responseBoard;
}>();
</script>

<style scoped></style>
