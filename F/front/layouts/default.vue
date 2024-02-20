<template>
  <div class="bg-slate-300 flex flex-col min-h-screen">
    <Header />

    <NuxtPage />

    <Footer />
  </div>
</template>

<script setup>
import Header from "~/components/header.vue";
import Footer from "~/components/footer.vue";
</script>

<style lang="scss" scoped></style>
