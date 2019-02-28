// pages/upload/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  upload: function() {

    //console.log(this.guid())

    var uuid = this.guid();


    // 让用户选择一张图片
    wx.chooseImage({
      success: chooseResult => {

        console.log(chooseResult);

        var filePath = chooseResult.tempFilePaths[0];

        var index1 = filePath.lastIndexOf(".");
        var index2 = filePath.length;
        var suffix = filePath.substring(index1 + 1, index2);//后缀名

        console.log(suffix)

        var tempName = uuid + '.' + suffix;


        // 将图片上传至云存储空间
        wx.cloud.uploadFile({
          // 指定上传到的云路径
          cloudPath: tempName,
          // 指定要上传的文件的小程序临时文件路径
          filePath: chooseResult.tempFilePaths[0],
          // 成功回调
          success: res => {
            console.log('上传成功', res)
            console.log('上传成功', res.statusCode)
            console.log('上传成功', res.fileID)

            // cloud://env-675567.656e-env-675567-1258728439/4ce61472-2d46-b87a-8a51-0217f5eeb106.gif
          },
        })
      },
    })

  },
  guid: function() {
    function S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
  }
})