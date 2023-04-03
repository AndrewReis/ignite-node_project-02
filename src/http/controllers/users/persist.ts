import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';

// use-cases
import { CreateUserUseCase } from '@/http/use-cases/users/create-user';

// repositories
import { PrismaUserRepository } from '@/repositories/users/prisma-repository';

export const createUserController = async (req: FastifyRequest, res: FastifyReply) => {
	const bodySchema = z.object({
		name: z.string(),
		email: z.string().email(),
		password: z.string().min(6)
	});

	const { name, email, password } = bodySchema.parse(req.body);

	const userRepository = new PrismaUserRepository();
	const createUserUseCase = new CreateUserUseCase(userRepository);

	try {
		const user = await createUserUseCase.execute({ name, email, password });
		return res.status(201).send(user);
	} catch (error) {
		return res.status(409).send('E-mail alredy exist');
	}
};