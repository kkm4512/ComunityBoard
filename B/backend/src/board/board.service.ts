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
    return await this.boardRepository.find();
  }
}
