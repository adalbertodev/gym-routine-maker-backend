import { MotherCreator } from './MotherCreator';

export class IntegerMother {
  public static random = (max?: number) => {
    return Number(MotherCreator.random().random.numeric(max));
  };
}
