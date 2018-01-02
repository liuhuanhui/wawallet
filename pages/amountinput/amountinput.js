// pages/amountinput/amountinput.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:'',
    amount:'',
    pwd:'',
    error_info:'密码错误',
    warn:'warn hide',
    input_pwd:'input_pwd hide'
  },
  getAmount:function(e){
    this.setData({
      amount:e.detail.value
    })
  },
  submit:function(){
    if(this.data.amount==''){
      wx.showToast({
        title: '不能为空',
        image: '../img/error.png'
      })

      return ;
    }
    if(this.data.amount.indexOf('0')==0){
      wx.showToast({
        title: '格式错误',
        image:'../img/error.png'
      })

      return ;
    }
    //弹出密码输入框
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#919191',
    })
    this.setData({
      input_pwd:'input_pwd'
    })
  },
  queren:function(){
    var address = wx.getStorageSync('address');
    var _this = this;
    if(this.data.pwd==''){
      this.setData({
        warn:'warn',
        error_info:'密码不能为空'
      })
      return ;
    }else{
      //验证密码
      wx.showLoading({
        title: '验证密码',
      })
      wx.request({
        url: getApp().globalData.baseUrl+'/verifyPwd',
        method: 'POST',
        data: {
          password: _this.data.pwd,
          address:address
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success:function(res){
          wx.hideLoading();
          if(!res.data.status){
            //密码错误
            _this.setData({
              warn:'warn',
              error_info:'密码错误'
            })
            return ;
          }else{
            //密码正确，付款
            _this.setData({
              warn: 'warn hide',
              input_pwd: 'input_pwd hide'
            })
            wx.setNavigationBarColor({
              frontColor: '#000000',
              backgroundColor: '#ffffff',
            })
            wx.showLoading({
              title: '付款中',
            })
            wx.request({
              url: getApp().globalData.baseUrl + '/sendCoin',
              method: 'POST',
              data: {
                password: _this.data.pwd,
                from: address,
                to:_this.data.address,
                amount:_this.data.amount
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
              },
              success:function(res){
                wx.hideLoading();
                setTimeout(function(){
                  if (res.data.status) {
                    //转账成功
                    wx.showToast({
                      title: '转账成功',
                    })
                    setTimeout(function(){
                      //将记录保存到缓存
                      var list = wx.getStorageSync('list');
                      if(!list.includes(_this.data.address)){
                        var temp = [_this.data.address];
                        if(list==null||list==undefined||list==''||list.length==0){
                          wx.setStorageSync('list', temp);
                        }else{
                          var newList = temp.concat(list);
                          wx.setStorageSync('list', newList);
                        }
                      }
                        
                      wx.reLaunch({
                        url: '../home/home',
                      })
                    },500)
                    
                  } else {
                    //转账失败
                    wx.showToast({
                      title: res.data.msg,
                      image: '../img/error.png'
                    })
                  }
                },500)
                
              }
            })
          }
        }
      })
    }
    
    
  },
  cancel:function(){
    this.setData({
      warn:'warn hide',
      input_pwd: 'input_pwd hide'
    })
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ffffff',
    })
  },
  getPwd:function(e){
    this.setData({
      warn:'warn hide',
      pwd:e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.amount != null || options.amount != undefined || options.amount != ''){
      this.setData({
        address: options.address,
        amount:options.amount
      })
    }else{
      this.setData({
        address: options.address
      })
    }
    
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