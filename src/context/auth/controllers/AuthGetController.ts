import { Request, Response } from 'express';
import { MongoUserRepository } from '../repositories/MongoUserRepository';
import { MongoClientFactory } from '../../shared/repositories/mongo/MongoClientFactory';

export const authGetController = async(req: Request, res: Response) => {
  const url = process.env.MONGO_URL || '';
  const client = MongoClientFactory.createClient('gym-routine-DB', { url });
  const repository = new MongoUserRepository(client);

  return res.status(200).json(await repository.searchAll());
};
