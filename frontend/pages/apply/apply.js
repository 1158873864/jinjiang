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
    shop: {}
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
    var number = e.detail.value;
    var price = this.data.goods.stockPrice*number
    this.setData({
      number: number,
      price:price
    })

  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var s = this.data.goodsList
    var price = s[e.detail.value].stockPrice * this.data.number
    this.setData({
      index: e.detail.value,
      goods: s[e.detail.value],
      price: price
    })
  },

  onSave: function () {
    
    wx.request({
      url: app.globalData.backendUrl + "stock/add",
      data: {
        id: '',
        shopId: this.data.shop.id,
        name: this.data.shop.name,
        goodsId: this.data.goods.id,
        goodsName: this.data.goods.name,
        imageUrl: this.data.goods.imageUrl,
        number: this.data.number,
        price: this.data.price,
        status: '待发货',
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