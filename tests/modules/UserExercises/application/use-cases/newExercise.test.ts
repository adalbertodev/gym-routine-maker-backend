import { ExerciseMuscle, ExerciseName, ExerciseBarWeight, ExerciseRm } from '../../../../../src/modules/UserExercises/domain/UserExercises';
import { UserExercisesRepositoryMock } from '../../__mocks__/UserExercisesRepositoryMock';
import { randomExerciseBody } from '../../__fixtures__/ExercisesFixtures';
import { Uuid } from '../../../../../src/modules/Shared/domain/value-object/Uuid';
import { ExerciseAlreadyExists } from '../../../../../src/modules/UserExercises/domain/Errors';
import { newExercise } from '../../../../../src/modules/UserExercises/application/use-cases/newExercise';
import { UserId } from '../../../../../src/modules/Shared/domain/UserId';

describe('newExercise', () => {
  let repository: UserExercisesRepositoryMock;

  beforeEach(() => {
    repository = new UserExercisesRepositoryMock();
  });

  test('should return a new User Exercises and save it', async() => {
    const expectedUserExercises = {
      _id: /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
      exercises: [
        {
          _id: /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
          name: new ExerciseName(randomExerciseBody.name),
          muscle: new ExerciseMuscle(randomExerciseBody.muscle),
          barWeight: randomExerciseBody.barWeight ? new ExerciseBarWeight(randomExerciseBody.barWeight) : null,
          rm: randomExerciseBody.rm ? new ExerciseRm(randomExerciseBody.rm) : null
        },
        {
          _id: /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
          name: new ExerciseName(randomExerciseBody.name),
          muscle: new ExerciseMuscle(randomExerciseBody.muscle),
          barWeight: randomExerciseBody.barWeight ? new ExerciseBarWeight(randomExerciseBody.barWeight) : null,
          rm: randomExerciseBody.rm ? new ExerciseRm(randomExerciseBody.rm) : null
        }
      ]
    };

    const userId = new UserId(Uuid.random().value);
    repository.whenSearchThenReturn({ _id: userId.value, exercises: [] });

    const newUserExercises = await newExercise(userId, randomExerciseBody, repository);

    expect(newUserExercises._id.value).toMatch(expectedUserExercises._id);

    for (const exercise of newUserExercises.exercises) {
      const expectedExercise = expectedUserExercises.exercises.find(exercises => exercises.name.value === exercise.name.value);

      expect(exercise._id.value).toMatch(expectedUserExercises._id);
      expect(exercise.name.value).toBe(expectedExercise?.name.value);
      expect(exercise.muscle.value).toBe(expectedExercise?.muscle.value);
      expect(exercise.barWeight?.value).toBe(expectedExercise?.barWeight?.value);
      expect(exercise.rm?.value).toBe(expectedExercise?.rm?.value);
    }
    repository.assertLastSaved(newUserExercises);
  });

  test('should throw a error if already exist the exercise name', async() => {
    const userId = new UserId(Uuid.random().value);
    repository.whenSearchThenReturn({ _id: userId.value, exercises: [{ _id: Uuid.random().value, ...randomExerciseBody }] });

    try {
      const newUserExercises = await newExercise(userId, randomExerciseBody, repository);
      expect(newUserExercises).toBeNull();
    } catch (error) {
      expect(error).toBeInstanceOf(ExerciseAlreadyExists);
    }
  });
});
