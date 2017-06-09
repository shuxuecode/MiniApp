// index.js
//获取应用实例
// var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 4000,
    duration: 1000,
    swiperHeight: 250,

    dataList:[],

    userInfo: {}

    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;

    wx.getSystemInfo({
      success: function (res) {
        var windowWidth = res.windowWidth;
        // console.log(windowWidth);
        var h = parseInt(windowWidth / 8.64 * 6)
        that.setData({
          swiperHeight: h
        });

      }
    })

    wx.request({
      url: 'https://zhaoshuxue.github.io/html/data/list.json', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // console.log(res.data)
          that.setData({
          dataList: res.data
          });
      }
    })


    wx.request({
      url: 'https://zhaoshuxue.github.io/html/data/list2.json', 
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // console.log(res)
        that.setData({
          imgUrls : res.data
        });
      }
    })

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
    console.log(1);
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