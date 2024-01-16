import { app } from '@/app';

import { z } from 'zod';

const envSchema = z.object({
	NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
	PORT: z.coerce.number(),
	DATABASE_URL: z.string()
});

const checkEnv = envSchema.safeParse(process.env);

if(!checkEnv.success) {
	throw new Error('Invalid environment variables');
}

app.listen({
	host: '0.0.0.0',
	port: Number(process.env.PORT)
}).then(() => console.log('server running at 3333'));