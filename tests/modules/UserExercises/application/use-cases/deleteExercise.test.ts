import { deleteExercise } from '../../../../../src/modules/UserExercises/application/use-cases/deleteExercise';
import { ExerciseId } from '../../../../../src/modules/UserExercises/domain/UserExercises';
import { ExerciseNotExist, UserExercisesNotExist } from '../../../../../src/modules/UserExercises/domain/Errors';
import { UserExercisesRepositoryMock } from '../../__mocks__/UserExercisesRepositoryMock';
import { UserId } from '../../../../../src/modules/Shared/domain/UserId';
import { usersExercisesData } from '../../__fixtures__/UsersExercisesFixtures';

describe('deleteExercise', () => {
  let repository: UserExercisesRepositoryMock;

  beforeEach(() => {
    repository = new UserExercisesRepositoryMock();
  });

  test('should return the user exercises without deleted exercise', async() => {
    const userId = new UserId(usersExercisesData[0]._id);
    const exerciseId = new ExerciseId(usersExercisesData[0].exercises[0]._id);

    const userExercises = { ...usersExercisesData[0] };
    const expectedUserExercises = { ...userExercises, exercises: userExercises.exercises.filter(exercise => exercise._id !== exerciseId.value) };

    repository.whenSearchThenReturn({ ...userExercises });

    const deletedUserExercises = await deleteExercise(userId, exerciseId, repository);

    expect(deletedUserExercises.toPrimitives()).toEqual(expectedUserExercises);
  });

  test('should throw an error if the user id not exist', async() => {
    const userId = new UserId(usersExercisesData[0]._id);
    const exerciseId = new ExerciseId(usersExercisesData[0].exercises[0]._id);

    const userExercises = { ...usersExercisesData[1] };

    repository.whenSearchThenReturn(null);

    try {
      const deletedUserExercises = await deleteExercise(userId, exerciseId, repository);
      expect(deletedUserExercises.toPrimitives()).toEqual(userExercises);
    } catch (error) {
      expect(error).toBeInstanceOf(UserExercisesNotExist);
    }
  });

  test('should throw an error if the id not exist', async() => {
    const userId = new UserId(usersExercisesData[0]._id);
    const exerciseId = new ExerciseId(usersExercisesData[1].exercises[0]._id);

    const userExercises = { ...usersExercisesData[0] };

    repository.whenSearchThenReturn({ ...userExercises });

    try {
      const deletedUserExercises = await deleteExercise(userId, exerciseId, repository);
      expect(deletedUserExercises.toPrimitives()).toEqual(userExercises);
    } catch (error) {
      expect(error).toBeInstanceOf(ExerciseNotExist);
    }
  });
});
