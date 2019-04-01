var app = getApp();
Page({
  data: {
    gridList: [
      { enName: 'favorite', zhName: '收藏' },
      { enName: 'history', zhName: '浏览记录' },
      { enName: 'shake', zhName: '摇一摇' },
      { enName: 'gallery', zhName: '相册' },
      { enName: 'setting', zhName: '设置' }
    ],
    skin: '',
    userInfo:''
  },
  onLoad: function (cb) {
    var that = this
    // 检测是否存在用户信息
    if (app.globalData.userInfo != null) {
      that.setData({
        userInfo: app.globalData.userInfo
      })
    } else {
      app.getUserInfo(this.setUserInfo(userInfo))
    }
    
  },
  setUserInfo:function(userInfo){
    that.setData({
      userInfo: userInfo
    })
  },
  onShow: function () {
    var that = this
    wx.getStorage({
      key: 'skin',
      success: function (res) {
        if (res.data == "") {
          that.setData({
            skin: config.skinList[0].imgUrl
          })
        } else {
          that.setData({
            skin: res.data
          })
        }
      }
    })
  }
})