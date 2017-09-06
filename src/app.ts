import * as express from 'express';
import * as asyncify from 'express-asyncify';
import { Logger } from './core/Logger';
import { Server } from './Server';

if (process.env.NODE_ENV === undefined) {
    process.env.NODE_ENV = 'production';
}

const app: express.Application = asyncify(express());
const log: Logger = new Logger('App');

const server = new Server(app); 

server.startUp();