import path from 'path';
import winston, { LeveledLogMethod } from 'winston';

export class Logger {
    public static DEFAULT_SCOPE = 'bluelight';

    private readonly scope: string;

    constructor(scope?: string) {
        this.scope = Logger.parsePathToScope(scope ? scope : Logger.DEFAULT_SCOPE);
    }

    private static parsePathToScope(filePath: string): string {
        if (filePath.indexOf(path.sep) >= 0) {
            filePath = filePath.replace(process.cwd(), '');
            filePath = filePath.replace(`${path.sep}src${path.sep}`, '');
            filePath = filePath.replace(`${path.sep}dist${path.sep}`, '');
            filePath = filePath.replace(`.ts`, '');
            filePath = filePath.replace(`.js`, '');
            filePath = filePath.replace(path.sep, ':');
        }

        return filePath;
    }

    public debug(message: string, ...args: any[]): void {
        this.log(winston.debug, message, args);
    }

    public info(message: string, ...args: any[]): void {
        this.log(winston.info, message, args);
    }

    public warn(message: string, ...args: any[]): void {
        this.log(winston.warn, message, args);
    }

    public error(message: string, ...args: any[]): void {
        this.log(winston.error, message, args);
    }

    private log(loggerFunction: LeveledLogMethod, message: string, args: any[]): void {
        loggerFunction(`${this.formatScope()} ${message}`, args);
    }

    private formatScope(): string {
        return `[${this.scope}]`;
    }
}
