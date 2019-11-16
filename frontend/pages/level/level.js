// pages/me/me.js
const app = getApp();
var api = require('../../util/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{},
    price:0
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
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
      }
    })

    wx.request({
      url: app.globalData.backendUrl + "balance/find/userId/type",
      data: {
        type: '支出',
        userId: app.getId()
      },
      header: {
        'Authorization': 'Bearer ' + app.getToken(),
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'GET',
      success: (res) => {
        /*console.log(res)*/
        var courseList = res.data.data.items
        var price=0
        for (var i = 0; i < courseList.length;i++){
          price = price + courseList[i].price
        }
        this.setData({
          price: price
        })
      }
    })

  },

  

})