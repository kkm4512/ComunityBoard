<template>
  <div
    class="block w-[700px] p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
  >
  <div class="text-red-500">
    <img class="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-5.jpg" alt="Rounded avatar">
  </div>
    <h5
      class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
    >
      {{ title }}
    </h5>
    <p class="font-normal text-gray-700 dark:text-gray-400">
      {{ content }}
    </p>
  </div>
</template>

<script setup>
defineProps({
    title:String,
    content:String
})
</script>

<style lang="scss" scoped></style>
