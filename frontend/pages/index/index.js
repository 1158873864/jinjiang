//index.js
//获取应用实例
const app = getApp()
var api = require('../../util/api.js')
const {
  bg1
} = require('../../util/data.js')

Page({
  data: {
    ad1: 'https://www.shaoshanlu.com/record/7da730ee84084544aea2e7a8942790dc.jpg',
    ad2: 'https://www.shaoshanlu.com/record/28a7612ff3b74c7aaaa812f7c1001721.jpg',
    ad3: 'https://www.shaoshanlu.com/record/9aa8782a09624f6199b272caf8ea9116.jpg',
    ad4: 'https://www.shaoshanlu.com/record/48578487e4ce4c8ab205ff0d59461dba.jpg',
    hots: [],
    recommends: [0,0,0,0],
    integrals: [0, 0, 0, 0],
    array: [{
        id: '0',
        src: 'https://take-out.oss-cn-hangzhou.aliyuncs.com/热销.png',
        text: '热销产品'
      },
      {
        id: '1',
        src: 'https://take-out.oss-cn-hangzhou.aliyuncs.com/积分.png',
        text: '积分商城'
      },
      {
        id: '2',
        src: 'https://take-out.oss-cn-hangzhou.aliyuncs.com/精品.png',
        text: '精品推荐'
      },
      {
        id: '3',
        src: 'https://take-out.oss-cn-hangzhou.aliyuncs.com/文化推广.png',
        text: '文化推广'
      }
      
    ],
    moreType: true,
    isShowPrice: true,
    height: 290,
    height_video: 400,
    ad: '',
    link:'',
    ads: [],
  },

  //事件处理函数
  onLoad: function(options) {
    if (options.id != "" && options.id!=null){
    var referrer=options.id
    wx.setStorageSync('referrer', referrer)
    if(app.getLogin()){
      wx.request({
        url: app.globalData.backendUrl + "recommend/add",
        data: {
          id: '',
          referrer: referrer,
          user:app.getId(),
          status: false
        },
        header: {
          'Authorization': 'Bearer ' + app.getToken(),
          'content-type': 'application/json'
        },
        method: 'POST',
        success: (res) => {
          
        }
      })
    }
    }
    wx.request({
      url: app.globalData.backendUrl + "ad/find/showPlace",
      data: {
        showPlace: '首页1'
      },
      header: {
        'Authorization': 'Bearer ' + app.getToken(),
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'GET',
      success: (res) => {
        /*console.log(res)*/
        this.setData({
          ad1: res.data.data.items.image
        })
      }
    })

    wx.request({
      url: app.globalData.backendUrl + "ad/find/showPlace",
      data: {
        showPlace: '首页2'
      },
      header: {
        'Authorization': 'Bearer ' + app.getToken(),
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'GET',
      success: (res) => {
        /*console.log(res)*/
        this.setData({
          ad2: res.data.data.items.image
        })
      }
    })

    wx.request({
      url: app.globalData.backendUrl + "ad/find/showPlace",
      data: {
        showPlace: '首页3'
      },
      header: {
        'Authorization': 'Bearer ' + app.getToken(),
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'GET',
      success: (res) => {
        /*console.log(res)*/
        this.setData({
          ad3: res.data.data.items.image
        })
      }
    })

    wx.request({
      url: app.globalData.backendUrl + "ad/find/showPlace",
      data: {
        showPlace: '首页4'
      },
      header: {
        'Authorization': 'Bearer ' + app.getToken(),
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'GET',
      success: (res) => {
        /*console.log(res)*/
        this.setData({
          ad4: res.data.data.items.image
        })
      }
    })

    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
      

        wx.request({
          url: app.globalData.backendUrl + "shop/find/index",
          data: {
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
            var id = res.data.data.items
            wx.request({
              url: app.globalData.backendUrl + "goods/find/ShopId",
              data: {
                ShopId:id,
                page: 0,
                size: 3
              },
              header: {
                'Authorization': 'Bearer ' + app.getToken(),
                'content-type': 'application/x-www-form-urlencoded'
              },
              method: 'GET',
              success: (res) => {
                /*console.log(res)*/
                this.setData({
                  hots: res.data.data.items.content
                })
              }
            })

            wx.request({
              url: app.globalData.backendUrl + "goods2/find/ShopId",
              data: {
                ShopId:id,
                page: 0,
                size: 4
              },
              header: {
                'Authorization': 'Bearer ' + app.getToken(),
                'content-type': 'application/x-www-form-urlencoded'
              },
              method: 'GET',
              success: (res) => {
                /*console.log(res)*/
                this.setData({
                  recommends: res.data.data.items.content
                })
              }
            })
          }
        })
      }

    })
    
    

    

    wx.request({
      url: app.globalData.backendUrl + "integragoods/find/all",
      data: {
        page: 0,
        size: 4
      },
      header: {
        'Authorization': 'Bearer ' + app.getToken(),
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'GET',
      success: (res) => {
        /*console.log(res)*/
        this.setData({
          integrals: res.data.data.items.content
        })
      }
    })
  },

  //onShow函数
  onShow: function() {
    this.setData({
      searchCondition: null
    })
  },

  //点击广告跳转
  onAd: function(e) {
    wx.navigateTo({
      //url: '../ad/ad?url=' + this.data.link
      url: '../ad/ad?url=' + this.data.links[e.currentTarget.dataset.index]
    })
  },
  moreAction: function() {
    var that = this;

    var type = this.data.moreType;
    if (type) {
      that.setData({
        height: '',
        moreType: false
      })
    } else {
      that.setData({
        height: 290,
        moreType: true
      })
    }

  },
  moresAction: function() {
    var that = this;

    var type = this.data.moreType;
    if (type) {
      that.setData({
        height_video: '',
        moreType: false
      })
    } else {
      that.setData({
        height_video: 400,
        moreType: true
      })
    }
  },

  onReachBottom: function() {
    // this.showCurricularBefore(this.data.articles[this.data.articles.length - 1].id);
  },

  onTouchThisCurricular: function(event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../particulars/curriculum/curriculum?courseGroupId=' + id
    })
  },

  showCurricular: function() {
    this.showCurricularBefore("");
  },

  showCurricularBefore: function(id) {
    var that = this
    wx.showLoading({
      title: '载入中',
    })
    wx.request({
      url: app.globalData.backendUrl + "courseGroup/getAll",
      data: {
        openid: wx.getStorageSync("openid"),
        id: id
      },
      header: {
        'Authorization': 'Bearer ' + app.getToken(),
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'GET',
      success: (res) => {
        wx.hideLoading()
        if (res.data.status == 500) {
          wx.showToast({
            title: '获取组合课程列表失败',
            icon: 'none'
          })
          return
        }
        var articles = res.data.courseGroupItems
        if (articles.length <= 0) {
          return
        }
        
        articles.forEach((article) => {
          article.image = app.globalData.picUrl+article.image
        })
        var newArticles = articles
        that.setData({
          articles: newArticles
        })
      }
    })
  },

  //展示最新课程
  showVideos: function() {
    var that = this;
    // that.judgeView()
    that.setData({
      currentKind: 'course',
      searchCondition: null,
      videos: [],
      lastId: "",
      lastIdType: "",
      isShowView: true,
      isShow: false,
      moreType: true,
      height_video: ''
    })

    api.getAbstractListVideo.call(this, 'course', app.getOpenid(), this.data.lastId, this.data.lastIdType)
  },

  toProjects: function() {
    wx.navigateTo({
      url: '/pages/project/project',
    })
  },

  //展示商品详情
  onTouchThisArticle: function(e) {
    var id = e.currentTarget.dataset.id //获取当前商品id
    var kind = e.currentTarget.dataset.kind
    var url = '../'
    switch (kind) {
      case 'goodsDetail':
        url += 'goodsDetail/goodsDetail?id=' + id
        break;
      case 'recommendDetail':
        url += 'recommendDetail/recommendDetail?id=' + id
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

  //更新搜索条件
  updateSearchCondition: function(e) {
    this.data.searchCondition = e.detail.value;
  },

  //搜索触发函数
  onSearch: function() {
    var searchText = this.data.searchCondition;
    if ("课程培训".includes(searchText)) {
      wx.navigateTo({
        url: '../particulars/curriculum/curriculum',
      })
    } else if ("考证考级".includes(searchText)) {
      wx.navigateTo({
        url: '../particulars/particulars/verificine/verificine',
      })
    } else if ("机构招聘".includes(searchText)) {
      wx.navigateTo({
        url: '../particulars/particulars/jobwanted/jobwanted',
      })
    } else if ("报告文档".includes(searchText)) {
      wx.navigateTo({
        url: '../particulars/particulars/documentation/documentation',
      })
    } else if ("事业合伙".includes(searchText)) {
      wx.navigateTo({
        url: '../particulars/particulars/partnership/partnership',
      })
    } else if ("标准合同".includes(searchText)) {
      wx.navigateTo({
        url: '../particulars/particulars/contract/contract',
      })
    } else if ("商务合作".includes(searchText)) {
      wx.navigateTo({
        url: '../particulars/particulars/cooperation/cooperation',
      })
    } else if ("城市社群".includes(searchText)) {
      wx.navigateTo({
        url: '../particulars/particulars/association/association',
      })
    } else if ("业务".includes(searchText)) {
      wx.switchTab({
        url: '../business/business',
      })
    } else if ("项目".includes(searchText)) {
      wx.switchTab({
        url: '../projects/project',
      })
    } else if ("人脉".includes(searchText)) {
      wx.switchTab({
        url: '../contact/contact',
      })
    } else {
      wx.switchTab({
        url: '../me/userInfo',
      })
    }
  },

  //通过id获取不同页面
  catchTapCategory: function(e) {
    var that = this;
    var id = e.currentTarget.dataset.id //获取当前文章id
    var goodsId = e.currentTarget.dataset.goodsid;
    console.log('goodsId:' + goodsId);
    if ("0" == e.currentTarget.dataset.goodsid) {
      wx.navigateTo({
        url: '../goods/goods'
      })
    }
    if ("2" == e.currentTarget.dataset.goodsid) {
      wx.navigateTo({
        url: '../recommend/recommend'
      })
    }
    if ("1" == e.currentTarget.dataset.goodsid) {
      wx.navigateTo({
        url: '../integral1/integral1'
      })
    }
    if ("3" == e.currentTarget.dataset.goodsid) {
      wx.navigateTo({
        url: '../culture/culture'
      })
    }
    if ("7" == e.currentTarget.dataset.goodsid) {
      wx.navigateTo({
        url: '../particulars/association/association?goodsId=' + goodsId
      })
    }
    if ("5" == e.currentTarget.dataset.goodsid) {
      wx.navigateTo({
        url: '../particulars/contract/contract?goodsId=' + goodsId
      })
    }
  },

  toGoods: function(){
    wx.navigateTo({
      url: '../goods/goods'
    })
  },
  toRecommend: function(){
    wx.navigateTo({
      url: '../recommend/recommend'
    })
  },
  toIntegral: function () {
    wx.navigateTo({
      url: '../integral1/integral1'
    })
  }
})