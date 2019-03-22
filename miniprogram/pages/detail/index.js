// pages/detail/index.js
let col1H = 0;
let col2H = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: '',
    images: [],
    windowWidth:0,
    done:false,
    avatarUrl:"/images/avatar.png",
    col1:[],
    col2:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this.loadDetail(options.id)

    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowWidth: res.windowWidth
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
    let {col1,col2} = this.data;
    let item = e.currentTarget.dataset.item;

    item.height = e.detail.height;
    item.width = e.detail.width;

    if (col1H <= col2H) {
      col1H += item.height;
      col1.push(item);
    } else {
      col2H += item.height;
      col2.push(item);
    }

    this.setData({
      col1: col1,
      col2: col2
    })
  },

  getImageHeight:function(imageInfo,currentWidth){
    let oImgW = imageInfo.width;         //图片原始宽度
    let oImgH = imageInfo.height;        //图片原始高度

    console.log(oImgW)
    return (oImgH / oImgW )*currentWidth;
  }
})