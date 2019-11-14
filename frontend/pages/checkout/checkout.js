var util = require('../../utils/util.js');
var api = require('../../config/api.js');

var app = getApp();

Page({
  data: {
    checkedGoodsList: [],
    checkedAddress: {},
    order:{},
    type: '送货上门',
    typeIndex: 0,
    user:{},
    types: ['送货上门', '物流快递','上门取货'],
    pay:'余额',
    pays: ['余额','微信支付'],
    payIndex: 0,
    availableCouponLength: 0, // 可用的优惠券数量
    goodsTotalPrice: 0.00, //商品总价
    freightPrice: 0.00, //快递费
    couponPrice: 0.00, //优惠券的价格
    grouponPrice: 0.00, //团购优惠价格
    orderTotalPrice: 0.00, //订单总价
    actualPrice: 0.00, //实际需要支付的总价
    cartId: 0,
    addressId: '',
    couponId: 0,
    userCouponId: 0,
    message: '',
    grouponLinkId: 0, //参与的团购，如果是发起则为0
    grouponRulesId: 0 //团购规则ID
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
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
      url: app.globalData.backendUrl + "order/find/id/wx",
      data: {
        id: options.id
      },
      header: {
        'Authorization': 'Bearer ' + app.getToken(),
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'GET',
      success: (res) => {
        /*console.log(res)*/
        var checkedGoodsList=res.data.data.items.goodsList
        var actualPrice = res.data.data.items.price + res.data.data.items.freight
        var orderTotalPrice = res.data.data.items.price
        var order = res.data.data.items
        this.setData({
          checkedGoodsList: checkedGoodsList,
          actualPrice: actualPrice,
          order: order
        })

      }
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
  bindPickerChange1: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var s = this.data.pays
    this.setData({
      payIndex: e.detail.value,
      pay: s[e.detail.value]
    })
  },
  selectAddress() {
    wx.navigateTo({
      url: '/pages/address/address',
    })
  },
  selectCoupon() {
    wx.navigateTo({
      url: '/pages/couponSelect/couponSelect',
    })
  },
  bindMessageInput: function (e) {
    this.setData({
      message: e.detail.value
    });
  },
  onReady: function () {
    // 页面渲染完成

  },
  onShow: function () {
    // 页面显示
    var addressId = wx.getStorageSync('addressId')
    if (addressId == '' || addressId == undefined) {
      wx.request({
        url: app.globalData.backendUrl + "address/find/userId",
        data: {
          userId: app.getId()
        },
        header: {
          'Authorization': 'Bearer ' + app.getToken(),
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'GET',
        success: (res) => {
          /*console.log(res)*/
          console.log(res.data.data.items)
          var addresses = res.data.data.items
          if (addresses.length > 0) {
            for (var i = 0; i < addresses.length; i++) {
              if (addresses[i].default) {
                console.log(addresses[i].id)
                var checkedAddress = addresses[i]
                var addressId = addresses[i].id
                this.setData({
                  checkedAddress: checkedAddress,
                  addressId: addressId
                })
              }
              if (addressId == '') {
                var checkedAddress = addresses[0]
                var addressId = addresses[0].id

                this.setData({
                  checkedAddress: checkedAddress,
                  addressId: addressId
                })
              }
            }

          }
        }
      })
    }
    else {
      wx.request({
        url: app.globalData.backendUrl + "address/find/id",
        data: {
          id: addressId
        },
        header: {
          'Authorization': 'Bearer ' + app.getToken(),
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'GET',
        success: (res) => {
          /*console.log(res)*/
          var checkedAddress = res.data.data.items

          this.setData({
            checkedAddress: checkedAddress,
            addressId: addressId
          })
        }
      })

    }
  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  },
  submitOrder: function () {
    if (this.data.addressId =='0') {
      util.showErrorToast('请选择收货地址');
      return false;
    }
    var order=this.data.order
    order.price=this.data.actualPrice
    order.person = this.data.checkedAddress.person
    order.mobilePone = this.data.checkedAddress.mobilePone
    order.address = this.data.checkedAddress.province + this.data.checkedAddress.city + this.data.checkedAddress.distinct + this.data.checkedAddress.detail
    order.type=this.data.type
    
    if(order.status=='待付款'){
      if(this.data.user.balance>=order.price){
        order.status='待发货'
        wx.request({
          url: app.globalData.backendUrl + "order/pay",
          data: order,
          header: {
            'Authorization': 'Bearer ' + app.getToken(),
            'content-type': 'application/json'
          },
          method: 'POST',
          success: (res) => {
            /*console.log(res)*/
            wx.showToast({
              title: '余额支付成功'
            })
            wx.navigateTo({
              url: '../order/order?showType=0',
            })
          }
        })
      }
      else{
        util.showErrorToast('余额不足')
      }
    }
    else{
      wx.request({
        url: app.globalData.backendUrl + "order/update",
        data: order,
        header: {
          'Authorization': 'Bearer ' + app.getToken(),
          'content-type': 'application/json'
        },
        method: 'POST',
        success: (res) => {
          /*console.log(res)*/
          wx.showToast({
            title: '兑换成功'
          })
          wx.navigateTo({
            url: '../order/order?showType=0',
          })
        }
      })
    }
    
  }
});