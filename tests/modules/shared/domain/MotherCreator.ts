import { Faker, faker } from '@faker-js/faker';

export class MotherCreator {
  public static random = (): Faker => {
    return faker;
  };
}
