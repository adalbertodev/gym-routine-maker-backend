import { PrimitiveObject } from '../../../shared/domain/PrimitiveObject';

export interface UserPrimitive extends PrimitiveObject {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}
