import { PrimitiveObject } from '../../../Shared/domain/PrimitiveObject';

export interface UserPrimitive extends PrimitiveObject {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}
