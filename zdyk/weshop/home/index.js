// index.js

var WXBizDataCrypt = require('../../utils/RdWXBizDataCrypt.js');
var AppId = 'wxbc6e55a1c09739ad'
var AppSecret = 'a327e497c35bfba091939eac933b10ce'

//获取应用实例
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      {url:'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'},
      {url:'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'},
      {url:'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'}
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

    var baseUrl = wx.getStorageSync('baseUrl')

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
      url: baseUrl + '/miniapp/goods.json?userId=zhao',
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
      url: baseUrl + '/miniapp/homeImages.json?userId=zhao',
      header: {
        'content-type': 'application/json'
      },
      success: function (res, statusCode) {
        that.setData({
          imgUrls : res.data
        });
      },
      fail: function (data){
        
      }
    })


    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })

      console.log(userInfo)
      
      
      // wx.showToast({
      //   title: userInfo.nickName,
      //   icon: 'success',
      //   duration: 2000
      // })
    })

  },


  gotoDetail: function (event){
    var id = event.currentTarget.dataset.id;
    // console.log(id)
    wx.navigateTo({
      url: '/weshop/detail/index?id=' + id
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