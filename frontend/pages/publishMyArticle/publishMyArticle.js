// pages/me/publishMyArticle/publishMyArticle.js
const app = getApp();
var api = require('../../util/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {},
    content:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(){
    /* 获取用户信息 */
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

  },
  //获取textarea输入文本内容
  bindInputValue: function(e) {
    this.setData({
      content: e.detail.value
    })
  },
  submit: function (e) {
    wx.request({
      url: app.globalData.backendUrl + "complain/add",
      data: {
        id:'',
        content: this.data.content,
        time:'',
        username: this.data.user.username
      },
      header: {
        'Authorization': 'Bearer ' + app.getToken(),
        'content-type': 'application/json'
      },
      method: 'POST',
      success: (res) => {
        /*console.log(res)*/
         wx.navigateBack({
           
         })
      }
    })
  }
})