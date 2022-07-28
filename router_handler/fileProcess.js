/*
 * @Descripttion: 图片文件上传处理
 * @version: 
 * @Author: likeorange
 * @Date: 2022-07-28 19:59:27
 * @LastEditors: likeorange
 * @LastEditTime: 2022-07-28 21:52:16
 */
const multerConfig = require('../utils/multerConfig.js')

exports.upload = (req, res) => {
  console.log(req.file);
  if (req.file == null) {
    return res.send("不能为空")
  }
  return res.send('upload')
}
exports.download = (req, res) => {
  res.send('download')
}