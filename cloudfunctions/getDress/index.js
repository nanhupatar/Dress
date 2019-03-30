// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({env: 'test-f726fb'})

// 云函数入口函数
exports.main = async (event, context) => {
  const config = {
    pageSize:10
  };
  const wxContext = cloud.getWXContext();
  const db = cloud.database();
  const {pageNum} = event;
  const skip = (pageNum-1)*config.pageSize;

  const count = await db.collection("dress").count();
  const images = await db.collection("dress").skip(skip).limit(config.pageSize).get();

  return {
    images:images.data,
    totalPage: Math.ceil(count.total / config.pageSize),
    pageNum:pageNum
  }
}