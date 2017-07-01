// index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    good: {
      id: 1,
      image: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      longName: '测试',
      price: '99.00'
    },
    //
    dispatchingType: '快递 免邮',

  },

  selectDispatching: function(){
    var that = this;
    var array = ['快递 免邮', '快递 自费', '上门自提'];
    wx.showActionSheet({
      itemList: array,
      success: function (res) {
        console.log(res.tapIndex)
        that.setData({
          dispatchingType: array[res.tapIndex]
        })
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },

  gotoAddressPage: function(){
    wx.navigateTo({
      url: '/weshop/addressManage/list',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var url = wx.getStorageSync('baseUrl')
    console.log(url)
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