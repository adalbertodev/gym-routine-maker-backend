import { UserExercisesRepository } from '../../../../src/modules/UserExercises/domain/UserExercises';
import { UserExercisesPrimitive } from '../../../../src/modules/UserExercises/domain/interfaces';
import { Nullable } from '../../../../src/modules/Shared/domain/Nullable';
import { UserId } from '../../../../src/modules/Shared/domain/UserId';
import { UserExercises } from '../../../../src/modules/UserExercises/domain/UserExercises/UserExercises';

export class UserExercisesRepositoryMock implements UserExercisesRepository {
  private mockSave = jest.fn();
  private mockSearch = jest.fn();
  private mockReset = jest.fn();

  save = async(exercise: UserExercises): Promise<void> => {
    await this.mockSave(exercise);
  };

  searchAll = async(): Promise<UserExercisesPrimitive[]> => {
    return await this.mockSearch();
  };

  search = async(id: UserId): Promise<Nullable<UserExercisesPrimitive>> => {
    return await this.mockSearch(id);
  };

  delete = async(id: UserId): Promise<Nullable<UserExercisesPrimitive>> => {
    return await this.mockSearch(id);
  };

  reset = async(): Promise<void> => {
    await this.mockReset();
  };

  public whenSearchThenReturn = (value: Nullable<UserExercisesPrimitive | UserExercisesPrimitive[]>) => {
    this.mockSearch.mockReturnValue(value);
  };

  public assertLastSaved = (expected: UserExercises) => {
    const mock = this.mockSave.mock;
    const lastSavedUserExercises = mock.calls[mock.calls.length - 1][0] as UserExercises;
    expect(lastSavedUserExercises.toPrimitives()).toEqual(expected.toPrimitives());
  };

  public assertLastSearched = () => {
    expect(this.mockSearch).toHaveBeenCalledWith();
  };

  public assertLastSearchedById = (expected: UserId) => {
    expect(this.mockSearch).toHaveBeenCalledWith(expected);
  };
}
