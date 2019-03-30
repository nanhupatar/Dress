// common/footer/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    goLicense:function(){
      wx.navigateTo({
        url: '/pages/license/index',
      })
    },
    goCopyright(){
      wx.navigateTo({
        url: '/pages/copyright/index',
      })
    },
    previewImage:function(){
      wx.previewImage({
        urls: ['cloud://pro-d27910.7072-pro-d27910/background/qrcode.jpg'],
        success: function (res) { },
        fail:(err)=>{console.log(err)}
      })
    }

  }
})
