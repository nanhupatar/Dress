// pages/dress/index.js
let app = getApp();
Page({
  data: {
    images: [],
    hasMore: true,
    showLoading: false,
    pageNum:1,
    totalPage:2
  },
  onLoad: function (options) {
    if(app.globalData.userInfo){
      this.loadImage();
    } else {
      // wx.redirectTo({
      //   url: '/pages/login/index'
      // });
    }
    
  },

  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  //获取图片
  loadImage:function () {
    let that = this;
    let {pageNum,totalPage}=this.data;

    if(pageNum<=totalPage){
      wx.cloud.callFunction({
        name: "getDress",
        data: {
          pageNum: that.data.pageNum
        },
        success: (res) => {
          console.log(res)
          let images = that.data.images;
          images = images.concat(res.result.images);
          that.setData({
            images: images,
            totalPage:res.result.totalPage,
            pageNum:res.result.pageNum+1
          })
        }
      })
    }else {
      that.setData({
        hasMore:false
      })
    }
  },
  onReachBottom:function(e){
    console.log("报告老板，已到达底部");
    this.loadImage();
  },
  goDetail:function(e){
    let dressInfo = e.currentTarget.dataset.item;
    wx.setStorageSync("dressInfo", dressInfo);
    wx.navigateTo({
      url: '../detail/index',
    })
  }
})