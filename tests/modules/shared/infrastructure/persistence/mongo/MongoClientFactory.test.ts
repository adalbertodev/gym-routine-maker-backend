import { MongoClient } from 'mongodb';
import { MongoClientFactory } from '../../../../../../src/modules/Shared/infrastructure/persistence/mongo/MongoClientFactory';
import { MongoConfigFactory } from '../../../../../../src/modules/Shared/infrastructure/persistence/mongo/MongoConfigFactory';

describe('MongoClientFactory', () => {
  const config = MongoConfigFactory.createConfig();
  const factory = MongoClientFactory;
  let client: MongoClient;

  beforeEach(async() => {
    client = await factory.createClient('test', config);
  });

  afterEach(async() => {
    await client.close();
  });

  describe('#createClient', () => {
    test('should return a created client if a client with the given name does not exist', async() => {
      const newClient = await factory.createClient('test2', config);

      expect(newClient).not.toBe(client);

      await newClient.close();
    });

    test('should return a client if it already exists', async() => {
      const newClient = await factory.createClient('test', config);

      expect(newClient).toBe(client);

      await newClient.close();
    });
  });

  describe('#closeClient', () => {
    test('should to delete the client with the given name', async() => {
      await factory.closeClient('test');
      const newClient = await factory.createClient('test', config);

      expect(newClient).not.toBe(client);

      await newClient.close();
    });
  });
});
