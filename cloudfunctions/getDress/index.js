// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({env: 'test-f726fb'})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const db = cloud.database();
  const {pageNum,pageSize} = event;
  const skip = (pageNum-1)*pageSize;

  const count = await db.collection("dress").count();
  const images = await db.collection("dress").skip(skip).limit(pageSize).get();

  return {
    images:images.data,
    totalPage:Math.ceil(count.total / pageSize),
    pageNum:pageNum
  }
}