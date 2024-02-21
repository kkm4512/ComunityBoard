<template>
  <div
    class="flex justify-center items-center h-[20vh]"
  >
    <div class="border border-white">
      <div class="title">
        {{ title }}
      </div>

      <div class="content">
        {{ content }}
      </div>
    </div>
  </div>
</template>

<script setup>

defineProps({
  title:String,
  content:String
})
</script>

<style scoped></style>
