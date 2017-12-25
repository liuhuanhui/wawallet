// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:'9c7fc7fe1150cc800f8dbc95e07004ef04f2b5e9',
    balance:'5462342.4348'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  copy:function(){
    var _this = this;
    wx.setClipboardData({
      data: _this.data.address,
      success: function (res) {
        wx.showToast({
          title: '已复制',
        })
      }
    })
  },
  gotoCollect:function(){
    wx.navigateTo({
      url: '../collectMoney/collectMoney',
    })
  },
  payMoney:function(){
    wx.scanCode({
      success:function(res){
        console.log(res.result)
        wx.navigateTo({
          url: '../payMoney/payMoney',
        })
      }
    })
  },
  gotoTransfer:function(){
    wx.navigateTo({
      url: '../transfer/transfer',
    })
  },
  onLoad: function (options) {
  
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