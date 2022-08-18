import { UserPrimitive } from '../../../../src/modules/Auth/domain/interfaces';
import { User, UserRepository } from '../../../../src/modules/Auth/domain/User';
import { Nullable } from '../../../../src/modules/Shared/domain/Nullable';
import { UserId } from '../../../../src/modules/Shared/domain/UserId';
import { UserEmail } from '../../../../src/modules/Auth/domain/User/UserEmail';

export class UserRepositoryMock implements UserRepository {
  private mockSave = jest.fn();
  private mockSearch = jest.fn();
  private mockReset = jest.fn();

  save = async(user: User): Promise<void> => {
    await this.mockSave(user);
  };

  searchAll = async(): Promise<UserPrimitive[]> => {
    return await this.mockSearch();
  };

  search = async(id: UserId): Promise<Nullable<UserPrimitive>> => {
    return await this.mockSearch(id.value);
  };

  searchByEmail = async(email: UserEmail): Promise<Nullable<UserPrimitive>> => {
    return await this.mockSearch(email.value);
  };

  delete = async(id: UserId): Promise<Nullable<UserPrimitive>> => {
    return await this.mockSearch(id.value);
  };

  reset = async(): Promise<void> => {
    await this.mockReset();
  };

  public whenSearchThenReturn = (value: Nullable<UserPrimitive | UserPrimitive[]>) => {
    this.mockSearch.mockReturnValue(value);
  };

  public assertLastSaved = (expected: User) => {
    const mock = this.mockSave.mock;
    const lastSavedUser = mock.calls[mock.calls.length - 1][0] as User;
    expect(lastSavedUser.toPrimitives()).toEqual(expected.toPrimitives());
  };

  public assertLastSearched = () => {
    expect(this.mockSearch).toHaveBeenCalledWith();
  };

  public assertLastSearchedById = (expected: UserId) => {
    expect(this.mockSearch).toHaveBeenCalledWith(expected.value);
  };

  public assertLastSearchedByEmail = (expected: UserEmail) => {
    expect(this.mockSearch).toHaveBeenCalledWith(expected.value);
  };
}
