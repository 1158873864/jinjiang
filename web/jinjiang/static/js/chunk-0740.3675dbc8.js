(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-0740"],{"2KyS":function(t,e,a){},c11S:function(t,e,a){"use strict";var i=a("gTgX");a.n(i).a},e3YW:function(t,e,a){"use strict";var i=a("2KyS");a.n(i).a},gTgX:function(t,e,a){},ntYl:function(t,e,a){"use strict";a.r(e);a("t3Un");var i=a("eE85"),r=a.n(i),o=a("XJYT"),s=a("rs3x"),n=a("r35Q"),l={name:"Login",data:function(){return{selectData:"",province:"",city:"",area:"",qualificationArr:[],uploadImageType:"",options:[{value:"选项1",label:"黄金糕"}],value:"",uploadPath:s.b,filePath:s.a,registerData:{username2:"",shopname:"",password:"",proAuthorization:[],cardWithMan:[],region:[]},registerVisible:!1,loginForm:{username:"admin123",password:"admin123"},loginRules:{username:[{required:!0,trigger:"blur",validator:function t(e,a,i){null==t?i(new Error("请输入正确的管理员用户名")):i()}}],password:[{required:!0,trigger:"blur",validator:function(t,e,a){e.length<6?a(new Error("管理员密码长度应大于6")):a()}}]},passwordType:"password",loading:!1,loading2:!1}},watch:{$route:{handler:function(t){this.redirect=t.query&&t.query.redirect},immediate:!0}},components:{VDistpicker:r.a},created:function(){},destroyed:function(){},methods:{onSelected:function(t){this.selectData=t,console.log(t,844)},onChangeProvince:function(t){this.province=t.value,console.log(t.value,911)},onChangeCity:function(t){this.city=t.value,console.log(t,922)},onChangeArea:function(t){this.area=t.value,console.log(t,933)},getImageTypeIndex:function(t){this.uploadImageType=t,console.log(t,"当前")},uploadPicUrl:function(t){console.log(t,"成功",t.data.url.split(":")[2],this.qualificationArr),this.qualificationArr[this.uploadImageType].picUrl.push(t.data.url.replace("http://localhost:8080/wx/storage/fetch",this.filePath))},uploadCardWithManUrl:function(t){var e=t.data.url.replace("http://localhost:8080/wx/storage/fetch",this.filePath);this.registerData.cardWithMan.push(e)},uploadproAuthorizationUrl:function(t){var e=t.data.url.replace("http://localhost:8080/wx/storage/fetch",this.filePath);this.registerData.proAuthorization.push(e)},uploadWorkImg:function(t){var e=t.data.url.replace("http://localhost:8080/wx/storage/fetch",this.filePath);this.registerData.workimgUrl=e},beforeUpload:function(t){console.log(t,7144)},addDomain:function(t){this.qualificationArr.push({name:"",picUrl:[]}),console.log(this.qualificationArr,78944)},removeDomain:function(t){var e=this.qualificationArr.indexOf(t);-1!==e&&this.qualificationArr.splice(e,1)},handleRemove:function(t){},handleRegister:function(){this.registerVisible=!0,console.log("register11")},getAllQualification:function(){var t=this;Object(n.a)("qualification/listByAdmin").then(function(e){console.log(e,98444),0==e.data.errno&&(t.options=e.data.data.items,t.qualificationArr.push({value:t.options[0].name,picUrl:[]}))})},validateUpload:function(){return""!=this.registerData.workimgUrl&&void 0!=this.registerData.workimgUrl||(this.$notify.error({title:"注册失败",message:"请上传入驻资质"}),!1)},handleSumbit:function(){var t=this;console.log(this.qualificationArr,99),this.validateUpload()&&(this.registerData.url="",this.registerData.storefrontimgUrl="",""!=this.area&&void 0!=this.area?(this.registerData.length=0,this.registerData.region.push(this.province),this.registerData.region.push(this.city),this.registerData.region.push(this.area),this.registerData.level=-1,console.log(this.registerData,7844441),Object(n.b)("shop/InputShop",this.registerData).then(function(e){0==e.data.errno&&(t.$notify.success({title:"注册成功"}),t.registerVisible=!1,t.createQualification(e.data.data.id))}).catch(function(e){t.$notify.error({title:"注册失败",message:e.data.errmsg})})):o.MessageBox.alert("请补全地址信息","警告",{confirmButtonText:"确定",type:"error"}))},createQualification:function(t){console.log(t,98744);for(var e=0;e<this.qualificationArr.length;e++)this.qualificationArr[e].shopId=t;Object(n.b)("qualification/create",this.qualificationArr).then(function(t){})},showPwd:function(){"password"===this.passwordType?this.passwordType="":this.passwordType="password"},handleLogin:function(){var t=this;this.$refs.loginForm.validate(function(e){if(!e||t.loading)return!1;t.loading=!0,console.log("ssss",t.redirect),t.$store.dispatch("LoginByUsername",t.loginForm).then(function(){t.loading=!1,t.$router.push({path:t.redirect||"/"})}).catch(function(e){t.$notify.error({title:"失败",message:e.data.errmsg}),t.loading=!1})})}}},c=(a("c11S"),a("e3YW"),a("KHd+")),u=Object(c.a)(l,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"login-container"},[a("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{model:t.loginForm,rules:t.loginRules,"auto-complete":"on","label-position":"left"}},[a("div",{staticClass:"title-container"},[a("h3",{staticClass:"title"},[t._v("管理员登录")])]),t._v(" "),a("el-form-item",{attrs:{prop:"username"}},[a("span",{staticClass:"svg-container svg-container_login"},[a("svg-icon",{attrs:{"icon-class":"user"}})],1),t._v(" "),a("el-input",{staticStyle:{color:"white!important"},attrs:{name:"username",type:"text","auto-complete":"on",placeholder:"username"},model:{value:t.loginForm.username,callback:function(e){t.$set(t.loginForm,"username",e)},expression:"loginForm.username"}})],1),t._v("\n   v\n      "),a("el-form-item",{attrs:{prop:"password"}},[a("span",{staticClass:"svg-container"},[a("svg-icon",{attrs:{"icon-class":"password"}})],1),t._v(" "),a("el-input",{attrs:{type:t.passwordType,name:"password","auto-complete":"on",placeholder:"password"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.handleLogin(e):null}},model:{value:t.loginForm.password,callback:function(e){t.$set(t.loginForm,"password",e)},expression:"loginForm.password"}}),t._v(" "),a("span",{staticClass:"show-pwd",on:{click:t.showPwd}},[a("svg-icon",{attrs:{"icon-class":"eye"}})],1)],1),t._v(" "),a("el-button",{staticStyle:{width:"100%","margin-bottom":"30px"},attrs:{loading:t.loading,type:"primary"},nativeOn:{click:function(e){return e.preventDefault(),t.handleLogin(e)}}},[t._v("登录")]),t._v(" "),a("el-dialog",{staticClass:"register",attrs:{visible:t.registerVisible,modal:!1,title:"注册"},on:{"update:visible":function(e){t.registerVisible=e}}},[a("el-form",{ref:"registerData",staticClass:"table-expand",model:{value:t.registerData,callback:function(e){t.registerData=e},expression:"registerData"}},[a("el-form-item",{attrs:{"label-width":"120px",label:"账号",prop:"username"}},[a("el-input",{staticStyle:{"background-color":"white"},model:{value:t.registerData.username,callback:function(e){t.$set(t.registerData,"username",e)},expression:"registerData.username"}})],1),t._v(" "),a("el-form-item",{attrs:{"label-width":"120px",label:"密码",prop:"password"}},[a("el-input",{staticStyle:{"background-color":"white"},attrs:{type:t.passwordType,name:"password"},model:{value:t.registerData.password,callback:function(e){t.$set(t.registerData,"password",e)},expression:"registerData.password"}})],1),t._v(" "),a("el-form-item",{attrs:{"label-width":"120px",label:"店铺名称",prop:"shopname"}},[a("el-input",{staticStyle:{"background-color":"white"},model:{value:t.registerData.shopname,callback:function(e){t.$set(t.registerData,"shopname",e)},expression:"registerData.shopname"}})],1),t._v(" "),a("el-form-item",{attrs:{"label-width":"120px",label:"客服电话",prop:"serviceMobile"}},[a("el-input",{staticStyle:{"background-color":"white"},model:{value:t.registerData.serviceMobile,callback:function(e){t.$set(t.registerData,"serviceMobile",e)},expression:"registerData.serviceMobile"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"所属区域",prop:"region"}},[a("v-distpicker",{attrs:{province:t.registerData.province,city:t.registerData.city,area:t.registerData.area},on:{selected:t.onSelected,province:t.onChangeProvince,city:t.onChangeCity,area:t.onChangeArea}})],1),t._v(" "),a("el-form-item",{attrs:{"label-width":"120px",label:"详细地址",prop:"address"}},[a("el-input",{staticStyle:{"background-color":"white"},model:{value:t.registerData.address,callback:function(e){t.$set(t.registerData,"address",e)},expression:"registerData.address"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"银行卡账号",prop:"workTime","label-width":"120px"}},[a("el-input",{staticStyle:{"background-color":"white"},model:{value:t.registerData.workTime,callback:function(e){t.$set(t.registerData,"workTime",e)},expression:"registerData.workTime"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"入驻资质","label-width":"120px"}}),t._v(" "),a("el-upload",{staticStyle:{"margin-left":"10px","margin-top":"10px"},attrs:{action:t.uploadPath,"list-type":"picture-card","show-file-list":!0,"on-success":t.uploadWorkImg,"on-remove":t.handleRemove}},[a("i",{staticClass:"el-icon-plus"})]),t._v(" "),a("el-form-item",{attrs:{label:"法人手持身份证","label-width":"120px"}}),t._v(" "),a("el-upload",{staticStyle:{"margin-left":"10px","margin-top":"10px"},attrs:{action:t.uploadPath,"list-type":"picture-card","show-file-list":!0,"on-success":t.uploadCardWithManUrl,"on-remove":t.handleRemove}},[a("i",{staticClass:"el-icon-plus"})]),t._v(" "),a("el-form-item",{attrs:{label:"代理授权书","label-width":"120px"}}),t._v(" "),a("el-upload",{staticStyle:{"margin-left":"10px","margin-top":"10px"},attrs:{action:t.uploadPath,"list-type":"picture-card","show-file-list":!0,"on-success":t.uploadproAuthorizationUrl,"on-remove":t.handleRemove}},[a("i",{staticClass:"el-icon-plus"})]),t._v(" "),t._l(t.qualificationArr,function(e,i){return a("el-form-item",{key:i,attrs:{label:"资质类型","label-width":"120px"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.name,callback:function(a){t.$set(e,"name",a)},expression:"item.name"}},t._l(t.options,function(t){return a("el-option",{key:t.id,attrs:{label:t.name,value:t.name}})})),t._v(" "),a("div",{on:{click:function(e){t.getImageTypeIndex(i)}}},[a("el-upload",{staticStyle:{"margin-left":"10px","margin-top":"10px"},attrs:{action:t.uploadPath,"list-type":"picture-card",data:e,"show-file-list":!0,"before-upload":t.beforeUpload,"on-success":t.uploadPicUrl,"on-remove":t.handleRemove}},[a("i",{staticClass:"el-icon-plus"})])],1),t._v(" "),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){t.addDomain(e)}}},[t._v("新增资质")]),t._v(" "),0!=i?a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){t.removeDomain(e)}}},[t._v("减少资质")]):t._e()],1)}),t._v(" "),a("el-button",{on:{click:function(e){t.registerVisible=!1}}},[t._v("取消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.handleSumbit}},[t._v("确定")])],2)],1)],1)],1)},[],!1,null,"19de002e",null);u.options.__file="index.vue";e.default=u.exports},r35Q:function(t,e,a){"use strict";a.d(e,"a",function(){return r}),a.d(e,"b",function(){return o});var i=a("t3Un");function r(t,e){return Object(i.a)({url:t+"",method:"get",params:e})}function o(t,e){return Object(i.a)({url:t,method:"post",data:e})}},rs3x:function(t,e,a){"use strict";a.d(e,"b",function(){return r}),a.d(e,"a",function(){return i});a("t3Un"),a("vDqi");var i="http://47.106.171.65",r="https://www.shaoshanlu.com:3389/upload"}}]);