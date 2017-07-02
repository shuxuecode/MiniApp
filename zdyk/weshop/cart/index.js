// index.js

var isSelectAll = false;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],
    totalPrice: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  checkboxChange: function (e) {
    // console.log('checkbox发生change事件，携带value值为：', e.detail.value)

    var totalPrice = 0;

    var selectIds = e.detail.value;

    var list = this.data.dataList;
    for (var i = 0; i < list.length; i++) {
      var asdf = array_contain(selectIds, list[i].id);
      if (asdf) {
        var price = list[i].price;
        totalPrice = Number((totalPrice + parseFloat(price)).toFixed(2))
      }
    }


    this.setData({
      totalPrice: totalPrice
    })

  },

  selectAll: function (e) {
    var that = this;
    var checked = true;
    //
    if (isSelectAll) {
      checked = false;
      isSelectAll = false;
      that.setData({
        totalPrice: 0
      })
    } else {
      checked = true;
      isSelectAll = true;

    }



    var value = wx.getStorageSync('dataList');

    if (value) {
      var totalPrice = 0;
      for (var i = 0; i < value.length; i++) {
        value[i]["checked"] = checked;
        var price = value[i].price;
        totalPrice = Number((totalPrice + parseFloat(price)).toFixed(2))
      }

      if (checked) {
        that.setData({
          totalPrice: totalPrice
        })
      }


      that.setData({
        dataList: value
      });
    }
  },

  buyNow: function (e) {
    var totalPrice = this.data.totalPrice;
    wx.navigateTo({
      url: '/weshop/payment/index?totalPrice=' + totalPrice,
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
    var baseUrl = wx.getStorageSync('baseUrl')
    console.debug("进入购车车页面")
    var that = this;

    wx.request({
      url: baseUrl + '/miniapp/shopCart.json',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var dd = res.data;
        console.log('重新加载成功')
        wx.setStorageSync('dataList', dd);
        that.setData({
          dataList: dd
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


function array_contain(array, obj) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] == obj)//如果要求数据类型也一致，这里可使用恒等号===
      return true;
  }
  return false;
}