const Puzzle = require("./h5puzzle.js");
Page({
  data: {
    imgPoints: [],
    imgArr: [
      'https://highness-1-1253922088.cos.ap-beijing.myqcloud.com/zhao/puzzle.png',
      'https://highness-1-1253922088.cos.ap-beijing.myqcloud.com/zhao/puzzle.png',
      'https://highness-1-1253922088.cos.ap-beijing.myqcloud.com/zhao/puzzle.png',
      'https://highness-1-1253922088.cos.ap-beijing.myqcloud.com/zhao/puzzle.png'
    ],
    imgUrl: '../../src/images/quanyecha.jpg',
    levelArr: [{
        id: 2,
        text: '2x2'
      },
      {
        id: 3,
        text: '3x3'
      },
      {
        id: 4,
        text: '4x4'
      }/*,
      {
        id: 5,
        text: '困难'
      },
      {
        id: 6,
        text: '变态'
      },
      {
        id: 7,
        text: '无语'
      },
      {
        id: 8,
        text: '天才'
      },
      {
        id: 9,
        text: '疯子'
      },
      {
        id: 10,
        text: '想死'
      },
      {
        id: 11,
        text: '已死'
      }*/
    ],
    WIDTH: 0,
    HEIGHT: 0,
    width: 0,
    height: 0,
    status: false,
    trans: 0,
    currentX: 0,
    currentY: 0,
    currentPX: 0,
    currentPY: 0,
    type0: 4
  },
  onReady() {
    // let _this = this;
    new Puzzle(this);
  },
  getType(e) {
    this.setData({
      // trans: -this.data.WIDTH,
      type0: e.currentTarget.dataset.type
    })
    this.puzzle = new Puzzle(this, {
      type: e.currentTarget.dataset.type
    })

    // todo
    this.setData({
      trans: -this.data.WIDTH * 2,
      imgUrl: 'https://highness-1-1253922088.cos.ap-beijing.myqcloud.com/zhao/puzzle.png'
    })
  },
  getUrl(e) {
    this.setData({
      trans: -this.data.WIDTH * 2,
      imgUrl: e.currentTarget.dataset.url
    })
  },

// ************************************************
  selectImage(e){
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        // var tempFilePaths = res.tempFilePaths
      }
    })
  }
})