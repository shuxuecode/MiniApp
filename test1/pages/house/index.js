// pages/house/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    placeholderText: '搜索',
    dataList: [], // 房屋数据

    tabTxt: ['地区', '租金', '排序'],//tab选项
    tab: [true, true, true],
    area_type: 0, // 初始化 地区类型
    rent_type: 0, // 初始化 租金类型
    order_type: 0, // 初始化 排序类型
    filterList: {}



  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      dataList: [{
        "imgUrl": "http://pic4.58cdn.com.cn/anjuke_58/87090d02a9e155bc025be002991e6b8a?w=640&h=480&crop=1",
        "text": "(单间出租)六道口地铁 静淑东里小区 精装修三家合住次卧出租精装修三家合住次卧出租",
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

    // this.setData({
    //   dataList: []
    // });


  },

  // 点击选项卡事件
  filterTab: function (e) {
    var data = [true, true, true],
      index = e.currentTarget.dataset.index;

    data[index] = !this.data.tab[index];

    this.setData({
      tab: data
    })
  },

  // 筛选项点击操
  filter: function (e) {
    var that = this,
      id = e.currentTarget.dataset.id,
      txt = e.currentTarget.dataset.txt,
      tabTxt = this.data.tabTxt,
      tab = [true, true, true];

    switch (e.currentTarget.dataset.index) {
      case '0':
        tabTxt[0] = txt;
        that.setData({
          tab: tab,
          tabTxt: tabTxt,
          area_type: id
        });
        break;
      case '1':
        tabTxt[1] = txt;
        that.setData({
          tab: tab,
          tabTxt: tabTxt,
          rent_type: id
        });
        break;
      case '2':
        tabTxt[2] = txt;
        that.setData({
          tab: tab,
          tabTxt: tabTxt,
          order_type: id
        });
        break;
    }
  },

  
  search: function (e) {
    var that = this
    console.log(e.detail)
    var keyword = e.detail.value
    if (keyword == '') {    
      wx.showToast({
        title: '请输入内容',
        icon: 'null',
        duration: 1500
      })
      return false
    } else {
      console.log("搜索关键字为： " + keyword)
//      var searchUrl = that.data.searchType == 'keyword' ? config.apiList.search.byKeyword : config.apiList.search.byTag
      // wx.redirectTo({
      //   url: '../searchResult/searchResult?url=' + encodeURIComponent(searchUrl) + '&keyword=' + keyword
      // })
    }
  },

  gotoDetail: function (event) {
    var id = event.currentTarget.dataset.id;
    // console.log(id)
    wx.navigateTo({
      url: '/pages/map/index?id=' + id
    })
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 初始化数据
    this.setData({
      // dataList: [],
      filterList: {
        areaTypeList: [{
          id: 1,
          name: "朝阳"
        }, {
          id: 2,
          name: "海淀"
        }],
        rentTypeList: [{
          id: 1,
          name: "600元以下"
        }, {
          id: 2,
          name: "600-1000元"
        }, {
          id: 3,
          name: "1000-1500元"
        }, {
          id: 4,
          name: "1500-2000元"
        }, {
          id: 5,
          name: "2000-3000元"
        }, {
          id: 6,
          name: "3000-5000元"
        }, {
          id: 7,
          name: "5000元以上"
        }],
        orderTypeList: [{
          id: 1,
          name: "最近发布"
        }, {
          id: 2,
          name: "距离由近到远"
        }, {
          id: 3,
          name: "租金由低到高"
        }, {
          id: 4,
          name: "租金由高到低"
        }]
      }
    });

    let arr = this.data.dataList;
    arr = arr.concat(arr)
    arr = arr.concat(arr)
    // arr = []
    this.setData({
      dataList: arr
    })
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