const path = require('path')

module.exports = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: path.join(__dirname, "./../dbstore/mydb.sqlite")
    },
    useNullAsDefault: true
});