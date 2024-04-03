import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from 'entities/board.entity';
import { BoardOptionEntity } from 'entities/boardOption.entity';
import { UserService } from 'src/user/user.service';
import { BoardType } from 'type/boardType';
import { Repository } from 'typeorm';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardEntity)
    private boardRepository: Repository<BoardEntity>,
    @InjectRepository(BoardOptionEntity)
    private boardOptionRepository: Repository<BoardOptionEntity>,
  ) {}

  async boardCreateService(data: BoardEntity, req: BoardType) {
    const board = Object.assign(data, {
      email: req.user.email,
    });

    const boardOption = await this.boardRepository.save(board);
    return {
      success: true,
      message: '정상적으로 저장 되었습니다.',
    };
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
  async patchedBoard(user: BoardEntity) {
    const patchedUserFind = await this.boardRepository.findOne({
      where: { id: user.id },
    });

    const patchedBoardData = Object.assign(patchedUserFind, {
      title: user.title,
      description: user.description,
      selectedOption: user.selectedOption,
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

    console.log(userFind);

    await this.boardRepository.remove(userFind);

    return {
      success: true,
    };
  }
}
