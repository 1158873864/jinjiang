<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">

      <span>酒庄选择</span>
      <el-select v-model="shopId" @change="changeShop">
        <el-option v-for="item in shopIds" :key="item.id" :label="item.name" :value="item.id"/>
      </el-select>

      <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>
  <!--     <el-button :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">导出</el-button>-->
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" size="small" element-loading-text="正在查询中。。。" border fit highlight-current-row>

      <el-table-column align="center" label="优惠券ID" prop="id" sortable/>

      <el-table-column align="center" label="优惠券名称" prop="name"/>

      <el-table-column align="center" label="介绍" prop="desc"/>

      <el-table-column align="center" label="标签" prop="tag"/>

      <el-table-column align="center" label="最低消费" prop="min">
        <template slot-scope="scope">满{{ scope.row.min }}元可用</template>
      </el-table-column>

      <el-table-column align="center" label="满减金额" prop="discount">
        <template slot-scope="scope">减免{{ scope.row.discount }}元</template>
      </el-table-column>


      <el-table-column align="center" label="每人限领" prop="limit">
        <template slot-scope="scope">{{ scope.row.limit != 0 ? scope.row.limit : "不限" }}</template>
      </el-table-column>

      <el-table-column align="center" label="商品使用范围" prop="goodsType">
        <template slot-scope="scope">{{ scope.row.goodsType | formatGoodsType}}</template>
      </el-table-column>

      <el-table-column align="center" label="天数" prop="days">
        <template slot-scope="scope">{{ scope.row.days }}</template>
      </el-table-column>


      <el-table-column align="center" label="开始时间" prop="startTime">
        <template slot-scope="scope">{{ scope.row.startTime }}</template>
      </el-table-column>

      <el-table-column align="center" label="结束时间" prop="endTime">
        <template slot-scope="scope">{{ scope.row.endTime }}</template>
      </el-table-column>

      <el-table-column align="center" label="优惠券数量" prop="total">
        <template slot-scope="scope">{{ scope.row.total != 0 ? scope.row.total : "不限" }}</template>
      </el-table-column>


      <el-table-column align="center" label="操作" width="150" class-name="small-padding fixed-width">
        <template slot-scope="scope">

          <el-button v-permission="['POST /admin/coupon/update']" type="info" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button v-permission="['POST /admin/coupon/delete']" type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!-- 添加或修改对话框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="dataForm" status-icon label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="优惠券名称" prop="name">
          <el-input v-model="dataForm.name"/>
        </el-form-item>
        <el-form-item label="介绍" prop="desc">
          <el-input v-model="dataForm.desc"/>
        </el-form-item>
        <el-form-item label="标签" prop="tag">
          <el-input v-model="dataForm.tag"/>
        </el-form-item>
        <el-form-item label="最低消费" prop="min">
          <el-input v-model="dataForm.min">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="满减金额" prop="discount">
          <el-input v-model="dataForm.discount">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="每人限领" prop="limit">
          <el-input v-model="dataForm.limit">
            <template slot="append">张</template>
          </el-input>
        </el-form-item>
        <el-form-item label="优惠券数量" prop="total">
          <el-input v-model="dataForm.total">
            <template slot="append">张</template>
          </el-input>
        </el-form-item>
        <el-form-item label="有效期">
          <el-radio-group v-model="dataForm.timeType">
            <el-radio-button :label="0">领券相对天数</el-radio-button>
            <el-radio-button :label="1">指定绝对时间</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-show="dataForm.timeType === 0">
          <el-input v-model="dataForm.days">
            <template slot="append">天</template>
          </el-input>
        </el-form-item>
        <el-form-item v-show="dataForm.timeType === 1">
          <el-col :span="11">
            <el-date-picker v-model="dataForm.startTime" type="datetime"  format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"  placeholder="选择日期" style="width: 100%;"/>
          </el-col>
          <el-col :span="2" class="line">至</el-col>
          <el-col :span="11">
            <el-date-picker v-model="dataForm.endTime" type="datetime"  format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"  placeholder="选择日期" style="width: 100%;"/>
          </el-col>
        </el-form-item>
        <el-form-item label="商品限制范围">
          <el-radio-group v-model="dataForm.goodsType">
            <el-radio-button :label="0">全场通用</el-radio-button>
            <el-radio-button :label="1">直推奖</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确定</el-button>
        <el-button v-else type="primary" @click="updateData">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<style>
.avatar-uploader .el-upload {
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
  width: 120px;
  height: 120px;
  display: block;
}
</style>

<script>
import { listCoupon, createCoupon, updateCoupon, deleteCoupon } from '@/api/coupon'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { mapGetters } from "vuex";
import axios from 'axios'
import * as config from '../../../config'

const defaultTypeOptions = [
  {
    label: '通用领券',
    value: 0
  },
  {
    label: '注册赠券',
    value: 1
  },
  {
    label: '兑换码',
    value: 2
  }
]

const defaultStatusOptions = [
  {
    label: '正常',
    value: 0
  },
  {
    label: '已过期',
    value: 1
  },
  {
    label: '已下架',
    value: 2
  }
]

export default {
  name: 'Discount',
  components: { Pagination },
  filters: {
    formatType(type) {
      for (let i = 0; i < defaultTypeOptions.length; i++) {
        if (type === defaultTypeOptions[i].value) {
          return defaultTypeOptions[i].label
        }
      }
      return ''
    },
    formatGoodsType(goodsType) {
      if (goodsType === '0') {
        return '全场通用'
      } else if (goodsType === '1') {
        return '直推奖'
      }
    },
    formatStatus(status) {
      if (status === 0) {
        return '正常'
      } else if (status === 1) {
        return '已过期'
      } else {
        return '已下架'
      }
    }
  },
  data() {
    return {
      typeOptions: Object.assign({}, defaultTypeOptions),
      statusOptions: Object.assign({}, defaultStatusOptions),
      list: undefined,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 0,
        limit: 20,
        name: undefined,
        type: undefined,
        status: undefined,
        sort: 'add_time',
        order: 'desc'
      },
      dataForm: {
        id: undefined,
        name: undefined,
        desc: undefined,
        tag: undefined,
        discount: 0,
        min: 0,
        limit: 1,
        type: 0,
        goodsType: 0,
        timeType: 0,
        days: 0,
        startTime: null,
        endTime: null,
        shopId:'',
      },
      shopId:'',
      shopIds:[],
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      rules: {
        name: [
          { required: true, message: '优惠券标题不能为空', trigger: 'blur' }
        ]
      },
      downloadLoading: false
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

    this.getList()
  },
  methods: {
    getList() {

      this.listLoading = true

      axios({
        method: 'get',
        url: config.baseApi + "discount/find/all?&page="+ this.listQuery.page+"&size=20",
        headers:{
          "X-Litemall-Admin-Token":sessionStorage.getItem('token')
        }
      }).then(response => {

          this.list = response.data.data.items.content

          this.total = response.data.data.items.totalPages
          this.listLoading = false

      }).catch(error => {
        this.list = []
        this.total = 0
        this.listLoading = false
      });

      axios({
        method: 'get',
        url: config.baseApi + "shop/find/all?&page="+ (this.listQuery.page-1)+"&size=100",
        headers:{
          "X-Litemall-Admin-Token":sessionStorage.getItem('token')
        }
      }).then(response => {

        this.shopIds = response.data.data.items.content

      }).catch(error => {
      });

    },
    handleFilter() {
      this.listQuery.page = 0
      this.getList()
    },
    resetForm() {
      this.dataForm = {
        id: "",
        name: "",
        desc: "",
        tag: "",
        total: 0,
        min: 0,
        discount: 0,
        limit: 1,
        type: "",
        goodsType: "",
        timeType: 0,
        days: 0,
        startTime: "",
        endTime: "",
        shopId:this.shopId
      }
    },
    changeShop(){
      var shopId=this.shopId
      axios({
        method: 'get',
        url: config.baseApi + "discount/find/shopId?shopId="+this.shopId+"&page="+ (this.listQuery.page-1)+"&size=20",
        headers:{
          "X-Litemall-Admin-Token":sessionStorage.getItem('token')
        }
      }).then(response => {
        this.list = response.data.data.items.content
        this.total = response.data.data.items.totalPages
        this.listLoading = false

      }).catch(error => {
        this.list = []
        this.total = 0
        this.listLoading = false
      });
    },
    handleCreate() {
      this.resetForm()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {

          console.log(this.dataForm)

           axios({
            method: 'post',
            url: config.baseApi + "discount/add",
            headers:{
              "X-Litemall-Admin-Token":sessionStorage.getItem('token')
            },
            data:this.dataForm
          }).then(response => {
            if(response.data.code==0){
              this.list.unshift(response.data.data)
              this.dialogFormVisible = false
              this.$notify.success({
                title: '成功',
                message: '创建优惠券成功'
              })
              this.listQuery.page = 0
              this.changeShop()
            }
          }).catch(error => {
            this.$notify.error({
              title: '失败',
              message: response.data.errmsg
            })
          });


        }
      })
    },
    handleUpdate(row) {
      this.dataForm = Object.assign({}, row)

      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        if (this.dataForm.days === 0) {
          this.dataForm.daysType = 1
        } else {
          this.dataForm.daysType = 0
        }
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        axios({
          method: 'put',
          url: config.baseApi + "discount/update",
          headers:{
            "X-Litemall-Admin-Token":sessionStorage.getItem('token')
          },
          data:this.dataForm
        }).then(response => {
          if(response.data.code==0){
            for (const v of this.list) {
              if (v.id === this.dataForm.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.dataForm)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify.success({
              title: '成功',
              message: '更新优惠券成功'
            })
          }
        }).catch(error => {
          this.$notify.error({
            title: '失败',
            message: response.data.errmsg
          })
        });


      })
    },
    handleDelete(row) {
      axios({
        method: 'get',
        url: config.baseApi + "discount/delete?id="+row.id,
        headers:{
          "X-Litemall-Admin-Token":sessionStorage.getItem('token')
        }
      }).then(response => {
        if(response.data.code==0){
          this.$notify.success({
            title: '成功',
            message: '删除优惠券成功'
          })
          const index = this.list.indexOf(row)
          this.list.splice(index, 1)
        }
      }).catch(error => {
        this.$notify.error({
          title: '失败',
          message: response.data.errmsg
        })
      });

    },
    handleDetail(row) {
      this.$router.push({ path: '/promotion/couponDetail', query: { id: row.id }})
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = [
          '优惠券ID',
          '名称',
          '内容',
          '标签',
          '最低消费',
          '减免金额',
          '每人限领',
          '优惠券数量'
        ]
        const filterVal = [
          'id',
          'name',
          'desc',
          'tag',
          'min',
          'discount',
          'limit',
          'total'
        ]
        excel.export_json_to_excel2(tHeader, this.list, filterVal, '优惠券信息')
        this.downloadLoading = false
      })
    }
  }
}
</script>
