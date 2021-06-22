import { Logger } from './util/Logger';
import express, { Application } from 'express';
import config from './config';

export class Server {
    private log = new Logger(__filename);
    private app: Application;

    constructor() {
        this.app = express();

        this.setupRoutes();
    }

    public start(): void {
        const hostname = config.hostname;
        const port = config.port;

        this.app.listen(port, hostname, () => {
            this.log.info(`Server listening on ${hostname}:${port}`);
        });
    }

    private setupRoutes(): void {
        this.app.get('/test', (req, res) => {
            res.json({
                test: true
            });
        });
    }
}
