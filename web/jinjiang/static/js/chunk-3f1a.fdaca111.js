(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-3f1a"],{"5pIb":function(e,t,a){"use strict";a("t3Un")},AHWe:function(e,t,a){"use strict";a.r(t);var i=a("FyfS"),n=a.n(i),s=a("P2sY"),r=a.n(s),o=(a("wk8/"),a("5pIb"),a("vDqi")),l=a.n(o),d=a("rOcY"),u=(a("r35Q"),{name:"Recommend",filters:{statusFilter:function(e){return e?"是":"否"}},components:{Pagination:a("Mz3J").a},data:function(){return{list:null,total:0,listLoading:!0,listQuery:{page:1,limit:20,key:"",sort:"add_time",order:"desc"},shopId:"",shopIds:[],passwordForm:{password:""},dataForm:{id:"",referrer:"",user:"",status:!1},statuses:[!0,!1],users:[],referrers:[],dialogFormVisible:!1,dialogStatus:"",textMap:{update:"编辑",create:"创建"},rules:{username:[{required:!0,message:"用户名不能为空",trigger:"blur"}],mobile:[{required:!0,message:"手机号码不能为空",trigger:"blur"}]},downloadLoading:!1}},created:function(){this.getList()},methods:{getList:function(){var e=this;l()({method:"get",url:d.baseApi+"shop/find/all?&page="+(this.listQuery.page-1)+"&size=100",headers:{"X-Litemall-Admin-Token":sessionStorage.getItem("token")}}).then(function(t){e.shopIds=t.data.data.items.content}).catch(function(e){}),l()({method:"get",url:d.baseApi+"recommend/find/all?page="+(this.listQuery.page-1)+"&size=20",headers:{"X-Litemall-Admin-Token":sessionStorage.getItem("token")}}).then(function(t){if(0==t.data.code){e.list=t.data.data.items.content;for(var a=function(t){l()({method:"get",url:d.baseApi+"user/find/id?id="+e.list[t].referrer,headers:{"X-Litemall-Admin-Token":sessionStorage.getItem("token")}}).then(function(a){e.list[t].referrerName=a.data.data.items.username}).catch(function(e){}),l()({method:"get",url:d.baseApi+"user/find/id?id="+e.list[t].user,headers:{"X-Litemall-Admin-Token":sessionStorage.getItem("token")}}).then(function(a){e.list[t].userName=a.data.data.items.username}).catch(function(e){})},i=0;i<e.list.length;i++)a(i);e.total=t.data.data.items.totalPages,e.listLoading=!1}}).catch(function(t){e.list=[],e.total=0,e.listLoading=!1}),l()({method:"get",url:d.baseApi+"user/find/identity?identity=member&page="+(this.listQuery.page-1)+"&size=100",headers:{"X-Litemall-Admin-Token":sessionStorage.getItem("token")}}).then(function(t){e.referrers=t.data.data.items.content,e.users=t.data.data.items.content}).catch(function(e){})},changeShop:function(){var e=this,t=this.shopId;l()({method:"get",url:d.baseApi+"recommend/find/shopId?shopId="+t+"&page="+(this.listQuery.page-1)+"&size=20",headers:{"X-Litemall-Admin-Token":sessionStorage.getItem("token")}}).then(function(t){if(0==t.data.code){e.list=t.data.data.items.content;for(var a=function(t){l()({method:"get",url:d.baseApi+"user/find/id?id="+e.list[t].referrer,headers:{"X-Litemall-Admin-Token":sessionStorage.getItem("token")}}).then(function(a){e.list[t].referrerName=a.data.data.items.username}).catch(function(e){}),l()({method:"get",url:d.baseApi+"user/find/id?id="+e.list[t].user,headers:{"X-Litemall-Admin-Token":sessionStorage.getItem("token")}}).then(function(a){e.list[t].userName=a.data.data.items.username}).catch(function(e){})},i=0;i<e.list.length;i++)a(i);e.total=t.data.data.items.totalPages,e.listLoading=!1}}).catch(function(t){e.list=[],e.total=0,e.listLoading=!1}),l()({method:"get",url:d.baseApi+"user/find/identity-shopId?identity=member&shopId="+t+"&page="+(this.listQuery.page-1)+"&size=100",headers:{"X-Litemall-Admin-Token":sessionStorage.getItem("token")}}).then(function(t){e.referrers=t.data.data.items.content,e.users=t.data.data.items.content}).catch(function(e){})},handleFilter:function(){var e=this;this.listQuery.page=1,this.list=[],this.listLoading=!0,l()({method:"get",url:d.baseApi+"recommend/find/query?query="+this.listQuery.key+"&page="+(this.listQuery.page-1)+"&size=20",headers:{"X-Litemall-Admin-Token":sessionStorage.getItem("token")}}).then(function(t){if(0==t.data.code){e.list=t.data.data.items.content;for(var a=function(t){l()({method:"get",url:d.baseApi+"user/find/id?id="+e.list[t].referrer,headers:{"X-Litemall-Admin-Token":sessionStorage.getItem("token")}}).then(function(a){e.list[t].referrerName=a.data.data.items.username}).catch(function(e){}),l()({method:"get",url:d.baseApi+"user/find/id?id="+e.list[t].user,headers:{"X-Litemall-Admin-Token":sessionStorage.getItem("token")}}).then(function(a){e.list[t].userName=a.data.data.items.username}).catch(function(e){})},i=0;i<e.list.length;i++)a(i);e.total=t.data.data.items.totalPages,e.listLoading=!1}}).catch(function(t){e.list=[],e.total=0,e.listLoading=!1})},resetForm:function(){this.dataForm={id:"",referrer:"",user:"",status:!1}},handleCreate:function(){var e=this;this.resetForm(),this.dialogStatus="create",this.dialogFormVisible=!0,this.$nextTick(function(){e.$refs.dataForm.clearValidate()})},createData:function(){var e=this;this.$refs.dataForm.validate(function(t){t&&l()({method:"post",url:d.baseApi+"recommend/add",headers:{"X-Litemall-Admin-Token":sessionStorage.getItem("token")},data:e.dataForm}).then(function(t){0==t.data.code&&(e.list.unshift(t.data.data),e.dialogFormVisible=!1,e.$notify.success({title:"成功",message:"添加成功"}),e.listQuery.page=1,e.getList())}).catch(function(t){e.$notify.error({title:"失败",message:response.data.errmsg})})})},handleUpdate:function(e){var t=this;this.dataForm=r()({},e),this.dialogStatus="update",this.dialogFormVisible=!0,this.$nextTick(function(){t.$refs.dataForm.clearValidate()})},updateData:function(){var e=this;this.$refs.dataForm.validate(function(t){t&&l()({method:"put",url:d.baseApi+"recommend/update",headers:{"X-Litemall-Admin-Token":sessionStorage.getItem("token")},data:e.dataForm}).then(function(t){if(0==t.data.code){var a=!0,i=!1,s=void 0;try{for(var r,o=n()(e.list);!(a=(r=o.next()).done);a=!0){var u=r.value;if(u.id===e.dataForm.id)if("break"===function(){var t=e.list.indexOf(u);return e.list.splice(t,1,e.dataForm),l()({method:"get",url:d.baseApi+"user/find/id?id="+e.dataForm.referrer,headers:{"X-Litemall-Admin-Token":sessionStorage.getItem("token")}}).then(function(a){e.list[t].referrerName=a.data.data.items.username}).catch(function(e){}),l()({method:"get",url:d.baseApi+"user/find/id?id="+e.dataForm.user,headers:{"X-Litemall-Admin-Token":sessionStorage.getItem("token")}}).then(function(a){e.list[t].userName=a.data.data.items.username}).catch(function(e){}),"break"}())break}}catch(e){i=!0,s=e}finally{try{!a&&o.return&&o.return()}finally{if(i)throw s}}e.dialogFormVisible=!1,e.$notify.success({title:"成功",message:"更新成功"})}}).catch(function(t){e.$notify.error({title:"失败",message:response.data.errmsg})})})},handleDelete:function(e){var t=this;e.id;l()({method:"get",url:d.baseApi+"recommend/delete?id="+e.id,headers:{"X-Litemall-Admin-Token":sessionStorage.getItem("token")}}).then(function(a){if(0==a.data.code){var i=t.list.indexOf(e);t.list.splice(i,1),t.$notify.success({title:"成功",message:"删除成功"})}}).catch(function(e){t.$notify.error({title:"失败",message:response.data.errmsg})})}}}),c=a("KHd+"),m=Object(c.a)(u,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"filter-container"},[a("span",[e._v("酒庄选择")]),e._v(" "),a("el-select",{on:{change:e.changeShop},model:{value:e.shopId,callback:function(t){e.shopId=t},expression:"shopId"}},e._l(e.shopIds,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),e._v(" "),a("el-input",{staticClass:"filter-item",staticStyle:{width:"200px","margin-left":"200px"},attrs:{clearable:"",placeholder:"请输入关键词"},model:{value:e.listQuery.key,callback:function(t){e.$set(e.listQuery,"key",t)},expression:"listQuery.key"}}),e._v(" "),a("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v("查找")]),e._v(" "),a("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-edit"},on:{click:e.handleCreate}},[e._v("添加")])],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],attrs:{data:e.list,size:"small","element-loading-text":"正在查询中。。。",border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{align:"center",width:"100px",label:"ID",prop:"id",sortable:""}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"推荐人",prop:"referrerName"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"被推荐人",prop:"userName"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"是否推荐成功",prop:"status"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._f("statusFilter")(t.row.status)))]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作",width:"200","class-name":"small-padding fixed-width"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){e.handleUpdate(t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(a){e.handleDelete(t.row)}}},[e._v("删除")])]}}])})],1),e._v(" "),a("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{total:e.total,page:e.listQuery.page,limit:e.listQuery.limit},on:{"update:page":function(t){e.$set(e.listQuery,"page",t)},"update:limit":function(t){e.$set(e.listQuery,"limit",t)},pagination:e.getList}}),e._v(" "),a("el-dialog",{attrs:{title:e.textMap[e.dialogStatus],visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{ref:"dataForm",staticStyle:{width:"400px","margin-left":"50px"},attrs:{rules:e.rules,model:e.dataForm,"status-icon":"","label-position":"left","label-width":"100px"}},[a("el-form-item",{attrs:{label:"推荐人",prop:"referrer"}},[a("el-select",{model:{value:e.dataForm.referrer,callback:function(t){e.$set(e.dataForm,"referrer",t)},expression:"dataForm.referrer"}},e._l(e.referrers,function(e){return a("el-option",{key:e.id,attrs:{label:e.username,value:e.id}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"被推荐人",prop:"user"}},[a("el-select",{model:{value:e.dataForm.user,callback:function(t){e.$set(e.dataForm,"user",t)},expression:"dataForm.user"}},e._l(e.users,function(e){return a("el-option",{key:e.id,attrs:{label:e.username,value:e.id}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"状态",prop:"status"}},[a("el-select",{model:{value:e.dataForm.status,callback:function(t){e.$set(e.dataForm,"status",t)},expression:"dataForm.status"}},e._l(e.statuses,function(e){return a("el-option",{key:e,attrs:{label:e,value:e}})}))],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取消")]),e._v(" "),"create"==e.dialogStatus?a("el-button",{attrs:{type:"primary"},on:{click:e.createData}},[e._v("确定")]):a("el-button",{attrs:{type:"primary"},on:{click:e.updateData}},[e._v("确定")])],1)],1)],1)},[],!1,null,null,null);m.options.__file="recommend.vue";t.default=m.exports},LROu:function(e,t,a){"use strict";var i=a("Qvsb");a.n(i).a},Mz3J:function(e,t,a){"use strict";Math.easeInOutQuad=function(e,t,a,i){return(e/=i/2)<1?a/2*e*e+t:-a/2*(--e*(e-2)-1)+t};var i=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)};function n(e,t,a){var n=document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop,s=e-n,r=0;t=void 0===t?500:t;!function e(){r+=20,function(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e}(Math.easeInOutQuad(r,n,s,t)),r<t?i(e):a&&"function"==typeof a&&a()}()}var s={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(e){this.$emit("update:page",e)}},pageSize:{get:function(){return this.limit},set:function(e){this.$emit("update:limit",e)}}},methods:{handleSizeChange:function(e){this.$emit("pagination",{page:this.currentPage,limit:e}),this.autoScroll&&n(0,800)},handleCurrentChange:function(e){this.$emit("pagination",{page:e,limit:this.pageSize}),this.autoScroll&&n(0,800)}}},r=(a("LROu"),a("KHd+")),o=Object(r.a)(s,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"pagination-container",class:{hidden:e.hidden}},[a("el-pagination",e._b({attrs:{background:e.background,"current-page":e.currentPage,"page-size":e.pageSize,layout:e.layout,total:e.total},on:{"update:currentPage":function(t){e.currentPage=t},"update:pageSize":function(t){e.pageSize=t},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}},"el-pagination",e.$attrs,!1))],1)},[],!1,null,"2fc659d3",null);o.options.__file="index.vue";t.a=o.exports},Qvsb:function(e,t,a){},r35Q:function(e,t,a){"use strict";a.d(t,"a",function(){return n}),a.d(t,"b",function(){return s});var i=a("t3Un");function n(e,t){return Object(i.a)({url:e+"",method:"get",params:t})}function s(e,t){return Object(i.a)({url:e,method:"post",data:t})}},rOcY:function(e,t,a){"use strict";(function(t){const i=a("33yf");e.exports={dev:{assetsSubDirectory:"static",assetsPublicPath:"/",proxyTable:{},host:"0.0.0.0",port:9527,autoOpenBrowser:!0,errorOverlay:!0,notifyOnErrors:!1,poll:!1,useEslint:!1,showEslintErrorsInOverlay:!1,devtool:"cheap-source-map",cssSourceMap:!1},build:{index:i.resolve(t,"../dist/index.html"),assetsRoot:i.resolve(t,"../dist"),assetsSubDirectory:"static",assetsPublicPath:"/",productionSourceMap:!1,devtool:"source-map",productionGzip:!1,productionGzipExtensions:["js","css"],bundleAnalyzerReport:Object({NODE_ENV:"production",ENV_CONFIG:"prod",BASE_API:"https://www.shaoshanlu.com:3389/",BASE_API_NEW:"https://sandc.xyz:8889/wx"}).npm_config_report||!1,generateAnalyzerReport:Object({NODE_ENV:"production",ENV_CONFIG:"prod",BASE_API:"https://www.shaoshanlu.com:3389/",BASE_API_NEW:"https://sandc.xyz:8889/wx"}).npm_config_generate_report||!1},baseApi:"https://www.shaoshanlu.com:3389/"}}).call(this,"/")},"wk8/":function(e,t,a){"use strict";a("t3Un")}}]);