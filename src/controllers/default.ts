import * as express from 'express';

module.exports = (app: express.Application) => {
    app.get('/', async (req: express.Request, res: express.Response) => {
        res.render('index', {
            title: 'Bootstrap starter template'
        });
    });
};