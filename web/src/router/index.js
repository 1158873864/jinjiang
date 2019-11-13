/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    perms: ['GET /aaa','POST /bbb']     will control the page perms (you can set multiple perms)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/broadcast',
    component: () => import('@/views/broadcast/manage'),
    hidden: true
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/user',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'userManage',
    meta: {
      title: '人员管理',
      icon: 'chart'
    },
    children: [
      {
        path: 'member',
        component: () => import('@/views/user/member'),
        name: 'member',
        meta: {
          perms: ['GET /admin/user/list', 'POST /admin/user/create', 'POST /admin/user/update'],
          title: '会员管理',
          noCache: true
        }
      },
      {
        path: 'staff',
        component: () => import('@/views/user/staff'),
        name: 'staff',
        meta: {
          perms: ['GET /admin/user/list', 'POST /admin/user/create', 'POST /admin/user/update'],
          title: '员工管理',
          noCache: true
        }
      },
      {
        path: 'shareholder',
        component: () => import('@/views/user/shareholder'),
        name: 'shareholder',
        meta: {
          perms: ['GET /admin/user/list', 'POST /admin/user/create', 'POST /admin/user/update'],
          title: '股东管理',
          noCache: true
        }
      },
      {
        path: 'manager',
        component: () => import('@/views/user/manager'),
        name: 'manager',
        meta: {
          perms: ['GET /admin/user/list', 'POST /admin/user/create', 'POST /admin/user/update'],
          title: '庄主管理',
          noCache: true
        }
      },
   /*
      {
        path: 'address',
        component: () => import('@/views/user/address'),
        name: 'address',
        meta: {
          perms: ['GET /admin/address/list'],
          title: '收货地址',
          noCache: true
        }
      },*/
  /*
      {
        path: 'feedback',
        component: () => import('@/views/user/feedback'),
        name: 'feedback',
        meta: {
          perms: ['GET /admin/feedback/list'],
          title: '意见反馈',
          noCache: true
        }
      }*/
    ]
  },

   //等级管理
   {
	  path: '/module',
	  component: Layout,
	  redirect: 'noredirect',
    alwaysShow: true,
    hidden:false,
	  name: 'module',
	  meta: {
	    title: '等级管理',
	    icon: 'chart'
	  },
	  children: [
	    {
	      path: 'levelmanage',
	      component: () => import('@/views/module/levelmanage'),
	      name: 'levelmanage',
	      meta: {
	        // perms: ['GET /admin/stat/user'],
	        title: '等级管理',
	        noCache: true
	      }
	    }
	  ]
  },
  {
	  path: '/shopmanage',
	  component: Layout,
	  redirect: 'noredirect',
	  alwaysShow: true,
	  name: 'shopmanage',
	  meta: {
	    title: '酒庄管理',
	    icon: 'chart'
	  },
	  children: [
	    {
	      path: 'shoplist',
	      component: () => import('@/views/shopmanage/shoplist'),
	      name: 'shoplist',
	      meta: {
	        title: '酒庄管理',
	        noCache: true
	      }
	    },
      {
        path: 'deduct',
        component: () => import('@/views/shopmanage/deduct'),
        name: 'deduct',
        meta: {
          title: '酒庄分成管理',
          noCache: true
        }
      },
      {
        path: 'credit',
        component: () => import('@/views/shopmanage/credit'),
        name: 'credit',
        meta: {
          title: '赊账管理',
          noCache: true
        }
      },
      {
        path: 'stock',
        component: () => import('@/views/shopmanage/stock'),
        name: 'stock',
        meta: {
          title: '进货请求',
          noCache: true
        }
      },
      {
        path: 'apply',
        component: () => import('@/views/shopmanage/apply'),
        name: 'apply',
        meta: {
          title: '报销明细',
          noCache: true
        }
      }
	  ],
  },
  {
    path: '/goods',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'goodsManage',
    meta: {
      title: '商品管理',
      icon: 'chart'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/goods/list'),
        name: 'goodsList',
        meta: {
          perms: ['GET /admin/goods/list', 'POST /admin/goods/delete'],
          title: '热销产品列表',
          noCache: true
        }
      },
      {
        path: 'integralGoods',
        component: () => import('@/views/goods/integralGoods'),
        name: 'integralGoods',
        meta: {
          perms: ['GET /admin/goods/list', 'POST /admin/goods/delete'],
          title: '积分商品列表',
          noCache: true
        }
      },
      {
        path: 'recommendGoods',
        component: () => import('@/views/goods/recommendGoods'),
        name: 'recommendGoods',
        meta: {
          perms: ['GET /admin/goods/list', 'POST /admin/goods/delete'],
          title: '精品推荐商品列表',
          noCache: true
        }
      },
      {
        path: 'create',
        component: () => import('@/views/goods/create'),
        name: 'goodsCreate',
        meta: {
          perms: ['POST /admin/goods/create'],
          title: '商品添加',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'edit',
        component: () => import('@/views/goods/edit'),
        name: 'goodsEdit',
        meta: {
          perms: ['GET /admin/goods/detail', 'POST /admin/goods/update', 'POST /admin/goods/catAndBrand'],
          title: '商品编辑',
          noCache: true
        },
        hidden: true
      },
   /*   {
        path: 'comment',
        component: () => import('@/views/goods/comment'),
        name: 'goodsComment',
        meta: {
          perms: ['GET /admin/comment/list', 'POST /admin/comment/delete'],
          title: '商品评论',
          noCache: true
        }
      }*/
    ]
  },
  /*
  {
    path: '/mall',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'mallManage',
    meta: {
      title: '商场管理',
      icon: 'chart'
    },
    children: [
      {
        path: 'region',
        component: () => import('@/views/mall/region'),
        name: 'region',
        meta: {
          title: '行政区域',
          noCache: true
        }
      },
      {
        path: 'brand',
        component: () => import('@/views/mall/brand'),
        name: 'brand',
        meta: {
          perms: ['GET /admin/brand/list', 'POST /admin/brand/create', 'GET /admin/brand/read', 'POST /admin/brand/update', 'POST /admin/brand/delete'],
          title: '品牌制造商',
          noCache: true
        }
      },
      {
        path: 'category',
        component: () => import('@/views/mall/category'),
        name: 'category',
        meta: {
          perms: ['GET /admin/category/list', 'POST /admin/category/create', 'GET /admin/category/read', 'POST /admin/category/update', 'POST /admin/category/delete'],
          title: '商品类目',
          noCache: true
        }
      },
      {
        path: 'qualification',
        component: () => import('@/views/mall/qualification'),
        name: 'qualification',
        meta: {
          perms: [''],
          title: '资质管理',
          noCache: true
        }
      },
      //qualification
      {
        path: 'order',
        component: () => import('@/views/mall/order'),
        name: 'order',
        meta: {
          perms: ['GET /admin/order/list', 'GET /admin/order/detail', 'POST /admin/order/ordership', 'POST /admin/order/orderrefund', 'POST /admin/order/orderreply'],
          title: '订单管理',
          noCache: true
        }
      },
      {
        path: 'issue',
        component: () => import('@/views/mall/issue'),
        name: 'issue',
        meta: {
          perms: ['GET /admin/issue/list', 'POST /admin/issue/create', 'GET /admin/issue/read', 'POST /admin/issue/update', 'POST /admin/issue/delete'],
          title: '通用问题',
          noCache: true
        }
      },
      {
        path: 'keyword',
        component: () => import('@/views/mall/keyword'),
        name: 'keyword',
        meta: {
          perms: ['GET /admin/keyword/list', 'POST /admin/keyword/create', 'GET /admin/keyword/read', 'POST /admin/keyword/update', 'POST /admin/keyword/delete'],
          title: '关键词',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/myorder',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'myorder',
    meta: {
      title: '我的订单',
      icon: 'chart'
    },
    children: [
      {
        path: 'allorder',
        component: () => import('@/views/myorder/allorder'),
        name: 'allorder',
        meta: {
          title: '全部订单',
          noCache: true
        }
      },
      {
        path: 'finishorder',
        component: () => import('@/views/myorder/finishorder'),
        name: 'finishorder',
        meta: {
          title: '已完成订单',
          noCache: true
        }
      },
      {
        path: 'notcomplete',
        component: () => import('@/views/myorder/notcomplete'),
        name: 'notcomplete',
        meta: {
          title: '未完成订单',
          noCache: true
        }
      },
      {
        path: 'changedorder',
        component: () => import('@/views/myorder/changedorder'),
        name: 'changedorder',
        meta: {
          title: '退货/换货',
          noCache: true
        }
      },
      {
        path:"logistics",
        component:() =>import('@/views/myorder/logistics'),
        name:"logistics",
        meta:{
          title:'物流信息',
          noCache:true
        }
      }
    ]
  },
  */
  /*
  {
    path: '/myincome',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    meta: {
      title: '我的收入',
      icon: 'chart'
    },
    children: [
      {
        path: 'balance',
        component: () => import('@/views/myincome/balance'),
        name: 'balance',
        meta: {
          title: '我的余额',
          noCache: true
        }
      },
      {
        path: 'cashdrawal',
        component: () => import('@/views/myincome/cashdrawal'),
        name: 'cashdrawal',
        meta: {
          title: '提现',
          noCache: true
        }
      }
    ]
  },*/



  {
    path: '/promotion',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'promotionManage',
    meta: {
      title: '优惠券管理',
      icon: 'chart'
    },
    children: [
     /* {
        path: 'ad',
        component: () => import('@/views/promotion/ad'),
        name: 'ad',
        meta: {
          perms: ['GET /admin/ad/list', 'POST /admin/ad/create', 'GET /admin/ad/read', 'POST /admin/ad/update', 'POST /admin/ad/delete'],
          title: '广告管理',
          noCache: true
        }
      },*/
      {
        path: 'discount',
        component: () => import('@/views/promotion/discount'),
        name: 'discount',
        meta: {
          perms: ['GET /admin/coupon/list', 'POST /admin/coupon/create', 'POST /admin/coupon/update', 'POST /admin/coupon/delete'],
          title: '优惠券管理',
          noCache: true
        }
      },
      {
        path: 'coupon',
        component: () => import('@/views/promotion/coupon'),
        name: 'coupon',
        meta: {
          perms: ['GET /admin/coupon/list', 'POST /admin/coupon/create', 'POST /admin/coupon/update', 'POST /admin/coupon/delete'],
          title: '用户优惠卷管理',
          noCache: true
        }
      },
      /*
      {
        path: 'topic',
        component: () => import('@/views/promotion/topic'),
        name: 'topic',
        meta: {
          perms: ['GET /admin/topic/list', 'POST /admin/topic/create', 'GET /admin/topic/read', 'POST /admin/topic/update', 'POST /admin/topic/delete'],
          title: '专题管理',
          noCache: true
        }
      },

      {
        path: 'groupon-rule',
        component: () => import('@/views/promotion/grouponRule'),
        name: 'grouponRule',
        meta: {
          perms: ['GET /admin/groupon/list', 'POST /admin/groupon/create', 'POST /admin/groupon/update', 'POST /admin/groupon/delete'],
          title: '团购规则',
          noCache: true
        }
      },
      {
        path: 'groupon-activity',
        component: () => import('@/views/promotion/grouponActivity'),
        name: 'grouponActivity',
        meta: {
          perms: ['GET /admin/groupon/listRecord'],
          title: '团购活动',
          noCache: true
        }
      }*/
    ]
  },

  {
    path: '/sys',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'sysManage',
    meta: {
      title: '系统管理',
      icon: 'chart'
    },
    children: [
      {
        path: 'admin',
        component: () => import('@/views/sys/admin'),
        name: 'admin',
        meta: {
          perms: ['GET /admin/admin/list', 'POST /admin/admin/create', 'POST /admin/admin/update', 'POST /admin/admin/delete'],
          title: '管理员',
          noCache: true
        }
      },
      {
        path: 'ad',
        component: () => import('@/views/sys/ad'),
        name: 'ad',
        meta: {
          perms: ['GET /admin/admin/list', 'POST /admin/admin/create', 'POST /admin/admin/update', 'POST /admin/admin/delete'],
          title: '广告位管理',
          noCache: true
        }
      },
      {
        path: 'culture',
        component: () => import('@/views/sys/culture'),
        name: 'culture',
        meta: {
          perms: ['GET /admin/admin/list', 'POST /admin/admin/create', 'POST /admin/admin/update', 'POST /admin/admin/delete'],
          title: '文化推广',
          noCache: true
        }
      },
      {
        path: 'complain',
        component: () => import('@/views/sys/complain'),
        name: 'complain',
        meta: {
          perms: ['GET /admin/admin/list', 'POST /admin/admin/create', 'POST /admin/admin/update', 'POST /admin/admin/delete'],
          title: '投诉建议列表',
          noCache: true
        }
      }
    /*  {
        path: 'os',
        component: () => import('@/views/sys/os'),
        name: 'os',
        meta: {
          perms: ['GET /admin/os/list', 'POST /admin/os/create', 'POST /admin/os/update', 'POST /admin/os/delete'],
          title: '对象存储',
          noCache: true
        }
      }*/
    ]
  },

  {
    path: '/recommend',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    hidden:false,
    name: 'order',
    meta: {
      title: '推广管理',
      icon: 'chart'
    },
    children: [
      {
        path: 'recommend',
        component: () => import('@/views/recommend/recommend'),
        name: 'recommend',
        meta: {
          // perms: ['GET /admin/stat/user'],
          title: '会员推广管理',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    hidden:false,
    name: 'order',
    meta: {
      title: '订单管理',
      icon: 'chart'
    },
    children: [
      {
        path: 'order',
        component: () => import('@/views/order/order'),
        name: 'order',
        meta: {
          // perms: ['GET /admin/stat/user'],
          title: '订单列表',
          noCache: true
        }
      }
    ]
  },

  {
    path: '/stat',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'statManage',
    meta: {
      title: '统计',
      icon: 'chart'
    },
    children: [
      {
        path: 'user',
        component: () => import('@/views/stat/user'),
        name: 'statUser',
        meta: {
          perms: ['GET /admin/stat/user'],
          title: '会员消费',
          noCache: true
        }
      },
      {
        path: 'order',
        component: () => import('@/views/stat/order'),
        name: 'statOrder',
        meta: {
          perms: ['GET /admin/stat/order'],
          title: '股东收入',
          noCache: true
        }
      },
      {
        path: 'goods',
        component: () => import('@/views/stat/goods'),
        name: 'statGoods',
        meta: {
          perms: ['GET /admin/stat/goods'],
          title: '酒庄收发存',
          noCache: true
        }
      }
    ]
  },







  { path: '*', redirect: '/404', hidden: true }
]
