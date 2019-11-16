//index.js
// 获取应用实例
const app = getApp()
var api = require('../../util/api.js')
const {
  bg1
} = require('../../util/data.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{},
    shop:{},
    shopBalance:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
          url: app.globalData.backendUrl + "shop/find/id",
          data: {
            id: user.shopId
          },
          header: {
            'Authorization': 'Bearer ' + app.getToken(),
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: 'GET',
          success: (res) => {
            /*console.log(res)*/
            var shop = res.data.data.items
            this.setData({
              shop: shop
            })
            wx.request({
              url: app.globalData.backendUrl + "shopBalance/find/type/shopId",
              data: {
                type:'报销',
                shopId: shop.id
              },
              header: {
                'Authorization': 'Bearer ' + app.getToken(),
                'content-type': 'application/x-www-form-urlencoded'
              },
              method: 'GET',
              success: (res) => {
                /*console.log(res)*/
                var shopBalance = res.data.data.items

                this.setData({
                  shopBalance: res.data.data.items
                })
              }
            })

          }
        })

      }
    })
  },
  //展示文章详情
  onTouchThisArticle: function(e) {
    var id = e.currentTarget.dataset.id
    wx.request({
      url: app.globalData.backendUrl + "shopBalance/pass",
      data: {
        id: id
      },
      header: {
        'Authorization': 'Bearer ' + app.getToken(),
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'GET',
      success: (res) => {
        /*console.log(res)*/
        wx.request({
          url: app.globalData.backendUrl + "shopBalance/find/type/shopId",
          data: {
            type: '报销',
            shopId: this.data.shop.id
          },
          header: {
            'Authorization': 'Bearer ' + app.getToken(),
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: 'GET',
          success: (res) => {
            /*console.log(res)*/
            var shopBalance = res.data.data.items

            this.setData({
              shopBalance: res.data.data.items
            })
          }
        })
      }
    })

  },
  /** 
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})