// pages/map/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [
      { url: 'http://pic4.58cdn.com.cn/anjuke_58/87090d02a9e155bc025be002991e6b8a?w=640&h=480&crop=1' },
      { url: 'http://pic7.58cdn.com.cn/anjuke_58/d07ee3c4b74a890bbc660bee12dd3469?w=640&h=480&crop=1' },
      { url: 'http://pic4.58cdn.com.cn/anjuke_58/39915b9d20b2c440145b35c200d81d9e?w=640&h=480&crop=1' },
      { url: 'http://pic4.58cdn.com.cn/anjuke_58/39915b9d20b2c440145b35c200d81d9e?w=640&h=480&crop=1' }
    ],
    markers: [{
      id: 111,
      latitude: 39.92,
      longitude: 116.46,
      title: 'T.I.T 创意园',
      // callout:{
      //   content:"ceshiceshiceshiceshiceshiceshiceshiceshiceshiceshiceshi",
      //   display:"ALWAYS"
      // },
      label: {
        content: "测试测试\n测试测试",
        color: "#336699DD",
        bgColor: "#888888"
      }
    }, {
      id: 112,
      latitude: 39.92201,
      longitude: 116.46,
      title: 'T.I.T 创意园',
      //marker 上的气泡 callout
      callout: {
        content: '自定义标记点上方的气泡窗口',
        color: '#000000',
        fontSize: 8,
        borderRadius: 2,
        bgColor: '#ff00ff',
        padding: 4,
        textAlign: 'center',
      },
      //marker 上的气泡 label
      label: {
        content: '显示在标记点旁边的标签',
        color: '#000000',
        fontSize: 12,
        borderRadius: 2,
        bgColor: '#ff00ff',
        padding: 4,
        textAlign: 'center',
      },
    }],
    controls: []
  },

  swiperClick: function (e) {
    console.log(e.currentTarget.dataset.imgurl)
    wx.previewImage({
      current: e.currentTarget.dataset.imgurl, // 当前显示图片的http链接
      urls: [
        "http://pic4.58cdn.com.cn/anjuke_58/87090d02a9e155bc025be002991e6b8a?w=640&h=480&crop=1", "http://pic7.58cdn.com.cn/anjuke_58/d07ee3c4b74a890bbc660bee12dd3469?w=640&h=480&crop=1",
        "http://pic4.58cdn.com.cn/anjuke_58/39915b9d20b2c440145b35c200d81d9e?w=640&h=480&crop=1"]
    })
  },

  wechat: function () {
    wx.previewImage({
      current: '', // 当前显示图片的http链接
      urls: ["http://wx1.sinaimg.cn/small/b11e11f9ly1fp3g1t4bqrj209k09kmx4.jpg"] // 需要预览的图片http链接列表
    })
  },
  call: function (e) {
    wx.makePhoneCall({
      phoneNumber: '18800000000' //仅为示例，并非真实的电话号码
    })
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
    this.mapCtx = wx.createMapContext('myMap')
  },
  getCenterLocation: function () {
    this.mapCtx.getCenterLocation({
      success: function (res) {
        console.log(res.longitude)
        console.log(res.latitude)
      }
    })
  },
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
  translateMarker: function () {
    this.mapCtx.translateMarker({
      markerId: 0,
      autoRotate: true,
      duration: 1000,
      destination: {
        latitude: 23.10229,
        longitude: 113.3345211,
      },
      animationEnd() {
        console.log('animation end')
      }
    })
  },
  includePoints: function () {
    this.mapCtx.includePoints({
      padding: [10],
      points: [{
        latitude: 23.10229,
        longitude: 113.3345211,
      }, {
        latitude: 23.00229,
        longitude: 113.3345211,
      }]
    })
  },

  markertap: function (e) {
    console.log(e.markerId)
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