import * as winston from 'winston';
import 'winston-daily-rotate-file';

export class Logger {
    private logger: winston.LoggerInstance;
    private name: string;
    public logDir: string;

    constructor(name: string) {
        this.logDir = './logs';
        this.name = name;
        const tsFormat = () => (new Date()).toLocaleTimeString();

        const transportFile = new winston.transports.DailyRotateFile({
            level: 'error',
            filename: `${this.logDir}/${this.name}.log`,
            datePattern: 'yyyyMMdd_',
            timestamp: tsFormat,
            prepend: true
        });

        this.logger = new winston.Logger({
            transports: [
                new (winston.transports.Console)({
                    level: 'debug',
                    timestamp: tsFormat,
                    colorize: true
                }),
                transportFile
            ],
            exitOnError: false
        })
    }

    public log(message: string, ...args: any[]): void {
        this.logger.debug(message, this.parseArgs(args));
    }

    public debug(message: string, ...args: any[]): void {
        this.logger.debug(message, this.parseArgs(args));
    }

    public info(message: string, ...args: any[]): void {
        this.logger.info(message, this.parseArgs(args));
    }

    public warn(message: string, ...args: any[]): void {
        this.logger.warn(message, this.parseArgs(args));
    }

    public error(message: string, ...args: any[]): void {
        this.logger.error(message, this.parseArgs(args));
    }

    private parseArgs(args: any[]): any {
        return (args && args[0] && args[0].length > 0) ? args : '';
    }
}