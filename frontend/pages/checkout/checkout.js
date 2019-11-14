var util = require('../../utils/util.js');
var api = require('../../config/api.js');

var app = getApp();

Page({
  data: {
    checkedGoodsList: [],
    checkedAddress: {},
    order:{},
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
        var actualPrice = res.data.data.items.price
        var orderTotalPrice = res.data.data.items.price
        var order = res.data.data.items
        this.setData({
          checkedGoodsList: checkedGoodsList,
          actualPrice: actualPrice,
          order: order
        })

      }
    })

    var addressId = options.addressId
    if (addressId==''){
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
        var addresses = res.data.data.items
        if (addresses.length>0){
          for (var i = 0; i < addresses.length;i++){
            if (addresses[i].isDefault){
              var checkedAddress = addresses[i]
              var addressId=addresses[i].id

              this.setData({
                checkedAddress: checkedAddress,
                addressId: addressId
              })
            }
            if (addressId==''){
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
    else{
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
          var checkedAddress= res.data.data.items

          this.setData({
            checkedAddress: checkedAddress,
            addressId: addressId
          })
        }
      })

    }

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


    util.request(api.OrderSubmit, {
      cartId: this.data.cartId,
      addressId: this.data.addressId,
      couponId: this.data.couponId,
      userCouponId: this.data.userCouponId,
      message: this.data.message,
      grouponRulesId: this.data.grouponRulesId,
      grouponLinkId: this.data.grouponLinkId
    }, 'POST').then(res => {
      if (res.errno === 0) {

        // 下单成功，重置couponId
        try {
          wx.setStorageSync('couponId', 0);
        } catch (error) {

        }

        const orderId = res.data.orderId;
        util.request(api.OrderPrepay, {
          orderId: orderId
        }, 'POST').then(function (res) {
          if (res.errno === 0) {
            const payParam = res.data;
            console.log("支付过程开始");
            wx.requestPayment({
              'timeStamp': payParam.timeStamp,
              'nonceStr': payParam.nonceStr,
              'package': payParam.packageValue,
              'signType': payParam.signType,
              'paySign': payParam.paySign,
              'success': function (res) {
                console.log("支付过程成功");
                wx.redirectTo({
                  url: '/pages/payResult/payResult?status=1&orderId=' + orderId
                });
              },
              'fail': function (res) {
                console.log("支付过程失败");
                wx.redirectTo({
                  url: '/pages/payResult/payResult?status=0&orderId=' + orderId
                });
              },
              'complete': function (res) {
                console.log("支付过程结束")
              }
            });
          } else {
            wx.redirectTo({
              url: '/pages/payResult/payResult?status=0&orderId=' + orderId
            });
          }
        });

      } else {
        wx.redirectTo({
          url: '/pages/payResult/payResult?status=0&orderId=' + orderId
        });
      }
    });
  }
});