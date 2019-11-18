// pages/modifyMyCard/modifyMyCard.js
const app = getApp()
var api = require('../../util/api.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    price:0
  },


  updateName: function(e) {
    this.data.price = e.detail.value;
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
    if (!(this.data.price === "" || /^1[34578]\d{9}$/.test(this.data.price))) {
      wx.showToast({
        title: '格式有误，请重填',
        icon: 'none'
      })
      return
    }

    var that = this
    wx.request({
      url: app.globalData.backendUrl + "order/recharge",
      method: "GET",
      header: {
        'Authorization': 'Bearer ' + app.getToken(),
        'content-type': 'application/json'
      },
      data: {
        id: app.getId(),
        price: this.data.price
      },
      success: (res) => {
        if (res.statusCode == 200) {
          wx.showModal({
            title: '请在15分钟内支付完成',
            content: '',
            showCancel: false,
            success: () => {
              var requestPaymentParams = res.data.wxBuyCredit
              console.log(requestPaymentParams)
              wx.requestPayment({
                timeStamp: requestPaymentParams.timeStamp,
                nonceStr: requestPaymentParams.nonceStr,
                package: requestPaymentParams.packageContent,
                signType: requestPaymentParams.signType,
                paySign: requestPaymentParams.paySign,
                success: (res) => {
                  wx.showToast({
                    title: '充值成功',
                    icon: 'success',
                    duration: 1000
                  })
                  that.onLoad()
                }
              })
            }
          })
        } else if (res.statusCode == 404) {
          wx.showToast({
            title: '充值失败',
            icon: 'none',
            duration: 1000
          });
        }
      }
    })
    
  }
})