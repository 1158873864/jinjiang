(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-f946"],{"/ahL":function(t,e,i){"use strict";i.r(e);var n=i("YEIV"),a=i.n(n),o=i("BiX5"),l=i("Mz3J"),r=i("r35Q"),s={name:"complaint",components:{BackToTop:o.a,Pagination:l.a},data:function(){var t;return t={imageDialogVisible:!1,currentImage:"",detailDialogVisible:!1,total:0,dialogStatus:"",textMap:{update:"编辑",create:"创建"},galleryFileList:[],dialogVisible:!1,editForm:{id:"",name:""},list:[{name:"今日特价",data:"商品"},{name:"潮流穿搭",data:"直播间"},{name:"居家生活",data:"商品"}],listLoading:!0,listQuery:{page:1,limit:20,sort:"add_time",order:"desc"},goodsDetail:""},a()(t,"detailDialogVisible",!1),a()(t,"downloadLoading",!1),a()(t,"categoryList",[]),t},created:function(){this.getList()},methods:{getList:function(){var t=this;this.listLoading=!0,Object(r.c)("complaint/getByAdmin",this.listQuery).then(function(e){0==e.data.errno&&(t.list=e.data.data.items,t.total=e.data.data.total),console.log(e,"74447")})},lookImage:function(t){this.currentImage=t,this.imageDialogVisible=!0,console.log(t,799)},handleClose:function(){this.dialogVisible=!1},handleSubmit:function(){var t=this;Object(r.f)("announcement/edit",this.editForm).then(function(e){0==e.data.errno&&(t.$notify.success({title:"成功",message:"修改成功"}),t.getList()),console.log("dddd",e)}),this.dialogVisible=!1},handleCategoryChange:function(t){this.goods.categoryId=t[t.length-1]},handleFilter:function(){this.listQuery.page=1,this.getList()},handleCreate:function(){this.dialogStatus="create",this.dialogVisible=!0,this.editForm.title="",this.editForm.content="",this.galleryFileList=[]},handleCreateData:function(){var t=this;Object(r.e)("announcement/add",this.editForm).then(function(e){0===e.data.errno&&(console.log(e,"addd"),t.getList()),t.dialogVisible=!1})},handleUpdate:function(t,e){var i=this,n=0;3==e&&(n=100);var a={punishment:e,money:n,shopId:t.shopId,complaintid:t.id,id:t.id};Object(r.e)("complaint/function",a).then(function(t){0==t.data.errno&&i.$notify.success({title:"成功",message:"操作成功"}),console.log(t,78988)})},showDetail:function(t){this.goodsDetail=t,this.detailDialogVisible=!0},handleDelete:function(t){var e=this,i=t.status,n=t.id;Object(r.a)("complaint/delete?status="+i+"&complaintid="+n).then(function(t){console.log(t,"444"),0==t.data.errno&&(e.$notify.success({title:"成功",message:"删除成功"}),e.getList())})}}},u=(i("fl1I"),i("KHd+")),c=Object(u.a)(s,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"app-container"},[i("el-table",{attrs:{data:t.list,size:"small",border:"",fit:"","highlight-current-row":""}},[i("el-table-column",{attrs:{align:"center","min-width":"100",label:"店铺名称",prop:"shopName"}}),t._v(" "),i("el-table-column",{attrs:{align:"center","min-width":"100",label:"投诉内容",prop:"content"}}),t._v(" "),i("el-table-column",{attrs:{prop:"pictures",label:"描述图片"},scopedSlots:t._u([{key:"default",fn:function(e){return t._l(e.row.picUrl,function(e){return i("img",{staticClass:"head_pic",attrs:{src:e,width:"100",height:"100"},on:{click:function(i){t.lookImage(e)}}})})}}])}),t._v(" "),i("el-table-column",{attrs:{align:"center","min-width":"100",label:"发表时间",prop:"addTime"}}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"操作",width:"300","class-name":"small-padding fixed-width"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(i){t.handleUpdate(e.row,1)}}},[t._v("警告")]),t._v(" "),i("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(i){t.handleUpdate(e.row,3)}}},[t._v("扣款")]),t._v(" "),i("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(i){t.handleUpdate(e.row,2)}}},[t._v("封号")]),t._v(" "),i("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(i){t.handleDelete(e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),i("el-dialog",{attrs:{visible:t.imageDialogVisible},on:{"update:visible":function(e){t.imageDialogVisible=e}}},[i("div",[i("img",{staticClass:"head_pic",attrs:{src:t.currentImage,width:"350",height:"350"}})])]),t._v(" "),i("el-dialog",{attrs:{title:t.textMap[t.dialogStatus],visible:t.dialogVisible,width:"30%","before-close":t.handleClose},on:{"update:visible":function(e){t.dialogVisible=e}}},[i("el-form",{ref:"editForm"},[i("el-form-item",{attrs:{label:"投诉内容"}},[i("el-input",{attrs:{type:"textarea",rows:4,placeholder:"请输入内容"},model:{value:t.editForm.content,callback:function(e){t.$set(t.editForm,"content",e)},expression:"editForm.content"}})],1)],1),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),t._v(" "),"update"==t.dialogStatus?i("el-button",{attrs:{type:"primary"},on:{click:t.handleSubmit}},[t._v("确 定")]):i("el-button",{attrs:{type:"primary"},on:{click:t.handleCreateData}},[t._v("确 定")])],1)],1),t._v(" "),i("pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total>0"}],attrs:{total:t.total,page:t.listQuery.page,limit:t.listQuery.limit},on:{"update:page":function(e){t.$set(t.listQuery,"page",e)},"update:limit":function(e){t.$set(t.listQuery,"limit",e)},pagination:t.getList}}),t._v(" "),i("el-tooltip",{attrs:{placement:"top",content:"返回顶部"}},[i("back-to-top",{attrs:{"visibility-height":100}})],1)],1)},[],!1,null,null,null);c.options.__file="complaint.vue";e.default=c.exports},BiX5:function(t,e,i){"use strict";var n={name:"BackToTop",props:{visibilityHeight:{type:Number,default:400},backPosition:{type:Number,default:0},customStyle:{type:Object,default:function(){return{right:"50px",bottom:"50px",width:"40px",height:"40px","border-radius":"4px","line-height":"45px",background:"#e7eaf1"}}},transitionName:{type:String,default:"fade"}},data:function(){return{visible:!1,interval:null,isMoving:!1}},mounted:function(){window.addEventListener("scroll",this.handleScroll)},beforeDestroy:function(){window.removeEventListener("scroll",this.handleScroll),this.interval&&clearInterval(this.interval)},methods:{handleScroll:function(){this.visible=window.pageYOffset>this.visibilityHeight},backToTop:function(){var t=this;if(!this.isMoving){var e=window.pageYOffset,i=0;this.isMoving=!0,this.interval=setInterval(function(){var n=Math.floor(t.easeInOutQuad(10*i,e,-e,500));n<=t.backPosition?(window.scrollTo(0,t.backPosition),clearInterval(t.interval),t.isMoving=!1):window.scrollTo(0,n),i++},16.7)}},easeInOutQuad:function(t,e,i,n){return(t/=n/2)<1?i/2*t*t+e:-i/2*(--t*(t-2)-1)+e}}},a=(i("zXup"),i("KHd+")),o=Object(a.a)(n,function(){var t=this.$createElement,e=this._self._c||t;return e("transition",{attrs:{name:this.transitionName}},[e("div",{directives:[{name:"show",rawName:"v-show",value:this.visible,expression:"visible"}],staticClass:"back-to-ceiling",style:this.customStyle,on:{click:this.backToTop}},[e("svg",{staticClass:"Icon Icon--backToTopArrow",staticStyle:{height:"16px",width:"16px"},attrs:{width:"16",height:"16",viewBox:"0 0 17 17",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true"}},[e("title",[this._v("回到顶部")]),this._v(" "),e("g",[e("path",{attrs:{d:"M12.036 15.59c0 .55-.453.995-.997.995H5.032c-.55 0-.997-.445-.997-.996V8.584H1.03c-1.1 0-1.36-.633-.578-1.416L7.33.29c.39-.39 1.026-.385 1.412 0l6.878 6.88c.782.78.523 1.415-.58 1.415h-3.004v7.004z","fill-rule":"evenodd"}})])])])])},[],!1,null,"6172f71e",null);o.options.__file="index.vue";e.a=o.exports},LROu:function(t,e,i){"use strict";var n=i("Qvsb");i.n(n).a},Mz3J:function(t,e,i){"use strict";Math.easeInOutQuad=function(t,e,i,n){return(t/=n/2)<1?i/2*t*t+e:-i/2*(--t*(t-2)-1)+e};var n=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)};function a(t,e,i){var a=document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop,o=t-a,l=0;e=void 0===e?500:e;!function t(){l+=20,function(t){document.documentElement.scrollTop=t,document.body.parentNode.scrollTop=t,document.body.scrollTop=t}(Math.easeInOutQuad(l,a,o,e)),l<e?n(t):i&&"function"==typeof i&&i()}()}var o={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(t){this.$emit("update:page",t)}},pageSize:{get:function(){return this.limit},set:function(t){this.$emit("update:limit",t)}}},methods:{handleSizeChange:function(t){this.$emit("pagination",{page:this.currentPage,limit:t}),this.autoScroll&&a(0,800)},handleCurrentChange:function(t){this.$emit("pagination",{page:t,limit:this.pageSize}),this.autoScroll&&a(0,800)}}},l=(i("LROu"),i("KHd+")),r=Object(l.a)(o,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"pagination-container",class:{hidden:t.hidden}},[i("el-pagination",t._b({attrs:{background:t.background,"current-page":t.currentPage,"page-size":t.pageSize,layout:t.layout,total:t.total},on:{"update:currentPage":function(e){t.currentPage=e},"update:pageSize":function(e){t.pageSize=e},"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}},"el-pagination",t.$attrs,!1))],1)},[],!1,null,"2fc659d3",null);r.options.__file="index.vue";e.a=r.exports},Qq1F:function(t,e,i){},Qvsb:function(t,e,i){},"RU/L":function(t,e,i){i("Rqdy");var n=i("WEpk").Object;t.exports=function(t,e,i){return n.defineProperty(t,e,i)}},Rqdy:function(t,e,i){var n=i("Y7ZC");n(n.S+n.F*!i("jmDH"),"Object",{defineProperty:i("2faE").f})},SEkw:function(t,e,i){t.exports={default:i("RU/L"),__esModule:!0}},YEIV:function(t,e,i){"use strict";e.__esModule=!0;var n=function(t){return t&&t.__esModule?t:{default:t}}(i("SEkw"));e.default=function(t,e,i){return e in t?(0,n.default)(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}},bl7k:function(t,e,i){},fl1I:function(t,e,i){"use strict";var n=i("bl7k");i.n(n).a},r35Q:function(t,e,i){"use strict";i.d(e,"c",function(){return a}),i.d(e,"e",function(){return o}),i.d(e,"f",function(){return l}),i.d(e,"b",function(){return r}),i.d(e,"d",function(){return s}),i.d(e,"a",function(){return u});var n=i("t3Un");function a(t,e){return Object(n.a)({url:t+"",method:"get",params:e})}function o(t,e){return Object(n.a)({url:t,method:"post",data:e})}function l(t,e){return Object(n.a)({url:t,method:"put",data:e})}function r(t,e){return Object(n.a)({url:t+"/"+e,method:"post"})}function s(t){return Object(n.a)({url:t,method:"get"})}function u(t,e){return Object(n.a)({url:t,method:"delete",data:e})}},zXup:function(t,e,i){"use strict";var n=i("Qq1F");i.n(n).a}}]);