import { getExercise } from '../../../../../src/modules/Exercise/exercises/application/use-cases/getExercise';
import { ExerciseId } from '../../../../../src/modules/Exercise/exercises/domain/Exercise';
import { InvalidArgumentError } from '../../../../../src/modules/Shared/domain/value-object/InvalidArgumentError';
import { ExerciseIdMother } from '../../domain/Exercise';
import { exercisesData } from '../../__fixtures__/ExercisesData';
import { ExerciseRepositoryMock } from '../../__mocks__/ExerciseRepositoryMock';

describe('getExercise', () => {
  let repository: ExerciseRepositoryMock;

  beforeEach(() => {
    repository = new ExerciseRepositoryMock();
  });

  test('should return an exercise with the input id', async() => {
    repository.whenSearchThenReturn(exercisesData[0]);

    const exerciseId = new ExerciseId(exercisesData[0]._id);
    const exercise = await getExercise(exerciseId, repository);

    expect(exercise._id.value).toBe(exerciseId.value);
    repository.assertLastSearchedById(exerciseId);
  });

  test('should throw error if not find exercise with the id', async() => {
    repository.whenSearchThenReturn(null);

    const exerciseId = ExerciseIdMother.random();

    try {
      const exercise = await getExercise(exerciseId, repository);
      expect(exercise).toBeNull();
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidArgumentError);
    }
    repository.assertLastSearchedById(exerciseId);
  });
});
