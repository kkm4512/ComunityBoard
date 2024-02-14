import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from 'ormconfig';


@Module({
  imports: 
  [
    UserModule,
    TypeOrmModule.forRootAsync({ useFactory: ormConfig }),
    ConfigModule.forRoot({
      isGlobal: true
    }),    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
