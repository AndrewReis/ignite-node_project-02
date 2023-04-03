import fastify from 'fastify';
import routes from '@/http/routes/index';

export const app = fastify();

app.register(routes);