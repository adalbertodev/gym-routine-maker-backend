import { MongoClient } from 'mongodb';
import { MongoClientFactory } from '../../../../../../src/modules/shared/infrastructure/persistence/mongo/MongoClientFactory';

describe('MongoClientFactory', () => {
  const url = process.env.MONGO_URL || '';
  const factory = MongoClientFactory;
  let client: MongoClient;

  beforeEach(async() => {
    client = await factory.createClient('test', { url });
  });

  afterEach(async() => {
    await client.close();
  });

  describe('#createClient', () => {
    test('should return a created client if a client with the given name does not exist', async() => {
      const newClient = await factory.createClient('test2', { url });

      expect(newClient).not.toBe(client);

      await newClient.close();
    });

    test('should return a client if it already exists', async() => {
      const newClient = await factory.createClient('test', { url });

      expect(newClient).toBe(client);

      await newClient.close();
    });
  });

  describe('#closeClient', () => {
    test('should to delete the client with the given name', async() => {
      await factory.closeClient('test');
      const newClient = await factory.createClient('test', { url });

      expect(newClient).not.toBe(client);

      await newClient.close();
    });
  });
});
