// pages/show/index.js
var wxPano = requirePlugin("wxPano")
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
    wxPano.onReady = function () { //wxPano初始化完成后会触发此事件

    }
    wxPano.config({
      panolist: [{
        name: "xindamen",
        // src: "https://i.loli.net/2020/10/13/ZYaNyPw6MgB7VFQ.jpg"
        src: "https://s1.ax1x.com/2020/10/13/0Wo3T0.jpg"
        // 
      }],
      request: wx.request,
      loader: "GLLoader",
      entryname: "xindamen"
    });
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

  }
})