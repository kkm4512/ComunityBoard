<template>
  <div
    v-if="patchStateStore.patchState"
    class="fixed inset-0 bg-black bg-opacity-50 z-10"
  ></div>
  <!--
    1. 전체 db에있는 (현재는 local data로 대체) title,description등을 가져온다
    2. 루핑시킨다.
  -->
  <div>
    <div
      :class="{
        'bg-slate-500': !patchStateStore.patchState,
        'dark:bg-gray-700': patchStateStore.patchState,
      }"
    >
      <br />
      <div
        class="flex justify-center items-center mt-5 mb-5"
        v-for="board in response"
        :key="board.title"
      >
        <card :board="board" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import card from "~/components/card.vue";
import type { responseBoard } from "~/types/boardtype";
import { useBoardsStore } from "~/stores/boards";
import { usePatchStateStore } from "~/stores/patchState";

const { boardsStore } = handlePiniaboards(useBoardsStore);
const { patchStateStore } = handlePiniaPatchState(usePatchStateStore);
const bgStyle = ref({});

const response = ref<{ boards: responseBoard }>();

const getBoards = async () => {
  const response = (await Fetch("board/getBoards", {})) as responseBoard[];
  return response;
};


computed(async() => {
  const getResponse = await getBoards();
  boardsStore.boards = getResponse;
  response.value = boardsStore.boards;
})

onMounted(async () => {
  const getResponse = await getBoards();
  boardsStore.boards = getResponse;
  response.value = boardsStore.boards;
  if (patchStateStore.patchState === false) {
    bgStyle.value = {};
  }
});


/**
 * 1. patchPiniaXState를 피니아 저장소에 만듬
 * 2. c컴포넌트에서 X버튼이 클릭되면 
 */

</script>

<style lang="scss" scoped></style>
