import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from 'ormconfig';
import { BoardModule } from './board/board.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SCREATE_KEY } from 'envIntelliJIDE/envIntellJ';



@Module({
  imports: 
  [
    UserModule,
    TypeOrmModule.forRootAsync({ useFactory: ormConfig }),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    JwtModule.register({
      global: true,
      secret: JWT_SCREATE_KEY,
      signOptions: { expiresIn: '60s' },
    }),
    BoardModule,    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
