import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { BoardEntity } from 'entities/board.entity';
import { BoardOptionEntity } from 'entities/boardOption.entity';
import { UserEntity } from 'entities/user.entity';
import { POSTGRES_DB, POSTGRES_PASSWORD, POSTGRES_PORT, POSTGRES_USER } from 'envIntelliJIDE/envIntellJ';

function ormConfig(): TypeOrmModuleOptions {
  const commonConf = {
    SYNCRONIZE: true,
    ENTITIES: [UserEntity,BoardEntity,BoardOptionEntity],
  };

  return {
    name: 'default',
    type: 'postgres',
    database: POSTGRES_DB,
    host: 'localhost',
    port: parseInt(POSTGRES_PORT),
    username: POSTGRES_USER,
    password: String(POSTGRES_PASSWORD),
    synchronize: commonConf.SYNCRONIZE,
    entities: commonConf.ENTITIES,
  };
}

export { ormConfig };
