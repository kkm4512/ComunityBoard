<template>
  <br />
  <div class="bg-slate-400">
    <div v-for="i in 10" :key="i">
      <boardBox />
    </div>
  </div>
</template>

<script setup>
import boardBox from "~/components/boardBox.vue";
</script>

<style lang="scss" scoped></style>
