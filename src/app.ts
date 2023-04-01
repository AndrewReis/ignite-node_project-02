import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

prisma.user.create({data: {
	name: 'Test',
	email: 'test@test.com'
}});

export const app = fastify();