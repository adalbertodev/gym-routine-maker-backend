import { PrimitiveObject } from '../../../shared/domain/PrimitiveObject';

export class UserPrimitive extends PrimitiveObject {
  public _id: string;
  public name: string;
  public email: string;
  public password: string;
  public role: string;

  constructor(id: string, name: string, email: string, password: string, role: string) {
    super();
    this._id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
