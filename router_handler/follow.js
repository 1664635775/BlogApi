/*
 * @Descripttion: 
 * @version: 
 * @Author: likeorange
 * @Date: 2022-08-02 22:10:09
 * @LastEditors: likeorange
 * @LastEditTime: 2022-08-03 15:57:21
 */
const db = require('../db/index.js')
const async = require('async')
exports.getFollowList = (req, res) => {
  const sql = `select * from follow where follow.host_id = ${req.session.userInfo.id}`
  db.query(sql, (err, follows) => {
    if (err) return res.send(err)
    async.map(follows, (item, callback) => {
      const sqluser = `select * from user where user.id = ${item.guest_id}`
      db.query(sqluser, (err, user) => {
        if (err) return res.send(err)
        callback(null, user[0])
      })
    }, function (err, results) {
      if (err) return res.send(err)
      if (results.length != 0) {
        for (let data of results) {
          delete data.is_admin
          delete data.password
          delete data.is_disable
          data.createTime = data.create_time
          delete data.create_time
        }
      }
      return res.send({ code:1,data: [ ...results ] })
    })

  })

}