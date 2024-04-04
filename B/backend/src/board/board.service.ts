import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from 'entities/board.entity';
import { BoardOptionEntity } from 'entities/boardOption.entity';
import { BoardType } from 'type/boardType';
import { Like, Repository } from 'typeorm';

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

    const createBoard = await this.boardRepository.save(board);

    return {
      success: true,
      message: '정상적으로 저장 되었습니다.',
    };
  }

  //like눌리면 해당 엔티티에 라이크 숫자 1더하기
  async boardOptionCreateService(data: { userId: number }) {

    const userFind = await this.boardOptionRepository.findOne({where: {userBoardId:data.userId}})

    //이미 like를 눌렀음

    if (userFind) {
      await this.boardOptionRepository.remove(userFind)
      return {
        success:false
      }
    }

    const boardOption = this.boardOptionRepository.create({
      userBoardId: data.userId,
      like: 1,
    });

    await this.boardOptionRepository.save(boardOption);

    return {
      success:true,
      boardOption
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
