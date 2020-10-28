// pages/camera/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: ""
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


  takePhoto: function () {

    // wx.showLoading({
    //   title: '正在。。。',
    //   mask: true
    // })


    // wx.showToast({
    //   title: '正在上传...',
    //   icon: 'loading',
    //   mask: true,
    //   duration: 1000
    // })


    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['camera'],
      success: (res) => {
        
        console.info(res)

        var images = res.tempFilePaths;


        this.setData({
          src: images[0]
        })

        wx.uploadFile({
          url: 'http://localhost:8080/api/savePerson', //仅为示例，非真实的接口地址
          filePath: images[0],
          name: 'image',
          formData: {
            'username': 'test'
          },
          success (res){
            console.info(res)
            // const data = res.data
            //do something
          }
        })
      },
      fail: (res) => {

      },
      complete: (res) => {}
    })
  }
})