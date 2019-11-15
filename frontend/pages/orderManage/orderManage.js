var util = require('../../utils/util.js');
var api = require('../../config/api.js');
const app = getApp()
var api = require('../../util/api.js')
const {
  bg1
} = require('../../util/data.js')
Page({
  data: {
    orderList: [],
    showType: 0,
    user:{}
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    wx.request({
      url: app.globalData.backendUrl + "user/find/openid",
      data: {
        openid: app.getOpenid()
      },
      header: {
        'Authorization': 'Bearer ' + app.getToken(),
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'GET',
      success: (res) => {
        /*console.log(res)*/
        var user = res.data.data.items

        this.setData({
          user: res.data.data.items
        })
        
        wx.request({
          url: app.globalData.backendUrl + "order/find/status/shopId",
          data: {
            status: '待发货',
            shopId: user.shopId
          },
          header: {
            'Authorization': 'Bearer ' + app.getToken(),
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: 'GET',
          success: (res) => {
            /*console.log(res)*/
            var orderList = res.data.data.items
            wx.request({
              url: app.globalData.backendUrl + "order/find/status/shopId",
              data: {
                status: '退款中',
                shopId: user.shopId
              },
              header: {
                'Authorization': 'Bearer ' + app.getToken(),
                'content-type': 'application/x-www-form-urlencoded'
              },
              method: 'GET',
              success: (res) => {
                /*console.log(res)*/
                var order = res.data.data.items
                for (var i = 0; i < order.length; i++) {
                  orderList.push(order[i])
                }
                this.setData({
                  orderList: orderList
                })
              }
            })

          }
        })
      }
    }) 
    
  },
  switchTab: function (e) {
    var showType = e.currentTarget.dataset.index
    if (showType == 0) {

      wx.request({
        url: app.globalData.backendUrl + "order/find/status/shopId",
        data: {
          status: '待发货',
          shopId: this.data.user.shopId
        },
        header: {
          'Authorization': 'Bearer ' + app.getToken(),
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'GET',
        success: (res) => {
          /*console.log(res)*/
          var orderList = res.data.data.items
          wx.request({
            url: app.globalData.backendUrl + "order/find/status/shopId",
            data: {
              status: '退款中',
              shopId: this.data.user.shopId
            },
            header: {
              'Authorization': 'Bearer ' + app.getToken(),
              'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'GET',
            success: (res) => {
              /*console.log(res)*/
              var order = res.data.data.items
              for (var i = 0; i < order.length; i++) {
                orderList.push(order[i])
              }
              this.setData({
                orderList: orderList,
                showType: showType
              })
            }
          })

        }
      })
    }
    else if (showType == 1) {
      wx.request({
        url: app.globalData.backendUrl + "order/find/status/shopId",
        data: {
          status: '待发货',
          shopId: this.data.user.shopId
        },
        header: {
          'Authorization': 'Bearer ' + app.getToken(),
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'GET',
        success: (res) => {
          /*console.log(res)*/
          var order = res.data.data.items
          this.setData({
            orderList: order,
            showType: showType
          })
        }
      })
    }
    else if (showType == 2) {
      wx.request({
        url: app.globalData.backendUrl + "order/find/status/shopId",
        data: {
          status: '退款中',
          shopId: this.data.user.shopId
        },
        header: {
          'Authorization': 'Bearer ' + app.getToken(),
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'GET',
        success: (res) => {
          /*console.log(res)*/
          var order = res.data.data.items
          this.setData({
            orderList: order,
            showType: showType
          })
        }
      })
    }
    
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})