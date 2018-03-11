// pages/map/index.js
var postData = require('../../data/houseData.js'); 
Page({

  /**
   * 页面的初始数据
   */
  data: {

    house: {
      id:0,
      summary: "",
      publishDate: "", // 发布时间
      lookNum: "", // 浏览次数
      houseType: "", // 户型
      rental: "", // 租金
      village: "", // 小区
      houseArea: "", // 面积
      houseFloor: "", // 楼层
      payMode: "", //  付款
      direction: "", // 朝向
      decoration: "", // 装修
      address: "", // 地址
      longitude: "", // 经度
      latitude: "", // 纬度
      detail: "", // 详细描述
      personName: "", // 联系人
      telephone: "", // 电话
      wechatId: "", // 微信id
      wechatImage: "", // 微信二维码
      imgUrlList: [] // 图片
    },

    images: [],
    longitude: 116.404008,
    latitude: 39.914209,
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
    // console.log(e.currentTarget.dataset.imgurl)
    wx.previewImage({
      current: e.currentTarget.dataset.imgurl, // 当前显示图片的http链接
      urls: this.data.house.imgUrlList
    })
  },

  wechat: function () {
    wx.previewImage({
      current: '', // 当前显示图片的http链接
      urls: ["http://wx1.sinaimg.cn/small/b11e11f9ly1fp3g1t4bqrj209k09kmx4.jpg"] // 需要预览的图片http链接列表
    })
  },
  call: function (e) {
    var telephone = this.data.house.telephone;
    wx.makePhoneCall({
      phoneNumber: telephone //仅为示例，并非真实的电话号码
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var baseUrl = wx.getStorageSync('baseUrl')
    var that = this;

    this.testPost();

    return;

    wx.request({
      url: baseUrl + '/houseData.json',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        var arr = new Array();
        let imgUrlList = res.data.imgUrlList;
        for (var i = 0, len = imgUrlList.length; i < len; i++){
          arr.push({
            url: imgUrlList[i]
          })
        }

        var marker = {
          id: 1,
          // iconPath: '/images/yuyue1.png',
          latitude: res.data.latitude,
          longitude: res.data.longitude
        }
        var markers = new Array();
        markers.push(marker);

        that.setData({
          house: res.data,
          images: arr,
          markers: markers,
          latitude: res.data.latitude,
          longitude: res.data.longitude
        });
        


        

      },
      fail: function (res) {
        console.log('请求失败')
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.mapCtx = wx.createMapContext('myMap')
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

  markertap: function (e) {
    console.log(e.markerId)
  },










  testPost: function(e){

    var that = this;

    var houseData = postData.houseData;

    
    var arr = new Array();
    let imgUrlList = houseData.imgUrlList;
    for (var i = 0, len = imgUrlList.length; i < len; i++) {
      arr.push({
        url: imgUrlList[i]
      })
    }

    var marker = {
      id: 1,
      // iconPath: '/images/yuyue1.png',
      latitude: houseData.latitude,
      longitude: houseData.longitude
    }
    var markers = new Array();
    markers.push(marker);

    that.setData({
      house: houseData,
      images: arr,
      markers: markers,
      latitude: houseData.latitude,
      longitude: houseData.longitude
    });
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