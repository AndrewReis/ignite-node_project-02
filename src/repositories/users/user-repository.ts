import { Prisma, User } from '@prisma/client';

export interface UserRepository {
  create(email: Prisma.UserCreateInput): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}