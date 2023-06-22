import { beforeEach, describe, expect, it } from 'vitest';
import { hash } from 'bcryptjs';

import { InMemoryUserRepository } from '@/repositories/users/in-memory-repository';
import { AuthenticateUseCase } from '@/http/use-cases/users/authenticate/_authenticate';
import { AppError } from '@/appError';

let userRepository: InMemoryUserRepository;
let sut: AuthenticateUseCase;

describe('Authenticate use-case', async () => {
	beforeEach(() => {
		userRepository = new InMemoryUserRepository();
		sut            = new AuthenticateUseCase(userRepository);
	});

	it('should be able to authenticate', async () => {
		await userRepository.create({
			name: 'Test',
			email: 'test@test.com',
			passwordHash: await hash('123456', 6)
		});

		const { user } = await sut.execute({
			email: 'test@test.com',
			password: '123456'
		});

		expect(user.id).toEqual(expect.any(String));
	}); 

	it('should not be able to authenticate with wrong e-mail', async () => {
		expect(async () => {
			await sut.execute({
				email: 'test@test.com',
				password: '123456'
			});
		}).rejects.toBeInstanceOf(AppError);
	}); 

	it('should not be able to authenticate with wrong password', async () => {
		await userRepository.create({
			name: 'Test',
			email: 'test@test.com',
			passwordHash: await hash('123456', 6)
		});

		expect(async () => {
			await sut.execute({
				email: 'test@test.com',
				password: '111111'
			});
		}).rejects.toBeInstanceOf(AppError);
	}); 
});