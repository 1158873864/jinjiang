// pages/me/me.js
const app = getApp();
var api = require('../../util/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

    array: [{
      id: '0',
      src: '../../img/我的订单.png',
      text: '我的订单',
      show: true
    },
    {
      id: '1',
      src: '../../img/待付款.png',
      text: '待付款',
      show: true
    },
    {
      id: '2',
      src: '../../img/待发货.png',
      text: '待发货',
      show: true
    },
    {
      id: '3',
      src: '../../img/待收货.png',
      text: '待收货',
      show: true
    },  
    {
      id: '4',
      src: '../../img/收货地址.png',
      text: '收货地址',
      show: true
    }
    ],
    
    array1: [{
      id: '10',
      src: '../../img/会员.png',
      text: '会员推广',
      show: true
    },
    {
      id: '11',
      src: '../../img/客服经理.png',
      text: '客服经理',
      show: false
    },
    {
      id: '12',
      src: '../../img/会员等级.png',
      text: '会员等级',
      show: false
    },
    {
      id: '13',
      src: '../../img/旗下会员.png',
      text: '旗下会员',
      show: true
    },
    {
      id: '14',
      src: '../../img/生日.png',
      text: '会员生日',
      show: true
    }
    ],

    array2: [{
      id: '20',
      src: '../../img/我的账户.png',
      text: '我的账户',
      show: true
    },
    {
      id: '21',
      src: '../../img/优惠券.png',
      text: '优惠券',
      show: true
    }
    ],

    array3: [{
      id: '30',
      src: '../../img/消费记录.png',
      text: '消费记录',
      show: true
    },
    {
      id: '32',
      src: '../../img/销售提成.png',
      text: '销售提成',
      show: true
    },
    {
      id: '33',
      src: '../../img/账单.png',
      text: '会员消费',
      show: true
    },
    {
      id: '34',
      src: '../../img/账单.png',
      text: '股东销售',
      show: true
    },
    {
        id: '35',
      src: '../../img/报销.png',
        text: '报销明细',
      show: true
    },
    {
        id: '36',
        src: '../../img/报销.png',
        text: '报销',
      show: false
      }
    ],

    array4: [{
      id: '40',
      src: '../../img/个人信息.png',
      text: '编辑资料',
      show: true
    },
    {
      id: '41',
      src: '../../img/投诉.png',
      text: '投诉建议',
      show: true
    },
    {
      id: '42',
      src: '../../img/管理.png',
      text: '管理酒庄',
      show: true
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
        url: '../order/order'
      })
    }
    if ("2" == e.currentTarget.dataset.goodsid) {
      wx.navigateTo({
        url: '../order/order'
      })
    }
    if ("3" == e.currentTarget.dataset.goodsid) {
      wx.navigateTo({
        url: '../order/order'
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

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    
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

  // 显示遮罩层
  showModal: function () {
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },

  // 隐藏遮罩层
  hideModal: function () {
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  }

})