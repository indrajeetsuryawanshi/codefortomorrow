import { Category } from 'src/category/entities/category.entity';
import { Service } from 'src/service/entities/service.entity';
import { ConnectionOptions } from 'typeorm';
import { DataSource } from 'typeorm';

export const ormConfig: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'code-for-tomarrow',
  username: 'postgres',
  password: 'post@123!',
  entities: [Category, Service],
  synchronize: true,
  migrations: [__dirname + '/migrations/**/*{.ts,js}'],
};

const PostgresDataSource = new DataSource({
  ...ormConfig,
});

PostgresDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
export default PostgresDataSource;
