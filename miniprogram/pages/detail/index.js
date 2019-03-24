
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: "",
    images: [],
    windowWidth: 0,
    done: false,
    avatarUrl: "/images/avatar.png",
    loading:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.getSystemInfo({
      success: res => {
        this.setData({
          windowWidth: res.windowWidth
        });
        const info = wx.getStorageSync("dressInfo");
        if (info&&info._id === options.id){
          let navBarText = info.userInfo.nickName + "的女装"
          wx.setNavigationBarTitle({
            title: navBarText,
          })
          this.setData({
            done:true,
            info:info
          })
        }else{
          this.loadDetail(options.id)
        }
        // this.loadDetail("5c9328db5707d2cc4b9cc61c");
       
      }
    });
  },

  loadDetail: function(id) {
    let that = this;
    wx.cloud.callFunction({
      name: "getDressDetail",
      data: {
        id: id
      },
      success: res => {
        let info = res.result;
        let navBarText = info.userInfo.nickName +"的女装"
        wx.setNavigationBarTitle({
          title: navBarText,
        })
        that.setData({
          info: info,
          done: true
        });
      }
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(e) {
    console.log("分享图片");
    let id = this.data.info._id;
    let shareText = "好嗨哟，女装大佬也是萌萌哒";

    return {
      title: shareText,
      path: "/pages/detail/index?id=" + id,
      success: res => {
        console.log(res);
      }
    };
  },

  previewImage: function(e) {
    let current = e.currentTarget.dataset.src;
    wx.previewImage({
      urls: this.data.info.images,
      current: current
    });
  },

  setClipboardData:function(){
    wx.setClipboardData({
      data: 'https://github.com/komeiji-satori/Dress',
      success(res) {
        wx.getClipboardData({
          success(res) {
            wx.showToast({
              title: '链接已复制到剪切板',
              icon:"none"
            })
          }
        })
      }
    })
  }
});
