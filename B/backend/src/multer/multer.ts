import { BadRequestException, Module } from '@nestjs/common';
import { BoardEntity } from 'entities/board.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardOptionEntity } from 'entities/boardOption.entity';
import { MulterModule } from '@nestjs/platform-express';
import { extname } from 'path';
import * as multer from 'multer';
import { POST_IMAGE_PATH, POST_IMAGE_PROFILE_PATH, PROFILE_FOLDER_NAME } from 'const/paths';
import { v4 as uuid } from 'uuid';

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardEntity, BoardOptionEntity]),
    MulterModule.register({
      limits: {
        fieldSize: 1000000,
      },
      fileFilter: (req, file, cb) => {
        /**
         * cb(error,boolean)
         *
         * 첫번쨰 파라미터에는 에러가 있을경우 에러 정보를 넣음
         * 두번째 파라미터에는 파일을 받을지 말지 boolean값
         */
        const ext = extname(file.originalname);

        if (ext !== '.jpg' && ext !== '.png' && ext !== '.jpeg') {
          return cb(
            new BadRequestException('올바른 사진 형식이 아닙니다.'),
            false,
          );
        }

        return cb(null, true);
      },
      storage: multer.diskStorage({
        destination: function (req, res, cb) {
          if (req.route.path === "/board/create"){
            cb(null, POST_IMAGE_PATH)
          }  else {
            cb(null, POST_IMAGE_PROFILE_PATH)
          } 
        },
        filename: function (req, file, cb) {
          cb(null, `${uuid()}${extname(file.originalname)}`);
        },
      }),
    }),
  ],
  exports: [MulterModule]
})
export class MulterConfigModule {}
