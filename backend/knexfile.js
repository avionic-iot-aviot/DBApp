const config = require("config");
const path = require("path");

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: "~/mydb.sqlite"
    },
    useNullAsDefault: true
  },

  staging: {
    client: 'sqlite3',
    connection: {
      filename: "~/mydb.sqlite"
    },
    useNullAsDefault: true
  },

  production: {
    client: 'sqlite3',
    connection: {
      filename: "~/mydb.sqlite"
    },
    useNullAsDefault: true
  }
};
