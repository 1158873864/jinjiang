(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-d33d"],{BiX5:function(t,e,i){"use strict";var n={name:"BackToTop",props:{visibilityHeight:{type:Number,default:400},backPosition:{type:Number,default:0},customStyle:{type:Object,default:function(){return{right:"50px",bottom:"50px",width:"40px",height:"40px","border-radius":"4px","line-height":"45px",background:"#e7eaf1"}}},transitionName:{type:String,default:"fade"}},data:function(){return{visible:!1,interval:null,isMoving:!1}},mounted:function(){window.addEventListener("scroll",this.handleScroll)},beforeDestroy:function(){window.removeEventListener("scroll",this.handleScroll),this.interval&&clearInterval(this.interval)},methods:{handleScroll:function(){this.visible=window.pageYOffset>this.visibilityHeight},backToTop:function(){var t=this;if(!this.isMoving){var e=window.pageYOffset,i=0;this.isMoving=!0,this.interval=setInterval(function(){var n=Math.floor(t.easeInOutQuad(10*i,e,-e,500));n<=t.backPosition?(window.scrollTo(0,t.backPosition),clearInterval(t.interval),t.isMoving=!1):window.scrollTo(0,n),i++},16.7)}},easeInOutQuad:function(t,e,i,n){return(t/=n/2)<1?i/2*t*t+e:-i/2*(--t*(t-2)-1)+e}}},o=(i("zXup"),i("KHd+")),a=Object(o.a)(n,function(){var t=this.$createElement,e=this._self._c||t;return e("transition",{attrs:{name:this.transitionName}},[e("div",{directives:[{name:"show",rawName:"v-show",value:this.visible,expression:"visible"}],staticClass:"back-to-ceiling",style:this.customStyle,on:{click:this.backToTop}},[e("svg",{staticClass:"Icon Icon--backToTopArrow",staticStyle:{height:"16px",width:"16px"},attrs:{width:"16",height:"16",viewBox:"0 0 17 17",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true"}},[e("title",[this._v("回到顶部")]),this._v(" "),e("g",[e("path",{attrs:{d:"M12.036 15.59c0 .55-.453.995-.997.995H5.032c-.55 0-.997-.445-.997-.996V8.584H1.03c-1.1 0-1.36-.633-.578-1.416L7.33.29c.39-.39 1.026-.385 1.412 0l6.878 6.88c.782.78.523 1.415-.58 1.415h-3.004v7.004z","fill-rule":"evenodd"}})])])])])},[],!1,null,"6172f71e",null);a.options.__file="index.vue";e.a=a.exports},HziX:function(t,e,i){"use strict";(function(t){i.d(e,"a",function(){return o});var n=function(){return"undefined"!=typeof window?window:t},o=function(){var t=n();return t&&t.tinymce?t.tinymce:null}}).call(this,i("yLpj"))},LROu:function(t,e,i){"use strict";var n=i("Qvsb");i.n(n).a},Mz3J:function(t,e,i){"use strict";Math.easeInOutQuad=function(t,e,i,n){return(t/=n/2)<1?i/2*t*t+e:-i/2*(--t*(t-2)-1)+e};var n=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)};function o(t,e,i){var o=document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop,a=t-o,r=0;e=void 0===e?500:e;!function t(){r+=20,function(t){document.documentElement.scrollTop=t,document.body.parentNode.scrollTop=t,document.body.scrollTop=t}(Math.easeInOutQuad(r,o,a,e)),r<e?n(t):i&&"function"==typeof i&&i()}()}var a={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(t){this.$emit("update:page",t)}},pageSize:{get:function(){return this.limit},set:function(t){this.$emit("update:limit",t)}}},methods:{handleSizeChange:function(t){this.$emit("pagination",{page:this.currentPage,limit:t}),this.autoScroll&&o(0,800)},handleCurrentChange:function(t){this.$emit("pagination",{page:t,limit:this.pageSize}),this.autoScroll&&o(0,800)}}},r=(i("LROu"),i("KHd+")),l=Object(r.a)(a,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"pagination-container",class:{hidden:t.hidden}},[i("el-pagination",t._b({attrs:{background:t.background,"current-page":t.currentPage,"page-size":t.pageSize,layout:t.layout,total:t.total},on:{"update:currentPage":function(e){t.currentPage=e},"update:pageSize":function(e){t.pageSize=e},"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}},"el-pagination",t.$attrs,!1))],1)},[],!1,null,"2fc659d3",null);l.options.__file="index.vue";e.a=l.exports},Qq1F:function(t,e,i){},Qvsb:function(t,e,i){},T4eq:function(t,e,i){},mRed:function(t,e,i){"use strict";var n=["onActivate","onAddUndo","onBeforeAddUndo","onBeforeExecCommand","onBeforeGetContent","onBeforeRenderUI","onBeforeSetContent","onBeforePaste","onBlur","onChange","onClearUndos","onClick","onContextMenu","onCopy","onCut","onDblclick","onDeactivate","onDirty","onDrag","onDragDrop","onDragEnd","onDragGesture","onDragOver","onDrop","onExecCommand","onFocus","onFocusIn","onFocusOut","onGetContent","onHide","onInit","onKeyDown","onKeyPress","onKeyUp","onLoadContent","onMouseDown","onMouseEnter","onMouseLeave","onMouseMove","onMouseOut","onMouseOver","onMouseUp","onNodeChange","onObjectResizeStart","onObjectResized","onObjectSelected","onPaste","onPostProcess","onPostRender","onPreProcess","onProgressState","onRedo","onRemove","onReset","onSaveContent","onSelectionChange","onSetAttrib","onSetContent","onShow","onSubmit","onUndo","onVisualAid"],o=function(t){return-1!==n.indexOf(t)},a=function(t,e,i){var n=e.$props.value?e.$props.value:"",a=e.$props.initialValue?e.$props.initialValue:"";i.setContent(n||a),e.$listeners.input&&function(t,e){var i,n=t.$props.modelEvents?t.$props.modelEvents:null,o=Array.isArray(n)?n.join(" "):n;t.$watch("value",function(t,n){e&&"string"==typeof t&&t!==i&&t!==n&&(e.setContent(t),i=t)}),e.on(o||"change keyup undo redo",function(){i=e.getContent(),t.$emit("input",i)})}(e,i),function(t,e,i){Object.keys(e).filter(o).forEach(function(n){var o=e[n];"function"==typeof o&&("onInit"===n?o(t,i):i.on(n.substring(2),function(t){return o(t,i)}))})}(t,e.$listeners,i)},r=0,l=function(t){var e=(new Date).getTime();return t+"_"+Math.floor(1e9*Math.random())+ ++r+String(e)},s=function(t){return void 0===t||""===t?[]:Array.isArray(t)?t:t.split(" ")},c=i("HziX"),u={apiKey:String,cloudChannel:String,id:String,init:Object,initialValue:String,inline:Boolean,modelEvents:[String,Array],plugins:[String,Array],tagName:String,toolbar:[String,Array],value:String,disabled:Boolean},d=Object.assign||function(t){for(var e,i=1,n=arguments.length;i<n;i++)for(var o in e=arguments[i])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},p={listeners:[],scriptId:l("tiny-script"),scriptLoaded:!1},m=function(t){return function(){var e=d({},t.$props.init,{readonly:t.$props.disabled,selector:"#"+t.elementId,plugins:function(t,e){return s(t).concat(s(e))}(t.$props.init&&t.$props.init.plugins,t.$props.plugins),toolbar:t.$props.toolbar||t.$props.init&&t.$props.init.toolbar,inline:t.inlineEditor,setup:function(e){t.editor=e,e.on("init",function(i){return a(i,t,e)}),t.$props.init&&"function"==typeof t.$props.init.setup&&t.$props.init.setup(e)}});(function(t){return null!==t&&"textarea"===t.tagName.toLowerCase()})(t.element)&&(t.element.style.visibility=""),Object(c.a)().init(e)}},f={props:u,created:function(){this.elementId=this.$props.id||l("tiny-vue"),this.inlineEditor=this.$props.init&&this.$props.init.inline||this.$props.inline},watch:{disabled:function(){this.editor.setMode(this.disabled?"readonly":"design")}},mounted:function(){if(this.element=this.$el,null!==Object(c.a)())m(this)();else if(this.element){var t=this.element.ownerDocument,e=this.$props.cloudChannel?this.$props.cloudChannel:"stable",i=this.$props.apiKey?this.$props.apiKey:"";!function(t,e,i,n){t.scriptLoaded?n():(t.listeners.push(n),e.getElementById(t.scriptId)||function(t,e,i,n){var o=e.createElement("script");o.type="application/javascript",o.id=t,o.addEventListener("load",n),o.src=i,e.head.appendChild(o)}(t.scriptId,e,i,function(){t.listeners.forEach(function(t){return t()}),t.scriptLoaded=!0}))}(p,t,"https://cloud.tinymce.com/"+e+"/tinymce.min.js?apiKey="+i,m(this))}},beforeDestroy:function(){null!==Object(c.a)()&&Object(c.a)().remove(this.editor)},render:function(t){return this.inlineEditor?function(t,e,i){return t(i||"div",{attrs:{id:e}})}(t,this.elementId,this.$props.tagName):function(t,e){return t("textarea",{attrs:{id:e},style:{visibility:"hidden"}})}(t,this.elementId)}};e.a=f},rs3x:function(t,e,i){"use strict";i.d(e,"a",function(){return o}),i.d(e,"c",function(){return a}),i.d(e,"b",function(){return r});var n=i("t3Un");i("vDqi");function o(t){return Object(n.a)({url:"/storage/create",method:"post",data:t})}var a="https://sandc.xyz:8889/wx/storage/upload",r="https://sandc.xyz:8889/wx/storage/fetch"},sXKu:function(t,e,i){"use strict";i.r(e);var n=i("FyfS"),o=i.n(n),a=i("P2sY"),r=i.n(a),l=i("t3Un");var s=i("rs3x"),c=i("BiX5"),u=i("mRed"),d=i("Mz3J"),p=i("X4fA"),m={name:"Topic",components:{BackToTop:c.a,Editor:u.a,Pagination:d.a},data:function(){return{uploadPath:s.c,list:void 0,total:0,listLoading:!0,listQuery:{page:1,limit:20,title:void 0,subtitle:void 0,sort:"add_time",order:"desc"},dataForm:{id:void 0,titile:void 0,subtitle:void 0,picUrl:void 0,content:"",price:void 0,readCount:void 0,goods:[]},contentDetail:"",contentDialogVisible:!1,dialogFormVisible:!1,dialogStatus:"",textMap:{update:"编辑",create:"创建"},rules:{title:[{required:!0,message:"专题标题不能为空",trigger:"blur"}],subtitle:[{required:!0,message:"专题子标题不能为空",trigger:"blur"}],content:[{required:!0,message:"专题内容不能为空",trigger:"blur"}]},downloadLoading:!1,editorInit:{language:"zh_CN",convert_urls:!1,plugins:["advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools importcss insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount"],toolbar:["searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample","hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen"],images_upload_handler:function(t,e,i){var n=new FormData;n.append("file",t.blob()),Object(s.a)(n).then(function(t){e(t.data.data.url)}).catch(function(){i("上传失败，请重新上传")})}}}},computed:{headers:function(){return{"X-Litemall-Admin-Token":Object(p.a)()}}},created:function(){this.getList()},methods:{getList:function(){var t=this;this.listLoading=!0,function(t){return Object(l.a)({url:"/topic/list",method:"get",params:t})}(this.listQuery).then(function(e){t.list=e.data.data.items,t.total=e.data.data.total,t.listLoading=!1}).catch(function(){t.list=[],t.total=0,t.listLoading=!1})},handleFilter:function(){this.listQuery.page=1,this.getList()},resetForm:function(){this.dataForm={id:void 0,titile:void 0,subtitle:void 0,picUrl:void 0,content:"",price:void 0,readCount:void 0,goods:[]}},handleCreate:function(){var t=this;this.resetForm(),this.dialogStatus="create",this.dialogFormVisible=!0,this.$nextTick(function(){t.$refs.dataForm.clearValidate()})},uploadPicUrl:function(t){this.dataForm.picUrl=t.data.url},createData:function(){var t=this;this.$refs.dataForm.validate(function(e){e&&function(t){return Object(l.a)({url:"/topic/create",method:"post",data:t})}(t.dataForm).then(function(e){t.list.unshift(e.data.data),t.dialogFormVisible=!1,t.$notify.success({title:"成功",message:"创建专题成功"})}).catch(function(e){t.$notify.error({title:"失败",message:e.data.errmsg})})})},showContent:function(t){this.contentDetail=t,this.contentDialogVisible=!0},handleUpdate:function(t){var e=this;this.dataForm=r()({},t),this.dialogStatus="update",this.dialogFormVisible=!0,this.$nextTick(function(){e.$refs.dataForm.clearValidate()})},updateData:function(){var t=this;this.$refs.dataForm.validate(function(e){e&&function(t){return Object(l.a)({url:"/topic/update",method:"post",data:t})}(t.dataForm).then(function(){var e=!0,i=!1,n=void 0;try{for(var a,r=o()(t.list);!(e=(a=r.next()).done);e=!0){var l=a.value;if(l.id===t.dataForm.id){var s=t.list.indexOf(l);t.list.splice(s,1,t.dataForm);break}}}catch(t){i=!0,n=t}finally{try{!e&&r.return&&r.return()}finally{if(i)throw n}}t.dialogFormVisible=!1,t.$notify.success({title:"成功",message:"更新专题成功"})}).catch(function(e){t.$notify.error({title:"失败",message:e.data.errmsg})})})},handleDelete:function(t){var e=this;(function(t){return Object(l.a)({url:"/topic/delete",method:"post",data:t})})(t).then(function(i){e.$notify.success({title:"成功",message:"删除专题成功"});var n=e.list.indexOf(t);e.list.splice(n,1)}).catch(function(t){e.$notify.error({title:"失败",message:t.data.errmsg})})},handleDownload:function(){var t=this;this.downloadLoading=!0,Promise.all([i.e("chunk-0d49"),i.e("chunk-179f")]).then(i.bind(null,"S/jZ")).then(function(e){e.export_json_to_excel2(["专题ID","专题标题","专题子标题","专题内容","专题图片","商品低价","阅读量","专题商品"],t.list,["id","title","subtitle","content","picUrl","price","readCount","goods"],"专题信息"),t.downloadLoading=!1})}}},f=(i("wwUi"),i("KHd+")),h=Object(f.a)(m,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"app-container"},[i("div",{staticClass:"filter-container"},[i("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{clearable:"",placeholder:"请输入专题标题"},model:{value:t.listQuery.title,callback:function(e){t.$set(t.listQuery,"title",e)},expression:"listQuery.title"}}),t._v(" "),i("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{clearable:"",placeholder:"请输入专题子标题"},model:{value:t.listQuery.subtitle,callback:function(e){t.$set(t.listQuery,"subtitle",e)},expression:"listQuery.subtitle"}}),t._v(" "),i("el-button",{directives:[{name:"permission",rawName:"v-permission",value:["GET /admin/topic/list"],expression:"['GET /admin/topic/list']"}],staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.handleFilter}},[t._v("查找")]),t._v(" "),i("el-button",{directives:[{name:"permission",rawName:"v-permission",value:["POST /admin/topic/create"],expression:"['POST /admin/topic/create']"}],staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-edit"},on:{click:t.handleCreate}},[t._v("添加")]),t._v(" "),i("el-button",{staticClass:"filter-item",attrs:{loading:t.downloadLoading,type:"primary",icon:"el-icon-download"},on:{click:t.handleDownload}},[t._v("导出")])],1),t._v(" "),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],attrs:{data:t.list,size:"small","element-loading-text":"正在查询中。。。",border:"",fit:"","highlight-current-row":""}},[i("el-table-column",{attrs:{align:"center",label:"专题标题",prop:"title"}}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"专题子标题","min-width":"200",prop:"subtitle"}}),t._v(" "),i("el-table-column",{attrs:{align:"center",property:"picUrl",label:"图片"},scopedSlots:t._u([{key:"default",fn:function(t){return[i("img",{attrs:{src:t.row.picUrl,width:"80"}})]}}])}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"专题详情",prop:"content"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-dialog",{attrs:{visible:t.contentDialogVisible,title:"专题详情"},on:{"update:visible":function(e){t.contentDialogVisible=e}}},[i("div",{domProps:{innerHTML:t._s(t.contentDetail)}})]),t._v(" "),i("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(i){t.showContent(e.row.content)}}},[t._v("查看")])]}}])}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"底价",prop:"price"}}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"阅读数量",prop:"readCount"}}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"操作","min-width":"200","class-name":"small-padding fixed-width"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{directives:[{name:"permission",rawName:"v-permission",value:["POST /admin/topic/update"],expression:"['POST /admin/topic/update']"}],attrs:{type:"primary",size:"mini"},on:{click:function(i){t.handleUpdate(e.row)}}},[t._v("编辑")]),t._v(" "),i("el-button",{directives:[{name:"permission",rawName:"v-permission",value:["POST /admin/topic/delete"],expression:"['POST /admin/topic/delete']"}],attrs:{type:"danger",size:"mini"},on:{click:function(i){t.handleDelete(e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),i("pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total>0"}],attrs:{total:t.total,page:t.listQuery.page,limit:t.listQuery.limit},on:{"update:page":function(e){t.$set(t.listQuery,"page",e)},"update:limit":function(e){t.$set(t.listQuery,"limit",e)},pagination:t.getList}}),t._v(" "),i("el-tooltip",{attrs:{placement:"top",content:"返回顶部"}},[i("back-to-top",{attrs:{"visibility-height":100}})],1),t._v(" "),i("el-dialog",{attrs:{title:t.textMap[t.dialogStatus],visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[i("el-form",{ref:"dataForm",staticStyle:{width:"400px","margin-left":"50px"},attrs:{rules:t.rules,model:t.dataForm,"status-icon":"","label-position":"left","label-width":"100px"}},[i("el-form-item",{attrs:{label:"专题标题",prop:"title"}},[i("el-input",{model:{value:t.dataForm.title,callback:function(e){t.$set(t.dataForm,"title",e)},expression:"dataForm.title"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"专题子标题",prop:"subtitle"}},[i("el-input",{model:{value:t.dataForm.subtitle,callback:function(e){t.$set(t.dataForm,"subtitle",e)},expression:"dataForm.subtitle"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"专题图片",prop:"picUrl"}},[i("el-upload",{staticClass:"avatar-uploader",attrs:{headers:t.headers,action:t.uploadPath,"show-file-list":!1,"on-success":t.uploadPicUrl,accept:".jpg,.jpeg,.png,.gif"}},[t.dataForm.picUrl?i("img",{staticClass:"avatar",attrs:{src:t.dataForm.picUrl}}):i("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),t._v(" "),i("el-form-item",{staticStyle:{width:"700px"},attrs:{label:"专题内容"}},[i("editor",{attrs:{init:t.editorInit},model:{value:t.dataForm.content,callback:function(e){t.$set(t.dataForm,"content",e)},expression:"dataForm.content"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"商品低价",prop:"price"}},[i("el-input",{model:{value:t.dataForm.price,callback:function(e){t.$set(t.dataForm,"price",e)},expression:"dataForm.price"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"阅读量",prop:"readCount"}},[i("el-input",{model:{value:t.dataForm.readCount,callback:function(e){t.$set(t.dataForm,"readCount",e)},expression:"dataForm.readCount"}})],1)],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取消")]),t._v(" "),"create"==t.dialogStatus?i("el-button",{attrs:{type:"primary"},on:{click:t.createData}},[t._v("确定")]):i("el-button",{attrs:{type:"primary"},on:{click:t.updateData}},[t._v("确定")])],1)],1)],1)},[],!1,null,null,null);h.options.__file="topic.vue";e.default=h.exports},wwUi:function(t,e,i){"use strict";var n=i("T4eq");i.n(n).a},zXup:function(t,e,i){"use strict";var n=i("Qq1F");i.n(n).a}}]);