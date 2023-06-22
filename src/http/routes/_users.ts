import { FastifyInstance } from 'fastify';
import { createUserController, authenticateController } from '@/http/controllers/users/persist';

export async function userRouter(app: FastifyInstance) {
	app.post('/users', createUserController);
	app.post('/users/sessions', authenticateController);
}