import { MongoClient } from 'mongodb';
import { EnvironmentArranger } from '../arranger/EnvironmentArranger';

export class MongoEnvironmentArranger extends EnvironmentArranger {
  private _client: Promise<MongoClient>;

  constructor(client: Promise<MongoClient>) {
    super();
    this._client = client;
  }

  public arrange = async(): Promise<void> => {
    await this.cleanDatabase();
  };

  protected cleanDatabase = async():Promise<void> => {
    const collections = await this.collections();
    const client = await this.client();

    for (const collection of collections) {
      await client.db().collection(collection).deleteMany({});
    }
  };

  private collections = async(): Promise<string[]> => {
    const client = await this.client();
    const collections = await client.db().listCollections(undefined, { nameOnly: true }).toArray();

    return collections.map((collection) => collection.name);
  };

  protected client = (): Promise<MongoClient> => {
    return this._client;
  };

  public close = async(): Promise<void> => {
    await this.cleanDatabase();
    return await (await this.client()).close();
  };
}
