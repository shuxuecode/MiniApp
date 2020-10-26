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


    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath
        })

        wx.uploadFile({
          url: 'http://localhost:18080/upload/uploadTest', //仅为示例，非真实的接口地址
          filePath: res.tempImagePath,
          name: 'file',
          formData: {
            'title': 'test'
          },
          success (res){
            console.info(res)
            // const data = res.data
            //do something
          }
        })
      }
    })
  }
})