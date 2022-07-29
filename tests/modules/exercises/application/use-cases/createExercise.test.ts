import { ExerciseMuscle, ExerciseName, ExerciseBarWeight, ExerciseRm } from '../../../../../src/modules/exercises/domain/Exercise';
import { ExerciseRepositoryMock } from '../../__mocks__/ExerciseRepositoryMock';
import { randomExerciseBody } from '../../__fixtures__/ExercisesFixtures';
import { UserId } from '../../../../../src/modules/shared/domain/UserId';
import { createExercise } from '../../../../../src/modules/exercises/application/use-cases/createExercise';
import { Uuid } from '../../../../../src/modules/shared/domain/value-object/Uuid';
import { ExerciseAlreadyExists } from '../../../../../src/modules/exercises/domain/Errors';

describe('createExercise', () => {
  let repository: ExerciseRepositoryMock;

  beforeEach(() => {
    repository = new ExerciseRepositoryMock();
  });

  test('should return a new Exercise and save it', async() => {
    const expectedExercise = {
      _id: /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
      userId: new UserId(randomExerciseBody.userId),
      name: new ExerciseName(randomExerciseBody.name),
      muscle: new ExerciseMuscle(randomExerciseBody.muscle),
      barWeight: new ExerciseBarWeight(randomExerciseBody.barWeight),
      rm: new ExerciseRm(randomExerciseBody.rm)
    };
    repository.whenSearchThenReturn(null);

    const newExercise = await createExercise(randomExerciseBody, repository);

    expect(newExercise._id.value).toMatch(expectedExercise._id);
    expect(newExercise.userId?.value).toBe(expectedExercise.userId.value);
    expect(newExercise.name.value).toBe(expectedExercise.name.value);
    expect(newExercise.muscle.value).toBe(expectedExercise.muscle.value);
    expect(newExercise.barWeight?.value).toBe(expectedExercise.barWeight.value);
    expect(newExercise.rm?.value).toBe(expectedExercise.rm.value);
    repository.assertLastSaved(newExercise);
  });

  test('should throw a error if already exist the exercise name', async() => {
    repository.whenSearchThenReturn({ ...randomExerciseBody, _id: Uuid.random().value });

    try {
      const newExercise = await createExercise(randomExerciseBody, repository);
      expect(newExercise).toBeNull();
    } catch (error) {
      expect(error).toBeInstanceOf(ExerciseAlreadyExists);
    }
  });
});
