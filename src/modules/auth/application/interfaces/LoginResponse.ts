import { UserResponse } from '../entities/UserResponse';

export interface LoginResponse {
  user: UserResponse,
  token: string
}
