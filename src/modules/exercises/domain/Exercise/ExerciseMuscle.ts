import { EnumValueObject } from '../../../shared/domain/value-object/EnumValueObject';
import { InvalidArgumentError } from '../../../shared/domain/value-object/InvalidArgumentError';
import { ExerciseMuscles } from '../interfaces/ExerciseMuscles';

export class ExerciseMuscle extends EnumValueObject<`${ExerciseMuscles}`> {
  constructor(value: string) {
    const validValues = Object.values(ExerciseMuscles);
    super(value as ExerciseMuscles, validValues);
    this.ensureLengthIsLessThan30Characters(value);
  }

  private ensureLengthIsLessThan30Characters = (value: string) => {
    if (value.length > 30) {
      throw new InvalidArgumentError(`The Exercise Muscle <${value}> has more than 30 characters`);
    }
  };

  protected throwErrorForInvalidValue(value: string): void {
    throw new InvalidArgumentError(`${value} is not a valid muscle`);
  }
}
