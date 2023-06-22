import { AppError } from '@/appError';
import { UserRepository } from '@/repositories/users/user-repository';
import { User } from '@prisma/client';
import { compare } from 'bcryptjs';

type Request = {
  email: string;
  password: string;
}

type Response = {
  user: User
}

export class AuthenticateUseCase {
	private userRepository: UserRepository;

	constructor(userRepository: UserRepository) {
		this.userRepository = userRepository;
	}

	async execute({ email, password }: Request): Promise<Response> {
		const user = await this.userRepository.findByEmail(email);

		if (user) {
			const doesPasswordMatches = await compare(password, user.passwordHash);
			if (doesPasswordMatches) {
				return {
					user
				};
			}
			throw new AppError('Invalid credentials', 401);
		}
		throw new AppError('Invalid credentials', 401);
	}
}