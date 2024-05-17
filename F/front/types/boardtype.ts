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
    image: string;
  }
}

// 유저 정보에 대한 타입
export interface UserEntity {
  id: number;
  email: string;
  password: string; // 비밀번호 정보는 일반적으로 클라이언트 측에서는 다루지 않습니다.
  nickname: string;
  createAt: Date;
  updateAt: Date;
}

// 게시판 정보에 대한 타입
export interface BoardEntity {
  id: number;
  image: string;
  email: string;
  title: string;
  description: string;
  selectedOption: string;
  createAt: Date;
  updateAt: Date;
  user: UserEntity;
}

// 게시물의 좋아요 옵션 정보에 대한 타입
export interface BoardOptionEntity {
  id: number;
  userBoardId: number;
  like: number; // 'like'가 boolean 타입이 아니라 0 또는 1 값을 가질 수 있다고 가정할 수 있습니다.
  board: BoardEntity;
}
