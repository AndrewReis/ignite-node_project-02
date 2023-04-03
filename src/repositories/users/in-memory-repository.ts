import { Prisma, User } from '@prisma/client';
import crypto           from 'node:crypto';

import { UserRepository } from './user-repository';

export class InMemoryUserRepository implements UserRepository {
	private repository: User[];

	constructor() {
		this.repository = [];
	}

	async create( { name, email, passwordHash } : Prisma.UserCreateInput) {
		this.repository.push({
			id: crypto.randomUUID(),
			name,
			email,
			passwordHash: passwordHash,
			createdAt: new Date()
		});

		return this.repository[this.repository.length - 1];
	} 

	async findByEmail(email: string) {
		const user = this.repository.find(user => user.email === email);
		return user || null;
	} 
}