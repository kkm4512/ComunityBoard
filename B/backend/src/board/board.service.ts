import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from 'entities/board.entity';
import { BoardType } from 'type/boardType';
import { Repository } from 'typeorm';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardEntity)
    private boardRepository: Repository<BoardEntity>,
  ) {}

  async boardCreateService(data: BoardEntity, req: BoardType) {
    const board = Object.assign(data, {
      email: req.user.email,
    });

    await this.boardRepository.save(board);
    return {
      success: true,
      message: '정상적으로 저장 되었습니다.',
    };
  }

  async getBoardsService() {
    const users = await this.boardRepository.find({
      order:{
        createAt: 'DESC'
      }
    });
    const updatedUsers = users.map((user) => {
      const utcDate = new Date(user.createAt.toString());
      const kstOptions: any = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Asia/Seoul',
        hour12: false,
      };
      const kstFormatter = new Intl.DateTimeFormat('ko-KR', kstOptions);
      const kstTimeStr = kstFormatter.format(utcDate);

      // 새 객체 생성, 날짜/시간 필드는 변환된 문자열 사용
      return {
        ...user,
        createAt: kstTimeStr,
      };
    });
    return updatedUsers;
  }
}
