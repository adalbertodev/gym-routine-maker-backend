import { UserResponse } from '../domain/User/UserResponse';

export interface LoginResponse {
  user: UserResponse,
  token: string
}
