import { exercisesData } from '../../__fixtures__/ExercisesData';
import { ExerciseRepositoryMock } from '../../__mocks__/ExerciseRepositoryMock';
import { getExercisesByUser } from '../../../../../src/modules/Exercise/exercises/application/use-cases/getExercisesByUser';
import { UserId } from '../../../../../src/modules/Shared/domain/UserId';

describe('getExercisesByUser', () => {
  let repository: ExerciseRepositoryMock;

  beforeEach(() => {
    repository = new ExerciseRepositoryMock();
  });

  test('should return an exercises array with the given userId or null', async() => {
    const userId = new UserId(exercisesData[0].userId!);
    repository.whenSearchThenReturn(
      exercisesData.filter((exercise) => exercise.userId === userId.value)
    );

    const exercises = await getExercisesByUser(userId, repository);

    for (const exercise of exercises) {
      expect(exercise.userId?.value).toBe(userId.value || null);
    }
    repository.assertLastSearchedByUser(userId);
  });
});
