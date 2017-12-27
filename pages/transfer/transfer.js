// pages/transfer/transfer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:'',
    amount:''
  },
  scan:function(){
    var _this = this;
    wx.scanCode({
      success:function(res){
        console.log(res.result);
        var datas = res.result.split('+');
        _this.setData({
          address:datas[0]
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    console.log('options.pwd')
    console.log(options.pwd);
    if (options.pwd != null && options.pwd != undefined && options.pwd != '') {
      console.log('密码正确')
      console.log(this.data.amount);
      this.setData({
        address: options.address,
        amount: options.amount
      })
      wx.showLoading({
        title: '付款中',
      })
      wx.request({
        url: getApp().globalData.baseUrl + '/sendCoin',
        method: 'POST',
        data: {
          from: wx.getStorageSync('address'),
          to: options.address,
          amount: options.amount,
          password: options.pwd
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (res) {
          if (res.data.status) {
            wx.showToast({
              title: '付款成功',
            })
            setTimeout(function () {
              wx.redirectTo({
                url: '../home/home',
              })
            }, 1000);
          } else {
            wx.showToast({
              title: '付款失败',
            })
          }
          wx.hideLoading();
          return;
        }
      })
    } else if (options.address != null && options.address != undefined && options.address != '') {
      console.log('取消支付')
      this.setData({
        address: options.address,
        amount: options.amount
      })
      return;
    }

  },
  getAmount:function(e){
    this.setData({
      amount:e.detail.value
    })
  },
  getAddress:function(e){
    this.setData({
      address:e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  submit:function(){
    if(this.data.address==""||this.data.amount==""){
      wx.showToast({
        title: '不能为空',
        image:'../img/error.png'
      })
      return;
    }else if(isNaN(this.data.amount)){
      wx.showToast({
        title: '金额只能是数字',
        image:'../img/error.png'
      })
      return ;
    }else{
      //输入密码
      var _this = this;
      var url = '../transfer/transfer';
      wx.redirectTo({
        url: '../password/password?url=' + url + '&address=' + _this.data.address + '&amount=' + _this.data.amount,
      })
    }
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