import { ErrorResponse } from '../../../shared/application/interfaces/ErrorResponse';

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  data: {
    user?: UserResponse,
    users?: UserResponse[],
    token?: string
  } | null,
  error: ErrorResponse | null
}
