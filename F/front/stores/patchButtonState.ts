export const useBoardsStore = defineStore("patchButtonState", {
  state: () => ({
    patchButtonState: false,
  }),
  actions: {
    updatePatchButtonState() {
      this.boards = boards;
    },
  },
});
