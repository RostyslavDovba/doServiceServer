import { User } from 'src/user/schemas/createUser.schema';
export type UserType = Omit<User, 'password' | 'todos'> & { id?: string };
export type UserResponse = UserType & { token: string };
