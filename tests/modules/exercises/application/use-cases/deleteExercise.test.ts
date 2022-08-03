import { ExerciseRepositoryMock } from '../../__mocks__/ExerciseRepositoryMock';
import { exercisesData } from '../../__fixtures__/ExercisesData';
import { deleteExercise } from '../../../../../src/modules/Exercise/exercises/application/use-cases/deleteExercise';
import { ExerciseId } from '../../../../../src/modules/Exercise/exercises/domain/Exercise';
import { ExerciseNotExist } from '../../../../../src/modules/Exercise/exercises/domain/Errors';

describe('deleteExercise', () => {
  let repository: ExerciseRepositoryMock;

  beforeEach(() => {
    repository = new ExerciseRepositoryMock();
  });

  test('should return the deleted exercise', async() => {
    const exerciseToDelete = exercisesData[0];
    repository.whenSearchThenReturn(exerciseToDelete);

    const deletedExercise = await deleteExercise(new ExerciseId(exerciseToDelete._id), repository);

    expect(deletedExercise.toPrimitives()).toEqual(exerciseToDelete);
  });

  test('should throw an error if the id not exist', async() => {
    const exerciseToDelete = exercisesData[0];
    repository.whenSearchThenReturn(null);

    try {
      const deletedExercise = await deleteExercise(new ExerciseId(exerciseToDelete._id), repository);
      expect(deletedExercise).toBeNull();
    } catch (error) {
      expect(error).toBeInstanceOf(ExerciseNotExist);
    }
  });
});
