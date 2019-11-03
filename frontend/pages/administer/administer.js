//index.js
//获取应用实例
const app = getApp()
var api = require('../../util/api.js')
const {
  bg1
} = require('../../util/data.js')

Page({
  data: {
   
    array: [{
        id: '0',
        src: '../../img/采购申请.png',
      text: '进货申请'
      },
      {
        id: '1',
        src: '../../img/订单管理.png',
        text: '订单管理'
      },
      {
        id: '2',
        src: '../../img/采购入库.png',
        text: '采购入库'
      }  
    ],
    array1: [{
      id: '0',
      src: '../../img/退货申请.png',
      text: '退货申请'
    },
    {
      id: '1',
      src: '../../img/收支明细.png',
      text: '收支明细'
    },
    {
      id: '2',
      src: '../../img/库存商品.png',
      text: '库存商品'
    }
    ],
    array2: [{
      id: '0',
      src: '../../img/数据统计.png',
      text: '数据统计'
    }
    ],
  },

  //事件处理函数
  onLoad: function() {
    
  },

  //onShow函数
  onShow: function() {
    
  },

  

  //通过id获取不同页面
  catchTapCategory: function(e) {
    var that = this;
    var id = e.currentTarget.dataset.id //获取当前文章id
    var goodsId = e.currentTarget.dataset.goodsid;
    console.log('goodsId:' + goodsId);
    if ("0" == e.currentTarget.dataset.goodsid) {
      wx.navigateTo({
        url: '../apply/apply'
      })
    }
    
  },
})