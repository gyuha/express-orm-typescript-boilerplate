import Database from '../core/Database';

var db = Database.getInstance();
var bookshelf = db.getBookshelf();

export default class User extends bookshelf.Model<User> {
  get tableName() { return 'users' };
  get hasTimestamps() { return true };
}