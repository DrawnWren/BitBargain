const data = require('./test.json');
const knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost', // replace host if remote
    user: '', // enter DB user/role
    password: '', // enter password
    database: 'postgres' // default DB is postgres
  },
  pool: {
    min: 1,
    max: 500
  }
});

knex.schema.hasTable('items').then((result) => {
  if (!result) {
    return knex.schema.createTable('items', (table) => {
      table.increments();
      table.timestamp('created_at', 'utc').defaultTo(knex.fn.now());
      table.timestamp('updated_at', 'utc').defaultTo(knex.fn.now());
      table.string('category');
      table.string('title');
      table.text('description');
      table.string('price');
      table.boolean('sold').defaultTo(false);
      table.string('location');
      table.specificType('images', 'text[]').nullable();
      console.log('Table "items" created');
      // populate table with test data
      knex('items').insert(data.items, 'id')
      .catch(err => console.log(`Error populating "items" table ${err}`));
    });
  }
  console.log('Table "items" already exists');
  return 0;
});

knex.schema.hasTable('users').then((result) => {
  if (!result) {
    return knex.schema.createTable('users', (table) => {
      table.increments();
      table.string('username').unique();
      table.string('email').unique();
      console.log('Table "users" created');
    });
  }
  console.log('Table "users" already exists');
  return 0;
});

knex.schema.hasTable('transactions').then((result) => {
  if (!result) {
    return knex.schema.createTable('transactions', (table) => {
      table.increments();
      table.timestamp('created_at', 'utc').defaultTo(knex.fn.now());
      table.integer('item_id');
      table.integer('buyer_id'); // TODO: index
      table.integer('seller_id'); // TODO: index
      table.string('order_status').defaultTo('In progress');
      table.text('tracking');
      table.foreign('item_id').references('items.id');
      table.foreign('buyer_id').references('users.id');
      table.foreign('seller_id').references('users.id');
      console.log('Table "transactions" created');
    });
  }
  console.log('Table "transactions" already exists');
  return 0;
});

module.exports = knex;
