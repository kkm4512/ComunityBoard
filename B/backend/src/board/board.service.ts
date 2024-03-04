import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from 'entities/board.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardEntity)
    private boardRepository: Repository<BoardEntity>,
  ) {}

  async boardCreateService(data:BoardEntity){
    const board = this.boardRepository.create(data)
    await this.boardRepository.save(board)
    return '정상적으로 저장 되었습니다.'
  }
}
