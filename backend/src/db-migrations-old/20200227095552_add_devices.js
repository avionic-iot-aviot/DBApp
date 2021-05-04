exports.up = async function(knex) {
  await knex.schema.createTable("devices", table => {
    table.increments("id").primary();
    table.string("mac_address").notNullable();
    table.string("default_name").notNullable();
    table.string("current_name");
    table.timestamps(true, true);
    
    
    table.timestamps(true, true);
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("devices");
};
