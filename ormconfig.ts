import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
dotenv.config();

export const AppDataSource = new DataSource({
  name: 'default',
  type: 'postgres',
  schema: 'public',
  host: process.env.PGHOST,
  port: +(process.env.PGPORT || '5432'),
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  entities: ['src/**/entities/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
  cli: {
    migrationsDir: 'src/migrations',
  },
} as DataSourceOptions);
