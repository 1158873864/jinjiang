
<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
 
    <!-- 查询结果 -->
    <el-table  :data="list" size="small" border fit highlight-current-row>

    
      <el-table-column align="center" min-width="100" label="店铺名称" prop="shopName"/>
    
      <el-table-column align="center" min-width="100" label="投诉内容" prop="content"/>

      <el-table-column prop="pictures" label="描述图片">
　　<template scope="scope">
　　　　<img v-for="item in scope.row.picUrl" :src="item" width="100" @click="lookImage(item)" height="100" class="head_pic"/>
　　</template>
</el-table-column>
     
        <!--<template slot-scope="scope">
          
          <el-dialog :visible.sync="detailDialogVisible" title="投诉详情">
         
          </el-dialog>
          <el-button type="primary" size="mini" @click="showDetail(scope.row)">查看</el-button>
        </template>
        -->
         
　　　 <!--　<img v-for="item in scope.row.picUrl" :src="item" width="200" height="200" class="head_pic"/> -->


   <!--
    <template slot-scope="scope">
      <el-popover
      
        placement="right"
        title=""
        trigger="hover">
        <img    v-for="item in scope.row.picUrl"/>
        <img     v-for="item in scope.row.picUrl" slot="reference" :src="item" :alt="item" style="max-height: 50px;max-width: 130px">
      </el-popover>
　</template>
-->


      
  
      <el-table-column align="center" min-width="100" label="发表时间" prop="addTime"/>
  
    
   
      
 


      <el-table-column align="center" label="操作" width="300" class-name="small-padding fixed-width">
        <template slot-scope="scope">
           <el-button type="primary" size="mini" @click="handleUpdate(scope.row,1)">警告</el-button>
           
           <el-button type="danger" size="mini" @click="handleUpdate(scope.row,3)">扣款</el-button>
          <el-button type="danger" size="mini" @click="handleUpdate(scope.row,2)">封号</el-button>
         <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
         
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
  <el-form ref="editForm">
    
            <el-form-item label="投诉内容" >
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
  name: 'complaint',
  components: { BackToTop, Pagination },

  data() {
    return {
      imageDialogVisible:false,//图片显示
      currentImage:'',
 detailDialogVisible:false,
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
    //this.listQuery.shopId = this.shopId;
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true  //listShopGoods
    
      getAll("complaint/getByAdmin",this.listQuery).then(response=>{
        if(response.data.errno==0){
             this.list = response.data.data.items
        this.total = response.data.data.total
      //  this.listLoading = false
        }
          console.log(response,'74447')
      })
    },
    lookImage(item){
      this.currentImage = item;
      this.imageDialogVisible = true;
      console.log(item,799)
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
    handleUpdate(row,punishment) {
      var money = 0;
      if(punishment==3){
        money = 100;
      }
      var data = {
        punishment:punishment,
        money:money,
        shopId:row.shopId,
        complaintid:row.id,
        id:row.id
      };
      postData("complaint/function",data).then(response=>{
        if(response.data.errno==0){
            this.$notify.success({
          title: '成功',
          message: '操作成功'
        })
        }
          console.log(response,78988)
      })
    },
    showDetail(detail) {
      this.goodsDetail = detail
      this.detailDialogVisible = true
    },
    handleDelete(row) {
      var status = row.status;
      var complaintid = row.id;
      deleteByID("complaint/delete?status="+status+"&complaintid="+complaintid).then(response=>{
        console.log(response,'444')
        if(response.data.errno==0){
       this.$notify.success({
          title: '成功',
          message: '删除成功'
        })
     this.getList();
      /*  const index = this.list.indexOf(row)
        this.list.splice(index, 1)
        this.total = this.total-1*/
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
