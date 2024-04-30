export interface responseBoard {
  boardFind: [
    {
      id: number;
      like: number;
      userBoardId: number
    }
  ]
  id: number
  title: string;
  like: number;
  image: string
  description: string;
  selectedOption: string;
  createAt: string;
  updateAt: string;
  nickname: string;
  user: {
    email: string;
    nickname: string;
  }
}