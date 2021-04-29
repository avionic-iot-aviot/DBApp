const config = require("config");
const path = require("path");

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: "/db/mydb.sqlite"
    },
    useNullAsDefault: true
  },

  staging: {
    client: 'sqlite3',
    connection: {
      filename: "/db/mydb.sqlite"
    },
    migrations: {
      tableName: 'migrations',
      directory: path.resolve(__dirname) + '/src/db-migrations'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'sqlite3',
    connection: {
      filename: "/db/mydb.sqlite"
    },
    useNullAsDefault: true
  }
};
