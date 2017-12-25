// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pwd:'',
    repwd:''
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
      wx.setStorageSync("address", "0x9c7fc7fe1150cc800f8dbc95e07004ef04f2b5e9");
      wx.redirectTo({
        url: '../home/home',
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