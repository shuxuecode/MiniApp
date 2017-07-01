// list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    addresss: [],

    startPointX: 0,
    endPointX: 0

  },

  select: function(e){
    var id = e.currentTarget.dataset.id;
    // 回去只修改地址数据即可
    wx.navigateBack()
  },



  touchstart: function (e) {
    console.log(e)
    console.log('start')
    this.setData({
      startPointX: e.touches[0].pageX,
      endPointX: e.touches[0].pageX
    })
  },
  touchmove: function (e) {
    // console.log(e)
    console.log('move')
    // console.log(e.touches[0].pageX)
    // console.log(e.touches[0].pageY)
    this.setData({
      endPointX: e.touches[0].pageX
    })
  },
  touchend: function (e) {
    // console.log(e)
    console.log('end')
    console.log(this.data.startPointX)
    console.log(this.data.endPointX)

    if (this.data.startPointX - this.data.endPointX > 100) {
      var id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '/weshop/address/index?id=' + id,
      })
    }
  },
  touchcancel: function (e) {
    // console.log(e)
    console.log('cancel')
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
    var baseUrl = wx.getStorageSync('baseUrl')
    var that = this;

    wx.request({
      url: baseUrl + '/miniapp/getAddresss.json?userId='+12,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var dd = res.data;
        console.log(dd)
        that.setData({
          addresss: dd
        });
      },
      fail: function () {

      }
    })
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

  }
})