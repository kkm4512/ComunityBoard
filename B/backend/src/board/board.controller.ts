import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardEntity } from 'entities/board.entity';
import { TokenGuard } from 'src/token/token.guard';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @UseGuards(TokenGuard)
  @Post('create')
  boardCreate(
    @Body() data:BoardEntity,
    @Req() req:any
    ){
    return this.boardService.boardCreateService(data,req)
  }

  @Post('getBoards')
  getBoards(){
    return this.boardService.getBoardsService()
  }

}
