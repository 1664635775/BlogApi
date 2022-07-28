/*
 * @Descripttion: mysql远程连接
 * @version: 
 * @Author: likeorange
 * @Date: 2022-07-25 20:50:01
 * @LastEditors: likeorange
 * @LastEditTime: 2022-07-27 15:55:40
 */


const mysql = require('mysql')
const config = require('../config')
const db = mysql.createPool({
  host: config.host,
  port: config.port,
  user: config.user,
  password: config.password,
  database: config.database,
  dateStrings: true//<-  强制日期类型(TIMESTAMP, DATETIME, DATE)以字符串返回
})

module.exports = db