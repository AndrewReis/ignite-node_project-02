import { PrismaUserRepository } from '@/repositories/users/prisma-repository';
import { AuthenticateUseCase } from '../authenticate/_authenticate';

export function makeAuthenticateUseCase() {
	const userRepository = new PrismaUserRepository();
	const authenticateUseCase = new AuthenticateUseCase(userRepository);

	return authenticateUseCase;
}