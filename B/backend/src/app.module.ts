import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from 'ormconfig';
import { BoardModule } from './board/board.module';


@Module({
  imports: 
  [
    UserModule,
    TypeOrmModule.forRootAsync({ useFactory: ormConfig }),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    BoardModule,    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
