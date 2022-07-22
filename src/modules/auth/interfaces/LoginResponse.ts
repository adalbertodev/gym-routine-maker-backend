import { UserResponse } from '../domain/UserResponse';

export interface LoginResponse {
  user: UserResponse,
  token: string
}
