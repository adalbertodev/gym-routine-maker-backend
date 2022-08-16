import config from '../../../../../app/config';
import MongoConfig from './MongoConfig';

export class MongoConfigFactory {
  public static createConfig = (): MongoConfig => {
    const { connection, database, host, port, password, username } = config.db;
    const authentication = username && password ? `${username}:${password}@` : '';
    const assignedPort = port ? `:${port}` : '';
    return {
      url: `${connection}://${authentication}${host}${assignedPort}/${database}`
    };
  };
}
