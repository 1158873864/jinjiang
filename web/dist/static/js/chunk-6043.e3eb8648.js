(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-6043"],{HziX:function(t,e,o){"use strict";(function(t){o.d(e,"a",function(){return i});var r=function(){return"undefined"!=typeof window?window:t},i=function(){var t=r();return t&&t.tinymce?t.tinymce:null}}).call(this,o("yLpj"))},KE4K:function(t,e,o){},NUJx:function(t,e,o){"use strict";o.r(e);var r=o("P2sY"),i=o.n(r),a=o("QbLZ"),s=o.n(a),n=o("xA6U"),l=o("rs3x"),c=o("kbZS"),u=o("mRed"),p=o("XJYT"),d=o("X4fA"),f=o("L2JU"),h={name:"GoodsCreate",components:{Editor:u.a},data:function(){return{uploadPath:l.c,filePath:l.b,newKeywordVisible:!1,newKeyword:"",keywords:[],categoryId:[],brandList:[],goods:{picUrl:"",shareUrl:"",gallery:[]},specVisiable:!1,specForm:{specification:"",value:"",picUrl:""},multipleSpec:!1,specifications:[{specification:"规格",value:"标准",picUrl:""}],productVisiable:!1,productForm:{id:0,specifications:[],price:0,number:0,url:""},products:[{id:0,specifications:["标准"],price:0,number:0,url:""}],attributeVisiable:!1,attributeForm:{attribute:"",value:""},attributes:[],rules:{goodsSn:[{required:!0,message:"商品编号不能为空",trigger:"blur"}],name:[{required:!0,message:"商品名称不能为空",trigger:"blur"}]},editorInit:{language:"zh_CN",convert_urls:!1,plugins:["advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools importcss insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount"],toolbar:["searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample","hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen"],images_upload_handler:function(t,e,o){var r=new FormData;r.append("file",t.blob()),Object(c.a)(r).then(function(t){console.log(t.data.data.url,8544);var o=t.data.data.url.replace("http://localhost:8080/wx/storage/fetch","https://sandc.xyz:8889/wx/storage/fetch");e(o)}).catch(function(){o("上传失败，请重新上传")})}}}},computed:s()({},Object(f.b)(["shopId"]),{headers:function(){return{"X-Litemall-Admin-Token":Object(d.a)()}}}),created:function(){console.log(this.shopId,8877),this.goods.shopId=this.shopId,this.init()},methods:{init:function(){var t=this;Object(n.d)().then(function(e){t.categoryId=e.data.data.categoryList,t.brandList=e.data.data.brandList})},handleCategoryChange:function(t){this.goods.categoryId=t[t.length-1]},handleCancel:function(){this.$router.push({path:"/goods/goods"})},handlePublish:function(t){var e=this;this.$refs[t].validate(function(t){if(!t)return console.log("error submit!!"),!1;e.goods.isYesNo?e.goods.isYesNo=1:e.goods.isYesNo=0;var o={goodstwo:e.goods,specifications:e.specifications,products:e.products,attributes:e.attributes};Object(n.f)(o).then(function(t){console.log(t),e.$notify.success({title:"成功",message:"创建成功"})}).catch(function(t){p.MessageBox.alert("业务错误："+t,"警告",{confirmButtonText:"确定",type:"error"})})})},handleClose:function(t){this.keywords.splice(this.keywords.indexOf(t),1),this.goods.keywords=this.keywords.toString()},showInput:function(){var t=this;this.newKeywordVisible=!0,this.$nextTick(function(e){t.$refs.newKeywordInput.$refs.input.focus()})},handleInputConfirm:function(){var t=this.newKeyword;t&&(this.keywords.push(t),this.goods.keywords=this.keywords.toString()),this.newKeywordVisible=!1,this.newKeyword=""},uploadPicUrl:function(t){this.goods.picUrl=t.data.url.replace("http://localhost:8080/wx/storage/fetch",this.filePath),console.log(this.goods.picUrl,7744)},uploadShareUrl:function(t){this.goods.shareUrl=t.data.url.replace("http://localhost:8080/wx/storage/fetch",this.filePath)},uploadOverrun:function(){this.$message({type:"error",message:"上传文件个数超出限制!最多上传5张图片!"})},handleGalleryUrl:function(t,e,o){console.log(t),0===t.errno&&this.goods.gallery.push(t.data.url.replace("http://localhost:8080/wx/storage/fetch",this.filePath)),console.log(t.data.url)},handleRemove:function(t,e){for(var o=0;o<this.goods.gallery.length;o++){var r;r=void 0===t.response?t.url:t.response.data.url,this.goods.gallery[o]===r&&this.goods.gallery.splice(o,1)}},specChanged:function(t){!1===t?(this.specifications=[{specification:"规格",value:"标准",picUrl:""}],this.products=[{id:0,specifications:["标准"],price:0,number:0,url:""}]):(this.specifications=[],this.products=[])},uploadSpecPicUrl:function(t){this.specForm.picUrl=t.data.url.replace("http://localhost:8080/wx/storage/fetch",this.filePath)},handleSpecificationShow:function(){this.specForm={specification:"",value:"",picUrl:""},this.specVisiable=!0},handleSpecificationAdd:function(){for(var t=this.specifications.length-1,e=0;e<this.specifications.length;e++){this.specifications[e].specification===this.specForm.specification&&(t=e)}this.specifications.splice(t+1,0,this.specForm),this.specVisiable=!1,this.specToProduct()},handleSpecificationDelete:function(t){var e=this.specifications.indexOf(t);this.specifications.splice(e,1),this.specToProduct()},specToProduct:function(){if(0!==this.specifications.length){var t=[],e=this.specifications[0].specification,o=[];o.push(0);for(var r=1;r<this.specifications.length;r++){var i=this.specifications[r].specification;i===e?o.push(r):(t.push(o),e=i,(o=[]).push(r))}t.push(o);for(var a=0,s=[],n=[],l=t.length,c=0;c<l;c++)n[c]=0;var u=0,p=!1;do{for(var d=[],f=0;f<l;f++){var h=t[f][n[f]];d.push(this.specifications[h].value)}s[a]={id:a,specifications:d,price:0,number:0,url:"",shopId:this.shopId},a++,u++,n[l-1]=u;for(var m=l-1;m>=0;m--)n[m]>=t[m].length&&(n[m]=0,u=0,m-1>=0&&(n[m-1]=n[m-1]+1));p=!1;for(var b=0;b<l;b++)0!==n[b]&&(p=!0)}while(p);this.products=s}},handleProductShow:function(t){this.productForm=i()({},t),this.productVisiable=!0},uploadProductUrl:function(t){this.productForm.url=t.data.url.replace("http://localhost:8080/wx/storage/fetch",this.filePath)},handleProductEdit:function(){for(var t=0;t<this.products.length;t++){if(this.products[t].id===this.productForm.id){this.products.splice(t,1,this.productForm);break}}this.productVisiable=!1},handleAttributeShow:function(){this.attributeForm={},this.attributeVisiable=!0},handleAttributeAdd:function(){this.attributes.unshift(this.attributeForm),this.attributeVisiable=!1},handleAttributeDelete:function(t){var e=this.attributes.indexOf(t);this.attributes.splice(e,1)}}},m=(o("PFre"),o("KHd+")),b=Object(m.a)(h,function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"app-container"},[o("el-card",{staticClass:"box-card"},[o("h3",[t._v("商品介绍")]),t._v(" "),o("el-form",{ref:"goods",attrs:{rules:t.rules,model:t.goods,"label-width":"150px"}},[null==this.shopId?o("el-form-item",{attrs:{label:"商品id",prop:"shopId"}},[o("el-input",{attrs:{placeholder:"必填,请输入商品id(数字)"},model:{value:t.goods.shopId,callback:function(e){t.$set(t.goods,"shopId",e)},expression:"goods.shopId"}})],1):t._e(),t._v(" "),o("el-form-item",{attrs:{label:"商品名称",prop:"name"}},[o("el-input",{attrs:{placeholder:"必填,请输入商品名称(文字或数字)"},model:{value:t.goods.name,callback:function(e){t.$set(t.goods,"name",e)},expression:"goods.name"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"所属分类"}},[o("el-cascader",{attrs:{options:t.categoryId,"expand-trigger":"hover",placeholder:"请选择商品类别"},on:{change:t.handleCategoryChange}})],1),t._v(" "),o("el-form-item",{attrs:{label:"所属品牌商"}},[o("el-select",{model:{value:t.goods.brandId,callback:function(e){t.$set(t.goods,"brandId",e)},expression:"goods.brandId"}},t._l(t.brandList,function(t){return o("el-option",{key:t.value,attrs:{label:t.label,value:t.value,placeholder:"请选择品牌商"}})}))],1),t._v(" "),o("el-form-item",{attrs:{label:"商品图片"}},[o("span",{staticClass:"tip-pic"},[t._v("只能上传jpg/png文件，只有1张，且不超过500kb")]),t._v(" "),o("el-upload",{staticClass:"avatar-uploader",attrs:{headers:t.headers,action:t.uploadPath,"show-file-list":!1,"on-success":t.uploadPicUrl,accept:".jpg,.jpeg,.png,.gif"}},[t.goods.picUrl?o("img",{staticClass:"avatar",attrs:{src:t.goods.picUrl}}):o("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),t._v(" "),o("el-form-item",{attrs:{label:"商品分享图片"}},[o("span",{staticClass:"tip-pic"},[t._v("只能上传jpg/png文件，只有1张，且不超过500kb")]),t._v(" "),o("el-upload",{staticClass:"avatar-uploader",attrs:{headers:t.headers,action:t.uploadPath,"show-file-list":!1,"on-success":t.uploadShareUrl,accept:".jpg,.jpeg,.png,.gif"}},[t.goods.shareUrl?o("img",{staticClass:"avatar",attrs:{src:t.goods.shareUrl}}):o("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),t._v(" "),o("el-form-item",{attrs:{label:"宣传画廊"}},[o("span",{staticClass:"tip-pic"},[t._v("只能上传jpg/png文件，至多5张，且不超过500kb")]),t._v(" "),o("el-upload",{attrs:{action:t.uploadPath,limit:5,headers:t.headers,"on-exceed":t.uploadOverrun,"on-success":t.handleGalleryUrl,"on-remove":t.handleRemove,multiple:"",accept:".jpg,.jpeg,.png,.gif","list-type":"picture-card"}},[o("i",{staticClass:"el-icon-plus"})])],1),t._v(" "),o("el-form-item",{attrs:{label:"关键字"}},[t._l(t.keywords,function(e){return o("el-tag",{key:e,attrs:{closable:"",type:"primary"},on:{close:function(o){t.handleClose(e)}}},[t._v("\n\t\t\t\t    "+t._s(e)+"\n\t\t\t\t  ")])}),t._v(" "),t.newKeywordVisible?o("el-input",{ref:"newKeywordInput",staticClass:"input-new-keyword",attrs:{size:"small"},on:{blur:t.handleInputConfirm},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.handleInputConfirm(e):null}},model:{value:t.newKeyword,callback:function(e){t.newKeyword=e},expression:"newKeyword"}}):o("el-button",{staticClass:"button-new-keyword",attrs:{size:"small",type:"primary"},on:{click:t.showInput}},[t._v("+ 增加")])],2),t._v(" "),o("el-form-item",{attrs:{label:"是否在售",prop:"isOnSale"}},[o("el-radio-group",{model:{value:t.goods.isOnSale,callback:function(e){t.$set(t.goods,"isOnSale",e)},expression:"goods.isOnSale"}},[o("el-radio",{attrs:{label:!0}},[t._v("在售")]),t._v(" "),o("el-radio",{attrs:{label:!1}},[t._v("未售")])],1)],1),t._v(" "),o("el-form-item",{attrs:{label:"是否新品",prop:"isNew"}},[o("el-radio-group",{model:{value:t.goods.isNew,callback:function(e){t.$set(t.goods,"isNew",e)},expression:"goods.isNew"}},[o("el-radio",{attrs:{label:!0}},[t._v("新品")]),t._v(" "),o("el-radio",{attrs:{label:!1}},[t._v("非新品")])],1)],1),t._v(" "),o("el-form-item",{attrs:{label:"是否热卖",prop:"isHot"}},[o("el-radio-group",{model:{value:t.goods.isHot,callback:function(e){t.$set(t.goods,"isHot",e)},expression:"goods.isHot"}},[o("el-radio",{attrs:{label:!1}},[t._v("普通")]),t._v(" "),o("el-radio",{attrs:{label:!0}},[t._v("热卖")])],1)],1),t._v(" "),o("el-form-item",{attrs:{label:"是否包邮",prop:"isYesNo"}},[o("el-radio-group",{model:{value:t.goods.isYesNo,callback:function(e){t.$set(t.goods,"isYesNo",e)},expression:"goods.isYesNo"}},[o("el-radio",{attrs:{label:!1}},[t._v("不包邮")]),t._v(" "),o("el-radio",{attrs:{label:!0}},[t._v("包邮")])],1)],1),t._v(" "),o("el-form-item",{attrs:{label:"商品单位"}},[o("el-input",{attrs:{placeholder:"件 / 个 / 盒"},model:{value:t.goods.unit,callback:function(e){t.$set(t.goods,"unit",e)},expression:"goods.unit"}})],1),t._v(" "),o("el-form-item",{directives:[{name:"show",rawName:"v-show",value:!t.goods.isYesNo,expression:"!goods.isYesNo"}],attrs:{label:"邮费"}},[o("el-input",{attrs:{placeholder:"元"},model:{value:t.goods.courierPrice,callback:function(e){t.$set(t.goods,"courierPrice",e)},expression:"goods.courierPrice"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"专柜价格",prop:"counterPrice"}},[o("el-input",{attrs:{placeholder:"0.00"},model:{value:t.goods.counterPrice,callback:function(e){t.$set(t.goods,"counterPrice",e)},expression:"goods.counterPrice"}},[o("template",{slot:"append"},[t._v("元")])],2)],1),t._v(" "),o("el-form-item",{attrs:{label:"当前价格",prop:"retailPrice"}},[o("el-input",{attrs:{placeholder:"0.00"},model:{value:t.goods.retailPrice,callback:function(e){t.$set(t.goods,"retailPrice",e)},expression:"goods.retailPrice"}},[o("template",{slot:"append"},[t._v("元")])],2)],1),t._v(" "),o("el-form-item",{attrs:{label:"商品简介"}},[o("el-input",{model:{value:t.goods.brief,callback:function(e){t.$set(t.goods,"brief",e)},expression:"goods.brief"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"商品详细介绍"}},[o("editor",{attrs:{init:t.editorInit},model:{value:t.goods.detail,callback:function(e){t.$set(t.goods,"detail",e)},expression:"goods.detail"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"排序-short??"}},[o("el-input",{model:{value:t.goods.sortOrder,callback:function(e){t.$set(t.goods,"sortOrder",e)},expression:"goods.sortOrder"}})],1),t._v(" "),o("el-card",{staticClass:"box-card"},[o("h3",[t._v("商品规格")]),t._v(" "),o("el-row",{staticStyle:{padding:"20px 0"},attrs:{gutter:20,type:"flex",align:"middle"}},[o("el-col",{attrs:{span:10}},[o("el-radio-group",{on:{change:t.specChanged},model:{value:t.multipleSpec,callback:function(e){t.multipleSpec=e},expression:"multipleSpec"}},[o("el-radio-button",{attrs:{label:!1}},[t._v("默认标准规格")]),t._v(" "),o("el-radio-button",{attrs:{label:!0}},[t._v("多规格支持")])],1)],1),t._v(" "),t.multipleSpec?o("el-col",{attrs:{span:10}},[o("el-button",{attrs:{plain:!0,type:"primary"},on:{click:t.handleSpecificationShow}},[t._v("添加")])],1):t._e()],1),t._v(" "),o("el-dialog",{attrs:{visible:t.specVisiable,title:"设置规格"},on:{"update:visible":function(e){t.specVisiable=e}}},[o("el-form",{ref:"specForm",staticStyle:{width:"400px","margin-left":"50px"},attrs:{model:t.specForm,"status-icon":"","label-position":"left","label-width":"100px"}},[o("el-form-item",{attrs:{label:"id-int",prop:"id"}},[o("el-input",{model:{value:t.specForm.id,callback:function(e){t.$set(t.specForm,"id",e)},expression:"specForm.id"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"goodsId-int",prop:"goodsId"}},[o("el-input",{model:{value:t.specForm.goodsId,callback:function(e){t.$set(t.specForm,"goodsId",e)},expression:"specForm.goodsId"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"规格名-string",prop:"specification"}},[o("el-input",{model:{value:t.specForm.specification,callback:function(e){t.$set(t.specForm,"specification",e)},expression:"specForm.specification"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"规格值-string",prop:"value"}},[o("el-input",{model:{value:t.specForm.value,callback:function(e){t.$set(t.specForm,"value",e)},expression:"specForm.value"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"规格图片-string",prop:"picUrl"}},[o("el-upload",{staticClass:"avatar-uploader",attrs:{action:t.uploadPath,"show-file-list":!1,headers:t.headers,"on-success":t.uploadSpecPicUrl,accept:".jpg,.jpeg,.png,.gif"}},[t.specForm.picUrl?o("img",{staticClass:"avatar",attrs:{src:t.specForm.picUrl}}):o("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1)],1),t._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(e){t.specVisiable=!1}}},[t._v("取消")]),t._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:t.handleSpecificationAdd}},[t._v("确定")])],1)],1),t._v(" "),o("el-table",{attrs:{data:t.specifications}},[o("el-table-column",{attrs:{property:"id",label:"id-int"}}),t._v(" "),o("el-table-column",{attrs:{property:"goodsId",label:"goodsId-int"}}),t._v(" "),o("el-table-column",{attrs:{property:"specification",label:"规格名-string"}}),t._v(" "),o("el-table-column",{attrs:{property:"value",label:"规格值-string"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("el-tag",{attrs:{type:"primary"}},[t._v("\n\t\t\t\t             "+t._s(e.row.value)+"\n\t\t\t\t           ")])]}}])}),t._v(" "),o("el-table-column",{attrs:{property:"picUrl",label:"规格图片-string"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.picUrl?o("img",{attrs:{src:e.row.picUrl,width:"40"}}):t._e()]}}])}),t._v(" "),t.multipleSpec?o("el-table-column",{attrs:{align:"center",label:"操作",width:"250","class-name":"small-padding fixed-width"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(o){t.handleSpecificationDelete(e.row)}}},[t._v("删除")])]}}])}):t._e()],1)],1),t._v(" "),o("el-card",{staticClass:"box-card"},[o("h3",[t._v("商品库存")]),t._v(" "),o("el-table",{attrs:{data:t.products}},[o("el-table-column",{attrs:{property:"value",label:"货品规格-string[]"},scopedSlots:t._u([{key:"default",fn:function(e){return t._l(e.row.specifications,function(e){return o("el-tag",{key:e},[t._v("\n\t\t\t\t          "+t._s(e)+"\n\t\t\t\t        ")])})}}])}),t._v(" "),o("el-table-column",{attrs:{property:"price",width:"100",label:"货品售价-BigDecimal"}}),t._v(" "),o("el-table-column",{attrs:{property:"number",width:"100",label:"货品数量-Integer"}}),t._v(" "),o("el-table-column",{attrs:{property:"url",width:"100",label:"货品图片-String"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.url?o("img",{attrs:{src:e.row.url,width:"40"}}):t._e()]}}])}),t._v(" "),o("el-table-column",{attrs:{align:"center",label:"操作",width:"100","class-name":"small-padding fixed-width"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(o){t.handleProductShow(e.row)}}},[t._v("设置")])]}}])})],1),t._v(" "),o("el-dialog",{attrs:{visible:t.productVisiable,title:"设置货品-string[]"},on:{"update:visible":function(e){t.productVisiable=e}}},[o("el-form",{ref:"productForm",staticStyle:{width:"400px","margin-left":"50px"},attrs:{model:t.productForm,"status-icon":"","label-position":"left","label-width":"100px"}},[o("el-form-item",{attrs:{label:"货品规格列",prop:"specifications"}},t._l(t.productForm.specifications,function(e){return o("el-tag",{key:e},[t._v("\n\t\t\t\t          "+t._s(e)+"\n\t\t\t\t        ")])})),t._v(" "),o("el-form-item",{attrs:{label:"货品售价-BigDecimal",prop:"price"}},[o("el-input",{model:{value:t.productForm.price,callback:function(e){t.$set(t.productForm,"price",e)},expression:"productForm.price"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"货品数量-Integer",prop:"number"}},[o("el-input",{model:{value:t.productForm.number,callback:function(e){t.$set(t.productForm,"number",e)},expression:"productForm.number"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"货品图片-string",prop:"url"}},[o("el-upload",{staticClass:"avatar-uploader",attrs:{action:t.uploadPath,"show-file-list":!1,headers:t.headers,"on-success":t.uploadProductUrl,accept:".jpg,.jpeg,.png,.gif"}},[t.productForm.url?o("img",{staticClass:"avatar",attrs:{src:t.productForm.url}}):o("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1)],1),t._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(e){t.productVisiable=!1}}},[t._v("取消")]),t._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:t.handleProductEdit}},[t._v("确定")])],1)],1)],1),t._v(" "),o("el-card",{staticClass:"box-card"},[o("h3",[t._v("商品参数")]),t._v(" "),o("el-button",{attrs:{plain:!0,type:"primary"},on:{click:t.handleAttributeShow}},[t._v("添加")]),t._v(" "),o("el-table",{attrs:{data:t.attributes}},[o("el-table-column",{attrs:{property:"attribute",label:"商品参数名称-string"}}),t._v(" "),o("el-table-column",{attrs:{property:"value",label:"商品参数值-string"}}),t._v(" "),o("el-table-column",{attrs:{align:"center",label:"操作",width:"100","class-name":"small-padding fixed-width"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(o){t.handleAttributeDelete(e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),o("el-dialog",{attrs:{visible:t.attributeVisiable,title:"设置商品参数"},on:{"update:visible":function(e){t.attributeVisiable=e}}},[o("el-form",{ref:"attributeForm",staticStyle:{width:"400px","margin-left":"50px"},attrs:{model:t.attributeForm,"status-icon":"","label-position":"left","label-width":"100px"}},[o("el-form-item",{attrs:{label:"商品参数名称-string",prop:"attribute"}},[o("el-input",{model:{value:t.attributeForm.attribute,callback:function(e){t.$set(t.attributeForm,"attribute",e)},expression:"attributeForm.attribute"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"商品参数值-string",prop:"value"}},[o("el-input",{model:{value:t.attributeForm.value,callback:function(e){t.$set(t.attributeForm,"value",e)},expression:"attributeForm.value"}})],1)],1),t._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(e){t.attributeVisiable=!1}}},[t._v("取消")]),t._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:t.handleAttributeAdd}},[t._v("确定")])],1)],1)],1)],1)],1),t._v(" "),o("div",{staticClass:"op-container"},[o("el-button",{on:{click:t.handleCancel}},[t._v("取消")]),t._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:function(e){t.handlePublish("goods")}}},[t._v("上架")])],1)],1)},[],!1,null,null,null);b.options.__file="create.vue";e.default=b.exports},PFre:function(t,e,o){"use strict";var r=o("KE4K");o.n(r).a},kbZS:function(t,e,o){"use strict";var r=o("4d7F"),i=o.n(r),a=o("vDqi"),s=o.n(a),n=o("XJYT"),l=o("Q2AE"),c=o("X4fA"),u=s.a.create({baseURL:"https://sandc.xyz:8889/wx",timeout:5e3});u.interceptors.request.use(function(t){return console.log("https://sandc.xyz:8889/wx","商品详情url"),l.a.getters.token&&(t.headers["X-Litemall-Admin-Token"]=Object(c.a)()),t},function(t){console.log(t),i.a.reject(t)}),u.interceptors.response.use(function(t){var e=t.data;return 501===e.errno?(n.MessageBox.alert("系统未登录，请重新登录","错误",{confirmButtonText:"确定",type:"error"}).then(function(){l.a.dispatch("FedLogOut").then(function(){location.reload()})}),i.a.reject("error")):502===e.errno?(n.MessageBox.alert("系统内部错误，请联系管理员维护","错误",{confirmButtonText:"确定",type:"error"}),i.a.reject("error")):503===e.errno?(n.MessageBox.alert("请求业务目前未支持","警告",{confirmButtonText:"确定",type:"error"}),i.a.reject("error")):504===e.errno?(n.MessageBox.alert("更新数据已经失效，请刷新页面重新操作","警告",{confirmButtonText:"确定",type:"error"}),i.a.reject("error")):505===e.errno?(n.MessageBox.alert("更新失败，请再尝试一次","警告",{confirmButtonText:"确定",type:"error"}),i.a.reject("error")):506===e.errno?(n.MessageBox.alert("没有操作权限，请联系管理员授权","错误",{confirmButtonText:"确定",type:"error"}),i.a.reject("error")):0!==e.errno?i.a.reject(t):t},function(t){return console.log("err"+t),Object(n.Message)({message:"登录连接超时（后台不能连接，请联系系统管理员）",type:"error",duration:5e3}),i.a.reject(t)});var p=u;function d(t){return p({url:"/storage/upload",method:"post",data:t})}o.d(e,"a",function(){return d})},mRed:function(t,e,o){"use strict";var r=["onActivate","onAddUndo","onBeforeAddUndo","onBeforeExecCommand","onBeforeGetContent","onBeforeRenderUI","onBeforeSetContent","onBeforePaste","onBlur","onChange","onClearUndos","onClick","onContextMenu","onCopy","onCut","onDblclick","onDeactivate","onDirty","onDrag","onDragDrop","onDragEnd","onDragGesture","onDragOver","onDrop","onExecCommand","onFocus","onFocusIn","onFocusOut","onGetContent","onHide","onInit","onKeyDown","onKeyPress","onKeyUp","onLoadContent","onMouseDown","onMouseEnter","onMouseLeave","onMouseMove","onMouseOut","onMouseOver","onMouseUp","onNodeChange","onObjectResizeStart","onObjectResized","onObjectSelected","onPaste","onPostProcess","onPostRender","onPreProcess","onProgressState","onRedo","onRemove","onReset","onSaveContent","onSelectionChange","onSetAttrib","onSetContent","onShow","onSubmit","onUndo","onVisualAid"],i=function(t){return-1!==r.indexOf(t)},a=function(t,e,o){var r=e.$props.value?e.$props.value:"",a=e.$props.initialValue?e.$props.initialValue:"";o.setContent(r||a),e.$listeners.input&&function(t,e){var o,r=t.$props.modelEvents?t.$props.modelEvents:null,i=Array.isArray(r)?r.join(" "):r;t.$watch("value",function(t,r){e&&"string"==typeof t&&t!==o&&t!==r&&(e.setContent(t),o=t)}),e.on(i||"change keyup undo redo",function(){o=e.getContent(),t.$emit("input",o)})}(e,o),function(t,e,o){Object.keys(e).filter(i).forEach(function(r){var i=e[r];"function"==typeof i&&("onInit"===r?i(t,o):o.on(r.substring(2),function(t){return i(t,o)}))})}(t,e.$listeners,o)},s=0,n=function(t){var e=(new Date).getTime();return t+"_"+Math.floor(1e9*Math.random())+ ++s+String(e)},l=function(t){return void 0===t||""===t?[]:Array.isArray(t)?t:t.split(" ")},c=o("HziX"),u={apiKey:String,cloudChannel:String,id:String,init:Object,initialValue:String,inline:Boolean,modelEvents:[String,Array],plugins:[String,Array],tagName:String,toolbar:[String,Array],value:String,disabled:Boolean},p=Object.assign||function(t){for(var e,o=1,r=arguments.length;o<r;o++)for(var i in e=arguments[o])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t},d={listeners:[],scriptId:n("tiny-script"),scriptLoaded:!1},f=function(t){return function(){var e=p({},t.$props.init,{readonly:t.$props.disabled,selector:"#"+t.elementId,plugins:function(t,e){return l(t).concat(l(e))}(t.$props.init&&t.$props.init.plugins,t.$props.plugins),toolbar:t.$props.toolbar||t.$props.init&&t.$props.init.toolbar,inline:t.inlineEditor,setup:function(e){t.editor=e,e.on("init",function(o){return a(o,t,e)}),t.$props.init&&"function"==typeof t.$props.init.setup&&t.$props.init.setup(e)}});(function(t){return null!==t&&"textarea"===t.tagName.toLowerCase()})(t.element)&&(t.element.style.visibility=""),Object(c.a)().init(e)}},h={props:u,created:function(){this.elementId=this.$props.id||n("tiny-vue"),this.inlineEditor=this.$props.init&&this.$props.init.inline||this.$props.inline},watch:{disabled:function(){this.editor.setMode(this.disabled?"readonly":"design")}},mounted:function(){if(this.element=this.$el,null!==Object(c.a)())f(this)();else if(this.element){var t=this.element.ownerDocument,e=this.$props.cloudChannel?this.$props.cloudChannel:"stable",o=this.$props.apiKey?this.$props.apiKey:"";!function(t,e,o,r){t.scriptLoaded?r():(t.listeners.push(r),e.getElementById(t.scriptId)||function(t,e,o,r){var i=e.createElement("script");i.type="application/javascript",i.id=t,i.addEventListener("load",r),i.src=o,e.head.appendChild(i)}(t.scriptId,e,o,function(){t.listeners.forEach(function(t){return t()}),t.scriptLoaded=!0}))}(d,t,"https://cloud.tinymce.com/"+e+"/tinymce.min.js?apiKey="+o,f(this))}},beforeDestroy:function(){null!==Object(c.a)()&&Object(c.a)().remove(this.editor)},render:function(t){return this.inlineEditor?function(t,e,o){return t(o||"div",{attrs:{id:e}})}(t,this.elementId,this.$props.tagName):function(t,e){return t("textarea",{attrs:{id:e},style:{visibility:"hidden"}})}(t,this.elementId)}};e.a=h},rs3x:function(t,e,o){"use strict";o.d(e,"a",function(){return i}),o.d(e,"c",function(){return a}),o.d(e,"b",function(){return s});var r=o("t3Un");o("vDqi");function i(t){return Object(r.a)({url:"/storage/create",method:"post",data:t})}var a="https://sandc.xyz:8889/wx/storage/upload",s="https://sandc.xyz:8889/wx/storage/fetch"},xA6U:function(t,e,o){"use strict";o.d(e,"e",function(){return i}),o.d(e,"a",function(){return a}),o.d(e,"f",function(){return s}),o.d(e,"b",function(){return n}),o.d(e,"c",function(){return l}),o.d(e,"d",function(){return c});var r=o("t3Un");function i(t){return Object(r.a)({url:"/goods/QuerylistShop",method:"get",params:t})}function a(t){return Object(r.a)({url:"/goods/deleteShopGoods",method:"post",data:t})}function s(t){return Object(r.a)({url:"/goods/createGoods",method:"post",data:t})}function n(t){return Object(r.a)({url:"/goods/detailGoodS",method:"get",params:{id:t}})}function l(t){return Object(r.a)({url:"/goods/updateShopGoods",method:"post",data:t})}function c(){return Object(r.a)({url:"/goods/catAndBrand",method:"get"})}}}]);