<template>
  <div class="app-container">

    <el-card class="box-card">
      <h3>VR管理</h3>
      <el-form ref="goods" :rules="rules" :model="goods" label-width="150px">
				
				<div @click="position('front')">
    <el-form-item label="前">
          <span class="tip-pic">只能上传jpg/png文件，只有1张，且不超过500kb</span>
          <el-upload
            :headers="headers"
            :action="uploadPath+params"
            :show-file-list="false"
            :on-success="uploadFrontPicUrl"
            class="avatar-uploader"
            accept=".jpg,.jpeg,.png,.gif">
            <img v-if="frontUrl" :src="frontUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"/>
          </el-upload>
        </el-form-item>
        </div>
        		<div @click="position('back')">
        <el-form-item label="后">
            <span class="tip-pic">只能上传jpg/png文件，只有1张，且不超过500kb</span>
            <el-upload
            :headers="headers"
             :action="uploadPath+params"
            :show-file-list="false"
            :on-success="uploadBackPicUrl"
            class="avatar-uploader"
            accept=".jpg,.jpeg,.png,.gif">
            <img v-if="backUrl" :src="backUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"/>
            </el-upload>
        </el-form-item>
        </div>
	    <div @click="position('left')">
            <el-form-item label="左">
                <span class="tip-pic">只能上传jpg/png文件，只有1张，且不超过500kb</span>
                <el-upload
                :headers="headers"
               :action="uploadPath+params"
                :show-file-list="false"
                :on-success="uploadLeftPicUrl"
                class="avatar-uploader"
                accept=".jpg,.jpeg,.png,.gif">
                <img v-if="leftUrl" :src="leftUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"/>
                </el-upload>
            </el-form-item>
	    </div>
       <div @click="position('right')">
                <el-form-item label="右">
                <span class="tip-pic">只能上传jpg/png文件，只有1张，且不超过500kb</span>
                <el-upload
                :headers="headers"
               :action="uploadPath+params"
                :show-file-list="false"
                :on-success="uploadRightPicUrl"
                class="avatar-uploader"
                accept=".jpg,.jpeg,.png,.gif">
                <img v-if="rightUrl" :src="rightUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"/>
                </el-upload>
            </el-form-item>
       </div>
         <div @click="position('top')">
            <el-form-item label="顶部">
                <span class="tip-pic">只能上传jpg/png文件，只有1张，且不超过500kb</span>
                <el-upload
                :headers="headers"
               :action="uploadPath+params"
                :show-file-list="false"
                :on-success="uploadTopPicUrl"
                class="avatar-uploader"
                accept=".jpg,.jpeg,.png,.gif">
                <img v-if="topUrl" :src="topUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"/>
                </el-upload>
            </el-form-item>
         </div>
             <div @click="position('bottom')">
            <el-form-item label="底部">
                <span class="tip-pic">只能上传jpg/png文件，只有1张，且不超过500kb</span>
                <el-upload
                :headers="headers"
                 :action="uploadPath+params"
                :show-file-list="false"
                :on-success="uploadBottomPicUrl"
                class="avatar-uploader"
                accept=".jpg,.jpeg,.png,.gif">
                <img v-if="bottomUrl" :src="bottomUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"/>
                </el-upload>
            </el-form-item>
             </div>
		
				
				
				
        
				
        
				
      </el-form>
    </el-card>
		
    <div class="op-container">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handlePublish('goods')">添加</el-button>
    </div>

  </div>
</template>

<style scoped>

	.tip-pic{
		color: #cacdd4;
		font-size: 13px;
	}
	
  .el-card {
    margin-bottom: 10px;
  }

  .el-tag + .el-tag {
    margin-left: 10px;
  }

  .input-new-keyword {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }

  .avatar-uploader .el-upload {
    width: 145px;
    height: 145px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }

  .avatar {
    width: 145px;
    height: 145px;
    display: block;
  }
</style>

<script>
import { publishGoods, listCatAndBrand } from '@/api/goods'
import { createStorage, uploadPath,filePath,filePathNew } from '@/api/storage'
import { uploadDetailPic } from '@/api/upload'
import Editor from '@tinymce/tinymce-vue'
import { MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'
import { mapGetters } from "vuex";
import {
  getAll,
  postData,
  getDataByID,
  putData,
	deleteData,
	getSearch
} from '@/api/dbhelper'


export default {
  name: 'vr',
  components: { Editor },

  data() {
    return {
      params:'',
      fileName:'',
      uploadPath,
      filePathNew,
      liveInfo:[],//直播间详情
      picUrls:[
       
      ],//VR图片集合
      frontUrl:'',
      backUrl:'',
      leftUrl:'',
      rightUrl:'',
      topUrl:'',
      bottomUrl:'',
      filePath,
      newKeywordVisible: false,
      newKeyword: '',
      keywords: [],
      categoryId: [],
      brandList: [],
      goods: { picUrl: '', shareUrl:'', gallery: [] },
      specVisiable: false,
      specForm: { specification: '', value: '', picUrl: '' },
      multipleSpec: false,
      specifications: [{ specification: '规格', value: '标准', picUrl: '' }],
      productVisiable: false,
      productForm: { id: 0, specifications: [], price: 0.00, number: 0, url: '' },
      products: [{ id: 0, specifications: ['标准'], price: 0.00, number: 0, url: '' }],
      attributeVisiable: false,
      attributeForm: { attribute: '', value: '' },
      attributes: [],
      rules: {
        goodsSn: [{ required: true, message: '商品编号不能为空', trigger: 'blur' }],
        name: [{ required: true, message: '商品名称不能为空', trigger: 'blur' }]
      },
      editorInit: {
        language: 'zh_CN',
        convert_urls: false,
        plugins: ['advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools importcss insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount'],
        toolbar: ['searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample', 'hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen'],
        images_upload_handler: function(blobInfo, success, failure) {
          const formData = new FormData()
          formData.append('file', blobInfo.blob())
          uploadDetailPic(formData).then(res => {
            console.log(res.data.data.url,8544)
            //
            var url= res.data.data.url.replace("http://localhost:8080/wx/storage/fetch",'https://sandc.xyz:8889/wx/storage/fetch')
            success(url)
          }).catch(() => {
            failure('上传失败，请重新上传')
          })
        }
      }
    }
  },
		  computed: {
				  ...mapGetters(["shopId"]),
    headers() {
      return {
        'X-Litemall-Admin-Token': getToken()
      }
    }
  },
  created() {
    console.log(this.shopId,8877)
    this.goods.shopId = this.shopId
    this.getlist();
   // this.params = '?dir='+;
    this.init()
  },

  methods: {
    getlist(){
			

					getAll('LiveStreaming/listlistLive?userId='+this.shopId).then(response => {
            this.liveInfo = response.data.data.items
            var array=  response.data.data.items[0].picUrls
          
            				console.log(this.liveInfo[0],8555566,)
            for(var i=0;i<array.length;i++){
              var position = ''
              if(i==0){
              position = 'front'
              }else if(i==1){
                position = 'back'
              }else if(i==2){
  position = 'left'
              }else if(i==3){
  position = 'right'
              }else if(i==4){
  position = 'top'
              }
              else if(i==5){
  position = 'bottom'
              }
              
                this.picUrls.push({
                  "position":position,
                  "url":array[i]
                });
            }
          //    if(i==0){
                this.frontUrl  =array[0];
                 this.backUrl  = array[1];
                  this.leftUrl  = array[2];
                   this.rightUrl  =array[3];
                    this.topUrl  =array[4];
                     this.bottomUrl  = array[5];
            //  }
              
           // }
           console.log(877744,this.frontUrl)
				     
				}).catch(() => {
				
				})
			},
    init: function() {
      listCatAndBrand().then(response => {
        this.categoryId = response.data.data.categoryList
        this.brandList = response.data.data.brandList
      })
    },
    position(area){
       console.log(88885,area)
       this.fileName = area+'.jpg';
         this.params = '?dir='+ this.shopId+'&name='+ this.fileName;
    },
    handleCategoryChange(value) {
      this.goods.categoryId = value[value.length - 1]
    },
    handleCancel: function() {
      this.$router.push({ path: '/goods/goods' })
    },
    handlePublish: function(formName) {
     // var picArr = [];
      var arr  =new Array(6);
      console.log(this.picUrls,885511)
      if(this.picUrls.length<6){
        	  this.$notify.error({
					    title: '失败',
					    message: '请补全图片'
            })
            return;
      }
      var na = this.picUrls.map(function(v){
        if(v.position=='front'){
          arr[0]  = v.url
        }else if(v.position=='back'){
            arr[1]  = v.url
        }else if(v.position=='left'){
            arr[2]  = v.url
        }else if(v.position=='right'){
            arr[3]  = v.url
        }else if(v.position=='top'){
            arr[4]  = v.url
        }else if(v.position=='bottom'){
            arr[5]  = v.url
        }
      });
      var data = {
        "picUrls":arr,
        "id":this.liveInfo[0].id
      }
      postData("LiveStreaming/updateLiveVideo",data).then(response=>{
        if(response.data.errno ==0){
          	  this.$notify.success({
					    title: '成功',
					    message: '创建成功'
					  })
        }
        console.log(response,88555)

      })

     console.log(this.picUrls,arr.length,arr);
  
    },
    handleClose(tag) {
      this.keywords.splice(this.keywords.indexOf(tag), 1)
      this.goods.keywords = this.keywords.toString()
    },
    showInput() {
      this.newKeywordVisible = true
      this.$nextTick(_ => {
        this.$refs.newKeywordInput.$refs.input.focus()
      })
    },
    handleInputConfirm() {
      const newKeyword = this.newKeyword
      if (newKeyword) {
        this.keywords.push(newKeyword)
        this.goods.keywords = this.keywords.toString()
      }
      this.newKeywordVisible = false
      this.newKeyword = ''
    },
    uploadFrontPicUrl: function(response) {

      this.frontUrl =response.data.url.replace("http://localhost:8080/wx/storage/fetch",this.filePathNew)+'?' + new Date().getTime()
      this.picUrls =   this.picUrls.filter((item,index)=>{
          return item.position!='front'
      })
          this.picUrls.push(
        {
          "position":'front',
          "url": this.frontUrl 
        })
  
     console.log(this.frontUrl,7744,   this.picUrls)
    },
	    uploadBackPicUrl: function(response) {
      this.backUrl =response.data.url.replace("http://localhost:8080/wx/storage/fetch",this.filePathNew)+'?' + new Date().getTime()
          this.picUrls =   this.picUrls.filter((item,index)=>{
          return item.position!='back'
      })
          this.picUrls.push(
        {
          "position":'back',
          "url": this.backUrl 
        })
     
    },
        uploadLeftPicUrl: function(response) {
      this.leftUrl =response.data.url.replace("http://localhost:8080/wx/storage/fetch",this.filePathNew)+'?' + new Date().getTime()
             this.picUrls =   this.picUrls.filter((item,index)=>{
          return item.position!='left'
      })
          this.picUrls.push(
        {
          "position":'left',
          "url": this.leftUrl 
        })
 
    },
        uploadRightPicUrl: function(response) {
      this.rightUrl =response.data.url.replace("http://localhost:8080/wx/storage/fetch",this.filePathNew)+'?' + new Date().getTime()
     
             this.picUrls =   this.picUrls.filter((item,index)=>{
          return item.position!='right'
      })
          this.picUrls.push(
        {
          "position":'right',
          "url": this.rightUrl 
        })
 
    },
        uploadTopPicUrl: function(response) {
      this.topUrl =response.data.url.replace("http://localhost:8080/wx/storage/fetch",this.filePathNew)+'?' + new Date().getTime()
               this.picUrls =   this.picUrls.filter((item,index)=>{
          return item.position!='top'
      })
          this.picUrls.push(
        {
          "position":'top',
          "url": this.topUrl 
        })
 
  
    },
        uploadBottomPicUrl: function(response) {
      this.bottomUrl =response.data.url.replace("http://localhost:8080/wx/storage/fetch",this.filePathNew)+'?' + new Date().getTime()
              this.picUrls =   this.picUrls.filter((item,index)=>{
          return item.position!='bottom'
      })
          this.picUrls.push(
        {
          "position":'bottom',
          "url": this.bottomUrl 
        })
    },
  
 
    handleRemove: function(file, fileList) {
      for (var i = 0; i < this.goods.gallery.length; i++) {
        // 这里存在两种情况
        // 1. 如果所删除图片是刚刚上传的图片，那么图片地址是file.response.data.url
        //    此时的file.url虽然存在，但是是本机地址，而不是远程地址。
        // 2. 如果所删除图片是后台返回的已有图片，那么图片地址是file.url
        var url
        if (file.response === undefined) {
          url = file.url
        } else {
          url = file.response.data.url
        }

        if (this.goods.gallery[i] === url) {
          this.goods.gallery.splice(i, 1)
        }
      }
    },
    specChanged: function(label) {
      if (label === false) {
        this.specifications = [{ specification: '规格', value: '标准', picUrl: '' }]
        this.products = [{ id: 0, specifications: ['标准'], price: 0.00, number: 0, url: '' }]
      } else {
        this.specifications = []
        this.products = []
      }
    },
    uploadSpecPicUrl: function(response) {
      this.specForm.picUrl = response.data.url.replace("http://localhost:8080/wx/storage/fetch",this.filePath)
    },
    handleSpecificationShow() {
      this.specForm = { specification: '', value: '', picUrl: '' }
      this.specVisiable = true
    },
    handleSpecificationAdd() {
      var index = this.specifications.length - 1
      for (var i = 0; i < this.specifications.length; i++) {
        const v = this.specifications[i]
        if (v.specification === this.specForm.specification) {
          index = i
        }
      }
      this.specifications.splice(index + 1, 0, this.specForm)
      this.specVisiable = false

      this.specToProduct()
    },
    handleSpecificationDelete(row) {
      const index = this.specifications.indexOf(row)
      this.specifications.splice(index, 1)
      this.specToProduct()
    },
    specToProduct() {
      if (this.specifications.length === 0) {
        return
      }
      // 根据specifications创建临时规格列表
      var specValues = []
      var spec = this.specifications[0].specification
      var values = []
      values.push(0)

      for (var i = 1; i < this.specifications.length; i++) {
        const aspec = this.specifications[i].specification

        if (aspec === spec) {
          values.push(i)
        } else {
          specValues.push(values)
          spec = aspec
          values = []
          values.push(i)
        }
      }
      specValues.push(values)

      // 根据临时规格列表生产货品规格
      // 算法基于 https://blog.csdn.net/tyhj_sf/article/details/53893125
      var productsIndex = 0
      var products = []
      var combination = []
      var n = specValues.length
      for (var s = 0; s < n; s++) {
        combination[s] = 0
      }
      var index = 0
      var isContinue = false
      do {
        var specifications = []
        for (var x = 0; x < n; x++) {
          var z = specValues[x][combination[x]]
          specifications.push(this.specifications[z].value)
        }
        products[productsIndex] = { id: productsIndex, specifications: specifications, price: 0.00, number: 0, url: '',shopId:this.shopId }
        productsIndex++

        index++
        combination[n - 1] = index
        for (var j = n - 1; j >= 0; j--) {
          if (combination[j] >= specValues[j].length) {
            combination[j] = 0
            index = 0
            if (j - 1 >= 0) {
              combination[j - 1] = combination[j - 1] + 1
            }
          }
        }
        isContinue = false
        for (var p = 0; p < n; p++) {
          if (combination[p] !== 0) {
            isContinue = true
          }
        }
      } while (isContinue)

      this.products = products
    },
    handleProductShow(row) {
      this.productForm = Object.assign({}, row)
      this.productVisiable = true
    },
    uploadProductUrl: function(response) {
      this.productForm.url = response.data.url.replace("http://localhost:8080/wx/storage/fetch",this.filePath)
    },
    handleProductEdit() {
      for (var i = 0; i < this.products.length; i++) {
        const v = this.products[i]
        if (v.id === this.productForm.id) {
          this.products.splice(i, 1, this.productForm)
          break
        }
      }
      this.productVisiable = false
    },
    handleAttributeShow() {
      this.attributeForm = {}
      this.attributeVisiable = true
    },
    handleAttributeAdd() {
      this.attributes.unshift(this.attributeForm)
      this.attributeVisiable = false
    },
    handleAttributeDelete(row) {
      const index = this.attributes.indexOf(row)
      this.attributes.splice(index, 1)
    },
 
  }
}
</script>
