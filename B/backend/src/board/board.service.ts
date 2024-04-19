import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { POST_PUBLIC_IMAGE_PATH } from 'const/paths';
import { BoardEntity } from 'entities/board.entity';
import { BoardOptionEntity } from 'entities/boardOption.entity';
import { join } from 'path';
import { Like, Repository } from 'typeorm';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardEntity)
    private boardRepository: Repository<BoardEntity>,
    @InjectRepository(BoardOptionEntity)
    private boardOptionRepository: Repository<BoardOptionEntity>,
  ) {}

  async boardCreateService(
    data: BoardEntity,
    req: { user: { email: string } },
    file?: Express.Multer.File,
  ) {
    const board = this.boardRepository.create({
      title: data.title,
      description: data.description,
      image: `/${join(POST_PUBLIC_IMAGE_PATH, file.filename)}`,
      email: req.user.email,
    });

    await this.boardRepository.save(board);

    return {
      success: true,
      message: '정상적으로 저장 되었습니다.',
    };
  }

  //like눌리면 해당 엔티티에 라이크 숫자 1더하기
  async boardOptionCreateService(data: { userId: number }) {
    const userFind = await this.boardRepository.findOne({
      where: { id: data.userId },
    });

    if (userFind.like === 0) {
      const likeAddUserFindBoard = Object.assign(userFind, {
        like: 1,
      });
      await this.boardRepository.save(likeAddUserFindBoard);
      return likeAddUserFindBoard;
    } else {
      const likeMinusUserFindBoard = Object.assign(userFind, {
        like: 0,
      });
      await this.boardRepository.save(likeMinusUserFindBoard);
      return likeMinusUserFindBoard;
    }
  }

  async getBoardsService() {
    const users = await this.boardRepository.find({
      order: {
        createAt: 'DESC',
      },
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

  /**
   * 1. patch할 user의 info를 받아옴
   * 2. 그 형태는 [id,title,des,selectOption]
   * 3. id를 찾고
   * 4. 그 id에 해당하는 게시물의 id,title,des를 변경시킴
   *
   */
  async patchedBoard(user: BoardEntity, image: Express.Multer.File) {
    const patchedUserFind = await this.boardRepository.findOne({
      where: { id: user.id },
    });

    const patchedBoardData = Object.assign(patchedUserFind, {
      title: user.title,
      description: user.description,
      selectedOption: user.selectedOption,
      image: `/${join(POST_PUBLIC_IMAGE_PATH, image.filename)}`,
    });

    await this.boardRepository.save(patchedBoardData);
    return {
      success: true,
      message: '정상적으로 수정 되었습니다.',
    };
  }

  async deleteBoardService(user: BoardEntity): Promise<{ success: boolean }> {
    const userFind = await this.boardRepository.findOne({
      where: { id: user.id },
    });

    await this.boardRepository.remove(userFind);

    return {
      success: true,
    };
  }

  async getBoardsUserIdService(id: number): Promise<any> {
    const userFind = await this.boardRepository.findOne({ where: { id } });
    const boards = await this.boardRepository.find({
      where: { email: userFind.email },
    });
    return boards;
  }
}
