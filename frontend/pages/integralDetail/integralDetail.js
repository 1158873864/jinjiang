var app = getApp();
var WxParse = require('../../lib/wxParse/wxParse.js');
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var user = require('../../utils/user.js');

Page({
  data: {
    canShare: false,
    id: 0,
    goods: {},
    groupon: [], //该商品支持的团购规格
    grouponLink: {}, //参与的团购
    attribute: [],
    issueList: [],
    comment: [],
    brand: {},
    specificationList: [],
    productList: [],
    relatedGoods: [],
    cartGoodsCount: 0,
    userHasCollect: 0,
    number: 1,
    checkedSpecText: '规格数量选择',
    tmpSpecText: '请选择规格数量',
    checkedSpecPrice: 0,
    openAttr: false,
    openShare: false,
    noCollectImage: '/static/images/icon_collect.png',
    hasCollectImage: '/static/images/icon_collect_checked.png',
    collectImage: '/static/images/icon_collect.png',
    shareImage: '',
    isGroupon: false, //标识是否是一个参团购买
    soldout: false,
    canWrite: false, //用户是否获取了保存相册的权限
    user: undefined,
    hasLogin: false
  },

  // 页面分享
  onShareAppMessage: function () {
    let that = this;
    return {
      title: that.data.goods.name,
      desc: '唯爱与美食不可辜负',
      path: '/pages/index/index?goodId=' + this.data.id
    }
  },

  shareFriendOrCircle: function () {
    //var that = this;
    if (this.data.openShare === false) {
      this.setData({
        openShare: !this.data.openShare
      });
    } else {
      return false;
    }
  },
  handleSetting: function (e) {
    var that = this;
    // console.log(e)
    if (!e.detail.authSetting['scope.writePhotosAlbum']) {
      wx.showModal({
        title: '警告',
        content: '不授权无法保存',
        showCancel: false
      })
      that.setData({
        canWrite: false
      })
    } else {
      wx.showToast({
        title: '保存成功'
      })
      that.setData({
        canWrite: true
      })
    }
  },
  // 保存分享图
  saveShare: function () {
    let that = this;
    wx.downloadFile({
      url: that.data.shareImage,
      success: function (res) {
        console.log(res)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (res) {
            wx.showModal({
              title: '存图成功',
              content: '图片成功保存到相册了，可以分享到朋友圈了',
              showCancel: false,
              confirmText: '好的',
              confirmColor: '#a78845',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定');
                }
              }
            })
          },
          fail: function (res) {
            console.log('fail')
          }
        })
      },
      fail: function () {
        console.log('fail')
      }
    })
  },

  // 规格选择
  clickSkuValue: function (event) {
    let that = this;
    let specName = event.currentTarget.dataset.name;
    let specValueId = event.currentTarget.dataset.valueId;

    //判断是否可以点击

    //TODO 性能优化，可在wx:for中添加index，可以直接获取点击的属性名和属性值，不用循环
    let _specificationList = this.data.specificationList;
    for (let i = 0; i < _specificationList.length; i++) {
      if (_specificationList[i].name === specName) {
        for (let j = 0; j < _specificationList[i].valueList.length; j++) {
          if (_specificationList[i].valueList[j].id == specValueId) {
            //如果已经选中，则反选
            if (_specificationList[i].valueList[j].checked) {
              _specificationList[i].valueList[j].checked = false;
            } else {
              _specificationList[i].valueList[j].checked = true;
            }
          } else {
            _specificationList[i].valueList[j].checked = false;
          }
        }
      }
    }
    this.setData({
      specificationList: _specificationList,
    });
    //重新计算spec改变后的信息
    this.changeSpecInfo();

    //重新计算哪些值不可以点击
  },


  //获取选中的规格信息
  getCheckedSpecValue: function () {
    let checkedValues = [];
    let _specificationList = this.data.specificationList;
    for (let i = 0; i < _specificationList.length; i++) {
      let _checkedObj = {
        name: _specificationList[i].name,
        valueId: 0,
        valueText: ''
      };
      for (let j = 0; j < _specificationList[i].valueList.length; j++) {
        if (_specificationList[i].valueList[j].checked) {
          _checkedObj.valueId = _specificationList[i].valueList[j].id;
          _checkedObj.valueText = _specificationList[i].valueList[j].value;
        }
      }
      checkedValues.push(_checkedObj);
    }

    return checkedValues;
  },

  //判断规格是否选择完整
  isCheckedAllSpec: function () {
    return !this.getCheckedSpecValue().some(function (v) {
      if (v.valueId == 0) {
        return true;
      }
    });
  },

  getCheckedSpecKey: function () {
    let checkedValue = this.getCheckedSpecValue().map(function (v) {
      return v.valueText;
    });
    return checkedValue;
  },

  // 规格改变时，重新计算价格及显示信息
  changeSpecInfo: function () {
    let checkedNameValue = this.getCheckedSpecValue();

    //设置选择的信息
    let checkedValue = checkedNameValue.filter(function (v) {
      if (v.valueId != 0) {
        return true;
      } else {
        return false;
      }
    }).map(function (v) {
      return v.valueText;
    });
    if (checkedValue.length > 0) {
      this.setData({
        tmpSpecText: checkedValue.join('　')
      });
    } else {
      this.setData({
        tmpSpecText: '请选择规格数量'
      });
    }

    if (this.isCheckedAllSpec()) {
      this.setData({
        checkedSpecText: this.data.tmpSpecText
      });

      // 规格所对应的货品选择以后
      let checkedProductArray = this.getCheckedProductItem(this.getCheckedSpecKey());
      if (!checkedProductArray || checkedProductArray.length <= 0) {
        this.setData({
          soldout: true
        });
        console.error('规格所对应货品不存在');
        return;
      }

      let checkedProduct = checkedProductArray[0];
      if (checkedProduct.number > 0) {
        this.setData({
          checkedSpecPrice: checkedProduct.price,
          soldout: false
        });
      } else {
        this.setData({
          checkedSpecPrice: this.data.goods.retailPrice,
          soldout: true
        });
      }

    } else {
      this.setData({
        checkedSpecText: '规格数量选择',
        checkedSpecPrice: this.data.goods.retailPrice,
        soldout: false
      });
    }

  },

  // 获取选中的产品（根据规格）
  getCheckedProductItem: function (key) {
    return this.data.productList.filter(function (v) {
      if (v.specifications.toString() == key.toString()) {
        return true;
      } else {
        return false;
      }
    });
  },

  onLoad: function (options) {
    wx.request({
      url: app.globalData.backendUrl + "cart/find/openid",
      method: "GET",
      data: {
        openid: app.getOpenid()
      },
      header: {
        'Authorization': 'Bearer ' + app.getToken(),
        'content-type': 'application/json'
      },
      success: (response) => {
        /*console.log(res)*/
        this.setData({
          cartGoodsCount: response.data.data.items.length
        })
        
      }
    })

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
      success: (response) => {
        this.setData({
          user: response.data.data.items
        })
        // 页面初始化 options为页面跳转所带来的参数
        wx.request({
          url: app.globalData.backendUrl + "integragoods/find/id",
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
            this.setData({
              goods: res.data.data.items
            })
            WxParse.wxParse('goodsDetail', 'html', res.data.data.items.detail, this);
            //console.log(this.data.goods.detail)
          }
        })
      }
    })

    
    
  },
  onShow: function () {
    // 页面显示
    this.setData({
      hasLogin: app.getLogin()
    });
  },

  //立即购买（先自动加入购物车）
  addFast: function () {
    if(this.data.hasLogin){
    var that = this;
   

      //根据选中的规格，判断是否有对应的sku信息
      
      if (this.data.goods.number<=0) {
        //找不到对应的product信息，提示没有库存
        wx.showToast({
          image: '/static/images/icon_error.png',
          title: '没有库存'
        });
        return false;
      }


      //立即购买
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
          var user = res.data.data.items
          var integral = res.data.data.items.integral
          wx.showModal({
            title: '',
            content: '您当前有'+res.data.data.items.integral+'积分，是否确认兑换',
            success: function (res) {
              if (res.confirm) {
                if (integral>=that.data.goods.integral){
                var goodsList = []
                  goodsList.push(that.data.goods.id)

                  var goods = that.data.goods
                goods.number = goods.number - 1
                wx.request({
                  url: app.globalData.backendUrl + "integragoods/update",
                  method: "PUT",
                  data: goods,
                  header: {
                    'Authorization': 'Bearer ' + app.getToken(),
                    'content-type': 'application/json'
                  },
                  success: (res) => {
                    /*console.log(res)*/
                  }
                })

                  user.integral = user.integral - that.data.goods.integral
                  wx.request({
                    url: app.globalData.backendUrl + "user/update",
                    method: "PUT",
                    data: user,
                    header: {
                      'Authorization': 'Bearer ' + app.getToken(),
                      'content-type': 'application/json'
                    },
                    success: (res) => {
                      /*console.log(res)*/
                    }
                  })

                wx.request({
                  url: app.globalData.backendUrl + "order/add",
                  method: "POST",
                  data: {
                    id: '',
                    userId: app.getId(),
                    address: '',
                    mobilePone: '',
                    person: '',
                    freight: 0,
                    price: 0,
                    discountPrice: 0,
                    goodsList: goodsList,
                    buyTime: '',
                    status: '积分待发货',
                    type: '送货上门',
                    remark: ''
                  },
                  header: {
                    'Authorization': 'Bearer ' + app.getToken(),
                    'content-type': 'application/json'
                  },
                  success: (res) => {
                    /*console.log(res)*/
                    wx.navigateTo({
                      url: '../checkout/checkout?id=' + res.data.data.items.id
                    })
                  }
                })
                }
                else{
                  wx.showModal({
                    title: '失败',
                    content: '积分不足',
                  })
                }
              }
            }
          })

          /*console.log(res)*/
          

        }
      })
    }
    else {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },

})