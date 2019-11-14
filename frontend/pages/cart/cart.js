var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var user = require('../../utils/user.js');

var app = getApp();

Page({
  data: {
    cartGoods: [],
    cartTotal: {
      "checkedGoodsCount": 0,
      "checkedGoodsAmount": 0.00
    },
    isEditCart: false,
    checkedAllStatus: true,
    editCartList: [],
    hasLogin: false
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function() {
    // 页面渲染完成
  },
  onPullDownRefresh() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.getCartList();
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },
  onShow: function() {
    // 页面显示
   
    this.getCartList();
    // this.setData({
    //   hasLogin: app.globalData.hasLogin
    // });

  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  },
  goLogin() {
    
  },
  getCartList: function() {
    let that = this;
    
    wx.request({
      url: app.globalData.backendUrl + "cart/find/openid",
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
        var cartGoods = res.data.data.items
        var checkedGoodsCount=0
        var checkedGoodsAmount=0
        for (var i = 0; i < cartGoods.length;i++){
          if (cartGoods[i].checked){
          checkedGoodsCount = checkedGoodsCount + cartGoods[i].number
          checkedGoodsAmount = checkedGoodsAmount + cartGoods[i].price * cartGoods[i].number
          }
        }
        that.setData({
          cartGoods: cartGoods,
          checkedAllStatus: that.isCheckedAll(),
          cartTotal: {
            "checkedGoodsCount": checkedGoodsCount,
            "checkedGoodsAmount": checkedGoodsAmount
          }
        })
      }
    })

  },
  isCheckedAll: function() {
    //判断购物车商品已全选
    return this.data.cartGoods.every(function(element, index, array) {
      if (element.checked == true) {
        return true;
      } else {
        return false;
      }
    });
  },
  doCheckedAll: function() {
    let checkedAll = this.isCheckedAll()
    this.setData({
      checkedAllStatus: this.isCheckedAll()
    });
  },
  checkedItem: function(event) {
    let itemIndex = event.target.dataset.itemIndex;
    let cartItem = this.data.cartGoods[itemIndex];
    let that = this;
    cartItem.checked = !cartItem.checked
    
    if (!this.data.isEditCart) {
      wx.request({
        url: app.globalData.backendUrl + "cart/update",
        data: cartItem,
        header: {
          'Authorization': 'Bearer ' + app.getToken(),
          'content-type': 'application/json'
        },
        method: 'PUT',
        success: (res) => {
          /*console.log(res)*/
          that.getCartList()
        }
      })

    } else {
      //编辑状态
      console.log(that.data.cartGoods)
      console.log(itemIndex)
      var tmpCartData = that.data.cartGoods
      for (var i = 0; i < tmpCartData.length;i++){
        console.log(tmpCartData[i].checked)
        if (i == itemIndex) {
          tmpCartData[i].checked = !tmpCartData[i].checked;
        } 
      }
      
      this.setData({
        cartGoods: tmpCartData,
        checkedAllStatus: that.isCheckedAll(),
        'cartTotal.checkedGoodsCount': that.getCheckedGoodsCount()
      });
    }
  },
  getCheckedGoodsCount: function() {
    let checkedGoodsCount = 0;
    this.data.cartGoods.forEach(function(v) {
      if (v.checked === true) {
        checkedGoodsCount += v.number;
      }
    });
    
    return checkedGoodsCount;
  },
  checkedAll: function() {
    let that = this;

    if (!this.data.isEditCart) {
      var productIds = this.data.cartGoods.map(function(v) {
        return v.productId;
      });
      util.request(api.CartChecked, {
        productIds: productIds,
        isChecked: that.isCheckedAll() ? 0 : 1
      }, 'POST').then(function(res) {
        if (res.errno === 0) {
          that.setData({
            cartGoods: res.data.cartList,
            cartTotal: res.data.cartTotal
          });
        }

        that.setData({
          checkedAllStatus: that.isCheckedAll()
        });
      });
    } else {
      //编辑状态
      let checkedAllStatus = that.isCheckedAll();
      let tmpCartData = this.data.cartGoods.map(function(v) {
        v.checked = !checkedAllStatus;
        return v;
      });
      that.setData({
        cartGoods: tmpCartData,
        checkedAllStatus: that.isCheckedAll(),
        'cartTotal.checkedGoodsCount': that.getCheckedGoodsCount()
      });
    }

  },
  editCart: function() {
    var that = this;
    if (this.data.isEditCart) {
      this.getCartList();
      this.setData({
        isEditCart: !this.data.isEditCart
      });
    } else {
      //编辑状态
      let tmpCartList = this.data.cartGoods.map(function(v) {
        v.checked = false;
        return v;
      });
      console.log(tmpCartList)
      that.setData({
        cartGoods: tmpCartList,
        isEditCart: !this.data.isEditCart,
        checkedAllStatus: that.isCheckedAll(),
        'cartTotal.checkedGoodsCount': that.getCheckedGoodsCount()
      });
    }

  },
  
  cutNumber: function(event) {

    let itemIndex = event.target.dataset.itemIndex;
    let cartItem = this.data.cartGoods[itemIndex];
    let number = (cartItem.number - 1 > 1) ? cartItem.number - 1 : 1;
    cartItem.number = number;
    this.setData({
      cartGoods: this.data.cartGoods
    });
    wx.request({
      url: app.globalData.backendUrl + "cart/update",
      data: cartItem,
      header: {
        'Authorization': 'Bearer ' + app.getToken(),
        'content-type': 'application/json'
      },
      method: 'PUT',
      success: (res) => {
        /*console.log(res)*/
        that.getCartList()
      }
    })
  },
  addNumber: function(event) {
    let itemIndex = event.target.dataset.itemIndex;
    let cartItem = this.data.cartGoods[itemIndex];
    let number = cartItem.number + 1;
    cartItem.number = number;
    this.setData({
      cartGoods: this.data.cartGoods
    });
    wx.request({
      url: app.globalData.backendUrl + "cart/update",
      data: cartItem,
      header: {
        'Authorization': 'Bearer ' + app.getToken(),
        'content-type': 'application/json'
      },
      method: 'PUT',
      success: (res) => {
        /*console.log(res)*/
        that.getCartList()
      }
    })


  },
  checkoutOrder: function() {
    //获取已选择的商品
    let that = this;

    var checkedGoods = this.data.cartGoods.filter(function(element, index, array) {
      if (element.checked == true) {
        return true;
      } else {
        return false;
      }
    });

    if (checkedGoods.length <= 0) {
      return false;
    }

    // storage中设置了cartId，则是购物车购买
    try {
      wx.setStorageSync('cartId', 0);
      wx.navigateTo({
        url: '/pages/checkout/checkout'
      })
    } catch (e) {}

  },
  deleteCart: function() {
    //获取已选择的商品
    let that = this;

    let productIds = this.data.cartGoods.filter(function(element, index, array) {
      if (element.checked == true) {
        return true;
      } else {
        return false;
      }
    });

    if (productIds.length <= 0) {
      return false;
    }

    productIds = productIds.map(function(element, index, array) {
      if (element.checked == true) {
        return element.id;
      }
    });

    for (var i = 0; i < productIds.length;i++){
      wx.request({
        url: app.globalData.backendUrl + "cart/delete",
        data: {
          id: productIds[i]
        },
        header: {
          'Authorization': 'Bearer ' + app.getToken(),
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'GET',
        success: (res) => {
          /*console.log(res)*/
          that.getCartList()

        }
      })

    }
    
  }
})