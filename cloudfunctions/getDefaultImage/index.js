// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({env: 'test-f726fb'})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const db = cloud.database();

  const imageList = await db.collection("background").limit(100).get();

  return imageList.data;
}