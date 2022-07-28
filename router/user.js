/*
 * @Descripttion: 登录注册路由
 * @version: 
 * @Author: likeorange
 * @Date: 2022-07-25 20:50:01
 * @LastEditors: likeorange
 * @LastEditTime: 2022-07-26 16:13:05
 */

const express = require('express')

const router = express.Router()

const userHandler = require('../router_handler/user.js')

//表单数据合法性验证
const expressJoi = require('@escook/express-joi')
//表单数据规则
const { reg_login_schema } = require('../schema/user.js')

router.post('/register', expressJoi(reg_login_schema), userHandler.register)

router.post('/login', expressJoi(reg_login_schema), userHandler.login)

module.exports = router
