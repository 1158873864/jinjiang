(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-4f74"],{"5pIb":function(e,a,t){"use strict";t.d(a,"d",function(){return o}),t.d(a,"a",function(){return i}),t.d(a,"b",function(){return r}),t.d(a,"c",function(){return s});var l=t("t3Un");function o(e){return Object(l.a)({url:"/shop/Querylist",method:"get",params:e})}function i(e){return Object(l.a)({url:"shop/delete",method:"post",data:e})}function r(e){return Object(l.a)({url:"/shop/readOnlyShop",method:"get",params:{id:e}})}function s(e){return Object(l.a)({url:"shop/updateShop",method:"post",data:e})}},"9EeK":function(e,a,t){"use strict";t.r(a);var l=t("r35Q"),o=t("eE85"),i=t.n(o),r=t("5pIb"),s=t("xAVR"),n=t("rs3x"),c=(t("mRed"),t("XJYT")),u=t("X4fA"),p=(t("L2JU"),t("S+eF"),{name:"modiinfo",data:function(){var e=this;return{passwordType:"password",qualificationArr:[],fileList:[],fileListPro:[],uploadImageType:"",password:"",province:"",city:"",area:"",uploadPath:n.c,filePath:n.b,shop:{cardWithMan:[]},shopId:"",checklist:[],checkindust:[],categoryIds:[],selectData:{},formData:{province:"",city:"",area:""},listQuery:{page:1,limit:1e3},repassword:[{validator:function(a,t,l){""===t?l(new Error("请再次输入密码")):t!==e.shop.password?l(new Error("两次输入的密码不一样")):l()},trigger:"blur"}],industryClassify:[{value:"生活服务",label:"生活服务",children:[{value:"0",label:"旅行社"},{value:"1",label:"培训"},{value:"2",label:"宠物"},{value:"3",label:"齿科"},{value:"4",label:"快照"},{value:"5",label:"冲印"},{value:"6",label:"家政"},{value:"7",label:"婚纱摄影"},{value:"8",label:"婚庆服务"},{value:"9",label:"儿童摄影"},{value:"10",label:"汽车服务"},{value:"11",label:"丽人"},{value:"12",label:"更多生活服务"}]},{value:"购物",label:"购物",children:[{value:"0",label:"综合商场"},{value:"1",label:"食品茶酒"},{value:"2",label:"服饰鞋包"},{value:"3",label:"珠宝饰品"},{value:"4",label:"化妆品"},{value:"5",label:"运动户外"},{value:"6",label:"母婴儿童"},{value:"7",label:"数码家电"},{value:"8",label:"家具家居"},{value:"9",label:"书店"},{value:"10",label:"眼镜店"},{value:"11",label:"药店"},{value:"12",label:"超市"},{value:"13",label:"便利店"},{value:"14",label:"其他"}]},{value:"运动健身",label:"运动健身",children:[{value:"0",label:"健身中心"},{value:"1",label:"游泳馆"},{value:"2",label:"羽毛球馆"},{value:"3",label:"瑜伽"},{value:"4",label:"舞蹈"},{value:"5",label:"篮球场"},{value:"6",label:"网球场"},{value:"7",label:"足球场"},{value:"8",label:"高尔夫场"},{value:"9",label:"保龄球馆"},{value:"10",label:"乒乓球馆"},{value:"11",label:"体育场馆"},{value:"12",label:"更多运动场馆"}]},{value:"运动健身",label:"运动健身",children:[{value:"0",label:"川菜"},{value:"1",label:"粤菜"},{value:"2",label:"茶馆"},{value:"3",label:"火锅"},{value:"4",label:"烧烤"},{value:"5",label:"海鲜"},{value:"6",label:"特色小吃"},{value:"7",label:"日韩料理"},{value:"8",label:"西餐"},{value:"9",label:"自助餐"},{value:"10",label:"东南亚菜"},{value:"11",label:"面包甜点"},{value:"12",label:"其他"}]},{value:"休闲娱乐",label:"休闲娱乐",children:[{value:"0",label:"咖啡厅"},{value:"1",label:"酒吧"},{value:"2",label:"茶馆"},{value:"3",label:"KTV"},{value:"4",label:"电影院"},{value:"5",label:"文化艺术"},{value:"6",label:"景点、郊游"},{value:"7",label:"公园"},{value:"8",label:"足疗按摩"},{value:"9",label:"洗浴"},{value:"10",label:"游乐游艺"},{value:"11",label:"台球馆"},{value:"12",label:"桌面游戏"},{value:"13",label:"更多休闲娱乐"}]},{value:"服装",label:"服装",children:[{value:"0",label:"女装"},{value:"1",label:"男装"}]}]}},components:{VDistpicker:i.a},created:function(){this.shopId=this.$route.query.id,this.init(),this.getAllCategoryList()},computed:{headers:function(){return{"X-Litemall-Admin-Token":Object(u.a)()}}},methods:{init:function(){console.log(this.$route.query.id,"idid",this.shopId),null!=this.$route.query.id&&(this.getShopInfo(),this.getAllQualification(),this.getShopQualification())},onSelected:function(e){this.selectData=e,console.log(e,844)},onChangeProvince:function(e){this.province=e.value,console.log(e.value,911)},onChangeCity:function(e){this.city=e.value,console.log(e,922)},onChangeArea:function(e){this.area=e.value,console.log(e,933)},beforeUpload:function(e){console.log(e,7144)},getImageTypeIndex:function(e){this.uploadImageType=e,console.log(e,"当前")},getShopInfo:function(){var e=this;Object(l.c)("shop/readOnlyShop?id="+this.shopId).then(function(a){if(0==a.data.errno){e.shop=a.data.data,e.categoryIds=a.data.data.industryClassify;var t=e.shop.region;e.formData.province=t[0],e.formData.city=t[1],e.formData.area=t[2],e.fileList=[],e.fileListPro=[];for(var l=0;l<e.shop.cardWithMan.length;l++)e.fileList.push({url:e.shop.cardWithMan[l]});for(l=0;l<e.shop.proAuthorization.length;l++)e.fileListPro.push({url:e.shop.proAuthorization[l]})}console.log(e.fileList,"userinfo1",e.shop.region[0],e.shop)})},getAllQualification:function(){var e=this;Object(l.c)("qualification/listByAdmin").then(function(a){console.log(a,98444),0==a.data.errno&&(e.options=a.data.data.items,e.qualificationArr.push({value:e.options[0].name,picUrl:[]}))})},getShopQualification:function(){var e=this;Object(l.c)("qualification/listByShop?shopId="+this.shopId).then(function(a){if(console.log(a,98333),0==a.data.errno){e.qualificationArr=[];for(var t=a.data.data.items.length,l=a.data.data.items,o=0;o<t;o++){e.qualificationArr.push({name:l[o].name,fileList:[],picUrl:l[o].picUrl});for(var i=0;i<l[o].picUrl.length;i++)e.qualificationArr[o].fileList.push({url:l[o].picUrl[i]})}console.log(e.qualificationArr,98545,a.data.data.items)}})},createQualification:function(){for(var e=0;e<this.qualificationArr.length;e++)this.qualificationArr[e].shopId=this.shopId;Object(l.e)("qualification/create",this.qualificationArr).then(function(e){e.data.errno})},getAllCategoryList:function(){var e=this;Object(s.d)(this.listQuery).then(function(a){if(0==a.data.errno){console.log(a.data.data.items,714);var t=a.data.data.items,l=t.length;e.industryClassify.length=0;var o;o=t.filter(function(e){return 0==e.pid});for(var i=0;i<o.length;i++)e.industryClassify.push({value:o[i].id,label:o[i].name,children:[]});for(var r=0;r<l;r++)for(i=0;i<e.industryClassify.length;i++)t[r].pid==e.industryClassify[i].value&&e.industryClassify[i].children.push({value:t[r].id,label:t[r].name})}}).catch(function(a){e.$notify.error({title:"失败",message:a.data.errmsg})})},handleCancel:function(){this.$router.push({path:"/shopmanage/shoplist"})},handleEdit:function(){var e=this,a=this.shop;console.log(this.shop,7023),a.region.length=0,a.region.push(this.province),a.region.push(this.city),a.region.push(this.area),""!=this.password?this.shop.password=this.password:this.shop.password="",console.log(997,this.formData,this.area),""!=this.area&&void 0!=this.area?(console.log(a,7444),Object(r.c)(a).then(function(a){e.$notify.success({title:"成功",message:"创建成功"}),e.createQualification()}).catch(function(e){c.MessageBox.alert("业务错误："+e.data,"警告",{confirmButtonText:"确定",type:"error"})})):c.MessageBox.alert("请补全地址信息","警告",{confirmButtonText:"确定",type:"error"})},handleClose:function(e){this.keywords.splice(this.keywords.indexOf(e),1),this.goods.keywords=this.keywords.toString()},uploadPicUrl:function(e){console.log(e,"成功",e.data.url.split(":")[2],this.qualificationArr),this.qualificationArr[this.uploadImageType].picUrl.push(e.data.url.replace("http://localhost:8080/wx/storage/fetch",this.filePath))},uploadPicUrla:function(e){this.shop.url=e.data.url.replace("http://localhost:8080/wx/storage/fetch",this.filePath)},uploadPicUrlb:function(e){this.shop.workimgUrl=e.data.url.replace("http://localhost:8080/wx/storage/fetch",this.filePath)},uploadPicUrlc:function(e){this.shop.storefrontimgUrl=e.data.url.replace("http://localhost:8080/wx/storage/fetch",this.filePath)},uploadPicUrld:function(e){this.shop.avatar=e.data.url.replace("http://localhost:8080/wx/storage/fetch",this.filePath)},uploadCardWithManUrl:function(e){var a=e.data.url.replace("http://localhost:8080/wx/storage/fetch",this.filePath);console.log(a,"7899"),this.shop.cardWithMan.push(a)},uploadproAuthorizationUrl:function(e){var a=e.data.url.replace("http://localhost:8080/wx/storage/fetch",this.filePath);this.shop.proAuthorization.push(a)},addDomain:function(e){this.qualificationArr.push({name:"",picUrl:[]}),console.log(this.qualificationArr,78944)},removeDomain:function(e){var a=this.qualificationArr.indexOf(e);-1!==a&&this.qualificationArr.splice(a,1)},uploadOverrun:function(){this.$message({type:"error",message:"上传文件个数超出限制!最多上传5张图片!"})},handleRemove:function(e,a){console.log(this.qualificationArr,e,7977,a);for(var t=0;t<this.qualificationArr.length;t++)for(var l=0;l<this.qualificationArr[t].picUrl.length;l++){var o;o=void 0===e.response?e.url:e.response.data.url,this.qualificationArr[t].picUrl[l]===o&&this.qualificationArr[t].picUrl.splice(l,1)}},handleCategoryChange:function(e){this.shop.industryClassify=e,console.log(e,4444)},specChanged:function(e){!1===e?(this.specifications=[{specification:"规格",value:"标准",picUrl:""}],this.products=[{id:0,specifications:["标准"],price:0,number:0,url:""}]):(this.specifications=[],this.products=[])},uploadSpecPicUrl:function(e){this.specForm.picUrl=e.data.url}}}),h=(t("eYbX"),t("KHd+")),d=Object(h.a)(p,function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"app-container"},[t("el-card",{staticClass:"box-card"},[t("h3",[e._v("商家编辑")]),e._v(" "),t("el-form",{attrs:{model:e.shop,"label-width":"150px"}},[t("el-form-item",{attrs:{label:"行业分类"}},[t("el-cascader",{attrs:{options:e.industryClassify,"expand-trigger":"hover",placeholder:"请选择行业类别"},on:{change:e.handleCategoryChange},model:{value:e.categoryIds,callback:function(a){e.categoryIds=a},expression:"categoryIds"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"所属区域",prop:"region"}},[t("v-distpicker",{attrs:{province:e.formData.province,city:e.formData.city,area:e.formData.area},on:{selected:e.onSelected,province:e.onChangeProvince,city:e.onChangeCity,area:e.onChangeArea}})],1),e._v(" "),t("el-form-item",{attrs:{label:"详细地址",prop:"address"}},[t("el-input",{model:{value:e.shop.address,callback:function(a){e.$set(e.shop,"address",a)},expression:"shop.address"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"logo"}},[t("el-upload",{staticClass:"avatar-uploader",attrs:{headers:e.headers,action:e.uploadPath,"show-file-list":!1,"on-success":e.uploadPicUrla,accept:".jpg,.jpeg,.png,.gif"}},[e.shop.url?t("img",{staticClass:"avatar",attrs:{src:e.shop.url}}):t("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),e._v(" "),t("el-form-item",{attrs:{label:"店铺名称",prop:"shopname"}},[t("el-input",{model:{value:e.shop.shopname,callback:function(a){e.$set(e.shop,"shopname",a)},expression:"shop.shopname"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"负责人名字",prop:"username"}},[t("el-input",{model:{value:e.shop.username,callback:function(a){e.$set(e.shop,"username",a)},expression:"shop.username"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"门店介绍",prop:"shopIntroduce"}},[t("el-input",{model:{value:e.shop.shopIntroduce,callback:function(a){e.$set(e.shop,"shopIntroduce",a)},expression:"shop.shopIntroduce"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"客服电话",prop:"serviceMobile"}},[t("el-input",{model:{value:e.shop.serviceMobile,callback:function(a){e.$set(e.shop,"serviceMobile",a)},expression:"shop.serviceMobile"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"营业时间",prop:"workTime"}},[t("el-input",{model:{value:e.shop.workTime,callback:function(a){e.$set(e.shop,"workTime",a)},expression:"shop.workTime"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"入驻资质"}},[t("el-upload",{staticClass:"avatar-uploader",attrs:{headers:e.headers,action:e.uploadPath,"show-file-list":!1,"on-success":e.uploadPicUrlb,accept:".jpg,.jpeg,.png,.gif"}},[e.shop.workimgUrl?t("img",{staticClass:"avatar",attrs:{src:e.shop.workimgUrl}}):t("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),e._v(" "),t("el-form-item",{attrs:{label:"门头图片"}},[t("el-upload",{staticClass:"avatar-uploader",attrs:{headers:e.headers,action:e.uploadPath,"show-file-list":!1,"on-success":e.uploadPicUrlc,accept:".jpg,.jpeg,.png,.gif"}},[e.shop.storefrontimgUrl?t("img",{staticClass:"avatar",attrs:{src:e.shop.storefrontimgUrl}}):t("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),e._v(" "),t("el-form-item",{attrs:{label:"密码",prop:"password"}},[t("el-input",{attrs:{placeholder:"请输入密码至少6位数"},model:{value:e.password,callback:function(a){e.password=a},expression:"password"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"头像"}},[t("el-upload",{staticClass:"avatar-uploader",attrs:{headers:e.headers,action:e.uploadPath,"show-file-list":!1,"on-success":e.uploadPicUrld,accept:".jpg,.jpeg,.png,.gif"}},[e.shop.avatar?t("img",{staticClass:"avatar",attrs:{src:e.shop.avatar}}):t("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),e._v(" "),t("el-form-item",{attrs:{label:"法人手持身份证"}},[t("el-upload",{staticStyle:{"margin-left":"10px","margin-top":"10px"},attrs:{action:e.uploadPath,"file-list":e.fileList,"list-type":"picture-card","show-file-list":!0,"on-success":e.uploadCardWithManUrl,"on-remove":e.handleRemove}},[t("i",{staticClass:"el-icon-plus"})])],1),e._v(" "),t("el-form-item",{attrs:{label:"代理授权书"}},[t("el-upload",{staticStyle:{"margin-left":"10px","margin-top":"10px"},attrs:{action:e.uploadPath,"file-list":e.fileListPro,"list-type":"picture-card","show-file-list":!0,"on-success":e.uploadproAuthorizationUrl,"on-remove":e.handleRemove}},[t("i",{staticClass:"el-icon-plus"})])],1),e._v(" "),e._l(e.qualificationArr,function(a,l){return t("el-form-item",{key:l,attrs:{label:"资质类型"}},[t("el-select",{attrs:{placeholder:"请选择"},model:{value:a.name,callback:function(t){e.$set(a,"name",t)},expression:"item.name"}},e._l(e.options,function(e){return t("el-option",{key:e.id,attrs:{label:e.name,value:e.name}})})),e._v(" "),t("div",{on:{click:function(a){e.getImageTypeIndex(l)}}},[t("el-upload",{staticStyle:{"margin-left":"10px","margin-top":"10px"},attrs:{action:e.uploadPath,"file-list":a.fileList,"list-type":"picture-card",data:a,"show-file-list":!0,"before-upload":e.beforeUpload,"on-success":e.uploadPicUrl,"on-remove":e.handleRemove}},[t("i",{staticClass:"el-icon-plus"})])],1),e._v(" "),t("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){e.addDomain(a)}}},[e._v("新增资质")]),e._v(" "),0!=l?t("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){e.removeDomain(a)}}},[e._v("减少资质")]):e._e()],1)})],2),e._v(" "),t("div",{staticClass:"op-container"},[t("el-button",{on:{click:e.handleCancel}},[e._v("取消")]),e._v(" "),t("el-button",{attrs:{type:"primary"},on:{click:e.handleEdit}},[e._v("保存")])],1)],1)],1)},[],!1,null,"43c7572e",null);d.options.__file="modiinfo.vue";a.default=d.exports},"Oob/":function(e,a,t){},eYbX:function(e,a,t){"use strict";var l=t("Oob/");t.n(l).a},r35Q:function(e,a,t){"use strict";t.d(a,"c",function(){return o}),t.d(a,"e",function(){return i}),t.d(a,"f",function(){return r}),t.d(a,"b",function(){return s}),t.d(a,"d",function(){return n}),t.d(a,"a",function(){return c});var l=t("t3Un");function o(e,a){return Object(l.a)({url:e+"",method:"get",params:a})}function i(e,a){return Object(l.a)({url:e,method:"post",data:a})}function r(e,a){return Object(l.a)({url:e,method:"put",data:a})}function s(e,a){return Object(l.a)({url:e+"/"+a,method:"post"})}function n(e){return Object(l.a)({url:e,method:"get"})}function c(e,a){return Object(l.a)({url:e,method:"delete",data:a})}},rs3x:function(e,a,t){"use strict";t.d(a,"a",function(){return o}),t.d(a,"c",function(){return i}),t.d(a,"b",function(){return r});var l=t("t3Un");t("vDqi");function o(e){return Object(l.a)({url:"/storage/create",method:"post",data:e})}var i="https://sandc.xyz:8889/wx/storage/upload",r="https://sandc.xyz:8889/wx/storage/fetch"},xAVR:function(e,a,t){"use strict";t.d(a,"d",function(){return o}),t.d(a,"c",function(){return i}),t.d(a,"a",function(){return r}),t.d(a,"e",function(){return s}),t.d(a,"b",function(){return n});var l=t("t3Un");function o(e){return Object(l.a)({url:"/category/list",method:"get",params:e})}function i(){return Object(l.a)({url:"/category/l1",method:"get"})}function r(e){return Object(l.a)({url:"/category/create",method:"post",data:e})}function s(e){return Object(l.a)({url:"/category/update",method:"post",data:e})}function n(e){return Object(l.a)({url:"/category/delete",method:"post",data:e})}}}]);