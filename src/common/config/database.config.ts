import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databases = {
  POLARIS_CP: 'polaris_cp',
};

const configFactory =
  (schema = databases.POLARIS_CP) =>
  (): TypeOrmModuleOptions => {
    const {
      PGDATABASE: database,
      PGHOST: host,
      PGPASSWORD: password,
      PGPORT: dbPort,
      PGUSER: username,
    } = process.env;

    const autoLoadEntities = true;
    const logging = false;
    const port = +dbPort;
    const synchronize = false;
    const type = 'postgres';

    const config = {
      autoLoadEntities,
      database,
      host,
      logging,
      password,
      port,
      schema,
      synchronize,
      type,
      username,
      entities: [],
    };

    return config as TypeOrmModuleOptions;
  };

export default {
  polarisCp: registerAs(databases.POLARIS_CP, configFactory()),
};
