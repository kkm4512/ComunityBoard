<template>
  <div
    class="w-[30%] z-10 bg-white rounded-xl"
    v-if="patchStateStore.patchState"
  >
    <div class="flex justify-end mt-2">
      <button
        type="button"
        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white mr-2 mb-2"
        data-modal-hide="default-modal"
      >
        <svg
          @click="patchCardXStateChange"
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
      v-model="boardTitle"
      type="text"
      class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-center text-lg"
      required
    />
    <input
      v-model="boardDescription"
      type="text"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-center h-[30rem]"
      required
    />
    <div class="flex justify-center items-center mb-2">
      <select
        v-model="boardSelectedOption"
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
      @click="patchedData(board.id)"
      value="수정"
    />
  </div>
</template>

<script setup lang="ts">
import type { responseBoard } from "~/types/boardtype";
import { usePatchXStateStore } from "~/stores/patchCardXState";
import { usePatchStateStore } from "~/stores/patchState";

const { patchXStateStore, patchXState } =
  handlePiniaPatchXState(usePatchXStateStore);
const { patchStateStore, patchState } =
  handlePiniaPatchState(usePatchStateStore);

const selectedOption = ref("");

/**
 * 1. X버튼을 클릭하면 patchCard가 꺼지고, dropDownMenu도 꺼져야함.. 내일하자 어휴
 */

const patchCardXStateChange = () => {
  patchXStateStore.patchXState = !patchXStateStore.patchXState;
  patchStateStore.patchState = !patchStateStore.patchState;

  //이거 진짜맘에안듬
  location.reload();
};

const patchedData = async (id: number) => {
  const userBoardData = {
    id,
    title: boardTitle.value,
    description: boardDescription.value,
    selectedOption: boardSelectedOption.value,
  };
  const response = await patchFetch("board/patch", userBoardData);
};
const props = defineProps<{
  board: responseBoard;
}>();

const boardTitle = ref(props.board.title);
const boardDescription = ref(props.board.description);
const boardSelectedOption = ref(props.board.selectedOption || "undefined"); // 'undefined'를 기본값으로 사용, 필요에 따라 조정
</script>

<style scoped></style>
