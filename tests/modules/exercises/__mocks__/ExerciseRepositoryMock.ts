import {
  Exercise,
  ExerciseId,
  ExerciseName
} from '../../../../src/modules/UserExercises/domain/UserExercises';
import { ExerciseRepository } from '../../../../src/modules/UserExercises/domain/UserExercises/ExerciseRepository';
import { ExercisePrimitive } from '../../../../src/modules/UserExercises/domain/interfaces';
import { Nullable } from '../../../../src/modules/Shared/domain/Nullable';
import { UserId } from '../../../../src/modules/Shared/domain/UserId';

export class ExerciseRepositoryMock implements ExerciseRepository {
  private mockSave = jest.fn();
  private mockSearch = jest.fn();
  private mockReset = jest.fn();

  public save = async(exercise: Exercise): Promise<void> => {
    await this.mockSave(exercise);
  };

  searchAll = async(): Promise<ExercisePrimitive[]> => {
    return await this.mockSearch();
  };

  searchByUser = async(userId: UserId): Promise<ExercisePrimitive[]> => {
    return await this.mockSearch(userId);
  };

  search = async(id: ExerciseId): Promise<Nullable<ExercisePrimitive>> => {
    return await this.mockSearch(id);
  };

  searchByName = async(name: ExerciseName): Promise<Nullable<ExercisePrimitive>> => {
    return await this.mockSearch(name);
  };

  delete = async(id: ExerciseId): Promise<Nullable<ExercisePrimitive>> => {
    return await this.mockSearch(id);
  };

  reset = async(): Promise<void> => {
    await this.mockReset();
  };

  public whenSearchThenReturn = (value: Nullable<ExercisePrimitive | ExercisePrimitive[]>) => {
    this.mockSearch.mockReturnValue(value);
  };

  public assertLastSaved = (expected: Exercise) => {
    const mock = this.mockSave.mock;
    const lastSavedExercise = mock.calls[mock.calls.length - 1][0] as Exercise;
    expect(lastSavedExercise.toPrimitives()).toEqual(expected.toPrimitives());
  };

  public assertLastSearched = () => {
    expect(this.mockSearch).toHaveBeenCalledWith();
  };

  public assertLastSearchedById = (expected: ExerciseId) => {
    expect(this.mockSearch).toHaveBeenCalledWith(expected);
  };

  public assertLastSearchedByUser = (expected: UserId) => {
    expect(this.mockSearch).toHaveBeenCalledWith(expected);
  };

  public assertLastSearchedByName = (expected: ExerciseName) => {
    expect(this.mockSearch).toHaveBeenCalledWith(expected);
  };
}
