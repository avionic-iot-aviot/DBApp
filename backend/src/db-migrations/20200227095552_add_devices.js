exports.up = async function (knex) {
  return Promise.all([
    knex.schema.createTable("devices", table => {
      table.increments("device_id").primary();
      table.string("mac_address").notNullable();
      table.string("default_name").notNullable();
      table.string("current_name");
      table.timestamps(true, true);
    })
  ]);
};

exports.down = async function (knex) {
  return Promise.all([ 
    knex.schema.dropTableIfExists('devices')
]);
};
