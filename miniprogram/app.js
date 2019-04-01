App({
  globalData: {
    userInfo: null
  },
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'test-f726fb',
        traceUser: true,
      })
    }
    this.getUserInfo();
  },
  getUserInfo: function (cb) {
    console.log(cb)
    var that = this
    wx.getUserInfo({
      success: function (res) {
        that.globalData.userInfo = res.userInfo
      }
    })
  },
})
