/*
 * @Descripttion: 
 * @version: 
 * @Author: likeorange
 * @Date: 2022-07-25 20:50:01
 * @LastEditors: likeorange
 * @LastEditTime: 2022-07-29 00:41:57
 */
const express = require('express')
const app = express()

// 跨域处理
const cors = require('cors')
app.use(cors())

//数据格式处理
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//导入session
const session = require('express-session')
app.use(session({
  secret:'passwordlikeorange',
  resave:true,
  saveUninitialized:true,
  cookie: {maxAge: 604800000},
}))


// 用户登录注册路由
const userRouter = require('./router/user')
app.use('/user',userRouter)

// 用户个人信息路由
const userInfoRouter = require('./router/userInfo.js')
app.use(userInfoRouter)

//图片(文件)处理路由
const fileProcessRouter = require('./router/fileProcess.js')
app.use('/file',fileProcessRouter)


//数据验证
const joi = require('joi')
// 错误中间件
app.use(function (err, req, res, next) {
  // 数据验证失败
  if (err instanceof joi.ValidationError) return res.send(err)
  // 未知错误
  console.log(req.body);
  console.log(err);
  res.send({code:0,msg:err.message})
})


app.listen(8001, function () {
  console.log('api serve')
})

