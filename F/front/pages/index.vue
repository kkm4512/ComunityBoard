<template>
  <!--
    1. 전체 db에있는 (현재는 local data로 대체) title,description등을 가져온다
    2. 루핑시킨다.
  -->
  <br />
  <div class="bg-slate-500">
    <div
      class="flex justify-center items-center mt-5 mb-5"
      v-for="{ title, content, profileName } in coursesData"
      :key="i"
    >
      <card :title="title" :content="content" :profileName="profileName" />
    </div>
  </div>
</template>

<script setup>
import card from "~/components/card.vue";
import coursesData from "../data/coursesData";

</script>

<style lang="scss" scoped></style>
