const mysql = require('mysql')

const db = mysql.createPool({
  host: '59.110.125.131',
  port: 3306,
  user:'db_OurBlog',
  password:'BshPPkB7TCS6GG8Z',
  database:'db_ourblog'
})

module.exports = db