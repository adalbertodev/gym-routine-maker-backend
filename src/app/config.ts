import dotenv from 'dotenv';

const env = process.env.NODE_ENV || 'dev';

dotenv.config({ path: `.env.${env}` });

const config = {
  env,
  app: {
    port: process.env.PORT || '5000'
  },
  db: {
    connection: process.env.DB_CONNECTION,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME
  }
};

export default config;
