import bcrypt from 'bcryptjs';

import { UserPrimitive } from '../../domain/interfaces';

export const usersSeedData: UserPrimitive[] = [
  {
    _id: '3eb9fc70-f604-4dea-b658-1d80452c7454',
    email: 'admin@demoadmin.com',
    name: 'admin',
    password: bcrypt.hashSync('admin'),
    role: 'admin'
  },
  {
    _id: 'bd51c759-27ed-4567-aa99-5dbaba16d4ab',
    email: 'user@demouser.com',
    name: 'user',
    password: bcrypt.hashSync('user'),
    role: 'user'
  }
];
