(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-56e2"],{"++bt":function(t,e,a){"use strict";var o=a("G4cN");a.n(o).a},G4cN:function(t,e,a){},"IAE+":function(t,e,a){"use strict";a.r(e);var o=a("FyfS"),i=a.n(o),n=a("QbLZ"),l=a.n(n),s=a("P2sY"),r=a.n(s);a("t3Un");var d=a("Mz3J"),u=a("L2JU"),c=a("vDqi"),m=a.n(c),p=a("rOcY"),f=[{label:"通用领券",value:0},{label:"注册赠券",value:1},{label:"兑换码",value:2}],g=[{label:"正常",value:0},{label:"已过期",value:1},{label:"已下架",value:2}],v={name:"Discount",components:{Pagination:d.a},filters:{formatType:function(t){for(var e=0;e<f.length;e++)if(t===f[e].value)return f[e].label;return""},formatGoodsType:function(t){return"0"===t?"全场通用":"1"===t?"直推奖":void 0},formatStatus:function(t){return 0===t?"正常":1===t?"已过期":"已下架"}},data:function(){return{typeOptions:r()({},f),statusOptions:r()({},g),list:void 0,total:0,listLoading:!0,listQuery:{page:0,limit:20,name:void 0,type:void 0,status:void 0,sort:"add_time",order:"desc"},dataForm:{id:void 0,name:void 0,desc:void 0,tag:void 0,discount:0,min:0,limit:1,type:0,goodsType:0,timeType:0,days:0,startTime:null,endTime:null,shopId:""},dialogFormVisible:!1,dialogStatus:"",textMap:{update:"编辑",create:"创建"},rules:{name:[{required:!0,message:"优惠券标题不能为空",trigger:"blur"}]},downloadLoading:!1}},computed:l()({},Object(u.b)(["shopId"]),{headers:function(){return{"X-Litemall-Admin-Token":getToken()}}}),created:function(){this.getList()},methods:{getList:function(){var t=this;this.listLoading=!0,m()({method:"get",url:p.baseApi+"discount/find/all?&page="+this.listQuery.page+"&size=20",headers:{"X-Litemall-Admin-Token":sessionStorage.getItem("token")}}).then(function(e){t.list=e.data.data.items.content,t.total=e.data.data.items.totalPages,t.listLoading=!1}).catch(function(e){t.list=[],t.total=0,t.listLoading=!1})},handleFilter:function(){this.listQuery.page=0,this.getList()},resetForm:function(){this.dataForm={id:"",name:"",desc:"",tag:"",total:0,min:0,discount:0,limit:1,type:"",goodsType:"",timeType:0,days:0,startTime:"",endTime:""}},handleCreate:function(){var t=this;this.resetForm(),this.dialogStatus="create",this.dialogFormVisible=!0,this.$nextTick(function(){t.$refs.dataForm.clearValidate()})},createData:function(){var t=this;this.$refs.dataForm.validate(function(e){e&&(console.log(t.dataForm),m()({method:"post",url:p.baseApi+"discount/add",headers:{"X-Litemall-Admin-Token":sessionStorage.getItem("token")},data:t.dataForm}).then(function(e){0==e.data.code&&(t.list.unshift(e.data.data),t.dialogFormVisible=!1,t.$notify.success({title:"成功",message:"创建优惠券成功"}),t.listQuery.page=0,t.getList())}).catch(function(e){t.$notify.error({title:"失败",message:response.data.errmsg})}))})},handleUpdate:function(t){var e=this;this.dataForm=r()({},t),this.dialogStatus="update",this.dialogFormVisible=!0,this.$nextTick(function(){0===e.dataForm.days?e.dataForm.daysType=1:e.dataForm.daysType=0,e.$refs.dataForm.clearValidate()})},updateData:function(){var t=this;this.$refs.dataForm.validate(function(e){m()({method:"put",url:p.baseApi+"discount/update",headers:{"X-Litemall-Admin-Token":sessionStorage.getItem("token")},data:t.dataForm}).then(function(e){if(0==e.data.code){var a=!0,o=!1,n=void 0;try{for(var l,s=i()(t.list);!(a=(l=s.next()).done);a=!0){var r=l.value;if(r.id===t.dataForm.id){var d=t.list.indexOf(r);t.list.splice(d,1,t.dataForm);break}}}catch(t){o=!0,n=t}finally{try{!a&&s.return&&s.return()}finally{if(o)throw n}}t.dialogFormVisible=!1,t.$notify.success({title:"成功",message:"更新优惠券成功"})}}).catch(function(e){t.$notify.error({title:"失败",message:response.data.errmsg})})})},handleDelete:function(t){var e=this;m()({method:"get",url:p.baseApi+"discount/delete?id="+t.id,headers:{"X-Litemall-Admin-Token":sessionStorage.getItem("token")}}).then(function(a){if(0==a.data.code){e.$notify.success({title:"成功",message:"删除优惠券成功"});var o=e.list.indexOf(t);e.list.splice(o,1)}}).catch(function(t){e.$notify.error({title:"失败",message:response.data.errmsg})})},handleDetail:function(t){this.$router.push({path:"/promotion/couponDetail",query:{id:t.id}})},handleDownload:function(){var t=this;this.downloadLoading=!0,Promise.all([a.e("chunk-0d49"),a.e("chunk-17b8")]).then(a.bind(null,"S/jZ")).then(function(e){e.export_json_to_excel2(["优惠券ID","名称","内容","标签","最低消费","减免金额","每人限领","优惠券数量"],t.list,["id","name","desc","tag","min","discount","limit","total"],"优惠券信息"),t.downloadLoading=!1})}}},h=(a("++bt"),a("KHd+")),b=Object(h.a)(v,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"filter-container"},[a("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-edit"},on:{click:t.handleCreate}},[t._v("添加")])],1),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],attrs:{data:t.list,size:"small","element-loading-text":"正在查询中。。。",border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{align:"center",label:"优惠券ID",prop:"id",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"优惠券名称",prop:"name"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"介绍",prop:"desc"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"标签",prop:"tag"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"最低消费",prop:"min"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("满"+t._s(e.row.min)+"元可用")]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"满减金额",prop:"discount"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("减免"+t._s(e.row.discount)+"元")]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"每人限领",prop:"limit"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(0!=e.row.limit?e.row.limit:"不限"))]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"商品使用范围",prop:"goodsType"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t._f("formatGoodsType")(e.row.goodsType)))]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"天数",prop:"days"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.days))]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"开始时间",prop:"startTime"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.startTime))]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"结束时间",prop:"endTime"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.endTime))]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"优惠券数量",prop:"total"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(0!=e.row.total?e.row.total:"不限"))]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作",width:"150","class-name":"small-padding fixed-width"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{directives:[{name:"permission",rawName:"v-permission",value:["POST /admin/coupon/update"],expression:"['POST /admin/coupon/update']"}],attrs:{type:"info",size:"mini"},on:{click:function(a){t.handleUpdate(e.row)}}},[t._v("编辑")]),t._v(" "),a("el-button",{directives:[{name:"permission",rawName:"v-permission",value:["POST /admin/coupon/delete"],expression:"['POST /admin/coupon/delete']"}],attrs:{type:"danger",size:"mini"},on:{click:function(a){t.handleDelete(e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),a("pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total>0"}],attrs:{total:t.total,page:t.listQuery.page,limit:t.listQuery.limit},on:{"update:page":function(e){t.$set(t.listQuery,"page",e)},"update:limit":function(e){t.$set(t.listQuery,"limit",e)},pagination:t.getList}}),t._v(" "),a("el-dialog",{attrs:{title:t.textMap[t.dialogStatus],visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[a("el-form",{ref:"dataForm",staticStyle:{width:"400px","margin-left":"50px"},attrs:{rules:t.rules,model:t.dataForm,"status-icon":"","label-position":"left","label-width":"100px"}},[a("el-form-item",{attrs:{label:"优惠券名称",prop:"name"}},[a("el-input",{model:{value:t.dataForm.name,callback:function(e){t.$set(t.dataForm,"name",e)},expression:"dataForm.name"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"介绍",prop:"desc"}},[a("el-input",{model:{value:t.dataForm.desc,callback:function(e){t.$set(t.dataForm,"desc",e)},expression:"dataForm.desc"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"标签",prop:"tag"}},[a("el-input",{model:{value:t.dataForm.tag,callback:function(e){t.$set(t.dataForm,"tag",e)},expression:"dataForm.tag"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"最低消费",prop:"min"}},[a("el-input",{model:{value:t.dataForm.min,callback:function(e){t.$set(t.dataForm,"min",e)},expression:"dataForm.min"}},[a("template",{slot:"append"},[t._v("元")])],2)],1),t._v(" "),a("el-form-item",{attrs:{label:"满减金额",prop:"discount"}},[a("el-input",{model:{value:t.dataForm.discount,callback:function(e){t.$set(t.dataForm,"discount",e)},expression:"dataForm.discount"}},[a("template",{slot:"append"},[t._v("元")])],2)],1),t._v(" "),a("el-form-item",{attrs:{label:"每人限领",prop:"limit"}},[a("el-input",{model:{value:t.dataForm.limit,callback:function(e){t.$set(t.dataForm,"limit",e)},expression:"dataForm.limit"}},[a("template",{slot:"append"},[t._v("张")])],2)],1),t._v(" "),a("el-form-item",{attrs:{label:"优惠券数量",prop:"total"}},[a("el-input",{model:{value:t.dataForm.total,callback:function(e){t.$set(t.dataForm,"total",e)},expression:"dataForm.total"}},[a("template",{slot:"append"},[t._v("张")])],2)],1),t._v(" "),a("el-form-item",{attrs:{label:"有效期"}},[a("el-radio-group",{model:{value:t.dataForm.timeType,callback:function(e){t.$set(t.dataForm,"timeType",e)},expression:"dataForm.timeType"}},[a("el-radio-button",{attrs:{label:0}},[t._v("领券相对天数")]),t._v(" "),a("el-radio-button",{attrs:{label:1}},[t._v("指定绝对时间")])],1)],1),t._v(" "),a("el-form-item",{directives:[{name:"show",rawName:"v-show",value:0===t.dataForm.timeType,expression:"dataForm.timeType === 0"}]},[a("el-input",{model:{value:t.dataForm.days,callback:function(e){t.$set(t.dataForm,"days",e)},expression:"dataForm.days"}},[a("template",{slot:"append"},[t._v("天")])],2)],1),t._v(" "),a("el-form-item",{directives:[{name:"show",rawName:"v-show",value:1===t.dataForm.timeType,expression:"dataForm.timeType === 1"}]},[a("el-col",{attrs:{span:11}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"datetime",format:"yyyy-MM-dd HH:mm:ss","value-format":"yyyy-MM-dd HH:mm:ss",placeholder:"选择日期"},model:{value:t.dataForm.startTime,callback:function(e){t.$set(t.dataForm,"startTime",e)},expression:"dataForm.startTime"}})],1),t._v(" "),a("el-col",{staticClass:"line",attrs:{span:2}},[t._v("至")]),t._v(" "),a("el-col",{attrs:{span:11}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"datetime",format:"yyyy-MM-dd HH:mm:ss","value-format":"yyyy-MM-dd HH:mm:ss",placeholder:"选择日期"},model:{value:t.dataForm.endTime,callback:function(e){t.$set(t.dataForm,"endTime",e)},expression:"dataForm.endTime"}})],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"商品限制范围"}},[a("el-radio-group",{model:{value:t.dataForm.goodsType,callback:function(e){t.$set(t.dataForm,"goodsType",e)},expression:"dataForm.goodsType"}},[a("el-radio-button",{attrs:{label:0}},[t._v("全场通用")]),t._v(" "),a("el-radio-button",{attrs:{label:1}},[t._v("直推奖")])],1)],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取消")]),t._v(" "),"create"==t.dialogStatus?a("el-button",{attrs:{type:"primary"},on:{click:t.createData}},[t._v("确定")]):a("el-button",{attrs:{type:"primary"},on:{click:t.updateData}},[t._v("确定")])],1)],1)],1)},[],!1,null,null,null);b.options.__file="discount.vue";e.default=b.exports},LROu:function(t,e,a){"use strict";var o=a("Qvsb");a.n(o).a},Mz3J:function(t,e,a){"use strict";Math.easeInOutQuad=function(t,e,a,o){return(t/=o/2)<1?a/2*t*t+e:-a/2*(--t*(t-2)-1)+e};var o=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)};function i(t,e,a){var i=document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop,n=t-i,l=0;e=void 0===e?500:e;!function t(){l+=20,function(t){document.documentElement.scrollTop=t,document.body.parentNode.scrollTop=t,document.body.scrollTop=t}(Math.easeInOutQuad(l,i,n,e)),l<e?o(t):a&&"function"==typeof a&&a()}()}var n={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(t){this.$emit("update:page",t)}},pageSize:{get:function(){return this.limit},set:function(t){this.$emit("update:limit",t)}}},methods:{handleSizeChange:function(t){this.$emit("pagination",{page:this.currentPage,limit:t}),this.autoScroll&&i(0,800)},handleCurrentChange:function(t){this.$emit("pagination",{page:t,limit:this.pageSize}),this.autoScroll&&i(0,800)}}},l=(a("LROu"),a("KHd+")),s=Object(l.a)(n,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"pagination-container",class:{hidden:t.hidden}},[a("el-pagination",t._b({attrs:{background:t.background,"current-page":t.currentPage,"page-size":t.pageSize,layout:t.layout,total:t.total},on:{"update:currentPage":function(e){t.currentPage=e},"update:pageSize":function(e){t.pageSize=e},"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}},"el-pagination",t.$attrs,!1))],1)},[],!1,null,"2fc659d3",null);s.options.__file="index.vue";e.a=s.exports},Qvsb:function(t,e,a){},rOcY:function(t,e,a){"use strict";(function(e){const o=a("33yf");t.exports={dev:{assetsSubDirectory:"static",assetsPublicPath:"/",proxyTable:{"/api":{target:"https://sandc.xyz:8889/admin",changeOrigin:!0,pathRewrite:{"^/api":""}},"/jx":{target:"https://www.shaoshanlu.com:3389",changeOrigin:!0,pathRewrite:{"^/jx":""}}},host:"localhost",port:8889,autoOpenBrowser:!0,errorOverlay:!0,notifyOnErrors:!1,poll:!1,useEslint:!1,showEslintErrorsInOverlay:!1,devtool:"cheap-source-map",cssSourceMap:!1},build:{index:o.resolve(e,"../dist/index.html"),assetsRoot:o.resolve(e,"../dist"),assetsSubDirectory:"static",assetsPublicPath:"/",productionSourceMap:!1,devtool:"source-map",productionGzip:!1,productionGzipExtensions:["js","css"],bundleAnalyzerReport:Object({NODE_ENV:"production",ENV_CONFIG:"prod",BASE_API:"https://www.shaoshanlu.com:3389",BASE_API_NEW:"https://www.shaoshanlu.com:3389"}).npm_config_report||!1,generateAnalyzerReport:Object({NODE_ENV:"production",ENV_CONFIG:"prod",BASE_API:"https://www.shaoshanlu.com:3389",BASE_API_NEW:"https://www.shaoshanlu.com:3389"}).npm_config_generate_report||!1},baseApi:"https://www.shaoshanlu.com:3389/"}}).call(this,"/")}}]);