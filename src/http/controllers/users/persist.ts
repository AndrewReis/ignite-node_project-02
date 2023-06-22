import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';

// use-cases
import { makeCreateUserUseCase } from '@/http/use-cases/users/create-user';
import { makeAuthenticateUseCase } from '@/http/use-cases/users/authenticate';

// repositories
import { PrismaUserRepository } from '@/repositories/users/prisma-repository';

export const createUserController = async (req: FastifyRequest, res: FastifyReply) => {
	const bodySchema = z.object({
		name: z.string(),
		email: z.string().email(),
		password: z.string().min(6)
	});

	const { name, email, password } = bodySchema.parse(req.body);

	const createUserUseCase = makeCreateUserUseCase();

	const user = await createUserUseCase.execute({ name, email, password });
	return res.status(201).send(user);
};

export const authenticateController = async (req: FastifyRequest, res: FastifyReply) => {
	const bodySchema = z.object({
		email: z.string().email(),
		password: z.string().min(6)
	});

	const { email, password } = bodySchema.parse(req.body);

	const authenticateUseCase =makeAuthenticateUseCase();

	const { user } = await authenticateUseCase.execute({ email, password });
	return res.status(200).send({user});
};