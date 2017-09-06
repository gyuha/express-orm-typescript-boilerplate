import * as Knex from 'knex';
import * as Bookshelf from 'bookshelf';
var dbconfig = require('../config/database.json').database;

export default class Database {

    private static _instance: Database = new Database();

    protected _knex: Knex;

    protected _bookshelf: Bookshelf;

    constructor() {
        if (Database._instance) {
            throw new Error("Error: Instantiation failed: Use Database.getInstance() instead of new.");
        }

        //@todo pull config info from knexfile.js!!
        this._knex = Knex({
            client: 'mysql',
            connection: {
                host: dbconfig.host,
                user: dbconfig.user,
                password: dbconfig.password,
                database: dbconfig.database,
                charset: 'utf8'
            }
        });

        this._bookshelf = Bookshelf(this._knex);
        this._bookshelf.plugin(['bookshelf-camelcase']);

        Database._instance = this;
    }

    public static getInstance(): Database {
        return Database._instance;
    }

    public getKnex(): Knex {
        return this._knex;
    }

    public getBookshelf(): Bookshelf {
        return this._bookshelf;
    }
}