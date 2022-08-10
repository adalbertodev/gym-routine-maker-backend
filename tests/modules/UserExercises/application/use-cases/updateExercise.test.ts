import { Exercise, UserExercises } from '../../../../../src/modules/UserExercises/domain/UserExercises';
import { ExerciseAlreadyExists, ExerciseNotExist, UserExercisesNotExist } from '../../../../../src/modules/UserExercises/domain/Errors';
import { updateExercise } from '../../../../../src/modules/UserExercises/application/use-cases/updateExercise';
import { UserExercisesRepositoryMock } from '../../__mocks__/UserExercisesRepositoryMock';
import { UserId } from '../../../../../src/modules/Shared/domain/UserId';
import { usersExercisesData } from '../../__fixtures__/UsersExercisesFixtures';

describe('updateExercise', () => {
  let repository: UserExercisesRepositoryMock;

  beforeEach(() => {
    repository = new UserExercisesRepositoryMock();
  });

  test('should return the updated user exercises and save it', async() => {
    const userId = new UserId(usersExercisesData[0]._id);
    const userExercises = new UserExercises(userId, [
      Exercise.fromPrimitives(usersExercisesData[0].exercises[0]),
      Exercise.fromPrimitives(usersExercisesData[0].exercises[1])
    ]);

    const exerciseToUpdate = Exercise.fromPrimitives({ ...usersExercisesData[0].exercises[0], rm: 20 });
    const updatedUserExercises = UserExercises.fromPrimitives({
      _id: userExercises._id.value,
      exercises: [
        ...userExercises.exercises.map(exercise =>
          exercise._id.value === exerciseToUpdate._id.value ? exerciseToUpdate.toPrimitives() : exercise.toPrimitives()
        )
      ]
    });

    repository.whenSearchThenReturn({
      ...userExercises.toPrimitives()
    });

    const newUserExercises = await updateExercise(userId, exerciseToUpdate, repository);

    expect(newUserExercises._id.value).toBe(updatedUserExercises._id.value);

    const updatedExercise = newUserExercises.exercises.find(exercise => exercise._id.value === exerciseToUpdate._id.value);
    expect(updatedExercise?.name.value).toBe(exerciseToUpdate.name.value);
    expect(updatedExercise?.muscle.value).toBe(exerciseToUpdate.muscle.value);
    expect(updatedExercise?.barWeight?.value).toBe(exerciseToUpdate.barWeight?.value);
    expect(updatedExercise?.rm?.value).toBe(exerciseToUpdate.rm?.value);
    repository.assertLastSaved(updatedUserExercises);
  });

  test('should throw a error if not exist the user exercises', async() => {
    const userId = new UserId(usersExercisesData[0]._id);

    const exerciseToUpdate = Exercise.fromPrimitives({ ...usersExercisesData[0].exercises[0], rm: 20 });

    repository.whenSearchThenReturn(null);

    try {
      const newUserExercises = await updateExercise(userId, exerciseToUpdate, repository);
      expect(newUserExercises).toEqual(null);
    } catch (error) {
      expect(error).toBeInstanceOf(UserExercisesNotExist);
    }
  });

  test('should throw a error if not exist the exercise', async() => {
    const userId = new UserId(usersExercisesData[0]._id);
    const userExercises = new UserExercises(userId, [Exercise.fromPrimitives(usersExercisesData[0].exercises[1])]);

    const exerciseToUpdate = Exercise.fromPrimitives({ ...usersExercisesData[0].exercises[0], rm: 20 });

    repository.whenSearchThenReturn({
      ...userExercises.toPrimitives()
    });

    try {
      const newUserExercises = await updateExercise(userId, exerciseToUpdate, repository);
      expect(newUserExercises).toEqual(userExercises);
    } catch (error) {
      expect(error).toBeInstanceOf(ExerciseNotExist);
    }
  });

  test('should throw a error if already exist exercise with that name', async() => {
    const userId = new UserId(usersExercisesData[0]._id);
    const userExercises = new UserExercises(userId, [
      Exercise.fromPrimitives(usersExercisesData[0].exercises[0]),
      Exercise.fromPrimitives(usersExercisesData[0].exercises[1])
    ]);

    const exerciseToUpdate = Exercise.fromPrimitives({
      ...usersExercisesData[0].exercises[0],
      name: usersExercisesData[0].exercises[1].name
    });

    repository.whenSearchThenReturn({
      ...userExercises.toPrimitives()
    });

    try {
      const newExercise = await updateExercise(userId, exerciseToUpdate, repository);
      expect(newExercise).toEqual(userExercises);
    } catch (error) {
      expect(error).toBeInstanceOf(ExerciseAlreadyExists);
    }
  });
});
