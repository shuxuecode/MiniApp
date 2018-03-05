// pages/house/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],
    content: [],
    nv: [],
    px: [],
    qyopen: false,
    qyshow: false,
    nzopen: false,
    pxopen: false,
    nzshow: false,
    pxshow: false,
    isfull: false,
    citycenter: {},
    cityright: {},
    select1: '',
    select2: '',
    shownavindex: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      dataList: [{
        "imgUrl": "http://pic4.58cdn.com.cn/anjuke_58/87090d02a9e155bc025be002991e6b8a?w=640&h=480&crop=1",
        "text": "(单间出租)六道口地铁 静淑东里小区 精装修三家合住次卧出租",
        "price": "2100 元/月    押一付三",
        "id": "1001"
      },
      {
        "imgUrl": "http://pic7.58cdn.com.cn/anjuke_58/d07ee3c4b74a890bbc660bee12dd3469?w=640&h=480&crop=1",
        "text": "(单间出租)景泰路 地铁14号线 刘家窑北里主卧室 超大卧室带阳台",
        "price": "2500 元/月    押一付三",
        "id": "1002"
      },
      {
        "imgUrl": "http://pic4.58cdn.com.cn/anjuke_58/39915b9d20b2c440145b35c200d81d9e?w=640&h=480&crop=1",
        "text": "中关村 清华大学 语言大学 地质大学 精装大两居 看房随时",
        "price": "9800 元/月    押一付一",
        "id": "1002"
      }, {
        "imgUrl": "http://pic4.58cdn.com.cn/anjuke_58/87090d02a9e155bc025be002991e6b8a?w=640&h=480&crop=1",
        "text": "(单间出租)六道口地铁 静淑东里小区 精装修三家合住次卧出租",
        "price": "2100 元/月    押一付三",
        "id": "1001"
      },
      {
        "imgUrl": "http://pic7.58cdn.com.cn/anjuke_58/d07ee3c4b74a890bbc660bee12dd3469?w=640&h=480&crop=1",
        "text": "(单间出租)景泰路 地铁14号线 刘家窑北里主卧室 超大卧室带阳台",
        "price": "2500 元/月    押一付三",
        "id": "1002"
      },
      {
        "imgUrl": "http://pic4.58cdn.com.cn/anjuke_58/39915b9d20b2c440145b35c200d81d9e?w=640&h=480&crop=1",
        "text": "中关村 清华大学 语言大学 地质大学 精装大两居 看房随时",
        "price": "9800 元/月    押一付一",
        "id": "1002"
      }]
    });

    this.setData({
      nv: ['衣服', '裤子', '内衣', '服饰', '衣服', '裤子', '内衣', '服饰', '衣服', '裤子', '内衣', '服饰'],
      px: ['默认排序', '离我最近', '价格最低', '价格最高']
    })
  },

  gotoDetail: function (event) {
    var id = event.currentTarget.dataset.id;
    // console.log(id)
    wx.navigateTo({
      url: '/pages/map/index?id=' + id
    })
  },

  listpx: function (e) {
    if (this.data.pxopen) {
      this.setData({
        nzopen: false,
        pxopen: false,
        qyopen: false,
        nzshow: true,
        pxshow: false,
        qyshow: true,
        isfull: false,
        shownavindex: 0
      })
    } else {
      this.setData({
        content: this.data.px,
        nzopen: false,
        pxopen: true,
        qyopen: false,
        nzshow: true,
        pxshow: false,
        qyshow: true,
        isfull: true,
        shownavindex: e.currentTarget.dataset.nav
      })
    }
    console.log(e.target)
    console.log(this.data.pxopen)
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