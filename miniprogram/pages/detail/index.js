// pages/detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadDetail(options.id)
  },

  loadDetail:function(id){
    wx.cloud.callFunction({
      name:"getDressDetail",
      data:{
        id:id
      }
    }).then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})