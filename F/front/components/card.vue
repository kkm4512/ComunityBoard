<template>
  <div
    class="block w-[700px] p-6 bg-white border border-gray-300 rounded-lg shadow hover:bg-gray-100"
  >
    <div class="flex">
      
      <img
        v-if="board.user.image"
        class="w-10 h-10 rounded-full mt-2"
        :src="`http://localhost:3001` + board.user.image"
        alt="Rounded avatar"
      />
      <img
        v-else
        class="w-10 h-10 rounded-full mt-2"
        src="http://localhost:3001/public/default/default.jpg"
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
    <div class="mt-5 mb-5 flex justify-center" v-if="board.image">
      <img :src="`http://localhost:3001${board.image}`" />
    </div>
    <p class="font-normal text-black dark:text-gray-700 mt-5">
      {{ board.description }}
    </p>

    <div class="flex justify-between mt-7 mb-2">
      <div
        class="cursor-pointer hover:bg-gray-300 ml-2"
        v-for="icon in mdiIcons"
        :key="icon.id"
      >
        <svg-icon
          type="mdi"
          :path="icon.path"
          :class="{ liked: icon.clicked }"
          @click="clickedIcon(icon.id, board.id,icon)"
          
        ></svg-icon>
      </div>
    </div>
  </div>
  <div>
    <patchCard :board="props.board" v-if="patchOpen" :style="patchCardStyle" />
  </div>
</template>

<script setup lang="ts">
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiThumbUp, mdiComment, mdiShare, mdiBookMarker } from "@mdi/js";
import type { responseBoard } from "~/types/boardtype";
import dropDownMenu from "./dropDownMenu.vue";
import { usePatchStateStore } from "~/stores/patchState";
import { useRouter } from "vue-router";
import type { BaseResponse } from "~/types/basetype";
import type { BoardOptionEntity } from "~/types/boardtype"

const { patchStateStore } = handlePiniaPatchState(usePatchStateStore);
const patchOpen = ref(false);
const patchCardStyle = ref({});

const props = defineProps<{
  board: responseBoard;
}>();

const response = ref<BoardOptionEntity>()

const mdiIcons = ref([
  { id: "mdiThumbUp", path: mdiThumbUp, clicked: false },
  { id: "mdiComment", path: mdiComment, clicked: false },
  { id: "mdiShare", path: mdiShare, clicked: false },
  { id: "mdiBookMarker", path: mdiBookMarker, clicked: false },
]);

onMounted( async() => {
  const res = await jwtDataFetch("board/getUsersBoardLiked",{id:props.board.id}) as BoardOptionEntity
  //여기서 확인할떄 사용자인지 아닌지 체크해야할듯?
  //이거 왜안돼 ㅅㅂ
  const cookie = await getCookieFetch()
  const decoded = jwedecoded(cookie) as {email: string, nickname: string, id: number}
  mdiIcons.value[0].clicked = res.like && res.board.user.id === decoded.id ? true : false
  
} )


const router = useRouter();

//onMounted를 했을때 각 게시글에 해당하는 like의 유무를 가져오게하기



//좋아요를 눌렀을경우 해당 boardId에 like 1을 추가하는거까지함
async function clickedIcon(iconId: string, boardId: number,icon:any) {
  if (iconId === "mdiThumbUp") {
    const response = (await jwtDataFetch("board/create/option", {
      id: boardId,
    })) as { success: boolean };
    if (response.success === true) {
      icon.clicked = !icon.clicked
    } else {
      icon.clicked = !icon.clicked
    }
  }
}
const handlePatchClicked = async (event: any) => {
  const { top, left } = event.target.getBoundingClientRect();
  patchOpen.value = !patchOpen.value;
  patchCardStyle.value = {
    position: "fixed",
    top: `${top}px`,
    left: `${left - 550}px`,
  };
  patchStateStore.patchState = !patchStateStore.patchState;
};

const handleRemoveClicked = async (user: responseBoard) => {
  const response = (await jwtDeleteFetch("board/delete", user)) as BaseResponse;

  successError(
    response,
    router,
    "삭제에 성공했습니다.",
    "success",
    "삭제실패",
    "error"
  );
};
</script>

<style>

.liked {
  color : blue;
}
</style>
