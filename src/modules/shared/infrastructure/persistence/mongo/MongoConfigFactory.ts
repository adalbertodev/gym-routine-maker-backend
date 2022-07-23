import MongoConfig from './MongoConfig';

export class MongoConfigFactory {
  public static createConfig = (): MongoConfig => {
    return {
      url: process.env.MONGO_URL || ''
    };
  };
}
