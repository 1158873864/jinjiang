(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-601f"],{"2WOJ":function(t,e,a){},LROu:function(t,e,a){"use strict";var l=a("Qvsb");a.n(l).a},Mz3J:function(t,e,a){"use strict";Math.easeInOutQuad=function(t,e,a,l){return(t/=l/2)<1?a/2*t*t+e:-a/2*(--t*(t-2)-1)+e};var l=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)};function n(t,e,a){var n=document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop,s=t-n,i=0;e=void 0===e?500:e;!function t(){i+=20,function(t){document.documentElement.scrollTop=t,document.body.parentNode.scrollTop=t,document.body.scrollTop=t}(Math.easeInOutQuad(i,n,s,e)),i<e?l(t):a&&"function"==typeof a&&a()}()}var s={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(t){this.$emit("update:page",t)}},pageSize:{get:function(){return this.limit},set:function(t){this.$emit("update:limit",t)}}},methods:{handleSizeChange:function(t){this.$emit("pagination",{page:this.currentPage,limit:t}),this.autoScroll&&n(0,800)},handleCurrentChange:function(t){this.$emit("pagination",{page:t,limit:this.pageSize}),this.autoScroll&&n(0,800)}}},i=(a("LROu"),a("KHd+")),o=Object(i.a)(s,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"pagination-container",class:{hidden:t.hidden}},[a("el-pagination",t._b({attrs:{background:t.background,"current-page":t.currentPage,"page-size":t.pageSize,layout:t.layout,total:t.total},on:{"update:currentPage":function(e){t.currentPage=e},"update:pageSize":function(e){t.pageSize=e},"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}},"el-pagination",t.$attrs,!1))],1)},[],!1,null,"2fc659d3",null);o.options.__file="index.vue";e.a=o.exports},Ntov:function(t,e,a){"use strict";a.r(e);var l=a("P2sY"),n=a.n(l),s=a("y/46"),i=[{label:"通用领券",value:0},{label:"注册赠券",value:1},{label:"兑换码",value:2}],o=[{label:"未使用",value:0},{label:"已使用",value:1},{label:"已过期",value:2},{label:"已下架",value:3}],r={name:"CouponDetail",components:{Pagination:a("Mz3J").a},filters:{formatType:function(t){for(var e=0;e<i.length;e++)if(t===i[e].value)return i[e].label;return""},formatGoodsType:function(t){return 0===t?"全场通用":1===t?"指定分类":"指定商品"},formatStatus:function(t){return 0===t?"正常":1===t?"已过期":"已下架"},formatUseStatus:function(t){return 0===t?"未使用":1===t?"已使用":3===t?"已过期":"已下架"}},data:function(){return{typeOptions:n()({},i),useStatusOptions:n()({},o),coupon:{},list:void 0,total:0,listLoading:!0,listQuery:{page:1,limit:20,couponId:0,userId:void 0,status:void 0,sort:"add_time",order:"desc"},downloadLoading:!1}},created:function(){this.init()},methods:{init:function(){var t=this;null!=this.$route.query.id&&(Object(s.e)(this.$route.query.id).then(function(e){t.coupon=e.data.data}),this.listQuery.couponId=this.$route.query.id,this.getList())},getList:function(){var t=this;this.listLoading=!0,Object(s.d)(this.listQuery).then(function(e){t.list=e.data.data.items,t.total=e.data.data.total,t.listLoading=!1}).catch(function(){t.list=[],t.total=0,t.listLoading=!1})},handleFilter:function(){this.listQuery.page=1,this.getList()},getTimeScope:function(){return 0===this.coupon.timeType?"领取"+this.coupon.days+"天有效":1===this.coupon.timeType?"自"+this.coupon.startTime+"至"+this.coupon.endTime+"有效":"未知"},getGoodsScope:function(){}}},c=(a("nli5"),a("KHd+")),u=Object(c.a)(r,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"table-layout"},[a("el-row",[a("el-col",{staticClass:"table-cell-title",attrs:{span:4}},[t._v("名称")]),t._v(" "),a("el-col",{staticClass:"table-cell-title",attrs:{span:4}},[t._v("介绍名称")]),t._v(" "),a("el-col",{staticClass:"table-cell-title",attrs:{span:4}},[t._v("标签")]),t._v(" "),a("el-col",{staticClass:"table-cell-title",attrs:{span:4}},[t._v("优惠券类型")]),t._v(" "),a("el-col",{staticClass:"table-cell-title",attrs:{span:4}},[t._v("最低消费")]),t._v(" "),a("el-col",{staticClass:"table-cell-title",attrs:{span:4}},[t._v("优惠面值")])],1),t._v(" "),a("el-row",[a("el-col",{staticClass:"table-cell",attrs:{span:4}},[t._v(t._s(t.coupon.name))]),t._v(" "),a("el-col",{staticClass:"table-cell",attrs:{span:4}},[t._v(t._s(t.coupon.desc))]),t._v(" "),a("el-col",{staticClass:"table-cell",attrs:{span:4}},[t._v(t._s(t.coupon.tag))]),t._v(" "),a("el-col",{staticClass:"table-cell",attrs:{span:4}},[t._v(t._s(t._f("formatType")(t.coupon.type)))]),t._v(" "),a("el-col",{staticClass:"table-cell",attrs:{span:4}},[t._v("满"+t._s(t.coupon.min)+"元可用")]),t._v(" "),a("el-col",{staticClass:"table-cell",attrs:{span:4}},[t._v("减免"+t._s(t.coupon.discount)+"元")])],1),t._v(" "),a("el-row",[a("el-col",{staticClass:"table-cell-title",attrs:{span:4}},[t._v("每人限额")]),t._v(" "),a("el-col",{staticClass:"table-cell-title",attrs:{span:4}},[t._v("当前状态")]),t._v(" "),a("el-col",{staticClass:"table-cell-title",attrs:{span:4}},[t._v("商品范围")]),t._v(" "),a("el-col",{staticClass:"table-cell-title",attrs:{span:4}},[t._v("有效期")]),t._v(" "),a("el-col",{staticClass:"table-cell-title",attrs:{span:4}},[t._v("优惠兑换码")]),t._v(" "),a("el-col",{staticClass:"table-cell-title",attrs:{span:4}},[t._v("发行数量")])],1),t._v(" "),a("el-row",[a("el-col",{staticClass:"table-cell",attrs:{span:4}},[t._v(t._s(t.coupon.limit))]),t._v(" "),a("el-col",{staticClass:"table-cell",attrs:{span:4}},[t._v(t._s(t._f("formatStatus")(t.coupon.status)))]),t._v(" "),a("el-col",{staticClass:"table-cell",attrs:{span:4}},[t._v(t._s(t._f("formatGoodsType")(t.coupon.goodsType)))]),t._v(" "),a("el-col",{staticClass:"table-cell",attrs:{span:4}},[t._v(t._s(t.getTimeScope()))]),t._v(" "),a("el-col",{staticClass:"table-cell",attrs:{span:4}},[t._v(t._s(t.coupon.code))]),t._v(" "),a("el-col",{staticClass:"table-cell",attrs:{span:4}},[t._v(t._s(0===t.coupon.total?"不限":t.coupon.total))])],1)],1),t._v(" "),a("div",{staticClass:"filter-container"},[a("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{clearable:"",placeholder:"请输入用户ID"},model:{value:t.listQuery.userId,callback:function(e){t.$set(t.listQuery,"userId",e)},expression:"listQuery.userId"}}),t._v(" "),a("el-select",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{clearable:"",placeholder:"请选择使用状态"},model:{value:t.listQuery.status,callback:function(e){t.$set(t.listQuery,"status",e)},expression:"listQuery.status"}},t._l(t.useStatusOptions,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),t._v(" "),a("el-button",{directives:[{name:"permission",rawName:"v-permission",value:["GET /admin/coupon/listuser"],expression:"['GET /admin/coupon/listuser']"}],staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.handleFilter}},[t._v("查找")])],1),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],attrs:{data:t.list,size:"small","element-loading-text":"正在查询中。。。",border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{align:"center",label:"用户优惠券ID",prop:"id",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"用户ID",prop:"userId"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"领取时间",prop:"addTime"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"使用状态",prop:"status"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t._f("formatUseStatus")(e.row.status)))]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"订单ID",prop:"orderId"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"使用时间",prop:"usedTime"}})],1),t._v(" "),a("pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total>0"}],attrs:{total:t.total,page:t.listQuery.page,limit:t.listQuery.limit},on:{"update:page":function(e){t.$set(t.listQuery,"page",e)},"update:limit":function(e){t.$set(t.listQuery,"limit",e)},pagination:t.getList}})],1)},[],!1,null,"3dbf3b3a",null);u.options.__file="couponDetail.vue";e.default=u.exports},Qvsb:function(t,e,a){},nli5:function(t,e,a){"use strict";var l=a("2WOJ");a.n(l).a},"y/46":function(t,e,a){"use strict";a.d(e,"c",function(){return n}),a.d(e,"a",function(){return s}),a.d(e,"e",function(){return i}),a.d(e,"f",function(){return o}),a.d(e,"b",function(){return r}),a.d(e,"d",function(){return c});var l=a("t3Un");function n(t){return Object(l.a)({url:"/coupon/list",method:"get",params:t})}function s(t){return Object(l.a)({url:"/coupon/create",method:"post",data:t})}function i(t){return Object(l.a)({url:"/coupon/read",method:"get",params:{id:t}})}function o(t){return Object(l.a)({url:"/coupon/update",method:"post",data:t})}function r(t){return Object(l.a)({url:"/coupon/delete",method:"post",data:t})}function c(t){return Object(l.a)({url:"/coupon/listuser",method:"get",params:t})}}}]);