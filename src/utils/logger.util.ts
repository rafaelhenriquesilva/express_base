import winston from 'winston';

export class LoggerUtil {
    static logger = winston.createLogger({
        transports: [
            new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
            new winston.transports.File({ filename: 'logs/combined.log' })
        ]
    });

    static logError(message: string, origin: string, stack: string) {
        this.logger.error(`
            Origin: ${origin}
            Error: ${message}
            Stack: ${stack}
            CreatedAt: ${new Date()}
        `);
    }

    static logInfo(message: string, origin: string) {
        this.logger.info(`
            Origin: ${origin}
            Message: ${message}
            CreatedAt: ${new Date()}
        `);
    }
}