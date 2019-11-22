// pages/me/me.js
const app = getApp();
var api = require('../../util/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:undefined,
    hasLogin: false,
    identity:"会员",
    array: [{
      id: '0',
      src: 'https://take-out.oss-cn-hangzhou.aliyuncs.com/我的订单.png',
      text: '我的订单',
      show: true
    },
    {
      id: '1',
      src: 'https://take-out.oss-cn-hangzhou.aliyuncs.com/待付款.png',
      text: '待付款',
      show: true
    },
    {
      id: '2',
      src: 'https://take-out.oss-cn-hangzhou.aliyuncs.com/待发货.png',
      text: '待发货',
      show: true
    },
    {
      id: '3',
      src: 'https://take-out.oss-cn-hangzhou.aliyuncs.com/待收货.png',
      text: '待收货',
      show: true
    },  
    {
      id: '4',
      src: 'https://take-out.oss-cn-hangzhou.aliyuncs.com/收货地址.png',
      text: '收货地址',
      show: true
    }
    ],
    
    array1: [{
      id: '10',
      src: 'https://take-out.oss-cn-hangzhou.aliyuncs.com/会员.png',
      text: '会员推广',
      show: false
    },
    {
      id: '11',
      src: 'https://take-out.oss-cn-hangzhou.aliyuncs.com/客服经理.png',
      text: '客服经理',
      show: false
    },
    {
      id: '12',
      src: 'https://take-out.oss-cn-hangzhou.aliyuncs.com/会员等级.png',
      text: '会员等级',
      show: false
    },
    {
      id: '13',
      src: 'https://take-out.oss-cn-hangzhou.aliyuncs.com/旗下会员.png',
      text: '旗下会员',
      show: false
    },
    {
      id: '14',
      src: 'https://take-out.oss-cn-hangzhou.aliyuncs.com/生日.png',
      text: '会员生日',
      show: false
    }
    ],

    array2: [{
      id: '20',
      src: 'https://take-out.oss-cn-hangzhou.aliyuncs.com/我的账户.png',
      text: '我的账户',
      show: false
    },
    {
      id: '21',
      src: 'https://take-out.oss-cn-hangzhou.aliyuncs.com/优惠券.png',
      text: '优惠券',
      show: false
    }
    ],

    array3: [{
      id: '30',
      src: 'https://take-out.oss-cn-hangzhou.aliyuncs.com/消费记录.png',
      text: '消费记录',
      show: false
    },
    {
      id: '32',
      src: 'https://take-out.oss-cn-hangzhou.aliyuncs.com/销售提成.png',
      text: '销售提成',
      show: false
    },
    {
      id: '33',
      src: 'https://take-out.oss-cn-hangzhou.aliyuncs.com/账单.png',
      text: '会员消费',
      show: false
    },
    {
      id: '34',
      src: 'https://take-out.oss-cn-hangzhou.aliyuncs.com/账单.png',
      text: '股东销售',
      show: false
    },
    {
        id: '35',
      src: 'https://take-out.oss-cn-hangzhou.aliyuncs.com/报销.png',
        text: '报销明细',
      show: false
    },
    {
        id: '36',
        src: 'https://take-out.oss-cn-hangzhou.aliyuncs.com/报销.png',
        text: '报销',
      show: false
      }
    ],

    array4: [{
      id: '40',
      src: 'https://take-out.oss-cn-hangzhou.aliyuncs.com/个人信息.png',
      text: '编辑资料',
      show: false
    },
    {
      id: '41',
      src: 'https://take-out.oss-cn-hangzhou.aliyuncs.com/投诉.png',
      text: '投诉建议',
      show: false
    },
    {
      id: '42',
      src: 'https://take-out.oss-cn-hangzhou.aliyuncs.com/管理.png',
      text: '管理酒庄',
      show: false
    },
      {
        id: '43',
        src: 'https://take-out.oss-cn-hangzhou.aliyuncs.com/订单管理.png',
        text: '订单管理',
        show: false
      },
      {
        id: '44',
        src: 'https://take-out.oss-cn-hangzhou.aliyuncs.com/线下.png',
        text: '线下订单',
        show: false
      },
      {
        id: '45',
        src: 'https://take-out.oss-cn-hangzhou.aliyuncs.com/线下.png',
        text: '线下订单',
        show: false
      }
    ]
  },

  //通过id获取不同页面
  catchTapCategory: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id //获取当前文章id
    var goodsId = e.currentTarget.dataset.goodsid;
    
    if ("0" == e.currentTarget.dataset.goodsid) {
      wx.navigateTo({
        url: '../order/order'
      })
    }
    if ("1" == e.currentTarget.dataset.goodsid) {
      wx.navigateTo({
        url: '../order/order?showType=1'
      })
    }
    if ("2" == e.currentTarget.dataset.goodsid) {
      wx.navigateTo({
        url: '../order/order?showType=2'
      })
    }
    if ("3" == e.currentTarget.dataset.goodsid) {
      wx.navigateTo({
        url: '../order/order?showType=3'
      })
    }
    if ("4" == e.currentTarget.dataset.goodsid) {
      wx.navigateTo({
        url: '../address/address'
      })
    }

    if ("10" == e.currentTarget.dataset.goodsid) {
      wx.navigateTo({
        url: '../spread/spread'
      })
    }
    if ("11" == e.currentTarget.dataset.goodsid) {
      wx.navigateTo({
        url: '../manager/manager'
      })
    }
    if ("12" == e.currentTarget.dataset.goodsid) {
      wx.navigateTo({
        url: '../level/level'
      })
    }
    if ("13" == e.currentTarget.dataset.goodsid) {
      wx.navigateTo({
        url: '../member/member'
      })
    }
    if ("14" == e.currentTarget.dataset.goodsid) {
      wx.navigateTo({
        url: '../birthday/birthday'
      })
    }

    if ("20" == e.currentTarget.dataset.goodsid) {
      wx.navigateTo({
        url: '../account/account'
      })
    }
    if ("21" == e.currentTarget.dataset.goodsid) {
      wx.navigateTo({
        url: '../coupon/coupon'
      })
    }


    if ("30" == e.currentTarget.dataset.goodsid) {
      wx.navigateTo({
        url: '../consume/consume'
      })
    }
    if ("32" == e.currentTarget.dataset.goodsid) {
      wx.navigateTo({
        url: '../deduct/deduct'
      })
    }
    if ("33" == e.currentTarget.dataset.goodsid) {
      wx.navigateTo({
        url: '../memberConsume/memberConsume'
      })
    }
    if ("34" == e.currentTarget.dataset.goodsid) {
      wx.navigateTo({
        url: '../shareholder/shareholder'
      })
    }
    if ("35" == e.currentTarget.dataset.goodsid) {
      wx.navigateTo({
        url: '../expense/expense'
      })
    }
    if ("36" == e.currentTarget.dataset.goodsid) {
      wx.navigateTo({
        url: '../submitExpense/submitExpense'
      })
    }

    if ("40" == e.currentTarget.dataset.goodsid) {
      wx.navigateTo({
        url: '../modifyMyCard/modifyMyCard'
      })
    }
    if ("41" == e.currentTarget.dataset.goodsid) {
      wx.navigateTo({
        url: '../projects/project'
      })
    }
    if ("42" == e.currentTarget.dataset.goodsid) {
      wx.navigateTo({
        url: '../administer/administer'
      })
    }
    if ("43" == e.currentTarget.dataset.goodsid) {
      wx.navigateTo({
        url: '../orderManage/orderManage'
      })
    }
    if ("44" == e.currentTarget.dataset.goodsid) {
      wx.navigateTo({
        url: '../offLine/offLine'
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    this.setData({
      hasLogin: app.getLogin()
    });
    
    wx.request({
      url: app.globalData.backendUrl + "user/find/openid",
      data: {
        openid:app.getOpenid()
      },
      header: {
        'Authorization': 'Bearer ' + app.getToken(),
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'GET',
      success: (res) => {
        /*console.log(res)*/
        var identity = res.data.data.items.identity
        
        
        if(identity=='member'){
          var array1 = this.data.array1
          var array2 = this.data.array2
          var array3 = this.data.array3
          var array4 = this.data.array4
          array1[0].show= true
          array1[1].show = true
          array1[2].show = true
          array2[0].show = true
          array2[1].show = true
          array3[0].show = true
          array4[0].show = true
          array4[1].show = true


          // array1[3].show = true
          // array1[4].show = true
          // array3[1].show = true
          // array3[2].show = true
          // array3[3].show = true
          // array3[4].show = true
          // array3[5].show = true
          // array4[2].show = true
          // array4[3].show = true
          this.setData({
            array1: array1,
            array2: array2,
            array3: array3,
            array4: array4
          }) 
        }
        else if (identity == 'staff') {
          var array1 = this.data.array1
          var array2 = this.data.array2
          var array3 = this.data.array3
          var array4 = this.data.array4
          array1[0].show = true
          array1[3].show = true
          array1[4].show = true
          array2[0].show = true
          array3[0].show = true
          array3[1].show = true
          array3[5].show = true
          array4[0].show = true
          array4[1].show = true
          array4[3].show = true
          array4[4].show = true
          this.setData({
            array1: array1,
            array2: array2,
            array3: array3,
            array4: array4
          })
        }
        else if (identity == 'shareholder') {
          var array1 = this.data.array1
          var array2 = this.data.array2
          var array3 = this.data.array3
          var array4 = this.data.array4
          array1[0].show = true
          array1[3].show = true
          array1[4].show = true
          array2[0].show = true
          array3[0].show = true
          array3[1].show = true
          array3[2].show = true
          array4[0].show = true
          array4[1].show = true
          array4[3].show = true
          this.setData({
            array1: array1,
            array2: array2,
            array3: array3,
            array4: array4
          })
        }
        else if (identity == 'manager') {
          var array1 = this.data.array1
          var array2 = this.data.array2
          var array3 = this.data.array3
          var array4 = this.data.array4
          array1[0].show = true
          array1[3].show = true
          array1[4].show = true
          array2[0].show = true
          array2[1].show = true
          array3[0].show = true
          array3[1].show = true
          array3[2].show = true
          array3[3].show = true
          array3[4].show = true
          array4[0].show = true
          array4[1].show = true
          array4[2].show = true
          array4[3].show = true
          array4[5].show = true
          this.setData({
            array1: array1,
            array2: array2,
            array3: array3,
            array4: array4
          })
        }
        else{
          var array1 = this.data.array1
          var array2 = this.data.array2
          var array3 = this.data.array3
          var array4 = this.data.array4
          array1[3].show = false
          array1[4].show = false
          array3[1].show = false
          array3[2].show = false
          array3[3].show = false
          array3[4].show = false
          array3[5].show = false
          array4[2].show = false
          array4[3].show = false
          this.setData({
            array1: array1,
            array2: array2,
            array3: array3,
            array4: array4
          }) 
        }
        if (identity == 'member') {
          identity = '会员'
        }
        else if (identity == 'shareholder') {
          identity = '股东'
        }
        else if (identity == 'staff') {
          identity = '员工'
        }
        else if (identity == 'manager') {
          identity = '庄主'
        }
        this.setData({
          user: res.data.data.items,
          identity: identity
        })
      }
    })
  },

  //发布信息
  onPublish: function () {
    
  },

  // 分享小程序
  onShareAppMessage: function () {
    this.hideModal()
    var that = this;
    var userId = app.getOpenid();
    return {
      title: '钧融圈,金融人的新社区',
      path: '/pages/me/myHistory/myHistory?id=' + userId,
      imageUrl: "img/post_template.jpg",
      success: function (res) {
        console.log("转发成功" + res);
      }
    }
  },

  // 绘制海报
  drawPost: function () {
    this.hideModal()
    wx.navigateTo({
      url: 'createPost/createPost',
    })
  },
  goLogin() {
    wx.redirectTo({
      url: '/pages/login/login',
    })
  },

})