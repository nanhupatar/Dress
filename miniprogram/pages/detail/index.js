let col1H = 0;
let col2H = 0;
Page({
  data: {
    dressInfo: null,
    col1: [],
    col2: []
  },
  onLoad: function (options) {
    col1H = 0;
    col2H = 0;
    let that = this;
    if (options.id) {
      const id = options.id;
      wx.showLoading()
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
      path: "pages/detail/index?id="+id,
      success: (res) => {
        console.log('转发成功，' + res)
      },
      fail: (err) => {
        console.log('转发失败', err)
      }
    }
  },
  onImageLoad: function (e) {
    let imageH = e.detail.height;
    let index = e.currentTarget.dataset.index;
    let {
      col1,
      col2,
      dressInfo
    } = this.data;
    let imageInfo = {
      src: dressInfo.images[index],
      id: dressInfo._id,
      userInfo:dressInfo.userInfo
    };
    
    if(col1H<=col2H){
      col1.push(imageInfo);
      col1H += imageH;
    }else{
      col2.push(imageInfo);
      col2H += imageH;
    }

    this.setData({
      col1:col1,
      col2:col2
    })
  },
  backToDress:function(){
    wx.switchTab({
      url: 'pages/dress/index',
    })
  },
  goImageDetail:function(e){
    console.log(e)
    let imageInfo = e.currentTarget.dataset.info;
    let id = encodeURIComponent(imageInfo.src);
    wx.setStorageSync("imageInfo", imageInfo)
    wx.navigateTo({
      url: '../imageDetail/index'
    })
  }
})