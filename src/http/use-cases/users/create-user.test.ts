import { describe, expect, it } from 'vitest';
import { compare } from 'bcryptjs';

import { InMemoryUserRepository } from '@/repositories/users/in-memory-repository';
import { CreateUserUseCase } from '@/http/use-cases/users/create-user';
import { AppError } from '@/appError';

describe('Create User use-case', async () => {
	it('should be able create user.', async () => {
		const repository = new InMemoryUserRepository();
		const useCase    = new CreateUserUseCase(repository);

		const { user } = await useCase.execute({
			name: 'Test',
			email: 'test@test.com',
			password: '123456'
		});
		expect(user.id).toEqual(expect.any(String));
	});

	it('should be generate hash for password user.', async () => {
		const repository = new InMemoryUserRepository();
		const useCase    = new CreateUserUseCase(repository);

		const { user } = await useCase.execute({
			name: 'Test',
			email: 'test@test.com',
			password: '123456'
		});

		const isPasswordCorrectlyHashed = await compare('123456', user.passwordHash);

		expect(isPasswordCorrectlyHashed).toBe(true);
	});

	it('should not be able to create user with same e-mail.', async () => {
		const repository = new InMemoryUserRepository();
		const useCase    = new CreateUserUseCase(repository);

		await useCase.execute({
			name: 'Test',
			email: 'test@test.com',
			password: '123456'
		});

		expect(async () => {
			await useCase.execute({
				name: 'Test',
				email: 'test@test.com',
				password: '123456'
			});
		}).rejects.toBeInstanceOf(AppError);
	});
});