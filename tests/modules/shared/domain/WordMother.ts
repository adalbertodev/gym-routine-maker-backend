import { MotherCreator } from './MotherCreator';

export class WordMother {
  public static random = (): string => {
    return MotherCreator.random().lorem.word();
  };

  public static randomEmail = (): string => {
    return MotherCreator.random().internet.email();
  };
}
