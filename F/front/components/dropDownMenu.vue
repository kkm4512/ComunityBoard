import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardEntity } from 'entities/board.entity';
import { TokenGuard } from 'src/token/token.guard';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @UseGuards(TokenGuard)
  @Post('create')
  boardCreate(@Body() data: BoardEntity, @Req() req: any) {
    return this.boardService.boardCreateService(data, req);
  }

  @Post('getBoards')
  getBoards() {
    return this.boardService.getBoardsService();
  }

  @UseGuards(TokenGuard)
  @Patch('patch')
  patchBoard(@Body() user: BoardEntity) {
    /**
     * [id,title,description,selectoption 받아옴]
     */
    return this.boardService.patchedBoard(user);
  }

  @UseGuards(TokenGuard)
  @Delete('delete')
  deleteBoard(@Body() user: BoardEntity) {
    return this.boardService.deleteBoardService(user);
  }

  @UseGuards(TokenGuard)
  @Post('create/option')
  boardOptionCreate(@Body() data: any) {
    console.log(data);
  }
}
