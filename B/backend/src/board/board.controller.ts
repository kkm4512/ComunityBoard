import { Body, Controller, Post } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardEntity } from 'entities/board.entity';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post('create')
  boardCreate(
    @Body() data:BoardEntity
    ){
    return this.boardService.boardCreateService(data)
  }

}
