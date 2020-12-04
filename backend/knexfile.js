const config = require("config");
const path = require("path");

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: config.general.ipIpDb,
      user: 'aviotuser',
      password: 'CNDqbHS7P2yS',
      database: 'Aviot'
    },
    useNullAsDefault: true
  },

  staging: {
    client: 'mysql',
    connection: {
      host: config.general.ipIpDb,
      user: 'aviotuser',
      password: 'CNDqbHS7P2yS',
      database: 'Aviot'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'mysql',
    connection: {
      host: config.general.ipIpDb,
      user: 'aviotuser',
      password: 'CNDqbHS7P2yS',
      database: 'Aviot'
    },
    useNullAsDefault: true
  }
};
