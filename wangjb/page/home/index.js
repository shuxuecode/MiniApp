// page/home/index.js
var num = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: '',
    imgSrc1: '',
    imgSrc2: '',
    uuid: '',
    uploadText: '',
    loadingText: '生成图片'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // var obj = JSON.parse('{"a":"aa"}');
    // console.log(obj)
    var that = this;

    // setTimeout(function () { 
      
    //   that.setData({
    //     loadingText: '生成图片22'
    //   })
    // }, 4000)

    
  },

  getImage: function () {
    var that = this;
    setTimeout(function () {
      num++;
      if (num < 4 && that.data.imgSrc2 == ''){
        that.showImage()
        that.setData({
          loadingText: '尝试获取图片第(' + num + ')次'
        })
        that.getImage()
        
      }
    }, 10000)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  choose: function () {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        that.setData({
          imgSrc1: tempFilePaths[0]
        })
      }
    })
  },


  upload: function () {
    var that = this;
    const uploadTask = wx.uploadFile({
      url: 'https://www.funimg.top/funimg/upload/upload',
      filePath: that.data.imgSrc1,
      name: 'tupian',
      formData: {
        'filename': 'test.png'
      },
      success: function (res) {
        // console.log(res)
        var data = res.data
        console.log(data)

        console.log(123)
        if (data) {
          var json = JSON.parse(data);
          console.log(json)
          if (json.code == 200) {
            that.setData({
              // imgSrc2: json.data
              uuid: json.data
            })
            that.getImage()
          }
        }
        //do something
      }
    })

    uploadTask.onProgressUpdate((res) => {
      that.setData({
        loadingText: '图片正在生成中（' + res.progress + '%）'
      })
      console.log('上传进度', res.progress)
      console.log('已经上传的数据长度', res.totalBytesSent)
      console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
      if (res.progress && res.progress == 100){
        that.setData({
          loadingText: '图片正在后台处理中'
        })
      }
    })


  },

  showImage: function(){
    var that = this;
    wx.request({
      url: 'https://www.funimg.top/funimg/upload/check',
      method: 'GET',
      data: {uuid: this.data.uuid},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var data = res.data
        console.log(data)
        if (data) {
          // var json = JSON.parse(data);
          if (data.code == 200) {
            that.setData({
              imgSrc2: data.data,
              loadingText: '图片马赛克成功'
            })
          }
        }
      },
      fail: function (res) {
        
      }
    })
  }
})