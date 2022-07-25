const db = require('../db/index.js')
const bcrypt = require('bcryptjs')
const SnowflakeID = require('../utils/SnowflakeID.js')
const moment = require('moment')

exports.register = (req, res) => {
  const userInfo = req.body
  console.log(userInfo);
  if (!userInfo.username || !userInfo.password) {
    return res.send({ state: 1, message: '用户名或密码不合法' })
  }
  const sql = `select * from user where username=?`
  db.query(sql, [userInfo.username], function (err, results) {
    if (err) {
      return res.send({ status: 1, message: err.message })
    }
    if (results.length > 0) {
      return res.send({ status: 1, message: '用户名被占用，请更换其他用户名！' })
    }

    userInfo.password = bcrypt.hashSync(userInfo.password, 10)
    const snid = new SnowflakeID({
      mid: +new Date()	
    });
    const id = snid.generate();
    const date = moment(new Date()).format("YYYY-MM-DD HH:ss:mm")
    const sqlInsert = 'insert into user set ?'
    db.query(sqlInsert, {id: id, username: userInfo.username, password: userInfo.password, create_time:date}, function (err, results) {
      if (err) {
        console.log(err);
        return res.send({ status: 1, message: '注册失败' })
      }
      if (results.affectedRows !== 1) {
        console.log(results);
        return res.send({ status: 1, message: '注册用户失败，请稍后再试！' })
      }
      
      res.send({status:0, message:'注册成功'})
  })
  })

}

exports.login = (req, res) => {
  const userInfo = req.body
  console.log(userInfo);
  const sql = `select * from user where username=?`
  db.query(sql,userInfo.username, function (err,results) {
    if(err){
      return res.send({status:1, message:err.message})
    }
    if(results.length > 0){
      const compareResult = bcrypt.compareSync(userInfo.password,results[0].password)
      if (!compareResult) {
        console.log(results[0]);
        return res.send({status:1,message:'用户名或密码不存在'})
      }
      else{
        return res.send({status:0,message:'登录成功'})
      }
    }
    else{
      return res.send({status:1,message:'用户不存在'})
    }
  })
}