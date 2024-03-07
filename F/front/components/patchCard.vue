<template>
  <div class="w-[30%] z-10">
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
    <div class="flex justify-center">
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

const props = defineProps<{
  board: responseBoard;
}>();
</script>

<style scoped></style>
