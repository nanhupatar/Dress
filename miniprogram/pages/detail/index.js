Page({
  data: {
    dressInfo: null,
  },
  onLoad: function (options) {
    let that = this;
    if (options.id) {
      const id = options.id;
      wx.showLoading({
        title:''
      })
      wx.cloud.callFunction({
        name:'getDressDetail',
        data:{
          id:id
        },
        success:(res)=>{
          console.log(res)
          that.setData({
            dressInfo:res.result
          })
          wx.hideLoading();
        },
        fail:(err)=>{
          console.log(err);
          wx.hideLoading();
          wx.showToast({
            title: '出了一点小问题，请稍后再试',
            icon:'none'
          })
        }
      })

    } else {
      const dressInfo = wx.getStorageSync('dressInfo');
      that.setData({
        dressInfo: dressInfo
      });
      wx.setNavigationBarTitle({
        title: dressInfo.userInfo.nickName,
      })
    }
  },
  onShareAppMessage: function () {
    let imageInfo = this.data.dressInfo;
    let id = imageInfo._id;
    let title = imageInfo.userInfo.nickName+': 穿上女装，感觉自己萌萌哒';
    return {
      title: title,
      path: "/pages/detail/index?id="+id,
      success: (res) => {
        console.log('转发成功，' + res)
      },
      fail: (err) => {
        console.log('转发失败', err)
      }
    }
  },
  backToDress:function(){
    wx.switchTab({
      url: '/pages/dress/index',
    })
  },
  goImageDetail:function(e){
    console.log(e)
    let imageInfo = {};
    let src = e.currentTarget.dataset.src;
    imageInfo.src = src;
    imageInfo.id = this.data.dressInfo._id;
    wx.setStorageSync("imageInfo", imageInfo)
    wx.navigateTo({
      url: '/pages/imageDetail/index'
    })
  }
})