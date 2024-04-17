import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardEntity } from 'entities/board.entity';
import { TokenGuard } from 'src/token/token.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @UseGuards(TokenGuard)
  // @UseInterceptors(FileInterceptor('image'))
  @Post('create')
  boardCreate(
    @Body() data: BoardEntity,
    @Req() req: any,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    console.log(req);
    return this.boardService.boardCreateService(data, req);
  }

  @UseGuards(TokenGuard)
  @Post('create/option')
  boardOptionCreate(@Body() data: { userId: number }) {
    return this.boardService.boardOptionCreateService(data);
  }

  @Post('getBoards')
  getBoards() {
    return this.boardService.getBoardsService();
  }

  @UseGuards(TokenGuard)
  @Post('getBoardsUserId')
  geetBoardsuserId(@Body() data: { id: number }) {
    return this.boardService.getBoardsUserIdService(data.id);
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
}
