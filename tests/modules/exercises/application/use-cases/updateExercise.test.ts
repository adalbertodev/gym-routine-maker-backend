import { ExerciseRepositoryMock } from '../../__mocks__/ExerciseRepositoryMock';
import { exercisesData } from '../../__fixtures__/ExercisesData';
import { ExerciseId, ExerciseName, ExerciseMuscle, ExerciseBarWeight, ExerciseRm, Exercise } from '../../../../../src/modules/Exercise/exercises/domain/Exercise';
import { UserId } from '../../../../../src/modules/Shared/domain/UserId';
import { updateExercise } from '../../../../../src/modules/Exercise/exercises/application/use-cases/updateExercise';
import { ExerciseAlreadyExists, ExerciseNotExist } from '../../../../../src/modules/Exercise/exercises/domain/Errors';

describe('updateExercise', () => {
  let repository: ExerciseRepositoryMock;

  beforeEach(() => {
    repository = new ExerciseRepositoryMock();
  });

  test('should return the updated exercise and save it', async() => {
    const updatedExercise = new Exercise(
      new ExerciseId(exercisesData[0]._id),
      new UserId(exercisesData[0].userId!),
      new ExerciseName(exercisesData[0].name),
      new ExerciseMuscle(exercisesData[0].muscle),
      new ExerciseBarWeight(exercisesData[0].barWeight!),
      new ExerciseRm(exercisesData[0].rm!)
    );
    repository.whenSearchThenReturn({ ...updatedExercise.toPrimitives() });

    const newExercise = await updateExercise(updatedExercise, repository);

    expect(newExercise._id.value).toMatch(updatedExercise._id.value);
    expect(newExercise.userId?.value).toBe(updatedExercise.userId?.value);
    expect(newExercise.name.value).toBe(updatedExercise.name.value);
    expect(newExercise.muscle.value).toBe(updatedExercise.muscle.value);
    expect(newExercise.barWeight?.value).toBe(updatedExercise.barWeight?.value);
    expect(newExercise.rm?.value).toBe(updatedExercise.rm?.value);
    repository.assertLastSaved(newExercise);
  });

  test('should throw a error if not exist the exercise', async() => {
    const updatedExercise = new Exercise(
      new ExerciseId(exercisesData[0]._id),
      new UserId(exercisesData[0].userId!),
      new ExerciseName(exercisesData[0].name),
      new ExerciseMuscle(exercisesData[0].muscle),
      new ExerciseBarWeight(exercisesData[0].barWeight!),
      new ExerciseRm(exercisesData[0].rm!)
    );
    repository.whenSearchThenReturn(null);

    try {
      const newExercise = await updateExercise(updatedExercise, repository);
      expect(newExercise).toBeNull();
    } catch (error) {
      expect(error).toBeInstanceOf(ExerciseNotExist);
    }
  });

  test('should throw a error if already exist exercise with that name', async() => {
    const updatedExercise = new Exercise(
      new ExerciseId(exercisesData[0]._id),
      new UserId(exercisesData[0].userId!),
      new ExerciseName(exercisesData[1].name),
      new ExerciseMuscle(exercisesData[0].muscle),
      new ExerciseBarWeight(exercisesData[0].barWeight!),
      new ExerciseRm(exercisesData[0].rm!)
    );
    repository.whenSearchThenReturn(exercisesData[1]);

    try {
      const newExercise = await updateExercise(updatedExercise, repository);
      expect(newExercise).toBeNull();
    } catch (error) {
      expect(error).toBeInstanceOf(ExerciseAlreadyExists);
    }
  });
});
