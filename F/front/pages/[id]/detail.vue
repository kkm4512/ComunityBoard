<template>
  <!--
    1. 전체 db에있는 (현재는 local data로 대체) title,description등을 가져온다
    2. 루핑시킨다.
  -->
  <div>
    <br />
    <div
      class="flex justify-center items-center mt-5 mb-5"
      v-for="board in response"
      :key="board.title"
    >
      <card :board="board" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBoardsDetailStore } from "~/stores/boardsDetail";
import type { responseBoard } from "~/types/boardtype";

const route = useRoute();
const boardsDetail = useBoardsDetailStore();
const response = (await jwtDataFetch("board/getBoardsUserId", {
  id: route.params.id,
})) as responseBoard[];
boardsDetail.updateDetailBoards(response);
</script>

<style scoped></style>
