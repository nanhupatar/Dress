// var config = require("../../config/config.js");
import Dialog from 'vant-weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backgroundUrl: '',
    imageWith: 0,
    vw: 0,
    vh: 0,
    images:[],
    showbtn:false
  },
  onShareAppMessage: function() {},

  bindGetUserInfo: function (e) {
    wx.getUserInfo({
      success: (res) => {
        const userInfo = res.userInfo;
        wx.cloud.callFunction({
          name: 'login',
          data: {
            info: userInfo
          },
        }).then(res => {
          console.log('登录', res)
          wx.switchTab({
            url: '../index/index',
          })
        }).catch(err => {
          console.log('登录失败', err)
        })
      },
      fail: () => {
        Dialog.alert({
          title: '温馨提示',
          message: '本小程序需要授权之后才能使用完整功能'
        })
      }
    })
  }
})