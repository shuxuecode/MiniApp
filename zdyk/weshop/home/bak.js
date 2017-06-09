// index.js
//获取应用实例
var app = getApp()
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
    interval: 5000,
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
        console.log(windowWidth);
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
        console.log(res.data)
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
        console.log(res)
        that.setData({
          imgUrls : res.data
        });
      }
    })

    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })

      console.log(userInfo.nickName)
      wx.showToast({
        title: userInfo.nickName,
        icon: 'success',
        duration: 2000
      })
    })

    
    wx.getSetting({
      success(res) {
        if (!res['scope.record']) {
          wx.authorize({
            scope: 'scope.record',
            success() {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              // wx.startRecord()
            }
          })
        }

        //
        if (!res['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              // 用户已经同意小程序获取地理位置，后续调用该接口不会弹窗询问
              wx.getLocation({
                type: 'wgs84',
                success: function (res) {
                  var latitude = res.latitude // 纬度，浮点数，范围为-90~90，负数表示南纬
                  var longitude = res.longitude // 经度，浮点数，范围为-180~180，负数表示西经
                  var speed = res.speed // 速度，浮点数，单位m/s
                  var accuracy = res.accuracy // 位置的精确度
                  var altitude = res.altitude	// 高度，单位 m

                  console.log(latitude)
                  console.log(longitude)

                  wx.showToast({
                    title: latitude + '  ---  ' + longitude,
                    icon: 'success',
                    duration: 5000
                  })
                }
              })
              
              // wx.chooseLocation()
            }
          })
        }
      }
    })

    // 获取运动步数， todo  需要解密
    // wx.getWeRunData({
    //   success(res) {
    //     const encryptedData = res.encryptedData
    //     console.log(encryptedData)
    //   }
    // })


  
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