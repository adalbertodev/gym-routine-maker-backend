import { UserResponse } from '../entities/UserResponse';

export interface GetResponse {
  data: UserResponse | UserResponse[];
}
