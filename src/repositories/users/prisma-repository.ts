import { Prisma }     from '@prisma/client';
import { connection } from '@/services/prisma';

import { UserRepository } from './user-repository';

export class PrismaUserRepository implements UserRepository {
	private repository: Prisma.UserDelegate<false>;
	constructor() {
		this.repository = connection.user;
	}

	async create( { name, email, passwordHash } : Prisma.UserCreateInput) {
		return await this.repository.create({
			data: {
				name,
				email,
				passwordHash: passwordHash
			}
		});
	} 

	async findByEmail(email: string) {
		return await this.repository.findUnique({
			where: {
				email
			}
		});
	} 
}