import { MongoClient } from 'mongodb';
import { Nullable } from '../../domain/Nullable';

import MongoConfig from './MongoConfig';

export class MongoClientFactory {
  private static clients: {[key: string]: MongoClient} = {};

  public static createClient = async(contextName: string, config: MongoConfig): Promise<MongoClient> => {
    let client = MongoClientFactory.getClient(contextName);

    if (!client) {
      client = await MongoClientFactory.createAndConnectClient(config);

      MongoClientFactory.registerClient(client, contextName);
    }

    return client;
  };

  public static closeClient = async(contextName: string): Promise<void> => {
    const client = MongoClientFactory.getClient(contextName);

    if (client) {
      await client.close();
      this.unregisterClient(contextName);
    }
  };

  private static getClient = (contextName: string): Nullable<MongoClient> => {
    return MongoClientFactory.clients[contextName];
  };

  private static createAndConnectClient = async(config: MongoConfig): Promise<MongoClient> => {
    const client = new MongoClient(config.url, { ignoreUndefined: true });

    await client.connect();

    return client;
  };

  private static registerClient = (client: MongoClient, contextName: string): void => {
    MongoClientFactory.clients[contextName] = client;
  };

  private static unregisterClient = (contextName: string): void => {
    delete MongoClientFactory.clients[contextName];
  };
}
