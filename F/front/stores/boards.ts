export const useBoardsStore = defineStore('boards',{
  state: () => ({
    boards: [{}],
  }),
  actions: {
    updateCookieAccessToken(boards:[{}]){
      this.boards = boards
    }
  },
})