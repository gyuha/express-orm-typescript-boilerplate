import * as http from 'http';
import * as express from 'express';
import * as path from 'path';
import * as bodyPaser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as fs from 'fs';
import * as rfs from 'rotating-file-stream';
import * as exphbs from 'express-handlebars';
import * as morgan from 'morgan';
import * as favicon from 'serve-favicon';
import * as errorHandler from 'errorhandler';
import * as methodOverride from 'method-override';

import { Environment } from './helpers/Environment';
import { Logger } from './core/Logger';

export class Server {
    private log = new Logger(__filename);
    private server;

    constructor(private app: express.Application) {
        this.app = app;
    }

    private setUse(): void {
        this.app.use(bodyPaser.json());
        this.app.use(bodyPaser.urlencoded({
            extended: false
        }));
        // Handlebars template engine(Register `hbs.engine` with the Express app)
        var hbs = exphbs.create({
            extname: '.hbs',
            partialsDir: [
                path.join(__dirname, '/views/partials')
            ],
            defaultLayout: __dirname + '/views/layouts/default.hbs',
            layoutsDir: path.join(__dirname, '/views/layouts')
        });
        this.app.engine('hbs', hbs.engine);
        this.app.set('view engine', 'hbs');

        this.app.set('views', path.join(__dirname, 'views'));

        this.app.use(favicon(path.join(__dirname, 'public', 'favicon.png')))

        // Enable view cache
        this.app.enable('view cache'); // Enable caching for all develoment/test/production.

        this.app.use(cookieParser("SECRET_GOES_HERE"));
        this.app.use(express.static(path.join(__dirname, 'public')));

        this.app.use(methodOverride());
        this.app.use(errorHandler());

        // Log 저장하기
        const logDirectory = path.join(__dirname, 'logs')
        fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
        const accessLogStream = rfs('access.log', {
            interval: '1d', // rotate daily
            path: logDirectory
        })
        this.app.use(morgan('combined', {
            stream: accessLogStream
        }))
    }

    private controllerLoad(): void {
        let files = function (dir): string[] {
            let results: string[] = [];
            let list = fs.readdirSync(dir);
            list.forEach(function (name) {
                let fileName: string = dir + '/' + name;
                let stat = fs.statSync(fileName);
                if (stat && stat.isDirectory()) {
                    results = results.concat(files(fileName));
                } else {
                    if (name.search(/(\.js|\.ts)$/) > 1) {
                        results.push(fileName.replace(/\.(js|ts)$/, ''));
                    }
                }
            })
            return results;
        }

        // Auto route
        let path = __dirname + '/controllers';
        let controllers: string[] = files(path);
        for (let i = 0, cnt = controllers.length; i < cnt; i++) {
            let con: string = controllers[i].replace(path + '/', '');
            this.log.debug('Load controller : ' + con);
            require('./controllers/' + con)(this.app);
        }

        // 500 error page
        this.app.use((err, req, res, next) => {
            //console.log(err.stack);
            res.status(500).send(err.message)
        });

        // 404 Page load
        this.app.use((req, res, next) => {
            res.status(404).render('404', {})
        });
    }

    public createServer(): void {
        this.server = http.createServer(this.app);
        const port: any = process.env.PORT || 8000;

        this.app.set('port', port);
        this.app.set('host', process.env.APP_HOST || '127.0.0.1');
        this.server.listen(port);

        this.server.on('error', this.onError);
    }

    public startMessage(): void {
        this.log.debug('-------------------------------------------------------');
        this.log.debug(`Aloha, your app is ready on ${this.app.get('host')}:${this.app.get('port')}`);
        this.log.debug(`To shut it down, press <CTRL> + C at any time.`);
        this.log.debug(``);
        this.log.debug(`Environment  : ${Environment.getNodeEnv()}`);
        this.log.debug('-------------------------------------------------------');
    }

    public startUp(): void {
        this.setUse();
        this.controllerLoad();
        this.createServer();
        this.startMessage();
    }


    public onError(error: any): void {
        if (error.syscall !== 'listen') {
            throw error;
        }
        switch (error.code) {
            case 'EACCES':
                this.log.error(`The Server requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                this.log.error(`Port is already in use or blocked by the os`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

}