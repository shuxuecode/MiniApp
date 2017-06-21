
// index.js

var format = function (data) {
  var result = [];
  for (var i = 0; i < data.length; i++) {
    var d = data[i];
    if (d.name === "请选择") continue;
    result.push(d.name);
  }
  if (result.length) return result;
  return [""];
};

var sub = function (data) {
  if (!data.sub) return [""];
  return format(data.sub);
};



var getDistricts = function (datas, province, city) {
  for (var i = 0; i < datas.length; i++) {
    if (datas[i].name === province) {
      for (var j = 0; j < datas[i].sub.length; j++) {
        if (datas[i].sub[j].name === city) {
          return sub(datas[i].sub[j]);
        }
      }
    }
  }
  return [""];
};


var cityData = require('data.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    provs: [],
    prov: '',
    citys: [],
    city: '',
    dists: [],
    dist: '',
    value: [0, 0, 0],
    datas: []
  },

  bindChange: function (e) {


    var that = this;

    var datas = that.data.datas;

    // const val = e.detail.value
    var val = e.detail.value


    var value = that.data.value;

    var loadCity = function(p, i){
      that.setData({
        city: ''
      })
      // 根据省份获取城市列表
      var initCities = sub(datas[p]);
      that.setData({
        citys: initCities,
        city: initCities[i]
      })
      return true;
    }

    var loadDistrict = function(p, c, i){
      that.setData({
        dist: ''
      })
      // 根据城市获取区县列表
      var newDistricts = getDistricts(datas, p, c);
      that.setData({
        dists: newDistricts,
        dist: newDistricts[i]
      })
      return true;
    }




    if (val[0] != value[0]){

      val = [val[0], 0, 0]

      var a = that.data.provs[val[0]];

      that.setData({
        prov: a,
      })
      if (loadCity(val[0], val[1])){
        loadDistrict(that.data.prov, that.data.city, val[2])
      }
    }

    

    if (val[1] != value[1]){

      val = [val[0], val[1], 0]

      if (loadCity(val[0], val[1])) {
        loadDistrict(that.data.prov, that.data.city, val[2])
      }
    }

    if (val[2] != value[2]) {
      loadDistrict(that.data.prov, that.data.city, val[2])
    }

    that.setData({
      value: val
    })



  },

  save: function(){
    wx.navigateBack()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var value = this.data.value;

    var cityList = cityData.getCitys();

    this.setData({
      datas: cityList
    })

    var provinces = cityList.map(function (d) {
      return d.name;
    });

    this.setData({
      provs: provinces
    })


    
    // 根据省份获取城市列表
    var initCities = sub(cityList[value[1]]);

    this.setData({
      citys: initCities
    })

    
    // 根据城市获取区县列表
    var newDistrict = getDistricts(cityList, provinces[value[1]], initCities[value[2]]);

    this.setData({
      dists: newDistrict
    })

    // this.setData({
    //   prov: this.data.provs[value[0]],
    //   city: this.data.citys[value[1]],
    //   dist: this.data.dists[value[2]]
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