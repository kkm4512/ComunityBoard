export const usePatchStateStore = defineStore("patchState", {
  state: () => ({
    patchState: false,
  }),
  actions: {
    updatePatchState(patchState:boolean) {
      this.patchState = patchState;
    },
  },
});
