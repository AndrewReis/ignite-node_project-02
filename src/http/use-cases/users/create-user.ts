import { hash } from 'bcryptjs';

import { UserRepository } from '@/repositories/users/user-repository';
import { User } from '@prisma/client';
import { AppError } from '@/appError';

type Response = {
	user: User
}

type Request = {
  name: string;
  email: string;
  password: string;
}

export class CreateUserUseCase {
	private userRepository: UserRepository;

	constructor(userRepository: UserRepository) {
		this.userRepository = userRepository;
	}

	async execute({ name, email, password }: Request): Promise<Response> {	
		const checkEmailExist = await this.userRepository.findByEmail(email);
	
		if (checkEmailExist) {
			throw new AppError('E-mail already exist.', 409);
		}
	
		const passwordHash = await hash(password, 6);
	
		const user = await this.userRepository.create({
			name,
			email,
			passwordHash
		});
	
		return { user };
	}
}
 