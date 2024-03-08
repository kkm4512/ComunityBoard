/**
* 1. patchCard.vue에 x버튼이 눌리면 patchCard.vue가 꺼지고, 홈페이지에있는 dropDownMenu도 닫혀야함
*/

export const usePatchXStateStore = defineStore("patchXState", {
  state: () => ({
    patchXState: false,
  }),
  actions: {
    updatePatchState(patchXState:boolean) {
      this.patchXState = patchXState;
    },
  },
});
