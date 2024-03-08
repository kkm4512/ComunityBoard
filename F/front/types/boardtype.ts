export interface responseBoard {
  id: number
  title: string;
  description: string;
  selectedOption: string;
  createAt: string;
  updateAt: string;
  user: {
    email: string;
    nickname: string;
  }
}