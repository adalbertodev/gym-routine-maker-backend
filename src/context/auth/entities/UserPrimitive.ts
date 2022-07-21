import { PrimitiveObject } from '../../shared/entities/PrimitiveObject';

export class UserPrimitive extends PrimitiveObject {
  public id: string;
  public name: string;

  constructor(id: string, name: string) {
    super();
    this.id = id;
    this.name = name;
  }

  public static createFromObject = ({ id, name }: {id: string, name: string}) => {
    return new UserPrimitive(id, name);
  };
}
