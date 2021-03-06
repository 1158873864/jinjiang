var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var app=getApp()
Page({
  data: {
    orderId: 0,
    orderInfo: {},
    orderGoods: [],
    expressInfo: {},
    flag: false,
    handleOption: {}
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    wx.request({
      url: app.globalData.backendUrl + "stock/find/id",
      data: {
         id: options.id
      },
      header: {
        'Authorization': 'Bearer ' + app.getToken(),
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'GET',
      success: (res) => {
        /*console.log(res)*/
        var orderInfo = res.data.data.items
        var orderId = res.data.data.items.id
        this.setData({
          orderInfo: orderInfo,
          orderId: orderId
        })
      }
    })
  },

  onPullDownRefresh() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.getOrderDetail();
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },
  expandDetail: function() {
    let that = this;
    this.setData({
      flag: !that.data.flag
    })
  },
  
 
  takeOrder: function() {
    let that = this;
    let orderInfo = that.data.orderInfo;

    wx.showModal({
      title: '',
      content: '确定收货？',
      success: function(res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.backendUrl + "stock/take",
            data: {
              id: orderInfo.id
            },
            header: {
              'Authorization': 'Bearer ' + app.getToken(),
              'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'GET',
            success: (res) => {
              /*console.log(res)*/
              if (res.data.code === 0) {
                wx.showToast({
                  title: '收货成功'
                });
                util.redirect('/pages/applyIn/applyIn');
              } else {
                util.showErrorToast(res.message);
              }
            }
          })

        }
      }
    });
  },
  refundOrder: function () {
    let that = this;
    let orderInfo = that.data.orderInfo;

    wx.showModal({
      title: '',
      content: '确定退款？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.backendUrl + "stock/refund",
            data: {
              id: orderInfo.id
            },
            header: {
              'Authorization': 'Bearer ' + app.getToken(),
              'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'GET',
            success: (res) => {
              /*console.log(res)*/
              if (res.data.code === 0) {
                wx.showToast({
                  title: '退款申请成功'
                });
                util.redirect('/pages/applyIn/applyIn');
              } else {
                util.showErrorToast(res.message);
              }
            }
          })

        }
      }
    });
  },

  // “取消订单并退款”点击效果
  groundingOrder: function() {
    let that = this;
    let orderInfo = that.data.orderInfo;

    wx.showModal({
      title: '',
      content: '确定上架？',
      success: function(res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.backendUrl + "stock/grounding",
            data: {
              id: orderInfo.id
            },
            header: {
              'Authorization': 'Bearer ' + app.getToken(),
              'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'GET',
            success: (res) => {
              /*console.log(res)*/
              if (res.data.code === 0) {
                wx.showToast({
                  title: '上架成功'
                });
                util.redirect('/pages/applyIn/applyIn');
              } else {
                util.showErrorToast(res.message);
              }
            }
          })
        }
      }
    });
  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  }
})