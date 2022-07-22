import { PrimitiveObject } from '../../shared/domain/PrimitiveObject';

export class UserPrimitive extends PrimitiveObject {
  public id: string;
  public name: string;
  public email: string;
  public role: string;

  constructor(id: string, name: string, email: string, role: string) {
    super();
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
  }
}
