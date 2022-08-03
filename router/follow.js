/*
 * @Descripttion: 
 * @version: 
 * @Author: likeorange
 * @Date: 2022-08-02 22:09:59
 * @LastEditors: likeorange
 * @LastEditTime: 2022-08-02 22:17:04
 */

const express = require('express')
const router = express.Router()
const getFollowList = require('../router_handler/follow.js')
router.get('/list',getFollowList.getFollowList)

module.exports = router