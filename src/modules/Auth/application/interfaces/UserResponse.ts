import { ErrorResponse } from '../../../Shared/application/interfaces/ErrorResponse';

export interface ResponseUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export type UserResponse =
| { data: ResponseUser | ResponseUser[] }
| { error: ErrorResponse }
