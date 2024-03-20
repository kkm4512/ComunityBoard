export const useIsCompleteStateStore = defineStore("isComplete", {
  state: () => ({
    isComplete: false,
  }),
  actions: {
    updateIsCompleteState(isComplete: boolean) {
      this.isComplete = isComplete;
    },
  },
});
