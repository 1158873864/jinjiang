(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-e45f"],{"1waG":function(e,t,a){"use strict";a.r(t);var o=a("FyfS"),i=a.n(o),n=a("P2sY"),r=a.n(n),s=a("rs3x"),l=(a("kbZS"),a("vDqi")),d=a.n(l),c=a("rOcY"),u={name:"Order",components:{Pagination:a("Mz3J").a},data:function(){return{uploadPath:s.b,filePath:s.a,list:null,total:0,listLoading:!0,listQuery:{page:1,limit:20,key:"",sort:"add_time",order:"desc"},passwordForm:{password:""},shareholderId:"",dataForm:{id:"",userId:"",address:"",mobilePone:"",person:"",freight:0,price:0,discountPrice:0,goodsList:[],BuyTime:"",status:""},shopId:"",shopIds:[],shareholderIds:[],statuses:["待付款","待发货","待收货","待评价","已完成"],levels:[],dialogFormVisible:!1,dialogStatus:"",textMap:{update:"编辑",create:"创建"},rules:{username:[{required:!0,message:"用户名不能为空",trigger:"blur"}],mobile:[{required:!0,message:"手机号码不能为空",trigger:"blur"}]},downloadLoading:!1}},created:function(){this.getList()},methods:{getList:function(){var e=this;d()({method:"get",url:c.baseApi+"shop/find/all?&page="+(this.listQuery.page-1)+"&size=100",headers:{"X-Litemall-Admin-Token":sessionStorage.getItem("token")}}).then(function(t){e.shopIds=t.data.data.items.content}).catch(function(e){}),d()({method:"get",url:c.baseApi+"user/find/identity?identity=shareholder&page="+(this.listQuery.page-1)+"&size=100",headers:{"X-Litemall-Admin-Token":sessionStorage.getItem("token")}}).then(function(t){e.shareholderIds=t.data.data.items.content}).catch(function(e){}),d()({method:"get",url:c.baseApi+"balance/find/type?type=赊账",headers:{"X-Litemall-Admin-Token":sessionStorage.getItem("token")}}).then(function(t){0==t.data.code&&(e.list=t.data.data.items,e.total=t.data.data.items.totalPages,e.listLoading=!1)}).catch(function(t){e.list=[],e.total=0,e.listLoading=!1})},changeShop:function(){var e=this,t=this.shopId;d()({method:"get",url:c.baseApi+"balance/find/shopId/type?shopId="+t+"&type=赊账",headers:{"X-Litemall-Admin-Token":sessionStorage.getItem("token")}}).then(function(t){0==t.data.code&&(e.list=t.data.data.items,e.total=t.data.data.items.totalPages,e.listLoading=!1)}).catch(function(t){e.list=[],e.total=0,e.listLoading=!1}),d()({method:"get",url:c.baseApi+"user/find/identity-shopId?identity=shareholder&shopId="+t+"&page="+(this.listQuery.page-1)+"&size=100",headers:{"X-Litemall-Admin-Token":sessionStorage.getItem("token")}}).then(function(t){e.shareholderIds=t.data.data.items.content}).catch(function(e){})},changeShareholder:function(){var e=this,t=this.shareholderId;d()({method:"get",url:c.baseApi+"balance/find/userId/type?userId="+t+"&type=赊账",headers:{"X-Litemall-Admin-Token":sessionStorage.getItem("token")}}).then(function(t){0==t.data.code&&(e.list=t.data.data.items,e.total=t.data.data.items.totalPages,e.listLoading=!1)}).catch(function(t){e.list=[],e.total=0,e.listLoading=!1})},handleFilter:function(){var e=this;this.listQuery.page=1,this.list=[],this.listLoading=!0,d()({method:"get",url:c.baseApi+"order/find/query?query="+this.listQuery.key+"&page="+(this.listQuery.page-1)+"&size=20",headers:{"X-Litemall-Admin-Token":sessionStorage.getItem("token")}}).then(function(t){if(0==t.data.code){e.list=t.data.data.items.content;for(var a=function(t){d()({method:"get",url:c.baseApi+"goods/find/id?id="+e.list[t].shopId,headers:{"X-Litemall-Admin-Token":sessionStorage.getItem("token")}}).then(function(a){e.list[t].goods=a.data.data.items}).catch(function(e){})},o=0;o<e.list.length;o++)a(o);e.total=t.data.data.items.totalPages,e.listLoading=!1}}).catch(function(t){e.list=[],e.total=0,e.listLoading=!1})},resetForm:function(){this.dataForm={id:"",userId:"",address:"",mobilePone:"",person:"",freight:0,price:0,discountPrice:0,goodsList:[],BuyTime:"",status:""}},handleCreate:function(){var e=this;this.resetForm(),this.dialogStatus="create",this.dialogFormVisible=!0,this.$nextTick(function(){e.$refs.dataForm.clearValidate()})},createData:function(){var e=this;this.$refs.dataForm.validate(function(t){t&&d()({method:"post",url:c.baseApi+"order/add",headers:{"X-Litemall-Admin-Token":sessionStorage.getItem("token")},data:e.dataForm}).then(function(t){0==t.data.code&&(e.list.unshift(t.data.data),e.dialogFormVisible=!1,e.$notify.success({title:"成功",message:"添加商品成功"}),e.listQuery.page=1,e.getList())}).catch(function(t){e.$notify.error({title:"失败",message:response.data.errmsg})})})},handleUpdate:function(e){var t=this;this.dataForm=r()({},e),this.dialogStatus="update",this.dialogFormVisible=!0,this.$nextTick(function(){t.$refs.dataForm.clearValidate()})},updateData:function(){var e=this;this.$refs.dataForm.validate(function(t){t&&d()({method:"put",url:c.baseApi+"order/update",headers:{"X-Litemall-Admin-Token":sessionStorage.getItem("token")},data:e.dataForm}).then(function(t){if(0==t.data.code){var a=!0,o=!1,n=void 0;try{for(var r,s=i()(e.list);!(a=(r=s.next()).done);a=!0){var l=r.value;if(l.id===e.dataForm.id){var d=e.list.indexOf(l);e.list.splice(d,1,e.dataForm);break}}}catch(e){o=!0,n=e}finally{try{!a&&s.return&&s.return()}finally{if(o)throw n}}e.dialogFormVisible=!1,e.$notify.success({title:"成功",message:"更新商品成功"})}}).catch(function(t){e.$notify.error({title:"失败",message:response.data.errmsg})})})},handleDelete:function(e){var t=this;e.id;d()({method:"get",url:c.baseApi+"balance/delete?id="+e.id,headers:{"X-Litemall-Admin-Token":sessionStorage.getItem("token")}}).then(function(a){if(0==a.data.code){var o=t.list.indexOf(e);t.list.splice(o,1),t.$notify.success({title:"成功",message:"删除成功"})}}).catch(function(e){t.$notify.error({title:"失败",message:response.data.errmsg})})}}},p=(a("XNyt"),a("KHd+")),m=Object(p.a)(u,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"filter-container"},[a("span",[e._v("酒庄选择")]),e._v(" "),a("el-select",{on:{change:e.changeShop},model:{value:e.shopId,callback:function(t){e.shopId=t},expression:"shopId"}},e._l(e.shopIds,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),e._v(" "),a("span",[e._v("股东选择")]),e._v(" "),a("el-select",{on:{change:e.changeShareholder},model:{value:e.shareholderId,callback:function(t){e.shareholderId=t},expression:"shareholderId"}},e._l(e.shareholderIds,function(e){return a("el-option",{key:e.id,attrs:{label:e.username,value:e.id}})})),e._v(" "),a("el-input",{staticClass:"filter-item",staticStyle:{width:"200px","margin-left":"100px"},attrs:{clearable:"",placeholder:"请输入关键词"},model:{value:e.listQuery.key,callback:function(t){e.$set(e.listQuery,"key",t)},expression:"listQuery.key"}}),e._v(" "),a("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v("查找")])],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],attrs:{data:e.list,size:"small","element-loading-text":"正在查询中。。。",border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{align:"center",width:"100px",label:"赊账ID",prop:"id",sortable:""}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"股东名称",prop:"username"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"赊账金额",prop:"price"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"详细",prop:"detail"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"时间",prop:"time"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作",width:"200","class-name":"small-padding fixed-width"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(a){e.handleDelete(t.row)}}},[e._v("删除")])]}}])})],1),e._v(" "),a("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{total:e.total,page:e.listQuery.page,limit:e.listQuery.limit},on:{"update:page":function(t){e.$set(e.listQuery,"page",t)},"update:limit":function(t){e.$set(e.listQuery,"limit",t)},pagination:e.getList}}),e._v(" "),a("el-dialog",{attrs:{customClass:"customWidth",title:e.textMap[e.dialogStatus],visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{ref:"dataForm",staticStyle:{"margin-left":"50px"},attrs:{rules:e.rules,model:e.dataForm,"status-icon":"","label-position":"left","label-width":"100px"}},[a("el-form-item",{attrs:{label:"用户",prop:"userId"}},[a("el-select",{model:{value:e.dataForm.userId,callback:function(t){e.$set(e.dataForm,"userId",t)},expression:"dataForm.userId"}},e._l(e.users,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"送货地址",prop:"address"}},[a("el-input",{model:{value:e.dataForm.address,callback:function(t){e.$set(e.dataForm,"address",t)},expression:"dataForm.address"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"联系手机",prop:"mobilePone"}},[a("el-input",{model:{value:e.dataForm.mobilePone,callback:function(t){e.$set(e.dataForm,"mobilePone",t)},expression:"dataForm.mobilePone"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"收货人",prop:"person"}},[a("el-input",{model:{value:e.dataForm.person,callback:function(t){e.$set(e.dataForm,"person",t)},expression:"dataForm.person"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"运费",prop:"freight"}},[a("el-input",{model:{value:e.dataForm.freight,callback:function(t){e.$set(e.dataForm,"freight",t)},expression:"dataForm.freight"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"总价",prop:"price"}},[a("el-input",{model:{value:e.dataForm.price,callback:function(t){e.$set(e.dataForm,"price",t)},expression:"dataForm.price"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"优惠",prop:"discountPrice"}},[a("el-input",{model:{value:e.dataForm.discountPrice,callback:function(t){e.$set(e.dataForm,"discountPrice",t)},expression:"dataForm.discountPrice"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"购买时间",prop:"BuyTime"}},[a("el-input",{model:{value:e.dataForm.BuyTime,callback:function(t){e.$set(e.dataForm,"BuyTime",t)},expression:"dataForm.BuyTime"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"状态"}},[a("el-select",{model:{value:e.dataForm.status,callback:function(t){e.$set(e.dataForm,"status",t)},expression:"dataForm.status"}},e._l(e.statuses,function(e){return a("el-option",{key:e,attrs:{label:e,value:e}})}))],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取消")]),e._v(" "),"create"==e.dialogStatus?a("el-button",{attrs:{type:"primary"},on:{click:e.createData}},[e._v("确定")]):a("el-button",{attrs:{type:"primary"},on:{click:e.updateData}},[e._v("确定")])],1)],1)],1)},[],!1,null,null,null);m.options.__file="credit.vue";t.default=m.exports},LROu:function(e,t,a){"use strict";var o=a("Qvsb");a.n(o).a},Mz3J:function(e,t,a){"use strict";Math.easeInOutQuad=function(e,t,a,o){return(e/=o/2)<1?a/2*e*e+t:-a/2*(--e*(e-2)-1)+t};var o=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)};function i(e,t,a){var i=document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop,n=e-i,r=0;t=void 0===t?500:t;!function e(){r+=20,function(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e}(Math.easeInOutQuad(r,i,n,t)),r<t?o(e):a&&"function"==typeof a&&a()}()}var n={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(e){this.$emit("update:page",e)}},pageSize:{get:function(){return this.limit},set:function(e){this.$emit("update:limit",e)}}},methods:{handleSizeChange:function(e){this.$emit("pagination",{page:this.currentPage,limit:e}),this.autoScroll&&i(0,800)},handleCurrentChange:function(e){this.$emit("pagination",{page:e,limit:this.pageSize}),this.autoScroll&&i(0,800)}}},r=(a("LROu"),a("KHd+")),s=Object(r.a)(n,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"pagination-container",class:{hidden:e.hidden}},[a("el-pagination",e._b({attrs:{background:e.background,"current-page":e.currentPage,"page-size":e.pageSize,layout:e.layout,total:e.total},on:{"update:currentPage":function(t){e.currentPage=t},"update:pageSize":function(t){e.pageSize=t},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}},"el-pagination",e.$attrs,!1))],1)},[],!1,null,"2fc659d3",null);s.options.__file="index.vue";t.a=s.exports},Qvsb:function(e,t,a){},SStU:function(e,t,a){},XNyt:function(e,t,a){"use strict";var o=a("SStU");a.n(o).a},kbZS:function(e,t,a){"use strict";var o=a("4d7F"),i=a.n(o),n=a("vDqi"),r=a.n(n),s=a("XJYT"),l=a("Q2AE"),d=a("X4fA"),c=r.a.create({baseURL:"https://sandc.xyz:8889/wx",timeout:5e3});c.interceptors.request.use(function(e){return console.log("https://sandc.xyz:8889/wx","商品详情url"),l.a.getters.token&&(e.headers["X-Litemall-Admin-Token"]=Object(d.a)()),e},function(e){console.log(e),i.a.reject(e)}),c.interceptors.response.use(function(e){var t=e.data;return 501===t.code?(s.MessageBox.alert("系统未登录，请重新登录","错误",{confirmButtonText:"确定",type:"error"}).then(function(){l.a.dispatch("FedLogOut").then(function(){location.reload()})}),i.a.reject("error")):502===t.code?(s.MessageBox.alert("系统内部错误，请联系管理员维护","错误",{confirmButtonText:"确定",type:"error"}),i.a.reject("error")):503===t.code?(s.MessageBox.alert("请求业务目前未支持","警告",{confirmButtonText:"确定",type:"error"}),i.a.reject("error")):504===t.code?(s.MessageBox.alert("更新数据已经失效，请刷新页面重新操作","警告",{confirmButtonText:"确定",type:"error"}),i.a.reject("error")):505===t.code?(s.MessageBox.alert("更新失败，请再尝试一次","警告",{confirmButtonText:"确定",type:"error"}),i.a.reject("error")):506===t.code?(s.MessageBox.alert("没有操作权限，请联系管理员授权","错误",{confirmButtonText:"确定",type:"error"}),i.a.reject("error")):0!==t.code?i.a.reject(e):(console.log(e),e)},function(e){return console.log("err"+e),Object(s.Message)({message:"登录连接超时（后台不能连接，请联系系统管理员）",type:"error",duration:5e3}),i.a.reject(e)});var u=c;function p(e){return u({url:"/upload",method:"post",data:e})}a.d(t,"a",function(){return p})},rOcY:function(e,t,a){"use strict";(function(t){const o=a("33yf");e.exports={dev:{assetsSubDirectory:"static",assetsPublicPath:"/",proxyTable:{},host:"0.0.0.0",port:9527,autoOpenBrowser:!0,errorOverlay:!0,notifyOnErrors:!1,poll:!1,useEslint:!1,showEslintErrorsInOverlay:!1,devtool:"cheap-source-map",cssSourceMap:!1},build:{index:o.resolve(t,"../dist/index.html"),assetsRoot:o.resolve(t,"../dist"),assetsSubDirectory:"static",assetsPublicPath:"/",productionSourceMap:!1,devtool:"source-map",productionGzip:!1,productionGzipExtensions:["js","css"],bundleAnalyzerReport:Object({NODE_ENV:"production",ENV_CONFIG:"prod",BASE_API:"https://www.shaoshanlu.com:3389/",BASE_API_NEW:"https://sandc.xyz:8889/wx"}).npm_config_report||!1,generateAnalyzerReport:Object({NODE_ENV:"production",ENV_CONFIG:"prod",BASE_API:"https://www.shaoshanlu.com:3389/",BASE_API_NEW:"https://sandc.xyz:8889/wx"}).npm_config_generate_report||!1},baseApi:"https://www.shaoshanlu.com:3389/"}}).call(this,"/")},rs3x:function(e,t,a){"use strict";a.d(t,"b",function(){return i}),a.d(t,"a",function(){return o});a("t3Un"),a("vDqi");var o="http://47.106.171.65",i="https://www.shaoshanlu.com:3389/upload"}}]);