import { AppError } from '@/appError';
import 'dotenv/config';

import { z } from 'zod';

const envSchema = z.object({
	NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
	PORT: z.coerce.number()
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
	throw new AppError('Invalid environment variables', 400, true);
}

export const env = _env.data;