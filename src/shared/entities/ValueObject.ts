export abstract class ValueObject<T extends Object> {
  private _value: T;

  constructor(value: T) {
    this._value = value;
  }

  public value = (): T => {
    return this._value;
  };

  public equals = (objectToCompare: ValueObject<T>): boolean => {
    return this.value() === objectToCompare.value();
  };

  public toJSON = (): string => {
    return this.toString();
  };

  public toString = (): string => {
    if (this._value) {
      return this._value.toString();
    }
    return this._value;
  };
}
