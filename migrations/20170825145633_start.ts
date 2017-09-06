exports.up = function (knex, Promise) {
	return Promise.all([
		knex.schema.createTable('users', function (table) {
			table.engine('innodb');
			table.increments('id').unsigned().primary();
			table.string('name').notNull();
			table.string('password').notNull();
			table.string('description').nullable();
			table.timestamps();
		}),

	])
};

exports.down = function (knex, Promise) {
	return Promise.all([
		knex.schema.dropTable('users'),
	])
};