// pages/me/me.js
const app = getApp();
var api = require('../../util/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{}
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

  },

  onShareAppMessage: function () {
    this.hideModal()
    var that = this;
    var userId = app.getOpenid();
    return {
      title: '金酱酒庄',
      path: '/pages/index/index?id=' + app.getId(),
      imageUrl: "http://47.106.171.65/record/7da730ee84084544aea2e7a8942790dc.jpg",
      success: function (res) {
        console.log("转发成功" + res);
      }
    }
  },

  // 绘制海报
  drawPost: function () {
    this.hideModal()
    wx.navigateTo({
      url: '../createPost/createPost',
    })
  },

  // 显示遮罩层
  showModal: function () {
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },

  // 隐藏遮罩层
  hideModal: function () {
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  }

  

})