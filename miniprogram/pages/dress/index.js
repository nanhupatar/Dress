// pages/dress/index.js
Page({
  data: {
    images: [],
    hasMore: true,
    showLoading: false,
    pageNum:1,
    totalPage:2
  },
  onLoad: function (options) {
    this.loadImage();
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
    wx.cloud.callFunction({
      name:"getDress",
      data:{
        pageNum:that.data.pageNum
      },
      success:(res)=>{
        // console.log(res)
        let images = that.data.images;
        images =images.concat(res.result.images);
        that.setData({
          images:images
        })
      }
    })
  },
  goDetail:function(e){
    let dressInfo = e.currentTarget.dataset.item;
    wx.setStorageSync("dressInfo", dressInfo);
    wx.navigateTo({
      url: '../detail/index',
    })
  }
})