//index.js
//获取应用实例
const app = getApp()
var api = require('../../util/api.js')
const {
  bg1
} = require('../../util/data.js')

Page({
  data: {
    ad1: 'http://47.106.171.65/record/7da730ee84084544aea2e7a8942790dc.jpg',
    ad2: '../../img/banner2.jpg',
    ad3: '../../img/banner3.jpg',
    ad4: '../../img/banner4.jpg',
    recommends: [0,0,0,0],
    integrals: [0, 0, 0, 0],
    array: [{
        id: '0',
        src: '../../img/热销.png',
        text: '热销产品'
      },
      {
        id: '1',
        src: '../../img/积分.png',
        text: '积分商城'
      },
      {
        id: '2',
        src: '../../img/精品.png',
        text: '精品推荐'
      },
      {
        id: '3',
        src: '../../img/文化推广.png',
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
    
    links: [],
    image: 'http://junrongcenter.oss-cn-beijing.aliyuncs.com/default/default-pic.png',
    cards: [{
        thumbnail: 'http://junrongcenter.oss-cn-beijing.aliyuncs.com/default/default-pic.png',
        articleName: '什么是金融？',
        summary: '一般指与货币流通及银行有关的东西'
      },
      {
        thumbnail: 'http://junrongcenter.oss-cn-beijing.aliyuncs.com/default/default-pic.png',
        articleName: '什么是金融？',
        summary: '一般指与货币流通及银行有关的东西'

      },
      {
        thumbnail: 'http://junrongcenter.oss-cn-beijing.aliyuncs.com/default/default-pic.png',
        articleName: '什么是金融？',
        summary: '一般指与货币流通及银行有关的东西'
      }
    ],

    articles: [],
    videos: [],
    kind: null,
    currentKind: null,
    searchCondition: null,
    lastId: "",
    lastIdType: "",
    flag: false,
    bg1: bg1,
  },

  //事件处理函数
  onLoad: function() {
    
    this.setData({
      kind: 'document',
      currentKind: 'course',
      searchCondition: null,
      lastId: "",
      lastIdType: "",
      videoId: "",
      videoIdType: "",
      articles: [],
      videos: []
    })
    this.showVideos();
    this.showCurricular();


    api.getAd.call(this, 'index', (res) => {
      this.setData({
        ad: res.ad.image,
        link:res.ad.link
      })
      // 使用ads和links代替原有的ad和link
      var ads_temp = this.data.ads;
      var links_temp = this.data.links;
      ads_temp.push(res.ad.image);
      ads_temp.push("https://take-out.oss-cn-hangzhou.aliyuncs.com/%E8%81%94%E7%B3%BB%E6%88%91%E4%BB%AC.jpg");
      ads_temp.push("https://take-out.oss-cn-hangzhou.aliyuncs.com/%E5%9F%BA%E9%87%91%E6%9C%8D%E5%8A%A1.jpg");
      links_temp.push(res.ad.link);
      links_temp.push(res.ad.link);
      links_temp.push(res.ad.link);
      this.setData({
        ads: ads_temp,
        link: links_temp
      })
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