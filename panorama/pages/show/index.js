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
    let _this = this;
   
    _this.getData()
    
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



  getData: function(){
    let _this = this;


    wx.request({
      url: 'http://localhost:18080/api/funimg/panoDetail',
      data: {
        id: 1
      },
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        console.log(res.data)
        console.log(res.data.data)
        console.log(res.data.data.title)
        console.log(res.data.data.imgUrl)

        _this.showPano(res.data.data.title, res.data.data.imgUrl);

      },
      fail: (res) => {
        wx.showModal({
          title: '错误',
          content: '网络连接失败，请检查',
          showCancel: false
        })
      }
    })
  },


  showPano: function(title, url){
    wxPano.onReady = function () { //wxPano初始化完成后会触发此事件

    }
    wxPano.config({
      panolist: [{
        name: "xindamen",
        // name: title,
        // src: "https://i.loli.net/2020/10/13/ZYaNyPw6MgB7VFQ.jpg"
        // src: "https://s1.ax1x.com/2020/10/13/0Wo3T0.jpg"
        src: url + '?imageMogr2/thumbnail/!90p'
        // 
      }],
      request: wx.request,
      loader: "GLLoader",
      entryname: "xindamen"
    });
  }
})