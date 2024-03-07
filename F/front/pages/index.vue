<template>
  <!--
    1. 전체 db에있는 (현재는 local data로 대체) title,description등을 가져온다
    2. 루핑시킨다.
  -->
  <div>
    <div class="bg-slate-500">
      <br />
      <div
        class="flex justify-center items-center mt-5 mb-5"
        v-for="board in response"
        :key="board.title"
      >
        <card :board="board"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import card from "~/components/card.vue";
import type { responseBoard } from "~/types/boardtype";
import { useBoardsStore } from "~/stores/boards";

const { boardsStore } = handlePiniaboards(useBoardsStore)


const response = ref<{boards:responseBoard}>()

const getBoards = async () => {
  const response = (await Fetch("board/getBoards", {})) as responseBoard[];
  return response;
};
onMounted(async () => {
  const getResponse = await getBoards();
  boardsStore.boards = getResponse
  response.value = boardsStore.boards
});
</script>

<style lang="scss" scoped></style>
