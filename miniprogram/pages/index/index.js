let col1H = 0;
let col2H = 0;

Page({

  data: {
    scrollH: 0,
    imgWidth: 0,
    loadingCount: 0,
    images: [],
    col1: [],
    col2: [],
    pageNum:1,
    pageSize:12,
    totalPage:2,
    avatarUrl:"/images/avatar.png"
  },

  onLoad: function () {
    wx.getSystemInfo({
      success: (res) => {
        let ww = res.windowWidth;
        let wh = res.windowHeight;
        let imgWidth = ww * 0.46;
        let scrollH = wh;

        this.setData({
          scrollH: scrollH,
          imgWidth: imgWidth
        });

        this.loadImages();
      }
    })
  },

  onImageLoad: function (e) {
    let imageId = e.currentTarget.id;
    let oImgW = e.detail.width;         //图片原始宽度
    let oImgH = e.detail.height;        //图片原始高度
    let imgWidth = this.data.imgWidth;  //图片设置的宽度
    let scale = imgWidth / oImgW;        //比例计算
    let imgHeight = oImgH * scale;      //自适应高度

    let images = this.data.images;
    let imageObj = null;

    for (let i = 0; i < images.length; i++) {
      let img = images[i];
      if (img._id === imageId) {
        imageObj = img;
        break;
      }
    }

    imageObj.height = imgHeight;

    let loadingCount = this.data.loadingCount - 1;
    let col1 = this.data.col1;
    let col2 = this.data.col2;

    if (col1H <= col2H) {
      col1H += imgHeight;
      col1.push(imageObj);
    } else {
      col2H += imgHeight;
      col2.push(imageObj);
    }

    let data = {
      loadingCount: loadingCount,
      col1: col1,
      col2: col2
    };

    if (!loadingCount) {
      data.images = [];
    }

    this.setData(data);
  },

  loadImages: function () {
    let that = this;

    wx.cloud.callFunction({
      name:"getDress",
      data:{
        pageNum:that.data.pageNum,
        pageSize:that.data.pageSize
      }
    }).then(res=>{
      console.log("获取图片数据",res);
      if (that.data.pageNum <= res.result.totalPage && res.result.images != []) {
        const imageList = that.formatImages(res.result.images);
        const list = that.data.images.concat(imageList);
        that.setData({
          images: list,
          totalPage: res.result.totalPage,
          pageNum: res.result.pageNum + 1
        })
      }
    }).catch(err=>{
      console.log(err)
    })
  },

  formatImages:function(list) {
    return list.reduce((result,cur) => {
      cur.height = 0;
      result.push(cur)
      return result
    }, []);
  },

  like:function(id){

  },

  goDetail:function(e){
    const id = e.currentTarget.dataset.item._id;
    console.log("跳转到详情页",id);
    
    wx.navigateTo({
      url: '../detail/index?id='+id,
    })
  }
})