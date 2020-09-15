// miniprogram/pages/home/home.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    theme: app.globalData.theme,

    background: ['cloud://test-454v5.7465-test-454v5-1303020964/微信图片_20200621122550 - ok.jpg', 'cloud://test-454v5.7465-test-454v5-1303020964/6ed16d53b10bd8a1978dfd672c2735a7.jpg', ''],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 500

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
    let _this = this;

    const db = wx.cloud.database()
    const _ = db.command

    db.collection('image').where({
      type: _.in(["1", "2", "3"])
    }).get().then(res => {
      
      console.info(res.data)

      var list = _this.data.background

      for(var i=0,len=res.data.length; i<len; i++){
        var type = res.data[i].type
        var url = res.data[i].url
 
        if (type == 1) {
          list[0] = url
        } else if (type == 2) {
          list[1] = url
        } else if (type == 3) {
          list[2] = url
        }
      }

      _this.setData({
        background: list
      })
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