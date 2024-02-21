<template>
  <div
    class="block w-[700px] p-6 bg-white border border-gray-300 rounded-lg shadow hover:bg-gray-100"
  >
    <div class="flex">
      <img
        class="w-10 h-10 rounded-full mt-2"
        src="../static/images/profile.jpg"
        alt="Rounded avatar"
      />
      <div class="text-black ml-2 text-sm">
        {{ profileName }}
        <p></p>
        블로그 쓰는 개발자
        <p></p>
        15시간 전
      </div>
    </div>
    <h5 class="mb-2 text-2xl font-bold tracking-tight text- mt-5">
      {{ title }}
    </h5>
    <p class="font-normal text-black dark:text-gray-700 mt-5">
      {{ content }}
    </p>

    <div class="flex justify-between mt-5 mb-2">
      <div class="cursor-pointer hover:bg-gray-300">좋아요</div>
      <div class="cursor-pointer hover:bg-gray-300">댓글</div>
      <div class="cursor-pointer hover:bg-gray-300">공유</div>
      <div class="cursor-pointer hover:bg-gray-300">북마크</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  content: String,
  profileName: String,
});
</script>

<style lang="scss" scoped></style>
