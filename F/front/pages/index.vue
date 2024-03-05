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
        v-for="{ title, description, selectedOption, createAt, updateAt, user } in response"
        :key="title"
      >
        <card
          :title="title"
          :description="description"
          :selectedOption="selectedOption"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import card from "~/components/card.vue";
import type { responseBoard } from "~/types/boardtype";



const response = ref({});

const getBoards = async () => {
  const response = (await Fetch("board/getBoards", {})) as responseBoard[];
  console.log(`response : `,response)
  return response;
};
onMounted(async () => {
  const getResponse = await getBoards();
  response.value = getResponse;
});
</script>

<style lang="scss" scoped></style>
