import { PrismaUserRepository } from '@/repositories/users/prisma-repository';
import { CreateUserUseCase } from './_create-user';

export function makeCreateUserUseCase() {
	const userRepository = new PrismaUserRepository();
	const createUserUseCase = new CreateUserUseCase(userRepository);

	return createUserUseCase;
}