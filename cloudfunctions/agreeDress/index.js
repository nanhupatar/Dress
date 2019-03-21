

const cloud = require('wx-server-sdk');
// 初始化
cloud.init({ env: 'test-f726fb' });

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const db = cloud.database();
  const { id } = event;

  // 从审核列表获取当前审核通过的
  const doc = await db.collection("audit").doc(id).get();
  const auditId = doc.data._id;

  // 将组装后的数据注入dress集合
  const response = await db.collection("dress").add({
    data:{}
  });

  // 删除审核集合中的记录,并记录审核记录
  await db.collection("audit").where({
    _id:auditId
  }).remove();

  const trace = await db.collection("trace").add({
    data:{
      text:"审核通过",
      auditId:'',
      upadateTime:new Date().getTime()
    }
  })

  return response;
}