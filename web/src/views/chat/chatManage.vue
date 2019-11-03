
<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
<!--
    <div class="filter-container">
      <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>
    </div>
-->
    <!-- 查询结果 -->
    <el-table  :data="list" size="small" border fit highlight-current-row>

      <el-table-column align="center" label="用户ID" prop="userId"/>

<!--
      <el-table-column align="center" label="最后回复时间" prop="giftPrice"/>
     
      <el-table-column prop="pictures" label="描述图片">
　　  <template scope="scope">
　　　　<img :src="scope.row.picUrl" width="100" @click="lookImage(scope.row.picUrl)" height="100" class="head_pic"/>
　　</template>

   </el-table-column>

   -->  
     

        
      
 


      <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleReply(scope.row)">回复</el-button>
        <!--  <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
   <el-dialog  :visible.sync="imageDialogVisible">
       <div>
        　　<img  :src="currentImage" width="350"  height="350" class="head_pic"/>
         </div>
    </el-dialog>
    <el-dialog
  
     :title="textMap[dialogStatus]"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <el-form ref="editForm" :model="editForm">
    	<el-form-item label="礼物名称" >
         <el-input v-model="editForm.giftName" style="width: 200px;"/>
        		</el-form-item>
                	<el-form-item label="礼物价格" >
         <el-input v-model="editForm.giftPrice" style="width: 200px;"/>
        		</el-form-item>

                
            <el-form-item label="礼物图片"  prop="picUrl">
           
          <el-upload
     
            :action="uploadPath"
            :show-file-list="false"
            :on-success="uploadPicUrl"
            class="avatar-uploader"
            accept=".jpg,.jpeg,.png,.gif">
            <img v-if="editForm.picUrl" :src="editForm.picUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"/>
          </el-upload>
    
                	</el-form-item> 
            <el-form-item label="礼物简介" >
      <el-input
  type="textarea"
  :rows="4"
  placeholder="请输入内容"
  v-model="editForm.giftContent">
</el-input>
        </el-form-item>
  </el-form>

  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button  v-if="dialogStatus=='update'" type="primary" @click="handleSubmit">确 定</el-button>
    <el-button v-else type="primary" @click="handleCreateData">确 定</el-button>

     
  </span>
</el-dialog>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :visibility-height="100" />
    </el-tooltip>

  </div>
</template>

<style>
  .table-expand {
    font-size: 0;
  }
  .table-expand label {
    width: 100px;
    color: #99a9bf;
  }
  .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
  }
  .gallery {
    width: 80px;
    margin-right: 10px;
  }
  .el-dialog img {
    display: block;
    width: 100%;
    height: 100%;
	}
</style>

<script>
import { listGoods, deleteGoods ,listShopGoods} from '@/api/goods'
import { createStorage, uploadPath,filePath } from '@/api/storage'
import BackToTop from '@/components/BackToTop'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { mapGetters } from "vuex";
import {
  getAll,
  postData,
  getDataByID,
  putData,
  deleteData,
  deleteByID,
	getSearch
} from '@/api/dbhelper'
const statusMap = {
  0: '商品',
  1: '直播间',
}
const areaMap = {
  0: 'PC端',
  1: 'APP端',
}

export default {
  name: 'chatManage',
  components: { BackToTop, Pagination },
  filters: {
    moduleStatusFilter(status) {
      return statusMap[status]
    },
     moduleAreaFilter(status) {
      return areaMap[status]
    }
  },
  data() {
    return {
        uploadPath,
        filePath,
      dialogStatus:'',
         textMap: {
        update: '编辑',
        create: '创建'
      },
      dialogVisible:false,
      editForm:{
        id:'',
        giftName:'',
        giftPrice:'',
        giftContent:'',
                picUrl: undefined
      },
      imageDialogVisible:false,
      currentImage:'',
      isYesNo:'',//显示直播间或者商品
      total:0,
      list: [
        {
        "name":"今日特价",
        "data":"商品"
      },
         {
        "name":"潮流穿搭",
        "data":"直播间"
      },
         {
        "name":"居家生活",
        "data":"商品"
      }
      ],
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        goodsSn: undefined,
        name: undefined,
        sort: 'add_time',
        order: 'desc'
      },
      goodsDetail: '',
      detailDialogVisible: false,
      downloadLoading: false,
      categoryList: [],
      statusMap,
      areaMap
    }
  },
  	  computed: {
				  ...mapGetters(["shopId","roles"]),
    headers() {
      return {
        'X-Litemall-Admin-Token': getToken()
      }
    }
  },
  created() {  
    this.listQuery.shopId = this.shopId;
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true 
      //this.listQuery.shopId = 9
      getAll("/user/getChatList",this.listQuery).then(response=>{
        if(response.data.errno==0){
             this.list = response.data.data.items
            this.total = response.data.data.total
      //  this.listLoading = false
        }
          console.log(   this.list,'74447')
      })
    },
    handleReply(row){
        console.log(row,7744)
    },
        uploadPicUrl: function(response) {
       this.editForm.picUrl =response.data.url.replace("http://localhost:8080/wx/storage/fetch",this.filePath)
        console.log(this.editForm.picUrl,8088)
  },
    handleClose(){
    this.dialogVisible = false
    },
    //提交编辑
    handleSubmit(){
    
      putData("AdminGift/update",this.editForm).then(response=>{
        if(response.data.errno==0){
          this.$notify.success({
          title: '成功',
          message: '修改成功'
        })
          this.getList();
        }
        console.log("dddd",response)
      })
       this.dialogVisible = false
    },
        lookImage(item){
      this.currentImage = item;
      this.imageDialogVisible = true;
      console.log(item,799)
    },
        
    //选择商品分类
    handleCategoryChange(value) {
      this.goods.categoryId = value[value.length - 1]
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleCreate() {
       this.dialogStatus  = 'create'
      this.dialogVisible = true
      this.editForm.name=''
      this.editForm.type='',
      this.editForm.id=''
    },
    handleCreateData() {
        this.editForm.gift = 5
     postData("AdminGift/create",this.editForm).then(response=>{
       if(response.data.errno===0){
       console.log(response,'addd')
       this.getList();
       }
          this.dialogVisible = false
     })
    },
    handleUpdate(row) {
      this.dialogStatus  = 'update'
      this.dialogVisible = true
     this.editForm = Object.assign({}, row)
     // this.editForm = row;
      //this.$router.push({ path: '/goods/edit', query: { id: row.id }})
    },
    showDetail(detail) {
      this.goodsDetail = detail
      this.detailDialogVisible = true
    },
    handleDelete(row) {
      deleteByID("AdminGift/delete",row).then(response=>{
        console.log(response,'444')
        if(response.data.errno==0){
    this.$notify.success({
          title: '成功',
          message: '删除成功'
        })
     
        const index = this.list.indexOf(row)
        this.list.splice(index, 1)
        this.total = this.total-1
           }
      })
    }
  }
}
</script>
