import { DataSource } from 'typeorm';

export const ConnectionConfig: any = {
  migrationsTableName: 'migrations',
  type: 'mysql',
  host: 'mysql-db',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'dockerized',
  synchronize: true,
  name: 'default',
  entities: ['src/entities/**/*{.ts,.js}'],
  migrations: ['src/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

const ConnectionSource = new DataSource(ConnectionConfig);

export default ConnectionSource
