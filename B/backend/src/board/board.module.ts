import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { BoardEntity } from 'entities/board.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardOptionEntity } from 'entities/boardOption.entity';
import { MulterConfigModule } from 'src/multer/multer';
import { UserEntity } from 'entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardEntity, BoardOptionEntity,UserEntity]),
    MulterConfigModule
  ],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
