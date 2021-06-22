import { configure, format, transports } from 'winston';

export function loadLogger(): void {
    configure({
        transports: [
            new transports.Console({
                level: 'info',
                handleExceptions: true,
                format: format.combine(format.colorize(), format.simple())
            })
        ]
    });
}
