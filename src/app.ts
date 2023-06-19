import fastify from 'fastify';
import routes from '@/http/routes/index';
import { AppError } from './appError';
import { ZodError } from 'zod';
import { env } from './env';
import { logger } from './log';

export const app = fastify();

app.register(routes);

app.setErrorHandler((error, request, reply) => {
	if (error instanceof AppError) {
		return reply.status(error.statusCode).send({
			message: error.message,
			status: error.statusCode
		});
	}

	if (error instanceof ZodError) {
		return reply.status(400).send({
			message: error.format(),
			status: 400
		});
	}

	if (env.NODE_ENV !== 'production') {
		logger.error(error);
	}

	return reply.status(500).send({ message: 'Internal server error', status: 500 });
});