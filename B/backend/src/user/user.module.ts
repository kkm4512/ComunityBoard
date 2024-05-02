import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'entities/user.entity';
import { MulterConfigModule } from 'src/multer/multer';
;

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    MulterConfigModule
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
