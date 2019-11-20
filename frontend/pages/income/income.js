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
    user:{}
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
          user: res.data.data.items
        })

        wx.request({
          url: app.globalData.backendUrl + "shopBalance/find/type/shopId",
          data: {
            type: '收入',
            shopId: user.shopId
          },
          header: {
            'Authorization': 'Bearer ' + app.getToken(),
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: 'GET',
          success: (res) => {
            /*console.log(res)*/
            this.setData({
              courseList: res.data.data.items
            })
          }
        })
      }
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
        url: app.globalData.backendUrl + "shopBalance/find/type/shopId",
        data: {
          type: '收入',
          shopId: this.data.user.shopId
        },
        header: {
          'Authorization': 'Bearer ' + app.getToken(),
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'GET',
        success: (res) => {
          /*console.log(res)*/
          this.setData({
            courseList: res.data.data.items,
            type:type
          })
        }
      })
    }
    else if (type == 1) {
      wx.request({
        url: app.globalData.backendUrl + "shopBalance/find/type/shopId",
        data: {
          type: '支出',
          shopId: this.data.user.shopId
        },
        header: {
          'Authorization': 'Bearer ' + app.getToken(),
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'GET',
        success: (res) => {
          var courseList = res.data.data.items
          
          /*console.log(res)*/
          wx.request({
            url: app.globalData.backendUrl + "shopBalance/find/type/shopId",
            data: {
              type: '报销',
              shopId: this.data.user.shopId
            },
            header: {
              'Authorization': 'Bearer ' + app.getToken(),
              'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'GET',
            success: (res) => {
              /*console.log(res)*/
              var c = res.data.data.items
              for(var i=0;i<c.length;i++){
                courseList.push(c[i])
              }
              this.setData({
                courseList: courseList,
                type: type
              })
            }
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