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
          @click="clickedIcon({ icon, iconId: icon.id, boardId: board.id })"
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
import type { BoardOptionEntity } from "~/types/boardtype";
import { jwtDecode } from "jwt-decode";

const { patchStateStore } = handlePiniaPatchState(usePatchStateStore);
const patchOpen = ref(false);
const patchCardStyle = ref({});

const props = defineProps<{
  board: responseBoard;
}>();

const cookie = await getCookieFetch();
const loginUser = jwtDecode(cookie) as {
  email: string;
  nickname: string;
  id: number;
};
const response = ref<BoardOptionEntity>();

const mdiIcons = ref([
  { id: "mdiThumbUp", path: mdiThumbUp, clicked: false },
  { id: "mdiComment", path: mdiComment, clicked: false },
  { id: "mdiShare", path: mdiShare, clicked: false },
  { id: "mdiBookMarker", path: mdiBookMarker, clicked: false },
]);

onMounted(() => {
  getBoardsUserIdIncludes();
});

/**
1. getBoardsUserIdIncludes 함수를 통해 각 게시글의 아이디에 대해 like 여부를 알 수 있음
*/

async function getBoardsUserIdIncludes() {
  const response = (await jwtDataFetch("board/getBoardsUserId", {
    id: props.board.id,
  })) as { userBoardId: number };
  //이 게시글을 작성한 유저의 id와 현재 로그인되어있는 사용자의 id도 일치해야함

  if (
    props.board.id === response.userBoardId &&
    response.board.user.id === loginUser.id
  ) {
    const icon = mdiIcons.value.find((icon) => icon.id === "mdiThumbUp");
    if (icon) icon.clicked = !icon.clicked;
  }
}

const router = useRouter();

//onMounted를 했을때 각 게시글에 해당하는 like의 유무를 가져오게하기

/**
1. 프론트에서 좋아요를 누른다.
2. 백엔드로 해당 좋아요가 눌린 게시글의 (id)를 보내준다.
3. 백엔드의 boardOption DB에 해당 id와 함께 liked++ 후에 DB저장
4. 프론트의 getBoard 하는 함수에 같이 실어다줌
5. 프론트에서는 board.user.liked 여부로 해당 좋아요가 눌린지 판단함
6. 근데 이러면 프론트에서는 좋아요를 눌렀을때를 감지하지못하기때문에 이거는 프론트에서 그냥 자체적으로 처리하기
7. 어차피 프론트에서 새로고침이나 화면로딩(onMounted)할때 백엔드의 게시물들을 가져오고 그때는 좋아요가 눌린지 판단 할 수 있기 때문
*/

class Ids {
  icon: any;
  iconId: string;
  boardId: number;
}

function clickedIcon(ids: Ids) {
  //근데 이거 할때 아이디가 서로 일치하지않으면 그냥 전송못하게 막기
  //내일하자 ㅇㅅㅇ;
  const response = jwtDataFetch("board/create/option", {
    boardId: ids.boardId,
  });
  ids.icon.clicked = !ids.icon.clicked;
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
  color: blue;
}
</style>
