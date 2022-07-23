export abstract class EnumValueObject<T> {
  public readonly value: T;
  public readonly validValues: T[];

  constructor(value: T, validValues: T[]) {
    this.validValues = validValues;
    this.checkValuesIsValid(value);
    this.value = value;
  }

  public checkValuesIsValid = (value: T): void => {
    if (!this.validValues.includes(value)) {
      this.throwErrorForInvalidValue(value);
    }
  };

  protected abstract throwErrorForInvalidValue(value: T): void
}
