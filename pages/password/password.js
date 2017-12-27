// pages/password/password.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    error:'',
    password:'',
    prevUrl:'',
    address:'',
    amount:'',
    isClick:false,
  },
  getValue:function(e){
    this.setData({
      error:'',
      password:e.detail.value
    })

  },
  submit:function(){
    if(this.data.isClick){
      return ;
    }else{
      var address = wx.getStorageSync('address');
      var _this = this;
      this.setData({
        isClick: true
      })
      wx.showLoading({
        title: '验证密码',
      })
      wx.request({
        url: getApp().globalData.baseUrl + '/verifyPwd',
        method: 'POST',
        data: {
          address: address,
          password: _this.data.password
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (res) {
          wx.hideLoading();
          if (res.data.status) {
            //密码正确
            wx.redirectTo({
              url: _this.data.prevUrl + '?pwd=' + _this.data.password + '&address=' + _this.data.address + '&amount=' + _this.data.amount,
            })
          } else {
            _this.setData({
              error: '密码错误',
              isClick:false
            })
          }
        }
      })
    }
    
  },
  cancel:function(){
    var _this = this;
    wx.redirectTo({
      url: _this.data.prevUrl+'?address=' + _this.data.address + '&amount=' + _this.data.amount,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      prevUrl:options.url,
      address:options.address,
      amount:options.amount
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