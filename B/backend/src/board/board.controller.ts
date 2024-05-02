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
  @UseInterceptors(FileInterceptor('file'))
  @Post('create')
  boardCreate(
    @Body() data: BoardEntity,
    @Req() req: any,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.boardService.boardCreateService(data, req, file);
  }

  @UseGuards(TokenGuard)
  @Post('create/option')
  boardOptionCreate(@Body() data: { id: number }) {
    return this.boardService.boardOptionCreateService(data);
  }

  @UseGuards(TokenGuard)
  @Post('getUsersBoardLiked')
  getUsersBoardLiked(@Body() data:{id:number}) {
    return this.boardService.getUsersBoardLikedService(data);
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
  @UseInterceptors(FileInterceptor('image'))
  patchBoard(
    @Body() user: BoardEntity,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    /**
     * [id,title,description,selectoption 받아옴]
     */
    return this.boardService.patchedBoard(user, image);
  }

  @UseGuards(TokenGuard)
  @Delete('delete')
  deleteBoard(@Body() user: BoardEntity) {
    return this.boardService.deleteBoardService(user);
  }
}

function changedImageEvent(e: Event) {
  const inputElement = e.target as HTMLInputElement;
  return inputElement ? inputElement.files[0] : false;
}
