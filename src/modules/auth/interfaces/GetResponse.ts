import { UserResponse } from '../domain/UserResponse';

export interface GetResponse {
  data: UserResponse | UserResponse[];
}
