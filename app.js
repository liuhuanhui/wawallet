//app.js
App({
  onLaunch: function () {
    var address = wx.getStorageSync('address');
      console.log("address:"+address);

    try {
      var res = wx.getSystemInfoSync()
      var width = res.windowWidth;
      var height = res.windowHeight;
      this.globalData.width = width;
      this.globalData.height = height;
      this.globalData.left = -(750 - width / 2);
    } catch (e) {
      // Do something when catch error
      console.log(e);
    }

    if(address!=''){
      wx.reLaunch({
        url: 'pages/home/home',
      })
    }else{
      wx.reLaunch({
        url: 'pages/login/login',
      })
    }
    

  },
  globalData: {
    userInfo: null,
    baseUrl:'https://wallet.phicomm.com/webthree'
    //baseUrl:'http://172.18.114.71:3000/web3'
  }
})