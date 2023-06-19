import { logger } from '@/log';

export class AppError {
	public readonly message: string;
	public readonly statusCode: number;

	constructor(message: string, statusCode = 500, log?: boolean) {
		this.message    = message;
		this.statusCode = statusCode;
    
		if (log) logger.info(`${message}, ${statusCode}`);
	}
}