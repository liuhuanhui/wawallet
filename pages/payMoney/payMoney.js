// pages/payMoney/payMoney.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:'',
    amount:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    console.log('options.pwd')
    console.log(options.pwd);
    if(options.pwd!=null&&options.pwd!=undefined&&options.pwd!=''){
      wx.hideLoading();
      wx.showLoading({
        title: '付款中',
      })
      console.log('密码正确')
      console.log(this.data.amount);
      this.setData({
        address:options.address,
        amount:options.amount
      })
      wx.request({
        url: getApp().globalData.baseUrl + '/sendCoin',
        method:'POST',
        data: {
          from: wx.getStorageSync('address'),
          to:options.address,
          amount:options.amount,
          password:options.pwd
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (res) {
          if(res.data.status){
            wx.showToast({
              title: '付款成功',
            })
            setTimeout(function(){
              wx.hideLoading();
              wx.reLaunch({
                url: '../home/home',
              })
            },500);
          }else{
            wx.hideLoading();
            wx.showToast({
              title: '付款失败',
            })
          }
        }
      })
    } else if (options.address != null && options.address != undefined && options.address != ''){
      console.log('取消支付')
      this.setData({
        address: options.address,
        amount: options.amount
      })
      return;
    }else{
      console.log(options.result);
      var data = options.result.split('+');
      var address = data[0];
      var amount = data[1];
      this.setData({
        address: address,
        amount: amount
      })
    }
    
  },
  submit:function(){
    var _this = this;
    var url = '../payMoney/payMoney';
    wx.redirectTo({
      url: '../password/password?url=' + url+ '&address='+_this.data.address+'&amount='+_this.data.amount,
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