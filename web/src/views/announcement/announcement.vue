
<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>
      <!--<el-button :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">导出</el-button>-->
    </div>

    <!-- 查询结果 -->
    <el-table  :data="list" size="small" border fit highlight-current-row>

    

      <el-table-column align="center" min-width="100" label="公告内容" prop="content"/>
  
      <el-table-column align="center" min-width="100" label="发表时间" prop="addTime"/>
  
    
   
      
 


      <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
  
     :title="textMap[dialogStatus]"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <el-form ref="editForm">
    
            <el-form-item label="公告内容" >
      <el-input
  type="textarea"
  :rows="4"
  placeholder="请输入内容"
  v-model="editForm.content">
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


import BackToTop from '@/components/BackToTop'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

import {
  getAll,
  postData,
  getDataByID,
  putData,
  deleteData,
  deleteByID,
} from '@/api/dbhelper'


export default {
  name: 'announcement',
  components: { BackToTop, Pagination },

  data() {
    return {
 
        total:0,
      dialogStatus:'',
         textMap: {
        update: '编辑',
        create: '创建'
      },
      galleryFileList:[],
      dialogVisible:false,
      editForm:{
        id:'',
        name:'',
      },
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

    }
  },
  
  
  created() {  
    this.listQuery.shopId = this.shopId;
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true  //listShopGoods
    
      getAll("announcement/list",this.listQuery).then(response=>{
        if(response.data.errno==0){
             this.list = response.data.data.items
        this.total = response.data.data.total
      //  this.listLoading = false
        }
          console.log(response,'74447')
      })
    },
        
     
    handleClose(){
    this.dialogVisible = false
    },
    //提交编辑
    handleSubmit(){
      putData("announcement/edit",this.editForm).then(response=>{
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
      this.editForm.title=''
      this.editForm.content='',
   // this.editForm.
        this.galleryFileList = []
    },
    handleCreateData() {
      
     postData("announcement/add",this.editForm).then(response=>{
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
      this.editForm = row
         this.galleryFileList = []
        for (var i = 0; i < row.picUrl.length; i++) {
          this.galleryFileList.push({
            url: row.picUrl[i],
          })
        }
   //   this.editForm.id = row.id;
    // this.editForm.type = row.type
      //this.$router.push({ path: '/goods/edit', query: { id: row.id }})
    },
    showDetail(detail) {
      this.goodsDetail = detail
      this.detailDialogVisible = true
    },
    handleDelete(row) {
      deleteByID("announcement/delete",row).then(response=>{
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
      
      /*deleteGoods(row).then(response => {
        this.$notify.success({
          title: '成功',
          message: '删除成功'
        })
        const index = this.list.indexOf(row)
        this.list.splice(index, 1)
      }).catch(response => {
        this.$notify.error({
          title: '失败',
          message: response.data.errmsg
        })
      })*/
    }
  }
}
</script>
