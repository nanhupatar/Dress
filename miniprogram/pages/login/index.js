var config = require("../../config/config.js");
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
    images:[]
  },

  onLoad: function() {
    let that = this;
    wx.showLoading({
      title: '加载中',
    });
    wx.getSystemInfo({
      success: (res) => {
        console.log(res)
        that.setData({
          vw: res.windowWidth,
          vh: res.windowHeight
        })
      }
    })

    wx.cloud.callFunction({
      name:'getDefaultImage'
    }).then(res=>{
      console.log(res);
      that.setData({
        images:res.result,
        backgroundUrl: res.result[Math.floor(Math.random() * res.result.length)].url
      },()=>{
        wx.getUserInfo({
          success: () => {
            wx.showLoading({
              title: "即将跳转至首页",
            })
            setTimeout(() => {
              wx.hideLoading();
              wx.redirectTo({
                url: '../index/index'
              })
            }, 2000)
          },
          fail:()=>{
            wx.hideLoading();
          }
        })
      })
    }).catch(err=>{
      console.log(err)
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let list = this.data.images;
    if(list.length>0){
      this.setData({
        backgroundUrl: list[Math.floor(Math.random() * list.length)].url
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  imageLoad: function(e) {
    console.log(e)
    this.setData({
      imageWith:this.data.vh * (e.detail.width/e.detail.height)
    })
  },

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
          // wx.switchTab({
          //   url: '../index/index',
          // })
          wx.redirectTo({
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
        }).then(() => {
          // on close
        });
      }
    })
  }
})