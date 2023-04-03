import { FastifyInstance } from 'fastify';
import { userRouter } from './_users';

export default async function routes(app: FastifyInstance) {
	app.register(userRouter);
}