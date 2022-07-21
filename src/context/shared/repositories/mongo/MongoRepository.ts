import { Collection, MongoClient } from 'mongodb';
import { ObjectDB } from '../../entities/ObjectDB';

export abstract class MongoRepository<T extends ObjectDB> {
  private _client: Promise<MongoClient>;

  constructor(client: Promise<MongoClient>) {
    this._client = client;
  }

  protected abstract moduleName(): string;

  protected client = (): Promise<MongoClient> => {
    return this._client;
  };

  protected collection = async(): Promise<Collection> => {
    return (await this._client).db().collection(this.moduleName());
  };

  protected persist = async(id: string, object: T): Promise<void> => {
    const collection = await this.collection();

    const document = { ...object.toPrimitives(), _id: id, id: undefined };

    await collection.updateOne({ _id: id }, { $set: document }, { upsert: true });
  };
}
