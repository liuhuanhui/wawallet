// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pwd:'',
    repwd:'',
    left:'',
    addClass:'add',
    bindtapFunc:'gotoLogin',
    bindtaptext:'已有账户',
    address:'',
    pwd:''
  }, 
  login: function () {
    var _this = this;
    if (this.data.address == '' || this.data.pwd == '') {
      wx.showToast({
        title: '不能为空',
        image: '../img/error.png'
      })
    } else {
      wx.showLoading({
        title: '验证账户和密码',
      })
      wx.request({
        url: getApp().globalData.baseUrl + '/isExit',
        method: 'POST',
        data: {
          to: _this.data.address
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (res) {

          if (!res.data) {
            //账户存在
            //验证密码
            wx.request({
              url: getApp().globalData.baseUrl + '/verifyPwd',
              method: 'POST',
              data: {
                address: _this.data.address,
                password: _this.data.pwd
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
              },
              success: function (res) {
                if (res.data.status) {
                  //密码正确
                  wx.hideLoading();
                  wx.setStorageSync('address', _this.data.address);
                  wx.reLaunch({
                    url: '../home/home',
                  })
                } else {
                  wx.hideLoading();
                  wx.showToast({
                    title: '密码错误',
                    image: '../img/error.png'
                  })
                }
              }
            })
          } else {
            //账户不存在
            wx.hideLoading();
            wx.showToast({
              title: '账户不存在',
              image: '../img/error.png'
            })
          }
        }
      })
    }

  },
  getCopyText:function(){
    var _this = this;
    wx.getClipboardData({
      success:function(res){
        _this.setData({
          address:res.data
        })
      }
    })
  },
  getAddress: function (e) {
    this.setData({
      address: e.detail.value
    })
  },
  getPassword: function (e) {
    this.setData({
      pwd: e.detail.value
    })
  },
  gotoLogin:function(){
    //wx.navigateTo({
    //  url: '../olduser/olduser',
    //})
    this.setData({
      addClass:'add show',
      bindtapFunc:'cancelLogin',
      bindtaptext:'返回'
    })
  },
  cancelLogin:function(){
    this.setData({
      addClass: 'add',
      bindtapFunc: 'gotoLogin',
      bindtaptext: '已有账户'
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
    console.log(getApp().globalData.left);
    
      this.setData({
        left: getApp().globalData.left
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