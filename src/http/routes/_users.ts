import { FastifyInstance } from 'fastify';
import { createUserController } from '@/http/controllers/users/persist';

export async function userRouter(app: FastifyInstance) {
	app.post('/users', createUserController);
}