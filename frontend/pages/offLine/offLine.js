// pages/modifyMyCard/modifyMyCard.js
const app = getApp()
var api = require('../../util/api.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    goods: {'name':'请选择商品'},
    index: 0,
    user: {},
    goodsName:[],
    goodsList: [],
    number: 0,
    price: 0,
    shop: {},
    mobilePhone:''
  },

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
              url: app.globalData.backendUrl + "goods/find/ShopId",
              data: {
                ShopId: shop.id,
                page: 0,
                size: 100
              },
              header: {
                'Authorization': 'Bearer ' + app.getToken(),
                'content-type': 'application/x-www-form-urlencoded'
              },
              method: 'GET',
              success: (res) => {
                /*console.log(res)*/
                var goodsList = res.data.data.items.content
                wx.request({
                  url: app.globalData.backendUrl + "goods2/find/ShopId",
                  data: {
                    ShopId: shop.id,
                    page: 0,
                    size: 100
                  },
                  header: {
                    'Authorization': 'Bearer ' + app.getToken(),
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  method: 'GET',
                  success: (res) => {
                    /*console.log(res)*/
                    var goods = res.data.data.items.content
                    for (var i = 0; i < goods.length; i++) {
                      goodsList.push(goods[i])
                    }
                    var goodsName=[]
                    for(var i=0;i<goodsList.length;i++){
                      goodsName.push(goodsList[i].name)
                    }
                    console.log(goodsList)
                    this.setData({
                      goodsList: goodsList,
                      goodsName: goodsName
                    })
                  }
                })
              }
            })

          }
        })

      }
    })

  },
  updateNumber: function (e) {
    console.log(1)
    var number = e.detail.value;
    console.log(number)
    this.setData({
      number: number
    })
  },
  updatePhone: function (e) {
    var mobilePhone = e.detail.value;
    this.setData({
      mobilePhone: mobilePhone
    })
  },
  updatePrice: function (e) {
    var price = e.detail.value;
    this.setData({
      price: price
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var s = this.data.goodsList
    this.setData({
      index: e.detail.value,
      goods: s[e.detail.value]
    })
  },

  onSave: function () {
    wx.request({
      url: app.globalData.backendUrl + "offLine/add",
      data: {
        id: '',
        staffId: this.data.user.id,
        name: this.data.user.username,
        userId: this.data.mobilePhone,
        username: '',
        shopId: this.data.shop.id,
        goodsId: this.data.goods.id,
        goodsName: this.data.goods.name,
        imageUrl: this.data.goods.imageUrl,
        number: this.data.number,
        price: this.data.price,
        status: '已审批',
        time: ''
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