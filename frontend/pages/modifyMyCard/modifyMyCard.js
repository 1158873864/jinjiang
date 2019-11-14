// pages/modifyMyCard/modifyMyCard.js
const app = getApp()
var api = require('../../util/api.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    user:{}
  },


  updateName: function(e) {
    this.data.user.username = e.detail.value;
  },

  updatePhone: function(e) {
    this.data.user.name = e.detail.value;
  },

  updateEmail: function(e) {
    this.data.user.mobilePhone = e.detail.value;
  },

  updateCity: function(e) {
    this.data.user.birthday = e.detail.value;
  },

  updateCompany: function(e) {
    this.data.newMyInfo.email = e.detail.value;
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var user=this.data.user
    user.birthday = e.detail.value
    this.setData({
      user: user
    })
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
      }
    })


  },

  onSave: function() {
    /* 检查输入合法性 */
    if (!(this.data.user.mobilePhone === "" || /^1[34578]\d{9}$/.test(this.data.user.mobilePhone))) {
      wx.showToast({
        title: '手机号码有误，请重填',
        icon: 'none'
      })
      return
    }
    if (!(this.data.user.email === "" || /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/.test(this.data.user.email))) {
      wx.showToast({
        title: '邮箱地址有误，请重填',
        icon: 'none'
      })
      return
    }
    
        wx.request({
          //上传用户信息
          url: app.globalData.backendUrl + "user/update",
          data: this.data.user,
          header: {
            'Authorization': 'Bearer ' + app.getToken(),
            'content-type': 'application/json'
          },
          method: 'PUT',
          success: (res) => {
            wx.hideLoading()
            wx.showToast({
              title: '修改成功',
              icon: 'succes',
              duration: 1000,
              mask: true
            })
            setTimeout(() => {
              wx.navigateBack()
            }, 1000)
          }
        })
      
    
  }
})