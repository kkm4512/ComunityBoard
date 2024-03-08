<template>
  <div>
    <button
      @click="toggleDropdown"
      id="dropdownMenuIconButton"
      data-dropdown-toggle="dropdownDots"
      data-dropdown-placement="bottom-start"
      class="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600"
      type="button"
    >
      <svg
        class="w-4 h-4 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 4 15"
      >
        <path
          d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
        />
      </svg>
    </button>
    <div
      v-if="patchXStateCondtion"
      class="absolute z-10 w-44 mt-2 bg-white rounded-md shadow-lg dark:bg-gray-700"
      id="dropdownDots"
    >
      <ul
        class="py-1 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownMenuIconButton"
      >
        <li>
          <a
            @click="patch"
            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer z-20"
            >수정</a
          >
        </li>
        <li>
          <a
            @click="remove"
            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-red-500 cursor-pointer"
            >삭제</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePatchXStateStore } from '~/stores/patchCardXState';
const { patchXStateStore, patchXState } = handlePiniaPatchXState(usePatchXStateStore)

const isOpen = ref(false);

const patchXStateCondtion = computed(() => {
  return patchXStateStore.patchXState ? !isOpen.value : isOpen.value
})



const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};


/**
 * 1. patch 보낼시 내가 어떤 게시판에 수정버튼을 눌렀는지와,
 * 2. 해당게시판 작성자의 이메일과, 내용, createAt정도만 보내고 찾는건 거기서 ㄱㄱ
 */

const emit = defineEmits(['patchClicked','removeClicked']);
const patch = (event:any) => {
  emit('patchClicked',event)
}

const remove = () => {
  emit('removeClicked')
}
</script>

<style scoped></style>
