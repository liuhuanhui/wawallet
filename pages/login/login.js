// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pwd:'',
    repwd:''
  },
  gotoLogin:function(){
    wx.navigateTo({
      url: '../olduser/olduser',
    })
  },
  getValue:function(e){

    var typee = e.currentTarget.dataset.type;
    switch(typee){
      case 'pwd':
        this.setData({
          pwd:e.detail.value
        })
        break;
      case 'repwd':
        this.setData({
          repwd: e.detail.value
        })
        break;
    }
  },
  submit:function(){
    if(this.data.pwd==''||this.data.repwd==''){
      wx.showToast({
        title: '不能为空',
        image: '../img/error.png'
      })
    }else if(this.data.pwd.length<6){
      wx.showToast({
        title: '长度小于6',
        image: '../img/error.png'
      })
    } else if (this.data.pwd!=this.data.repwd){
      wx.showToast({
        title: '两次密码不一致',
        image: '../img/error.png'
      })
    }else{
      //提交表单
      var _this = this;
      wx.showLoading({
        title: '',
      })
      wx.request({
        url: getApp().globalData.baseUrl+'/createAccount',
        method:'POST',
        data:{
          password:_this.data.pwd
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success:function(res){
          console.log(res.data);
          if(res.data.status){
            wx.showToast({
              title: '注册成功',
            })
            setTimeout(function(){
              //console.log(res.data.result)
              wx.setStorageSync('address', res.data.address);
              console.log(wx.getStorageSync('address'));
              wx.hideLoading();
              wx.reLaunch({
                url: '../home/home',
              })
            },1000)
          }else{
            wx.hideLoading();
            wx.showToast({
              title: '注册失败',
            })
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
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