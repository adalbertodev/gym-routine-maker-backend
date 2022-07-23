import { ErrorResponse } from '../../../shared/application/interfaces/ErrorResponse';

export interface ResponseUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  data: {
    user?: ResponseUser,
    users?: ResponseUser[],
    token?: string
  } | null,
  error: ErrorResponse | null
}
