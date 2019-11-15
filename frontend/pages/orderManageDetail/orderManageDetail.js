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
      url: app.globalData.backendUrl + "order/find/id/wx",
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
        var orderGoods = res.data.data.items.goodsList
        var orderId = res.data.data.items.id
        this.setData({
          orderInfo: orderInfo,
          orderGoods: orderGoods,
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
  // “去付款”按钮点击效果
  payOrder: function() {
    let that = this;
    let orderInfo = that.data.orderInfo;
    wx.navigateTo({
      url: '../checkout/checkout?id=' + orderInfo.id
    })
  },
  // “取消订单”点击效果
  cancelOrder: function() {
    let that = this;
    let orderInfo = that.data.orderInfo;

    wx.showModal({
      title: '',
      content: '确定要取消此订单？',
      success: function(res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.backendUrl + "order/cancel",
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
                  title: '取消订单成功'
                });
                util.redirect('/pages/order/order');
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
  refundOrder: function() {
    let that = this;
    let orderInfo = that.data.orderInfo;

    wx.showModal({
      title: '',
      content: '确定申请退款？',
      success: function(res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.backendUrl + "order/cancel",
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
                  title: '申请退款成功'
                });
                util.redirect('/pages/order/order');
              } else {
                util.showErrorToast(res.message);
              }
            }
          })
        }
      }
    });
  },
  // “删除”点击效果
  deleteOrder: function() {
    let that = this;
    let orderInfo = that.data.orderInfo;

    wx.showModal({
      title: '',
      content: '确定要删除此订单？',
      success: function(res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.backendUrl + "order/delete",
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
                  title: '删除订单成功'
                });
                util.redirect('/pages/order/order');
              } else {
                util.showErrorToast(res.message);
              }
            }
          })
        }
      }
    });
  },
  // “确认收货”点击效果
  confirmOrder: function() {
    let that = this;
    let orderInfo = that.data.orderInfo;

    wx.showModal({
      title: '',
      content: '确认收货？',
      success: function(res) {
        if (res.confirm) {
          if(orderInfo.status=='待收货'){
          wx.request({
            url: app.globalData.backendUrl + "order/take",
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
                  title: '确认收货成功'
                });
                util.redirect('/pages/order/order');
              } else {
                util.showErrorToast(res.message);
              }
            }
          })
        }
        }
        else{
          wx.request({
            url: app.globalData.backendUrl + "order/integralTake",
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
                  title: '确认收货成功'
                });
                util.redirect('/pages/order/order');
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