// 送审
const cloud = require('wx-server-sdk')
cloud.init({env: 'test-f726fb'})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const db = cloud.database();

  const response = await db.collection("audit").add({
    data:event
  })

  return response;
}