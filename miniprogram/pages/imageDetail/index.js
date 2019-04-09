let postConfig = require("../../config/poster.js");
import Poster from "../../miniprogram_npm/wxa-plugin-canvas/poster/poster";

Page({
  data: {
    onsharing:false,
    imageInfo:null,
    posterConfig:null,
    panelList:[
      {
        title:'免责申明',
        description:'本小程序所有资源均来自网络，所有视频以及图文版权均归原作者及网站所有。如果侵犯到您的权益，请第一时间告知我们，联系微信:qianduanzhinan,我们会在第一时间进行处理'
      },
      {
        title:'商务合作',
        description:'本小程序免费提供公众号关联服务，联系微信：qianduanzhinan'
      }
    ]
  },
  onLoad: function (options) {
    let that = this;
    let imageInfo =wx.getStorageSync("imageInfo")||{};
    let id = options.id;
    wx.showLoading();
    if(id){
      imageInfo.id = id;
      imageInfo.src = decodeURIComponent(options.fileId);
      this.setData({
        onsharing:true
      })
    }
    this.getTempFileURL(imageInfo);
  },
  getTempFileURL: function (imageInfo){
    let that = this;
    wx.cloud.callFunction({
      name: "getTempFileURL",
      data: {
        fileList: [imageInfo.src]
      }
    }).then(res => {
      console.log(res)
      imageInfo.fileId = imageInfo.src;
      imageInfo.src = res.result[0].tempFileURL;
      wx.hideLoading()
      that.setData({
        imageInfo: imageInfo
      })
    }).catch(err => {
      wx.hideLoading();
      console.log(err)
    })
  },
  onShareAppMessage: function () {
    let imageInfo = this.data.imageInfo;
    let fileId = encodeURIComponent(imageInfo.fileId);
    return {
      title:'ヾ(≧O≦)〃嗷~,快来瞧一瞧我的女装照',
      path:"pages/imageDetail/index?fileId="+fileId+"&id="+imageInfo.id,
      imageUrl:imageInfo.src,
      success:(res)=>{
        console.log('转发成功，'+res)
      },
      fail:(err)=>{
        console.log('转发失败',err)
      }
    }
  },
  goDress:function(){
    wx.switchTab({
      url: '/pages/dress/index',
    })
  },
  goDetail:function(){
    let imageInfo =this.data.imageInfo;
    wx.redirectTo({
      url: '/pages/detail/index?id'+imageInfo.id,
    })
  },
  onPosterSuccess:function(e){
    console.log(e)
    wx.previewImage({
      urls: [e.detail],
    })
  },
  onPosterFail:function(e){
    console.log(e)
  },
  onCreatePoster:function(userInfo) {
    console.log(userInfo)
    postConfig.texts[0].text=userInfo.nickName;
    postConfig.images[0].url = userInfo.avatarUrl;
    postConfig.images[1].url = this.data.imageInfo.src;
    this.setData({ posterConfig: postConfig }, () => {
      Poster.create();
    });
  },
  bindGetUserInfo:function(e){
    if(e.detail.userInfo){
      this.onCreatePoster(e.detail.userInfo)
    }
  }
})