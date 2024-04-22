import { DataSource } from 'typeorm';
import { ormConfig } from './ormconfig';

const ormSeedConfig = {
  ...ormConfig,
  migrations: [__dirname + '/seeds/**/*{.ts,js}'],
};

const PostgresDataSource = new DataSource({
  ...ormSeedConfig,
});

PostgresDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

export default PostgresDataSource;
