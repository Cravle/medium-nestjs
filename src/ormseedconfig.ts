import config from '@app/orm.config';

const ormseedconfig = {
  ...config,
  migrations: [__dirname + '/seeds/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/seeds',
  },
};

export default ormseedconfig;
