(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-31e2"],{"5pIb":function(e,t,a){"use strict";a("t3Un")},LROu:function(e,t,a){"use strict";var i=a("Qvsb");a.n(i).a},Mz3J:function(e,t,a){"use strict";Math.easeInOutQuad=function(e,t,a,i){return(e/=i/2)<1?a/2*e*e+t:-a/2*(--e*(e-2)-1)+t};var i=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)};function n(e,t,a){var n=document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop,o=e-n,l=0;t=void 0===t?500:t;!function e(){l+=20,function(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e}(Math.easeInOutQuad(l,n,o,t)),l<t?i(e):a&&"function"==typeof a&&a()}()}var o={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(e){this.$emit("update:page",e)}},pageSize:{get:function(){return this.limit},set:function(e){this.$emit("update:limit",e)}}},methods:{handleSizeChange:function(e){this.$emit("pagination",{page:this.currentPage,limit:e}),this.autoScroll&&n(0,800)},handleCurrentChange:function(e){this.$emit("pagination",{page:e,limit:this.pageSize}),this.autoScroll&&n(0,800)}}},l=(a("LROu"),a("KHd+")),r=Object(l.a)(o,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"pagination-container",class:{hidden:e.hidden}},[a("el-pagination",e._b({attrs:{background:e.background,"current-page":e.currentPage,"page-size":e.pageSize,layout:e.layout,total:e.total},on:{"update:currentPage":function(t){e.currentPage=t},"update:pageSize":function(t){e.pageSize=t},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}},"el-pagination",e.$attrs,!1))],1)},[],!1,null,"2fc659d3",null);r.options.__file="index.vue";t.a=r.exports},PU2x:function(e,t,a){"use strict";a.r(t);var i=a("FyfS"),n=a.n(i),o=a("P2sY"),l=a.n(o),r=(a("wk8/"),a("5pIb"),a("vDqi")),s=a.n(r),d=a("rOcY"),c=(a("r35Q"),{name:"User",filters:{},components:{Pagination:a("Mz3J").a},data:function(){return{list:null,total:0,listLoading:!0,listQuery:{page:1,limit:20,key:"",sort:"add_time",order:"desc"},passwordForm:{password:""},inde:[{label:"会员",value:"member"},{label:"股东",value:"shareholder"},{label:"员工",value:"staff"},{label:"庄主",value:"manager"}],dataForm:{id:"",username:"",openid:"",name:"",mobilePhone:"",defaultAddress:"",faceUrl:"",identity:"shareholder",birthday:"",email:"",remark:"",level:"",balance:0,takeBalance:0,integral:0,regtime:"",shopId:"",shareholderId:"",invest:0},levels:[],dialogFormVisible:!1,dialogStatus:"",textMap:{update:"编辑",create:"创建"},rules:{username:[{required:!0,message:"用户名不能为空",trigger:"blur"}],mobile:[{required:!0,message:"手机号码不能为空",trigger:"blur"}]},downloadLoading:!1}},created:function(){this.getList()},methods:{getList:function(){var e=this;s()({method:"get",url:d.baseApi+"user/find/identity?identity=shareholder&page="+(this.listQuery.page-1)+"&size=20",headers:{"X-Litemall-Admin-Token":sessionStorage.getItem("token")}}).then(function(t){if(0==t.data.code){e.list=t.data.data.items.content;for(var a=function(t){s()({method:"get",url:d.baseApi+"shop/find/id?id="+e.list[t].shopId,headers:{"X-Litemall-Admin-Token":sessionStorage.getItem("token")}}).then(function(a){console.log(a.data.data.items.name),e.list[t].shopName=a.data.data.items.name}).catch(function(e){})},i=0;i<e.list.length;i++)a(i);e.total=t.data.data.items.totalPages,e.listLoading=!1}}).catch(function(t){e.list=[],e.total=0,e.listLoading=!1}),s()({method:"get",url:d.baseApi+"shop/find/all?&page="+(this.listQuery.page-1)+"&size=100",headers:{"X-Litemall-Admin-Token":sessionStorage.getItem("token")}}).then(function(t){e.shopIds=t.data.data.items.content}).catch(function(e){})},handleFilter:function(){var e=this;this.listQuery.page=1,this.list=[],this.listLoading=!0,s()({method:"get",url:d.baseApi+"user/find/identity/query?identity=shareholder&query="+this.listQuery.key+"&page="+(this.listQuery.page-1)+"&size=20",headers:{"X-Litemall-Admin-Token":sessionStorage.getItem("token")}}).then(function(t){if(0==t.data.code){e.list=t.data.data.items.content;for(var a=function(t){s()({method:"get",url:d.baseApi+"shop/find/id?id="+e.list[t].shopId,headers:{"X-Litemall-Admin-Token":sessionStorage.getItem("token")}}).then(function(a){console.log(a.data.data.items.name),e.list[t].shopName=a.data.data.items.name}).catch(function(e){})},i=0;i<e.list.length;i++)a(i);e.total=t.data.data.items.totalPages,e.listLoading=!1}}).catch(function(t){e.list=[],e.total=0,e.listLoading=!1})},resetForm:function(){this.dataForm={id:"",username:"",openid:"",name:"",mobilePhone:"",defaultAddress:"",faceUrl:"",identity:"shareholder",birthday:"",email:"",remark:"",level:"",balance:0,takeBalance:0,integral:0,regtime:"",shopId:"",shareholderId:"",invest:0}},handleCreate:function(){var e=this;this.resetForm(),this.dialogStatus="create",this.dialogFormVisible=!0,this.$nextTick(function(){e.$refs.dataForm.clearValidate()})},createData:function(){var e=this;this.$refs.dataForm.validate(function(t){t&&s()({method:"post",url:d.baseApi+"user/add",headers:{"X-Litemall-Admin-Token":sessionStorage.getItem("token")},data:e.dataForm}).then(function(t){0==t.data.code&&(e.list.unshift(t.data.data),e.dialogFormVisible=!1,e.$notify.success({title:"成功",message:"添加用户成功"}),e.listQuery.page=1,e.getList())}).catch(function(t){e.$notify.error({title:"失败",message:response.data.errmsg})})})},handleUpdate:function(e){var t=this;this.dataForm=l()({},e),this.dialogStatus="update",this.dialogFormVisible=!0,this.$nextTick(function(){t.$refs.dataForm.clearValidate()})},updateData:function(){var e=this;this.$refs.dataForm.validate(function(t){t&&s()({method:"put",url:d.baseApi+"user/update",headers:{"X-Litemall-Admin-Token":sessionStorage.getItem("token")},data:e.dataForm}).then(function(t){if(0==t.data.code){var a=!0,i=!1,o=void 0;try{for(var l,r=n()(e.list);!(a=(l=r.next()).done);a=!0){var c=l.value;if(c.id===e.dataForm.id)if("break"===function(){var t=e.list.indexOf(c);return e.list.splice(t,1,e.dataForm),s()({method:"get",url:d.baseApi+"shop/find/id?id="+e.dataForm.shopId,headers:{"X-Litemall-Admin-Token":sessionStorage.getItem("token")}}).then(function(a){e.list[t].shopName=a.data.data.items.name}).catch(function(e){}),"break"}())break}}catch(e){i=!0,o=e}finally{try{!a&&r.return&&r.return()}finally{if(i)throw o}}e.dialogFormVisible=!1,e.$notify.success({title:"成功",message:"更新用户成功"})}}).catch(function(t){e.$notify.error({title:"失败",message:response.data.errmsg})})})},handleDelete:function(e){var t=this;e.id;s()({method:"get",url:d.baseApi+"user/delete?id="+e.id,headers:{"X-Litemall-Admin-Token":sessionStorage.getItem("token")}}).then(function(a){if(0==a.data.code){var i=t.list.indexOf(e);t.list.splice(i,1),t.$notify.success({title:"成功",message:"删除用户成功"})}}).catch(function(e){t.$notify.error({title:"失败",message:response.data.errmsg})})}}}),u=a("KHd+"),m=Object(u.a)(c,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"filter-container"},[a("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{clearable:"",placeholder:"请输入关键词"},model:{value:e.listQuery.key,callback:function(t){e.$set(e.listQuery,"key",t)},expression:"listQuery.key"}}),e._v(" "),a("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v("查找")]),e._v(" "),a("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-edit"},on:{click:e.handleCreate}},[e._v("添加")])],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],attrs:{data:e.list,size:"small","element-loading-text":"正在查询中。。。",border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{align:"center",width:"100px",label:"用户ID",prop:"id",sortable:""}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"用户名",prop:"username"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"微信openid",prop:"openid"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"姓名",prop:"name"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"手机号码",prop:"mobilePhone"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"生日",prop:"birthday"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"邮箱",prop:"email"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"余额",prop:"balance"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"提成账户",prop:"takeBalance"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"投资",prop:"invest"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"酒庄",prop:"shopName"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作",width:"200","class-name":"small-padding fixed-width"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){e.handleUpdate(t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(a){e.handleDelete(t.row)}}},[e._v("删除")])]}}])})],1),e._v(" "),a("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{total:e.total,page:e.listQuery.page,limit:e.listQuery.limit},on:{"update:page":function(t){e.$set(e.listQuery,"page",t)},"update:limit":function(t){e.$set(e.listQuery,"limit",t)},pagination:e.getList}}),e._v(" "),a("el-dialog",{attrs:{title:e.textMap[e.dialogStatus],visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{ref:"dataForm",staticStyle:{width:"400px","margin-left":"50px"},attrs:{rules:e.rules,model:e.dataForm,"status-icon":"","label-position":"left","label-width":"100px"}},[a("el-form-item",{attrs:{label:"用户名",prop:"username"}},[a("el-input",{model:{value:e.dataForm.username,callback:function(t){e.$set(e.dataForm,"username",t)},expression:"dataForm.username"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"微信openid",prop:"openid"}},[a("el-input",{model:{value:e.dataForm.openid,callback:function(t){e.$set(e.dataForm,"openid",t)},expression:"dataForm.openid"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"姓名",prop:"name"}},[a("el-input",{model:{value:e.dataForm.name,callback:function(t){e.$set(e.dataForm,"name",t)},expression:"dataForm.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"手机号码",prop:"mobilePhone"}},[a("el-input",{model:{value:e.dataForm.mobilePhone,callback:function(t){e.$set(e.dataForm,"mobilePhone",t)},expression:"dataForm.mobilePhone"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"生日",prop:"birthday"}},[a("el-date-picker",{attrs:{type:"date","value-format":"yyyy-MM-dd"},model:{value:e.dataForm.birthday,callback:function(t){e.$set(e.dataForm,"birthday",t)},expression:"dataForm.birthday"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"邮箱",prop:"email"}},[a("el-input",{model:{value:e.dataForm.email,callback:function(t){e.$set(e.dataForm,"email",t)},expression:"dataForm.email"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"余额",prop:"balance"}},[a("el-input",{model:{value:e.dataForm.balance,callback:function(t){e.$set(e.dataForm,"balance",t)},expression:"dataForm.balance"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"提成账户",prop:"takeBalance"}},[a("el-input",{model:{value:e.dataForm.takeBalance,callback:function(t){e.$set(e.dataForm,"takeBalance",t)},expression:"dataForm.takeBalance"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"投资",prop:"invest"}},[a("el-input",{model:{value:e.dataForm.invest,callback:function(t){e.$set(e.dataForm,"invest",t)},expression:"dataForm.invest"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"身份",prop:"identity"}},[a("el-select",{model:{value:e.dataForm.identity,callback:function(t){e.$set(e.dataForm,"identity",t)},expression:"dataForm.identity"}},e._l(e.inde,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"酒庄"}},[a("el-select",{model:{value:e.dataForm.shopId,callback:function(t){e.$set(e.dataForm,"shopId",t)},expression:"dataForm.shopId"}},e._l(e.shopIds,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取消")]),e._v(" "),"create"==e.dialogStatus?a("el-button",{attrs:{type:"primary"},on:{click:e.createData}},[e._v("确定")]):a("el-button",{attrs:{type:"primary"},on:{click:e.updateData}},[e._v("确定")])],1)],1)],1)},[],!1,null,null,null);m.options.__file="shareholder.vue";t.default=m.exports},Qvsb:function(e,t,a){},r35Q:function(e,t,a){"use strict";a.d(t,"a",function(){return n}),a.d(t,"b",function(){return o});var i=a("t3Un");function n(e,t){return Object(i.a)({url:e+"",method:"get",params:t})}function o(e,t){return Object(i.a)({url:e,method:"post",data:t})}},rOcY:function(e,t,a){"use strict";(function(t){const i=a("33yf");e.exports={dev:{assetsSubDirectory:"static",assetsPublicPath:"/",proxyTable:{},host:"0.0.0.0",port:9527,autoOpenBrowser:!0,errorOverlay:!0,notifyOnErrors:!1,poll:!1,useEslint:!1,showEslintErrorsInOverlay:!1,devtool:"cheap-source-map",cssSourceMap:!1},build:{index:i.resolve(t,"../dist/index.html"),assetsRoot:i.resolve(t,"../dist"),assetsSubDirectory:"static",assetsPublicPath:"/",productionSourceMap:!1,devtool:"source-map",productionGzip:!1,productionGzipExtensions:["js","css"],bundleAnalyzerReport:Object({NODE_ENV:"production",ENV_CONFIG:"prod",BASE_API:"https://sandc.xyz:8889/admin",BASE_API_NEW:"https://sandc.xyz:8889/wx"}).npm_config_report||!1,generateAnalyzerReport:Object({NODE_ENV:"production",ENV_CONFIG:"prod",BASE_API:"https://sandc.xyz:8889/admin",BASE_API_NEW:"https://sandc.xyz:8889/wx"}).npm_config_generate_report||!1},baseApi:"https://www.shaoshanlu.com:3389/"}}).call(this,"/")},"wk8/":function(e,t,a){"use strict";a("t3Un")}}]);