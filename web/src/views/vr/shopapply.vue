<template>
    <div class="contain">
        <div class="member-cont">
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                label="会员登录ID"
                width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.id }}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="用户姓名"
                width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.username }}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="门店名"
                width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.content }}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="代理社区"
                width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.region.join(',')  }}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="申请时间"
                width="180">
                <template slot-scope="scope">
                    <span>{{ scope.row.addTime }}</span>
                </template>
                </el-table-column>
                <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">查看</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="profit-page">
            <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getlist" />
        </div>
        <div class="check-info" v-show="usershow">
            <div class="check-cont">
                <p class="check-title">
                    <span style="border-bottom:2px solid red;padding-bottom:10px;"><b>基本信息</b></span>
                </p>
                <div class="user-info" v-for="(item,index) in userinfo" :key="index">
                    <div>
                        <p> <b>姓名：</b>{{item.username}}</p>
                    </div>
                    <div>
                        <p> <b>门店名：</b>{{item.content}}</p>
                    </div>
                    <div>
                        <p><b>代理社区：</b>{{item.region.join(',')}}</p>
                    </div>
                    <div>
                        <p><b>身份证信息</b></p>
                        <div class="picture">
                            <div>
                                <el-upload
                                :headers="headers"
                                :action="uploadPath"
                                :show-file-list="false"
                                :on-success="uploadIconUrl"
                                class="avatar-uploader"
                                accept=".jpg,.jpeg,.png,.gif">
                                <img v-if="dataForm.iconUrl" :src="dataForm.iconUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"/>
                                </el-upload>
                                正面
                            </div>  
                            <div>
                                <el-upload
                                :headers="headers"
                                :action="uploadPath"
                                :show-file-list="false"
                                :on-success="uploadIconUrls"
                                class="avatar-uploader"
                                accept=".jpg,.jpeg,.png,.gif">
                                <img v-if="dataForm.iconUrls" :src="dataForm.iconUrls" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"/>
                                </el-upload>
                                反面
                            </div> 
                        </div>  
                        
                    </div>
                    <div class="check-btn">
                        <div class="check-cancel" @click="uncheck">取消审核</div>
                        <div class="check-pass" @click="check">通过审核</div>
                       
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { shoplist,deleteinfo,shoplistNew } from '@/api/others'
import { uploadPath,filePath } from '@/api/storage'
import { getToken } from '@/utils/auth'
import {
  getAll,
  postData,
  getDataByID,
  putData,
	deleteData,
	getSearch
} from '@/api/dbhelper'
import { mapGetters } from "vuex";
export default {
    name:"shopapply",
    components: { Pagination },
    data(){
        return{
            uploadPath,
            filePath,
            usershow:false,
            distId:'',
            userId:'',
            total: 0,
            listQuery: {
                page: 1,
                limit: 20,
            },
            dataForm: {
                iconUrl: undefined,
                iconUrls:undefined,
                picUrl: undefined
            },
            userinfo:[],
            tableData: [
                {
                date: '001',
                name: '王小虎',
                phone:195223443,
                address: '上海市普陀区金沙江路 1518 弄'
                },
                {
                date: '002',
                name: '王小虎',
                phone:1863223443,
                address: '上海市普陀区金沙江路 1517 弄'
                }, 
                {
                date: '003',
                name: '王小虎',
                phone:1233255443,
                address: '上海市普陀区金沙江路 1519 弄'
                }, 
                {
                date: '004',
                name: '王小虎',
                phone:1563223443,
                address: '上海市普陀区金沙江路 1516 弄'
                }
                ]
        }
    },
    computed: {
        headers() {
        return {
            'X-Litemall-Admin-Token': getToken()
        }
        }
  },
  created(){

      			if(this.roles.indexOf("商家")>-1){
		  console.log(this.roles,'当前角色7771')
        this.listQuery.shopId = this.shopId;
        this.getlist();
		}else{
  this.getlist();
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
    methods:{
        handleEdit(index, row) {
            console.log(index, row);
            this.usershow=true;
            this.distId = row.id
            this.userId = row.userId
            this.userinfo.push(row);
        },
        handleDelete(index, row) {
            console.log(index, row);
            var obj={
                id : row.id,
                content:row.content,
            }
            deleteinfo(obj).then((res)=>{
                
                this.getlist();
                this.$message.success('删除成功');
            })
        },
        uploadIconUrl: function(response) { 
        this.dataForm.iconUrl = response.data.url.replace("http://localhost:8080/wx/storage/fetch",this.filePath)
        },
        uploadIconUrls: function(response) { 
        this.dataForm.iconUrls = response.data.url.replace("http://localhost:8080/wx/storage/fetch",this.filePath)
        },
        uncheck(){
            this.usershow=false;
            this.userinfo.length=0;
        },
        //审核通过方法
        check(){
                 if(this.shopId==undefined){
        getDataByID("/AdminDistribution/agree?DistributionId="+this.distId+"&userId="+this.userId).then(response=>{
                if(response.data.errno==0){
                        this.usershow=false;
                    this.getlist();
                 
                }
                console.log(response,66888,this.distId)
            })
                     
                 }else{
//通过审核
       getDataByID("/AdminDistribution/shopCheck?DistributionId="+this.distId+"&shopId="+this.shopId+"&Status=1").then(response=>{
                if(response.data.errno==0){
                    
                        this.usershow=false;
                          this.$message.success(response.data.data.msg);
                    this.getlist();
                 
                }
                console.log(response,66888,this.distId)
            })


                 }
  
    
               
        },
        getlist:function(){
           if(this.shopId==undefined){
                  shoplist(this.listQuery).then((res)=>{
                this.tableData = res.data.data.items;
                this.total = res.data.data.total;
            }).catch(() =>{
                this.list = []
                this.total = 0
            })
           }else{
                      shoplistNew(this.listQuery).then((res)=>{
                this.tableData = res.data.data.items;
                this.total = res.data.data.total;
            }).catch(() =>{
                this.list = []
                this.total = 0
            })
           }

         
            
            
        }
    }
}
</script>
<style scoped>
p {
    margin: 0;
}
.member-cont{
    width: 1100px;
    margin: 0 auto;
    margin-top: 50px;
    background: #eeeeee;
}
.profit-page{
    width: 450px;
    margin: 0 auto;
    margin-top: 30px;
}
.pagination-container[data-v-72233bcd] {
    background: unset;
    padding: 32px 16px;
}
.contain /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active{
    background: #f56c6c;
}
.check-info{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    background: #f3f3f3;
    z-index: 1;
}
.check-cont{
    width: 1000px;
    margin: 0 auto;
    margin-top: 50px;
}
.check-title{
    width: 100%;
    height: 40px;
    border-bottom: 1px solid gray;
    line-height: 40px;
}
.user-info{
    width: 400px;
    height: 400px;
}
.user-info :nth-child(even){
    background: #e7f6fd;
}
.user-info>div>p{
    height: 40px;
    text-indent: 16px;
    line-height: 40px;
}
.check-btn{
    width: 260px;
    display: flex;
    margin: 0 auto;
    margin-top: 20px;
    justify-content: space-between;
}
.check-cancel{
    width: 80px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid gray;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
}
.check-pass{
    width: 80px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    background: #ff3a59 !important;
    border-radius: 5px;
    color: white;
    cursor: pointer;
}
.picture{
    width: 100%;
    height: 120px;
    display: flex;
    justify-content: space-around;
}
.picture div{
    text-align: center;
    width: 150px;
    height: 100px;
}
.picture div img{
    width: 100%;
    height: 100%;
}
.avatar-uploader{
    width: 150px;
    height: 100px;
    background: #dcdcdc;
    line-height: 100px;
}
</style>

