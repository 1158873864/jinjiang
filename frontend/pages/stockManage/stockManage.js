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
    courseList: [],
    page: 0,
    type: 0,
    user: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
          user: user
        })
        wx.request({
          url: app.globalData.backendUrl + "goods/find/ShopId",
          data: {
            page: this.data.page,
            size: 100,
            ShopId: user.shopId
      },
          header: {
            'Authorization': 'Bearer ' + app.getToken(),
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: 'GET',
          success: (res) => {
            /*console.log(res)*/
            this.setData({
              courseList: res.data.data.items.content
            })
          }
        })
      }
    })


    
  },
  //展示文章详情
  onTouchThisArticle: function (e) {
    var id = e.currentTarget.dataset.id //获取当前文章id
    wx.navigateTo({
      url: '../cultureDetail/cultureDetail?id=' + id
    })
  },
  /** 
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  switchTab: function (e) {
    var type = e.currentTarget.dataset.index
    if (type == 0) {
      wx.request({
        url: app.globalData.backendUrl + "goods/find/ShopId",
        data: {
          page: this.data.page,
          size: 100,
          ShopId: this.data.user.shopId
        },
        header: {
          'Authorization': 'Bearer ' + app.getToken(),
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'GET',
        success: (res) => {
          /*console.log(res)*/
          this.setData({
            courseList: res.data.data.items.content,
            type:type
          })
        }
      })
    }
    else if (type == 1) {
      wx.request({
        url: app.globalData.backendUrl + "goods2/find/ShopId",
        data: {
          page: this.data.page,
          size: 100,
          ShopId: this.data.user.shopId
        },
        header: {
          'Authorization': 'Bearer ' + app.getToken(),
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'GET',
        success: (res) => {
          /*console.log(res)*/
          this.setData({
            courseList: res.data.data.items.content,
            type: type
          })
        }
      })
    }
    
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})