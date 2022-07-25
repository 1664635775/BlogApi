const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

app.use(express.urlencoded({ extended: false }))

const userRouter = require('./router/user')
app.use(userRouter)

const joi = require('joi')
// 错误中间件
app.use(function (err, req, res, next) {
  // 数据验证失败
  if (err instanceof joi.ValidationError) return res.send(err)
  // 未知错误
  console.log(req.body);
  console.log(err);
  res.send(err)
})


app.listen(8001, function () {
  console.log('api serve')
})

