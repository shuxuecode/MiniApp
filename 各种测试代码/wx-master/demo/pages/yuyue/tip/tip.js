var app=getApp();
Page({
    data: {
        info:"稍后会有工作人员与您联系，请保持电话畅通",
        times:5,
        tips:'s后自动返回'
    },
    onReady: function() {
        var self=this,d;
        d=setInterval(function(){
            self.setData({
                times:(self.data.times-1)
            });
            if(self.data.times==0){
                self.gotoCase();
                clearInterval(d);
            }
        },1000)
    },
    gotoCase:function(){
        wx.navigateBack(1)
    }
})