// pages/detail/index.js
let col1H = 0;
let col2H = 0;
let col3H = 0;
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
    col1: [],
    col2: [],
    col3: []
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

        this.loadDetail("5c9328db5707d2cc4b9cc61c");
        // this.loadDetail(options.id)
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
        wx.cloud.callFunction({
          name: "getTempFileURL",
          data: {
            fileList: info.images
          },
          success: res => {
            info.images = res.result;
            that.setData({
              info: info,
              done: true
            });
            wx.setNavigationBarTitle({
              title: info.userInfo.nickName || "女装快乐时光"
            });
          }
        });
      }
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(e) {
    console.log("分享图片");
    let item = e.target.dataset.item;
    let id = e.target.id;
    let shareText = "好嗨哟，感觉女装已经到达了巅峰";
    if (this.data.info.userInfo.nickName) {
      shareText = this.data.info.userInfo.nickName + "：女装大佬的日常";
    }

    return {
      title: shareText,
      path: "/pages/detail/index?id=" + id + "&imageUrl=" + item.tempFileURL,
      imageUrl: item.tempFileURL,
      success: res => {
        console.log(res);
      }
    };
  },

  onImageLoad: function(e) {
    let { col1, col2, col3 } = this.data;
    let item = e.currentTarget.dataset.item;

    item.height = e.detail.height;
    item.width = e.detail.width;

    let minHeight = Math.min(col1H, col1H, col3H);

    if (minHeight === col1H) {
      col1H += item.height;
      col1.push(item);
    } else if (minHeight === col2H) {
      col2H += item.height;
      col2.push(item);
    } else {
      col3H += item.height;
      col3.push(item);
    }

    this.setData({
      col1: col1,
      col2: col2,
      col3: col3
    });
  },

  previewImage: function(e) {
    let currentImage = e.currentTarget.dataset.item.tempFileURL;
    let imagesUrlList = [];
    console.log("分享");
    this.data.info.images.forEach(element => {
      imagesUrlList.push(element.tempFileURL);
    });

    wx.previewImage({
      urls: imagesUrlList,
      current: currentImage
    });
  }
});
