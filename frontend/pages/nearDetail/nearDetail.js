// pages/articleDetail/articleDetail.js
const app = getApp()
var api = require('../../util/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

    goods:[],
    shop:undefined,
    distance:0,
    longitude:0,
    latitude:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        this.setData({
          latitude: latitude,
          longitude: longitude
        })
    wx.request({
      url: app.globalData.backendUrl + "shop/find/id",
      data: {
        id:options.id
      },
      header: {
        'Authorization': 'Bearer ' + app.getToken(),
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'GET',
      success: (res) => {
        /*console.log(res)*/
        this.setData({
          shop: res.data.data.items
        })
        var shop = res.data.data.items
        wx.request({
          url: app.globalData.backendUrl + "shop/cal",
          data: {
            shopId: shop.id,
            longitude: longitude,
            latitude: latitude
          },
          header: {
            'Authorization': 'Bearer ' + app.getToken(),
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: 'GET',
          success: (res) => {
            /*console.log(res)*/
            var distance = res.data.data.items
            this.setData({
              distance: distance
            })
          }
        })
      }
    })

    wx.request({
      url: app.globalData.backendUrl + "goods/find/ShopId",
      data: {
        ShopId:options.id
      },
      header: {
        'Authorization': 'Bearer ' + app.getToken(),
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'GET',
      success: (res) => {
        /*console.log(res)*/
        this.setData({
          goods: res.data.data.items.content
        })
      }
    })
      }

    })
  },

  go:function(){
    wx.openLocation({
      latitude: this.data.latitude,
      longitude: this.data.longitude,
      name: this.data.shop.province + this.data.shop.city + this.data.shop.district + this.data.shop.detail,
      scale: 28
    })

  },
  //展示商品详情
  onTouchThisArticle: function (e) {
    var id = e.currentTarget.dataset.id //获取当前商品id
    var kind = e.currentTarget.dataset.kind
    var url = '../'
    switch (kind) {
      case 'goodsDetail':
        url += 'goodsDetail/goodsDetail?id=' + id
        break;
      case 'integralDetail':
        url += 'integralDetail/integralDetail?id=' + id
        break;
      default:
    }
    wx.navigateTo({
      url: url
    })
  },
  
  //购买该课程
  onPurchase: function () {
    var that = this
    if (that.data.isOwnCourse) {
      wx.showModal({
        content: '您已购买过该课程',
        showCancel: false
      })
    } else {
      api.getMyUser.call(that, app.getOpenid(), (res) => {
        var price = that.data.course.price
        switch (res.levelName) {
          case "common": break;
          case "298": price = parseInt(that.data.discount298 * price); break;
          case "998": price = parseInt(that.data.discount998 * price); break;
          default: break;
        }
        var is=that.data.isClick
        if(is){
        }
        else{
          that.data.course.price = price
          that.data.isClick=true
        }
        
        wx.showModal({
          title: '确认购买',
          content: '确认以' + that.data.course.price + '的价格购买\r\n' + that.data.course.title + '\r\n吗？',
          success: (res) => {
            if (res.confirm) {
              console.log(that.data.course.id)
              api.purchaseCourse.call(that, that.data.course.id, app.getOpenid(), that.data.course.price, app.getDate(), () => {
                that.onLoad({ id: that.data.course.id })
              })
            }
          }
        })
      })
    }
  }
})