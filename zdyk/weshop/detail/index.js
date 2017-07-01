// index.js
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

    good:{
      text: '-',
      price: '00.00',
      detail: ''
    },

    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var baseUrl = wx.getStorageSync('baseUrl')

    console.log(options)

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
      url: baseUrl + '/miniapp/detailImages.json?id=' + options.id,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var arr = new Array();
        for(var i=0; i<res.data.length; i++){
          arr.push(res.data[i].url);
        }
        that.setData({
          imgUrls: arr
        });
      },
      fail: function(){
        
      }
    })


    wx.request({
      url: baseUrl + '/miniapp/goodDetail.json?id=' + options.id,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          good: res.data
        });
      },
      fail: function(){
        
      }
    })



    /** end */
  },

  goBack: function (){
    wx.navigateBack()
    // wx.navigateBack({
    //   delta: 1
    // })
  },

  gotoHome: function(){

    wx.switchTab({
      url: '/weshop/home/index'
    })
  },

  addCart:function(event){
    var baseUrl = wx.getStorageSync('baseUrl')
    var id = event.currentTarget.dataset.id;

    wx.showLoading({
      title: '加载中',
    })

    setTimeout(function () {
      wx.hideLoading()
    }, 2000)

    wx.showModal({
      content: "加入购物车成功",
      confirmText: "立即结账",
      cancelText: "再逛逛",
      cancelColor: "#DD443A",
      success: function (res){

        wx.request({
          url: baseUrl + '/miniapp/addCart.json',
          data: {
            userId: 1,
            goodId: 4
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res)
          }
        })

        if (res.confirm) {
          console.log('用户点击确定')

          // 跳转到购物车页面
          // wx.navigateTo({
          //   url: '/weshop/cart/index'
          // })

          wx.switchTab({
            url: '/weshop/cart/index'
          })


        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  bay: function (event){
    var id = event.currentTarget.dataset.id;

    wx.showToast({
      title: '正在跳转到结账页面...',
      icon: 'loading',
      mask: true,
      duration: 10000
    })

    setTimeout(function(){
      // wx.hideToast()
    }, 10000)

    wx.switchTab({
      url: '/weshop/cart/index'
    })

    /*
    wx.showModal({
      content: "购买成功，立即结账",
      showCancel: false,
      confirmText: "确定",
      success: function(){

      }
    })
    */


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
  
  }
})