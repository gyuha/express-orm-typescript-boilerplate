import * as express from 'express';
import db from '../core/Database';
import User from '../models/User';
import * as Knex from 'knex';

module.exports = (app: express.Application) => {

    // select all
    app.get('/user', async (req: express.Request, res: express.Response) => {
        const user: any = await new User().fetchAll();
        res.json(user);
        // res.render('index', {
        //     title: 'user'
        // });
    });

    // delete
    app.get('/user/delete/:id', async (req: express.Request, res: express.Response) => {
        //const user: any = await new User().where('id', '>', 20).destroy();
        const user: any = await new User({ id: req.params.id }).destroy();
        res.json(user);
    })

    // insert
    app.get('/user/add', async (req: express.Request, res: express.Response) => {
        const user: any = await new User({ name: 'tester', password: 'ttt' }).save();
        res.json(user);
    })

    // select by id
    app.get('/user/:id', async (req: express.Request, res: express.Response) => {
        const user: any = await new User({ id: req.params.id }).fetch();
        res.json(user);
    })

    // update
    app.get('/user/update/:id', async (req: express.Request, res: express.Response) => {
        const user = await new User({ id: req.params.id }).save({ name: '안녕하시오', description: '어쩌라구' });
        res.json(user);
    })

};