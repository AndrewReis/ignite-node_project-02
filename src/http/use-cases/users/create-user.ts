import { hash } from 'bcryptjs';

import { UserRepository } from '@/repositories/users/user-repository';

type Props = {
  name: string;
  email: string;
  password: string;
}

export class CreateUserUseCase {
	private userRepository: UserRepository;

	constructor(userRepository: UserRepository) {
		this.userRepository = userRepository;
	}

	async execute({ name, email, password }: Props) {	
		const checkEmailExist = await this.userRepository.findByEmail(email);
	
		if (checkEmailExist) {
			throw new Error('E-mail already exist.');
		}
	
		const passwordHash = await hash(password, 6);
	
		const user = this.userRepository.create({
			name,
			email,
			passwordHash
		});
	
		return user;
	}
}
 