const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({ env: 'test-f726fb' })
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const db = cloud.database();
  const user = db.collection('user');

  // 查询用户是否已经注册过，如果没有注册，向user表插入一条数据
  const userStatus = await user.where({
    openId: wxContext.OPENID
  }).get();

  if (userStatus.data.length != 0) {
    return {
      msg: '用户已注册',
      data: userStatus.data[0]
    }
  } else {
    const response = await db.collection('user').add({
      data: {
        info: event.info,
        createTime: new Date().getTime(),
        inviteBy: event.openId || '',
        openId: wxContext.OPENID,
        appId: wxContext.APPID,
        unionid: wxContext.UNIONID
      }
    });

    return {
      msg: '注册成功',
      data: response
    }
  }
}
