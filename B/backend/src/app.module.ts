import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from 'ormconfig';
import { BoardModule } from './board/board.module';
import { JwtModule } from '@nestjs/jwt';
import { TokenModule } from './token/token.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PUBILC_FOLDER_PATH, PUBLIC_FOLDER_NAME } from 'const/paths';

@Module({
  imports:
    // ServeStaticModule했는데 프론트에서
    // http://localhost:3000/public/posts/22227450-42ed-4bd1-9f41-91e354c1e0c2.png
    // 접근해도 안보임

    [
      ServeStaticModule.forRoot({
        rootPath: PUBILC_FOLDER_PATH,
        serveRoot: `/${PUBLIC_FOLDER_NAME}`,
      }),
      UserModule,
      TypeOrmModule.forRootAsync({ useFactory: ormConfig }),
      ConfigModule.forRoot({
        isGlobal: true,
      }),
      JwtModule.register({
        global: true,
        secret: process.env.JWT_SCREATE_KEY,
        signOptions: { expiresIn: '60s' },
      }),
      BoardModule,
      TokenModule,
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
