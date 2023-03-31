import { app } from '@/app';
import { logger } from '@/log';
import { env } from '@/env';

app.listen({
	port: env.PORT,
	host: '0.0.0.0'
}).then(() => logger.info(`server running at http://localhost:${3333}`));