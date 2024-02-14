import { TypeOrmModuleOptions } from '@nestjs/typeorm';

function ormConfig(): TypeOrmModuleOptions {
  const commonConf = {
    SYNCRONIZE: true,
    ENTITIES: [__dirname + '/entities/*{.ts,.js}'],
  };

  return {
    name: 'default',
    type: 'postgres',
    database: process.env.POSTGRES_DB,
    host: 'localhost',
    port: parseInt(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    synchronize: commonConf.SYNCRONIZE,
    entities: commonConf.ENTITIES,
  };
}

export { ormConfig };
