import { User } from '@app/user/schemas/user.schema';
export type UserType = Omit<User, 'password' | 'todos'> & { id?: string };
export type UserResponse = UserType & { token: string };
