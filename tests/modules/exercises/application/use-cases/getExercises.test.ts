import { getExercises } from '../../../../../src/modules/UserExercises/application/use-cases/getExercises';
import { exercisesData } from '../../__fixtures__/ExercisesData';
import { ExerciseRepositoryMock } from '../../__mocks__/ExerciseRepositoryMock';

describe('getExercises', () => {
  let repository: ExerciseRepositoryMock;

  beforeEach(() => {
    repository = new ExerciseRepositoryMock();
  });

  test('should return a exercises array', async() => {
    repository.whenSearchThenReturn(exercisesData);

    const exercises = await getExercises(repository);

    expect(exercises.length).toBe(exercisesData.length);
    repository.assertLastSearched();
  });
});
