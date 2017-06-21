
// index.js

const date = new Date()
const years = []
const months = []
const days = []

for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}


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



var getDistricts = function (citys, province, city) {
  for (var i = 0; i < citys.length; i++) {
    if (citys[i].name === province) {
      for (var j = 0; j < citys[i].sub.length; j++) {
        if (citys[i].sub[j].name === city) {
          return sub(citys[i].sub[j]);
        }
      }
    }
  }
  return [""];
};


var citys = require('city.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    years: years,
    year: date.getFullYear(),
    months: months,
    month: 2,
    days: days,
    day: 2,
    year: date.getFullYear(),
    value: [0, 0, 0],
    citys: []
  },

  bindChange: function (e) {

    var that = this;

    var citys = that.data.citys;

    const val = e.detail.value
    console.log(val)
    console.log(this.data.value)

    var value = that.data.value;




    var loadCity = function(p, i){
      that.setData({
        month: ''
      })
      // 根据省份获取城市列表
      var initCities = sub(citys[p]);
      that.setData({
        months: initCities,
        month: initCities[i]
      })
      return true;
    }

    var loadDistrict = function(p, c, i){
      that.setData({
        day: ''
      })
      // 根据城市获取区县列表
      var newDistricts = getDistricts(citys, p, c);
      that.setData({
        days: newDistricts,
        day: newDistricts[i]
      })
      return true;
    }




    if (val[0] != value[0]){
      var a = that.data.years[val[0]];

      that.setData({
        year: a,
      })
      console.log(that.data.year)
      if (loadCity(val[0], val[1])){
        loadDistrict(that.data.year, that.data.month, val[2])
      }
    }

    

    if (val[1] != value[1]){
      // loadCity(that.data.year)
      if (loadCity(val[0], val[1])) {
        loadDistrict(that.data.year, that.data.month, val[2])
      }
    }

    if (val[2] != value[2]) {
      loadDistrict(that.data.year, that.data.month, val[2])
    }

    that.setData({
      value: val
    })



  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // console.log(citys.getCitys())

    var value = this.data.value;

    var raw = citys.getCitys();

    this.setData({
      citys: raw
    })

    var provinces = raw.map(function (d) {
      return d.name;
    });

    console.log(provinces)
    this.setData({
      years: provinces,
    })


    
    // 根据省份获取城市列表
    var initCities = sub(raw[value[1]]);

    console.log(initCities)
    this.setData({
      months: initCities
    })

    
    // 根据城市获取区县列表
    var newDistricts = getDistricts(raw, provinces[value[1]], initCities[value[2]]);

    console.log(newDistricts);

    this.setData({
      days: newDistricts
    })

    this.setData({
      year: this.data.years[value[0]],
      month: this.data.months[value[1]],
      day: this.data.days[value[2]]
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