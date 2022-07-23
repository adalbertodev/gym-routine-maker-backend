import { Request } from 'express';

export interface LoginBody {
  email: string;
  password: string;
}
export interface RegisterBody {
  name: string;
  email: string;
  password: string;
  repeatedPassword: string;
}

export interface LoginRequest extends Request {
  body: LoginBody
}

export interface RegisterRequest extends Request {
  body: RegisterBody
}
