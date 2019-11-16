// pages/modifyMyCard/modifyMyCard.js
const app = getApp()
var api = require('../../util/api.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    type: '购买应用物资',
    typeIndex: 0,
    user: {},
    types: ['购买应用物资', '房租', '水电', '员工工资','其它'],
    price:0,
    detail: '',
    shop:{}
  },

  onLoad: function(options){
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
          }
        })

      }
    })

  },
  updateName: function(e) {
    var price = e.detail.value;
    this.setData({
      price:price
    })

  },

  updateIntro: function(e) {
     var detail = e.detail.value;
    this.setData({
      detail: detail
    })
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var s = this.data.types
    this.setData({
      typeIndex: e.detail.value,
      type: s[e.detail.value]
    })
  },

  onSave: function(){
    console.log(this.data.shop)
    console.log(this.data.user.username)
    wx.request({
      url: app.globalData.backendUrl + "shopBalance/add",
      data: {
         id:'',
        shopId: this.data.shop.id,
        name: this.data.shop.name,
        type:'报销',
        expenseType:this.data.type,
        price: this.data.price,
        detail:this.data.detail,
        time: '',
        goodsList: [this.data.user.id,this.data.user.username,'未审批']
      },
      header: {
        'Authorization': 'Bearer ' + app.getToken(),
        'content-type': 'application/json'
      },
      method: 'POST',
      success: (res) => {
        /*console.log(res)*/
        wx.showToast({
          title: '提交成功',
          duration: 2000
        })
        wx.navigateBack({
          
        })
      }
    })


  }

}
)