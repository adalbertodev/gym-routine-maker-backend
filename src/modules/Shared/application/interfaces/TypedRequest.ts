import { Request } from 'express';
import { Query } from 'express-serve-static-core';

export interface TypedRequest<T, U extends Query = any> extends Request {
  body: T,
  query: U
}
