// index.js

var Util = require('../../utils/util.js')

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
    address: {
      id: '',
      user_name: '',
      phone_number: '',
      address_a: '',
      address_b: '',
      address_c: '',
      address_d: ''
    },

    //
    dispatchingType: '快递 免邮',
    dispatchType: 0,
    totalPrice: '0',
    ids: ''

  },

  selectDispatching: function () {
    var that = this;
    var array = ['快递 免邮', '快递 自费', '上门自提'];
    wx.showActionSheet({
      itemList: array,
      success: function (res) {
        console.log(res.tapIndex)
        that.setData({
          dispatchingType: array[res.tapIndex],
          dispatchType: res.tapIndex
        })
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },

  gotoAddressPage: function () {
    wx.navigateTo({
      url: '/weshop/addressManage/list',
    })
  },

  onSubmit: function (e) {
    this.setData({
      message: e.detail.value.message
    })

    var that = this;
    var addressId = that.data.address.id;
    var amount = that.data.totalPrice;
    var dispatchType = that.data.dispatchType;
    var message = that.data.message;
    var ids = that.data.ids;


    console.log(that.data)

    var baseUrl = wx.getStorageSync('baseUrl')
    var userId = wx.getStorageSync('userId')
    wx.request({
      url: baseUrl + '/miniapp/addOrder.json',
      data: Util.json2Form({
        userId: userId,
        addressId: addressId,
        amount: amount,
        dispatchType: dispatchType,
        message: message,
        ids: ids
      }),
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      success: function (res) {
        // console.log(res.data)
        if (res.data.success) {
          // 保存成功后返回
          wx.showToast({
            title: '提交成功...',
            icon: 'success',
            mask: true,
            duration: 3000,
            success: function(){
              wx.switchTab({
                url: '/weshop/about/index'
              })
            }
          })

          
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var totalPrice = options.totalPrice;
    var ids = options.ids;
    this.setData({
      totalPrice: totalPrice,
      ids: ids
    })

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
    var baseUrl = wx.getStorageSync('baseUrl')
    var userId = wx.getStorageSync('userId')
    console.debug("重新加载收货地址")
    var that = this;

    wx.request({
      url: baseUrl + '/miniapp/getDefalutAddress.json?userId' + userId,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var dd = res.data;
        if (dd.length == 1) {
          that.setData({
            address: dd[0]
          });
        }
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