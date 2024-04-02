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
        {{ board.selectedOption }}
        <p></p>
        {{ board.user.nickname }}
        <p></p>
        {{ board.createAt }}
      </div>
      <div class="ml-[65%]">
        <dropDownMenu
          @patch-clicked="handlePatchClicked"
          @remove-clicked="handleRemoveClicked(board)"
        />
      </div>
    </div>
    <h5 class="mb-2 text-2xl font-bold tracking-tight text- mt-5">
      {{ board.title }}
    </h5>
    <p class="font-normal text-black dark:text-gray-700 mt-5">
      {{ board.description }}
    </p>

    <div class="flex justify-between mt-7 mb-2">
      <div
        class="cursor-pointer hover:bg-gray-300 ml-2"
        v-for="icon in mdiIconAllPath"
        :key="icon"
      >
        <svg-icon type="mdi" :path="icon" class="w-[20px]"></svg-icon>
      </div>
    </div>
  </div>
  <div>
    <patchCard
      :board="props.board"
      v-if="patchOpen"
      :style="patchCardStyle"
    />
  </div>
</template>

<script setup lang="ts">
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiThumbUp, mdiComment, mdiShare, mdiBookMarker } from "@mdi/js";
import type { responseBoard } from "~/types/boardtype";
import dropDownMenu from "./dropDownMenu.vue";
import { usePatchStateStore } from '~/stores/patchState'
import { useRouter } from "vue-router";
import type { BaseResponse } from "~/types/basetype";


const {patchStateStore} = handlePiniaPatchState(usePatchStateStore)
const patchOpen = ref(false);
const patchCardStyle = ref({});

const mdiThumbUpPath = ref(mdiThumbUp);
const mdiCommentPath = ref(mdiComment);
const mdiSharePath = ref(mdiShare);
const mdiBookMarkerPath = ref(mdiBookMarker);

const mdiIconAllPath = [
  mdiThumbUpPath.value,
  mdiCommentPath.value,
  mdiSharePath.value,
  mdiBookMarkerPath.value,
];

const props = defineProps<{
  board: responseBoard;
}>();

const router = useRouter();
const handlePatchClicked = async (event: any) => {
  const { top, left } = event.target.getBoundingClientRect();
  patchOpen.value = !patchOpen.value;
  patchCardStyle.value = {
    position: "fixed",
    top: `${top}px`,
    left: `${left - 550}px`,
  };
  patchStateStore.patchState = !patchStateStore.patchState
};

const handleRemoveClicked = async(user:responseBoard) => {
  const response = await jwtDeleteFetch('board/delete',user) as BaseResponse
};
</script>

<style lang="scss" scoped></style>
