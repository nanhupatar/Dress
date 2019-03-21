// pages/detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: '',
    images: [],
    imgWidth: 0,
    ww:0,
    done:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this.loadDetail(options.id)

    wx.getSystemInfo({
      success: (res) => {
        let ww = res.windowWidth;
        let wh = res.windowHeight;
        let imgWidth = ww * 0.46;

        this.setData({
          imgWidth: imgWidth,
          ww:ww
        });

        this.loadDetail("5c9328db5707d2cc4b9cc61c");
      }
    })
  },

  loadDetail: function(id) {
    let that = this;
    wx.cloud.callFunction({
      name: "getDressDetail",
      data: {
        id: id
      }
    }).then(res => {
      let info = res.result;
      wx.cloud.callFunction({
        name: "getTempFileURL",
        data: {
          fileList: info.images
        }
      }).then(res => {
        info.images = res.result;
        that.setData({
          info: info,
          done:true
        });
      })
    }).catch(err => {
      console.log(err)
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  onImageLoad: function(e) {
    let images = this.data.images;
    let item = e.currentTarget.dataset.item;
    item.height = e.detail.height;
    item.width = e.detail.width;
    images.push(item);
    this.setData({
      images: images
    })
  }
})