import { UserResponse } from '../domain/User/UserResponse';

export interface GetResponse {
  data: UserResponse | UserResponse[];
}
