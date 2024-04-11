import type { responseBoard } from "~/types/boardtype";

export const useBoardsDetailStore = defineStore("detail/boards", {
  state: () => ({
    detailBoards: [] as responseBoard[],
  }),
  actions: {
    updateDetailBoards(detailBoards: responseBoard[]) {
      this.detailBoards = detailBoards;
    },
  },
});
