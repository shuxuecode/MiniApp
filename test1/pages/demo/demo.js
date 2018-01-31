
Page({

  /**
   * 页面的初始数据
   */
  data: {

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

  zhao: function () {

    wx.navigateTo({
      url: '/libs/citySelector/switchcity/switchcity',
    });

    return;

    console.log(11)

    console.log(new Date().getTime())

    var time = new Date().getTime();

    /*
    wx.requestPayment(
      {
        'timeStamp': time,
        'nonceStr': '5K8264ILTKCH16CQ2502SI8ZNMTM67VS',
        'package': 'prepay_id=wx2017033010242291fcfe0db70013231072',
        'signType': 'MD5',
        'paySign': '',
        'success': function (res) { },
        'fail': function (res) { },
        'complete': function (res) { }
      })

*/



  }
})