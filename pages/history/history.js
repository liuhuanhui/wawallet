// pages/history/history.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    beginDate:'2017-12-1',
    endDate:'2017-12-27',
    state:'交易状态:全部',
    height:'100',
    address:'0x9c7fc7fe1150cc800f8dbc95e07004ef04f2b5e9',
    page:1,
    items:[],
    status:2,
    isEnd:false,
  },
  bindDateChangeStart:function(e){
    this.setData({
      beginDate:e.detail.value,
      page:1,
      items: [],
      isEnd:false
    })
    var _this = this;
    wx.showLoading({
      title: '加载记录',
    })
    setTimeout(function(){
      _this.getData();
    },500);
  },
  bindDateChangeEnd:function(e){
    this.setData({
      endDate:e.detail.value,
      page: 1,
      items: [],
      isEnd: false
    })
    var _this = this;
    wx.showLoading({
      title: '加载记录',
    })
    setTimeout(function () {
      _this.getData();
    }, 500);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    var _this = this;
    var address = wx.getStorageSync('address');
    this.setData({
      beginDate:year+'-'+month+'-'+'1',
      endDate:year+'-'+month+'-'+day,
      address:address
    })
    var size = {}
    try {
      var res = wx.getSystemInfoSync();
      console.log(res.windowHeight)
      var scale = 750 / 686;//不同屏幕下canvas的适配比例；设计稿是750宽
      var width = res.windowWidth / scale;
      var height = width;//canvas画布为正方形
      size.w = width;
      size.h = height;
      this.setData({
        height: res.windowHeight-35
      })
    } catch (e) {
      // Do something when catch error
      console.log("获取设备信息失败" + e);
    }
    wx.showLoading({
      title: '加载记录',
    })
    setTimeout(function(){
      _this.getData();
    },500)
  },
  nextPage:function(){
    if(this.data.isEnd){
      return ;
    }else{
      var _this = this;
      _this.setData({
        page:_this.data.page+1
      })
      wx.showLoading({
        title: '加载记录',
      })
      setTimeout(function () {
        _this.getData();
      }, 500)
    }
  },
  getData:function(){
    
    var _this = this;
    wx.request({
      url: getApp().globalData.baseUrl+'/getTxHis',
      method:'POST',
      data: {
        address: _this.data.address,
        page:_this.data.page,
        beginDate:_this.data.beginDate,
        endDate:_this.data.endDate,
        status:_this.data.status,
        page:_this.data.page
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success:function(res){
        console.log(res.data[0]);
        if(res.data.length<1){
          _this.setData({
            isEnd:true
          })
        }else{
          var items = []
          for (var i = 0; i < res.data.length; i++) {
            var item = {}
            item.from = res.data[i].from;
            item.to = res.data[i].to;
            item.createTime = res.data[i].transTime;
            item.updateTime = res.data[i].confirmTime;
            item.value = parseFloat(res.data[i].value) / 1000000000000000000;
            items.push(item);
          }
          _this.setData({
            items: _this.data.items.concat(items)
          })
        }
        wx.hideLoading();
      }
    })
  },
  changeType:function(){
    var _this = this;
    wx.showActionSheet({
      itemList: ['已确认','待确认','全部'],
      success:function(res){
        var index = res.tapIndex;
        if(index == 0){
          _this.setData({
            state:'交易状态:已确认',
            status:1,
            page: 1,
            items: [],
            isEnd: false
          })
        }else if(index == 1){
          _this.setData({
            state: '交易状态:待确认',
            status: 0,
            page: 1,
            items: [],
            isEnd: false
          })
        }else{
          _this.setData({
            state: '交易状态:全部',
            status: 2,
            page: 1,
            items: [],
            isEnd: false
          })
        }
        wx.showLoading({
          title: '加载记录',
        })
        setTimeout(function () {
          _this.getData();
        }, 500);
      }
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