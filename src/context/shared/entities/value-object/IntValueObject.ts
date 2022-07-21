export abstract class NumberValueObject {
  readonly value: number;

  constructor(value: number) {
    this.value = value;
  }

  public equalsTo = (other: NumberValueObject): boolean => {
    return this.value === other.value;
  };

  public isBiggerThan = (other: NumberValueObject): boolean => {
    return this.value > other.value;
  };
}
