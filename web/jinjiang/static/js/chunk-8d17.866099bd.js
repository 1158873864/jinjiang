(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-8d17"],{"5pIb":function(t,e,a){"use strict";a("t3Un")},Hvue:function(t,e,a){"use strict";a.r(e);var i=a("FyfS"),n=a.n(i),o=a("P2sY"),l=a.n(o),s=(a("wk8/"),a("5pIb"),a("vDqi")),r=a.n(s),d=a("rOcY"),c=(a("r35Q"),{name:"User",filters:{},components:{Pagination:a("Mz3J").a},data:function(){return{list:null,total:0,listLoading:!0,listQuery:{page:1,limit:20,key:"",sort:"add_time",order:"desc"},passwordForm:{password:""},inde:[{label:"会员",value:"member"},{label:"股东",value:"shareholder"},{label:"员工",value:"staff"},{label:"庄主",value:"manager"}],dataForm:{id:"",username:"",openid:"",name:"",mobilePhone:"",defaultAddress:"",faceUrl:"",identity:"staff",birthday:"",email:"",remark:"",level:"",balance:0,takeBalance:0,integral:0,regtime:"",shopId:"",shareholderId:"",invest:0},shopId:"",shopIds:[],levels:[],dialogFormVisible:!1,dialogStatus:"",textMap:{update:"编辑",create:"创建"},rules:{username:[{required:!0,message:"用户名不能为空",trigger:"blur"}],mobile:[{required:!0,message:"手机号码不能为空",trigger:"blur"}]},downloadLoading:!1}},created:function(){this.getList()},methods:{getList:function(){var t=this;r()({method:"get",url:d.baseApi+"user/find/identity?identity=staff&page="+(this.listQuery.page-1)+"&size=20",headers:{"X-Litemall-Admin-Token":sessionStorage.getItem("token")}}).then(function(e){if(0==e.data.code){t.list=e.data.data.items.content;for(var a=function(e){r()({method:"get",url:d.baseApi+"shop/find/id?id="+t.list[e].shopId,headers:{"X-Litemall-Admin-Token":sessionStorage.getItem("token")}}).then(function(a){console.log(a.data.data.items.name),t.list[e].shopName=a.data.data.items.name}).catch(function(t){})},i=0;i<t.list.length;i++)a(i);t.total=e.data.data.items.totalPages,t.listLoading=!1}}).catch(function(e){t.list=[],t.total=0,t.listLoading=!1}),r()({method:"get",url:d.baseApi+"shop/find/all?&page="+(this.listQuery.page-1)+"&size=100",headers:{"X-Litemall-Admin-Token":sessionStorage.getItem("token")}}).then(function(e){t.shopIds=e.data.data.items.content}).catch(function(t){})},changeShop:function(){var t=this;this.shopId;r()({method:"get",url:d.baseApi+"user/find/identity-shopId?identity=staff&shopId="+this.shopId+"&page="+(this.listQuery.page-1)+"&size=20",headers:{"X-Litemall-Admin-Token":sessionStorage.getItem("token")}}).then(function(e){if(0==e.data.code){t.list=e.data.data.items.content;for(var a=function(e){r()({method:"get",url:d.baseApi+"shop/find/id?id="+t.list[e].shopId,headers:{"X-Litemall-Admin-Token":sessionStorage.getItem("token")}}).then(function(a){console.log(a.data.data.items.name),t.list[e].shopName=a.data.data.items.name}).catch(function(t){})},i=0;i<t.list.length;i++)a(i);t.total=e.data.data.items.totalPages,t.listLoading=!1}}).catch(function(e){t.list=[],t.total=0,t.listLoading=!1})},handleFilter:function(){var t=this;this.listQuery.page=1,this.list=[],this.listLoading=!0,r()({method:"get",url:d.baseApi+"user/find/identity/query?identity=staff&query="+this.listQuery.key+"&page="+(this.listQuery.page-1)+"&size=20",headers:{"X-Litemall-Admin-Token":sessionStorage.getItem("token")}}).then(function(e){if(0==e.data.code){t.list=e.data.data.items.content;for(var a=function(e){r()({method:"get",url:d.baseApi+"shop/find/id?id="+t.list[e].shopId,headers:{"X-Litemall-Admin-Token":sessionStorage.getItem("token")}}).then(function(a){console.log(a.data.data.items.name),t.list[e].shopName=a.data.data.items.name}).catch(function(t){})},i=0;i<t.list.length;i++)a(i);t.total=e.data.data.items.totalPages,t.listLoading=!1}}).catch(function(e){t.list=[],t.total=0,t.listLoading=!1})},resetForm:function(){this.dataForm={id:"",username:"",openid:"",name:"",mobilePhone:"",defaultAddress:"",faceUrl:"",identity:"staff",birthday:"",email:"",remark:"",level:"",balance:0,takeBalance:0,integral:0,regtime:"",shopId:this.shopId,shareholderId:"",invest:0}},handleCreate:function(){var t=this;this.resetForm(),this.dialogStatus="create",this.dialogFormVisible=!0,this.$nextTick(function(){t.$refs.dataForm.clearValidate()})},createData:function(){var t=this;this.$refs.dataForm.validate(function(e){e&&r()({method:"post",url:d.baseApi+"user/add",headers:{"X-Litemall-Admin-Token":sessionStorage.getItem("token")},data:t.dataForm}).then(function(e){0==e.data.code&&(t.list.unshift(e.data.data),t.dialogFormVisible=!1,t.$notify.success({title:"成功",message:"添加用户成功"}),t.listQuery.page=1,t.changeShop())}).catch(function(e){t.$notify.error({title:"失败",message:response.data.errmsg})})})},handleUpdate:function(t){var e=this;this.dataForm=l()({},t),this.dialogStatus="update",this.dialogFormVisible=!0,this.$nextTick(function(){e.$refs.dataForm.clearValidate()})},updateData:function(){var t=this;this.$refs.dataForm.validate(function(e){e&&r()({method:"put",url:d.baseApi+"user/update",headers:{"X-Litemall-Admin-Token":sessionStorage.getItem("token")},data:t.dataForm}).then(function(e){if(0==e.data.code){var a=!0,i=!1,o=void 0;try{for(var l,s=n()(t.list);!(a=(l=s.next()).done);a=!0){var c=l.value;if(c.id===t.dataForm.id)if("break"===function(){var e=t.list.indexOf(c);return t.list.splice(e,1,t.dataForm),r()({method:"get",url:d.baseApi+"shop/find/id?id="+t.dataForm.shopId,headers:{"X-Litemall-Admin-Token":sessionStorage.getItem("token")}}).then(function(a){t.list[e].shopName=a.data.data.items.name}).catch(function(t){}),"break"}())break}}catch(t){i=!0,o=t}finally{try{!a&&s.return&&s.return()}finally{if(i)throw o}}t.dialogFormVisible=!1,t.$notify.success({title:"成功",message:"更新用户成功"})}}).catch(function(e){t.$notify.error({title:"失败",message:response.data.errmsg})})})},handleDelete:function(t){var e=this;t.id;r()({method:"get",url:d.baseApi+"user/delete?id="+t.id,headers:{"X-Litemall-Admin-Token":sessionStorage.getItem("token")}}).then(function(a){if(0==a.data.code){var i=e.list.indexOf(t);e.list.splice(i,1),e.$notify.success({title:"成功",message:"删除用户成功"})}}).catch(function(t){e.$notify.error({title:"失败",message:response.data.errmsg})})}}}),u=a("KHd+"),m=Object(u.a)(c,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"filter-container"},[a("span",[t._v("酒庄选择")]),t._v(" "),a("el-select",{on:{change:t.changeShop},model:{value:t.shopId,callback:function(e){t.shopId=e},expression:"shopId"}},t._l(t.shopIds,function(t){return a("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})),t._v(" "),a("el-input",{staticClass:"filter-item",staticStyle:{width:"200px","margin-left":"300px"},attrs:{clearable:"",placeholder:"请输入关键词"},model:{value:t.listQuery.key,callback:function(e){t.$set(t.listQuery,"key",e)},expression:"listQuery.key"}}),t._v(" "),a("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.handleFilter}},[t._v("查找")]),t._v(" "),a("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-edit"},on:{click:t.handleCreate}},[t._v("添加")])],1),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],attrs:{data:t.list,size:"small","element-loading-text":"正在查询中。。。",border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{align:"center",width:"100px",label:"用户ID",prop:"id",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"用户名",prop:"username"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"微信openid",prop:"openid"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"姓名",prop:"name"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"手机号码",prop:"mobilePhone"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"生日",prop:"birthday"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"邮箱",prop:"email"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"余额",prop:"balance"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"酒庄",prop:"shopName"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作",width:"200","class-name":"small-padding fixed-width"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){t.handleUpdate(e.row)}}},[t._v("编辑")]),t._v(" "),a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(a){t.handleDelete(e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),a("pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total>0"}],attrs:{total:t.total,page:t.listQuery.page,limit:t.listQuery.limit},on:{"update:page":function(e){t.$set(t.listQuery,"page",e)},"update:limit":function(e){t.$set(t.listQuery,"limit",e)},pagination:t.getList}}),t._v(" "),a("el-dialog",{attrs:{title:t.textMap[t.dialogStatus],visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[a("el-form",{ref:"dataForm",staticStyle:{width:"400px","margin-left":"50px"},attrs:{rules:t.rules,model:t.dataForm,"status-icon":"","label-position":"left","label-width":"100px"}},[a("el-form-item",{attrs:{label:"用户名",prop:"username"}},[a("el-input",{model:{value:t.dataForm.username,callback:function(e){t.$set(t.dataForm,"username",e)},expression:"dataForm.username"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"微信openid",prop:"openid"}},[a("el-input",{model:{value:t.dataForm.openid,callback:function(e){t.$set(t.dataForm,"openid",e)},expression:"dataForm.openid"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"姓名",prop:"name"}},[a("el-input",{model:{value:t.dataForm.name,callback:function(e){t.$set(t.dataForm,"name",e)},expression:"dataForm.name"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"手机号码",prop:"mobilePhone"}},[a("el-input",{model:{value:t.dataForm.mobilePhone,callback:function(e){t.$set(t.dataForm,"mobilePhone",e)},expression:"dataForm.mobilePhone"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"生日",prop:"birthday"}},[a("el-date-picker",{attrs:{type:"date","value-format":"yyyy-MM-dd"},model:{value:t.dataForm.birthday,callback:function(e){t.$set(t.dataForm,"birthday",e)},expression:"dataForm.birthday"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"邮箱",prop:"email"}},[a("el-input",{model:{value:t.dataForm.email,callback:function(e){t.$set(t.dataForm,"email",e)},expression:"dataForm.email"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"余额",prop:"balance"}},[a("el-input",{model:{value:t.dataForm.balance,callback:function(e){t.$set(t.dataForm,"balance",e)},expression:"dataForm.balance"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"身份",prop:"identity"}},[a("el-select",{model:{value:t.dataForm.identity,callback:function(e){t.$set(t.dataForm,"identity",e)},expression:"dataForm.identity"}},t._l(t.inde,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取消")]),t._v(" "),"create"==t.dialogStatus?a("el-button",{attrs:{type:"primary"},on:{click:t.createData}},[t._v("确定")]):a("el-button",{attrs:{type:"primary"},on:{click:t.updateData}},[t._v("确定")])],1)],1)],1)},[],!1,null,null,null);m.options.__file="staff.vue";e.default=m.exports},LROu:function(t,e,a){"use strict";var i=a("Qvsb");a.n(i).a},Mz3J:function(t,e,a){"use strict";Math.easeInOutQuad=function(t,e,a,i){return(t/=i/2)<1?a/2*t*t+e:-a/2*(--t*(t-2)-1)+e};var i=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)};function n(t,e,a){var n=document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop,o=t-n,l=0;e=void 0===e?500:e;!function t(){l+=20,function(t){document.documentElement.scrollTop=t,document.body.parentNode.scrollTop=t,document.body.scrollTop=t}(Math.easeInOutQuad(l,n,o,e)),l<e?i(t):a&&"function"==typeof a&&a()}()}var o={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(t){this.$emit("update:page",t)}},pageSize:{get:function(){return this.limit},set:function(t){this.$emit("update:limit",t)}}},methods:{handleSizeChange:function(t){this.$emit("pagination",{page:this.currentPage,limit:t}),this.autoScroll&&n(0,800)},handleCurrentChange:function(t){this.$emit("pagination",{page:t,limit:this.pageSize}),this.autoScroll&&n(0,800)}}},l=(a("LROu"),a("KHd+")),s=Object(l.a)(o,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"pagination-container",class:{hidden:t.hidden}},[a("el-pagination",t._b({attrs:{background:t.background,"current-page":t.currentPage,"page-size":t.pageSize,layout:t.layout,total:t.total},on:{"update:currentPage":function(e){t.currentPage=e},"update:pageSize":function(e){t.pageSize=e},"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}},"el-pagination",t.$attrs,!1))],1)},[],!1,null,"2fc659d3",null);s.options.__file="index.vue";e.a=s.exports},Qvsb:function(t,e,a){},r35Q:function(t,e,a){"use strict";a.d(e,"a",function(){return n}),a.d(e,"b",function(){return o});var i=a("t3Un");function n(t,e){return Object(i.a)({url:t+"",method:"get",params:e})}function o(t,e){return Object(i.a)({url:t,method:"post",data:e})}},rOcY:function(t,e,a){"use strict";(function(e){const i=a("33yf");t.exports={dev:{assetsSubDirectory:"static",assetsPublicPath:"/",proxyTable:{},host:"0.0.0.0",port:9527,autoOpenBrowser:!0,errorOverlay:!0,notifyOnErrors:!1,poll:!1,useEslint:!1,showEslintErrorsInOverlay:!1,devtool:"cheap-source-map",cssSourceMap:!1},build:{index:i.resolve(e,"../dist/index.html"),assetsRoot:i.resolve(e,"../dist"),assetsSubDirectory:"static",assetsPublicPath:"/",productionSourceMap:!1,devtool:"source-map",productionGzip:!1,productionGzipExtensions:["js","css"],bundleAnalyzerReport:Object({NODE_ENV:"production",ENV_CONFIG:"prod",BASE_API:"https://sandc.xyz:8889/admin",BASE_API_NEW:"https://sandc.xyz:8889/wx"}).npm_config_report||!1,generateAnalyzerReport:Object({NODE_ENV:"production",ENV_CONFIG:"prod",BASE_API:"https://sandc.xyz:8889/admin",BASE_API_NEW:"https://sandc.xyz:8889/wx"}).npm_config_generate_report||!1},baseApi:"https://www.shaoshanlu.com:3389/"}}).call(this,"/")},"wk8/":function(t,e,a){"use strict";a("t3Un")}}]);