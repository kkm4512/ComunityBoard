export const useIconsStore = defineStore('icons',{
  state: () => ({
    like: false,
    comment: false,
    share: false,
    bookmark: false
  }),
  actions: {
    updatelikeIcon(arg:boolean){
      this.like = arg
    },
    updateCommentIcon(arg:boolean){
      this.comment = arg
    },
    updateShareIcon(arg:boolean){
      this.share = arg
    },
    updateBookmarkIcon(arg:boolean){
      this.bookmark = arg
    },            

  }
})