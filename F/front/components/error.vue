<template>
  <!-- Main modal -->
  <div class="flex justify-center h-screen items-center">
    <div class="relative p-4 w-full max-w-2xl max-h-full">
      <!-- Modal content -->
      <div
        class="relative bg-white rounded-lg shadow dark:bg-gray-700 border-red-500"
      >
        <!-- Modal header -->
        <div
          class="flex items-center justify-center p-4 md:p-5 border-b rounded-t dark:border-gray-600"
        >
          <div class="flex-grow text-center">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              Error
            </h3>
          </div>
          <NuxtLink to="/signUp">
            <button
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="default-modal"
            >
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </NuxtLink>
        </div>
        <!-- Modal body -->
        <div class="p-4 md:p-5 space-y-4">
          <p
            class="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-center"
          >
            <!-- 자식한테 받을 에러명을 여기에 표기 -->
            
            {{ errorMessage }}
          </p>
        </div>
        <!-- Modal footer -->
        <div
          class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();

const errorMessage = route.query.queryKey;


</script>

<style lang="scss" scoped></style>

<script setup></script>

<style lang="scss" scoped></style>
