var app = getApp()

var num = undefined;
var num2 = undefined;

Page({
    data: {
        text: 0
    },

    // 初始化
    onLoad: function () {
        wx.setStorageSync('num', "");
    },

    //
    number1: function () {
        num = wx.getStorageSync('num');
        num = num + "1";
        wx.setStorageSync('num', num);
        this.setData({
            text: num
        })
    },

    //
    number2: function () {
        num = wx.getStorageSync('num') + "2";
        wx.setStorageSync('num', num);
        this.setData({
            text: num
        })
    },

    //
    number3: function () {
        num = wx.getStorageSync('num') + "3";
        wx.setStorageSync('num', num);
        this.setData({
            text: num
        });
    },

    //
    number4: function () {
        num = wx.getStorageSync('num') + "4";
        wx.setStorageSync('num', num);
        this.setData({
            text: num
        });
    },

    //
    number5: function () {
        num = wx.getStorageSync('num') + "5";
        wx.setStorageSync('num', num);
        this.setData({
            text: num
        });
    },

    //
    number6: function () {
        num = wx.getStorageSync('num') + "6";
        wx.setStorageSync('num', num);
        this.setData({
            text: num
        });
    },

    //
    number7: function () {
        num = wx.getStorageSync('num') + "7";
        wx.setStorageSync('num', num);
        this.setData({
            text: num
        });
    },

    //
    number8: function () {
        num = wx.getStorageSync('num') + "8";
        wx.setStorageSync('num', num);
        this.setData({
            text: num
        });
    },

    //
    number9: function () {
        num = wx.getStorageSync('num') + "9";
        wx.setStorageSync('num', num);
        this.setData({
            text: num
        });
    },

    //
    number0: function () {
        num = wx.getStorageSync('num') + "0";
        wx.setStorageSync('num', num);
        this.setData({
            text: num
        });
    },

    //
    point: function () {
        num = wx.getStorageSync('num');
        if (num.indexOf(".") == -1) {
            wx.setStorageSync('num', num + ".");
            this.setData({
                text: num
            });
        }
    },

    equals: function () {
        num = wx.getStorageSync('num');
        console.log(num);

        var a = wx.getStorageSync('oldNum');

        // 1、没有点击过运算符
        if (a == '') {
            return;
        }

        // 2、正常
        var n1 = parseFloat(a);
        var n2 = parseFloat(num);

        var opr = wx.getStorageSync('opr');
        if (opr == '+') {
            var res = n1 + n2;
            this.setData({
                text: res
            });
        } else if (opr == '-') {
            var res = n1 - n2;
            this.setData({
                text: res
            });
        } else if (opr == '*') {
            var res = n1 * n2;
            this.setData({
                text: res
            });
        } else if (opr == '/') {
            var res = n1 / n2;
            this.setData({
                text: res
            });
        }


    },

    //
    add: function () {
        num = wx.getStorageSync('num');
        wx.setStorageSync('oldNum', num);
        wx.setStorageSync('num', "");

        this.setData({
            text: 0
        });
        wx.setStorageSync('opr', "+")
    },

    //
    subtract: function () {
        num = wx.getStorageSync('num');
        wx.setStorageSync('oldNum', num);
        wx.setStorageSync('num', "");

        this.setData({
            text: 0
        });
        wx.setStorageSync('opr', "-")
    },

    //
    multiply: function () {
        num = wx.getStorageSync('num');
        wx.setStorageSync('oldNum', num);
        wx.setStorageSync('num', "");

        this.setData({
            text: 0
        });
        wx.setStorageSync('opr', "*")
    },

    //
    divide: function () {
        num = wx.getStorageSync('num');
        wx.setStorageSync('oldNum', num);
        wx.setStorageSync('num', "");

        this.setData({
            text: 0
        });
        wx.setStorageSync('opr', "/")
    },

    clear: function () {
        wx.setStorageSync('oldNum', '');
        wx.setStorageSync('num', "");

        this.setData({
            text: 0
        });
        wx.setStorageSync('opr', "")
    }






})

