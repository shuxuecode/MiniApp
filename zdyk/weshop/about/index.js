// index.js
//获取应用实例
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    orders: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },

  gotoAddress: function(){

    // wx.navigateTo({
    //   url: '/weshop/address/index?id=0',
    // })
    wx.navigateTo({
      url: '/weshop/addressManage/list',
    })

  },

  zhao: function(){

    if (wx.chooseAddress) {
      wx.chooseAddress({
        success: function (res) {
          console.log(res)
        },
        fail: function (res) {
          // fail
        },
        complete: function (res) {
          // complete
        }
      })
    }
    else{
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }

    


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
    var userId = wx.getStorageSync('userId')
    var that = this;

    wx.request({
      url: baseUrl + '/miniapp/getOrders.json?userId=' + userId,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var dd = res.data;
        that.setData({
          orders: dd
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