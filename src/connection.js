const path = require('path')
const sqlite3 = require('sqlite3')
const sqlite = require('sqlite')

module.exports = sqlite.open({
  filename: path.resolve(__dirname, '..', 'database.sqlite'),
  driver: sqlite3.Database,
})
