/* eslint-disable */
<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
	  <div class="filter-item el-input el-input--medium el-input--suffix" style="width: 351px;">
	    <el-date-picker v-model="value7" type="daterange" unlink-panels range-separator="至" start-placeholder="开始日期" 
	    	end-placeholder="结束日期" :picker-options="pickerOptions2">
	    </el-date-picker>
	  </div>
	  <div class="filter-item el-input el-input--medium el-input--suffix" style="width: 351px;">
	  	<el-time-picker is-range arrow-control v-model="value5" range-separator="至" start-placeholder="开始时间"
	      end-placeholder="结束时间" placeholder="选择时间范围">
	    </el-time-picker>
	  </div>	  
	  	  
      <el-button v-permission="['GET /admin/order/list']" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" size="small" element-loading-text="正在查询中。。。" border fit highlight-current-row>

	  <el-table-column align="center" label="订单状态" prop="orderStatus">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.orderStatus | orderStatusFilter }}</el-tag>
        </template>
      </el-table-column>
      
      <el-table-column align="center" label="用户ID" prop="userId"/>


      <el-table-column align="center" label="订单金额" prop="orderPrice"/>

      <el-table-column align="center" label="支付金额" prop="actualPrice"/>

      <el-table-column align="center" label="支付时间" prop="payTime"/>

      <el-table-column align="center" label="物流单号" prop="shipSn"/>

      <el-table-column align="center" label="物流渠道" prop="shipChannel"/>

      <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-permission="['GET /admin/order/detail']" type="primary" size="mini" @click="handleDetail(scope.row)">详情</el-button>
          <el-button  type="success" size="mini" @click="writeinfo(scope.row)">录入</el-button>
          
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
      <!-- 录入信息对话框 -->
      <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="快递公司" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="快递单号" :label-width="formLabelWidth">
            <el-input v-model="form.number" autocomplete="off"></el-input>
          </el-form-item>
          <!--
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="form.username" autocomplete="off"></el-input>
          </el-form-item>
          -->
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="form.subject" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="店铺名" :label-width="formLabelWidth">
            <el-input v-model="form.shopname" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="makesure()">确 定</el-button>
        </div>
      </el-dialog>
    <!-- 订单详情对话框 -->
    <el-dialog :visible.sync="orderDialogVisible" title="订单详情" width="800">

      <el-form :data="orderDetail" label-position="left">
      	<el-form-item label="选中" type="selection">
          <span>{{ orderDetail.order.orderSn }}</span>
        </el-form-item>
        <el-form-item label="订单编号">
          
        </el-form-item>
        <el-form-item label="订单状态">
          <template slot-scope="scope">
            <el-tag>{{ scope.order.orderStatus | orderStatusFilter }}</el-tag>
          </template>
        </el-form-item>
        <el-form-item label="订单用户">
          <span>{{ orderDetail.user.nickname }}</span>
        </el-form-item>
        <el-form-item label="收货信息">
          <span>（收货人）{{ orderDetail.order.consignee }}</span>
          <span>（手机号）{{ orderDetail.order.mobile }}</span>
          <span>（地址）{{ orderDetail.order.address }}</span>
        </el-form-item>
        <el-form-item label="商品信息">
          <el-table :data="orderDetail.orderGoods" size="small" border fit highlight-current-row>
            <el-table-column align="center" label="商品名称" prop="goodsName" />
            <el-table-column align="center" label="商品编号" prop="goodsSn" />
            <el-table-column align="center" label="货品规格" prop="specifications" />
            <el-table-column align="center" label="货品价格" prop="price" />
            <el-table-column align="center" label="货品数量" prop="number" />
            <el-table-column align="center" label="货品图片" prop="picUrl">
              <template slot-scope="scope">
                <img :src="scope.row.picUrl" width="40">
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="费用信息">
          <span>
            (实际费用){{ orderDetail.order.actualPrice }}元 =
            (商品总价){{ orderDetail.order.goodsPrice }}元 +
            (快递费用){{ orderDetail.order.freightPrice }}元 -
            (优惠减免){{ orderDetail.order.couponPrice }}元 -
            (积分减免){{ orderDetail.order.integralPrice }}元
          </span>
        </el-form-item>
        <el-form-item label="支付信息">
          <span>（支付渠道）微信支付</span>
          <span>（支付时间）{{ orderDetail.order.payTime }}</span>
        </el-form-item>
        <el-form-item label="快递信息">
          <span>（快递公司）{{ orderDetail.order.shipChannel }}</span>
          <span>（快递单号）{{ orderDetail.order.shipSn }}</span>
          <span>（发货时间）{{ orderDetail.order.shipTime }}</span>
        </el-form-item>
        <el-form-item label="收货信息">
          <span>（确认收货时间）{{ orderDetail.order.confirmTime }}</span>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<style>
.el-date-editor .el-range-separator {
    width: 9%;
}
.el-input--medium .el-input__icon {
    line-height: 30px;
}
</style>

<script>
import { listOrder, shipOrder, refundOrder, detailOrder, downinfo } from '@/api/order'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import checkPermission from '@/utils/permission' // 权限判断函数
import { mapGetters } from "vuex";

const statusMap = {
  101: '未付款',
  102: '用户取消',
  103: '系统取消',
  201: '已付款',
  202: '申请退款',
  203: '已退款',
  301: '已发货',
  401: '用户收货',
  402: '系统收货',
  501:'已收货',
  601:'已收货',
}

export default {
  name: 'notcompelete',
  components: { Pagination },
  filters: {
    orderStatusFilter(status) {
      return statusMap[status]
    }
  },
  data() {
    return {
      list: undefined,
      total: 0,
      rowinfo:[],
      listLoading: true,
      dialogFormVisible: false,
      form: {
          name: '',
          number:'',
          username:'',
          subject:'',
          shopname:'',
        },
        formLabelWidth: '120px',
      listQuery: {
        page: 1,
        limit: 20,
        id: undefined,
        name: undefined,
        orderStatusArray: [],
        sort: 'add_time',
        order: 'desc'
      },
      statusMap,
      orderDialogVisible: false,
      orderDetail: {
        order: {},
        user: {},
        orderGoods: []
      },
      shipForm: {
        orderId: undefined,
        shipChannel: undefined,
        shipSn: undefined
      },
      shipDialogVisible: false,
      refundForm: {
        orderId: undefined,
        refundMoney: undefined
      },
      refundDialogVisible: false,
      downloadLoading: false,
      pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value7: '',
        value5: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)]
    }
  },
  created() {
       if( this.shopId!=undefined){
      this.listQuery.shop_id = this.shopId
       this.listQuery.type='shop'
    }
      this.listQuery.orderStatusArray = [101,102,103]
    this.getList()
  },
    computed: {
				  ...mapGetters(["shopId","roles"]),
    headers() {
      return {
        'X-Litemall-Admin-Token': getToken()
      }
    }
  },
  methods: {
    checkPermission,
    getList() {
      this.listLoading = true
      listOrder(this.listQuery).then(response => {
        this.list = response.data.data.items
        this.total = response.data.data.total
        this.listLoading = false
      }).catch(() => {
        this.list = []
        this.total = 0
        this.listLoading = false
      })
    },
    // 确定录入
    makesure(){
      if(this.form.name==''||this.form.shopname==''||this.form.subject==''||this.form.number==''){
        this.Message.error('请完善信息');
        return false;
      }
      var data={
        "userId":this.rowinfo.userId,
        "userName":this.rowinfo.consignee,
        "subject":this.form.subject,
        "wlId":this.form.number,
        "wlName":this.form.name,
        "totalmoney":this.rowinfo.actualPrice,
        "orderSn":this.rowinfo.orderSn,
        "shopId":this.shopId,
        "shopName":this.form.shopname,
        "orderStatus":1,
        "address":this.rowinfo.address 
      }
      downinfo(data).then(response=>{
        if(response.data.errno==0){
              this.$notify.success({
              title: '成功',
              message: '录入成功'
            })
        }
       // console.log(response,'222')
      })
      this.dialogFormVisible = false
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleDetail(row) {
      detailOrder(row.id).then(response => {
        this.orderDetail = response.data.data
      })
      this.orderDialogVisible = true
    },
    // 录入信息
    writeinfo(row){
      this.rowinfo=row;
      console.log(row,'row')
      this.dialogFormVisible = true;
    },
    handleShip(row) {
      this.shipForm.orderId = row.id
      this.shipForm.shipChannel = row.shipChannel
      this.shipForm.shipSn = row.shipSn

      this.shipDialogVisible = true
      this.$nextTick(() => {
        this.$refs['shipForm'].clearValidate()
      })
    },
    confirmShip() {
      this.$refs['shipForm'].validate((valid) => {
        if (valid) {
          shipOrder(this.shipForm).then(response => {
            this.shipDialogVisible = false
            this.$notify.success({
              title: '成功',
              message: '确认发货成功'
            })
            this.getList()
          }).catch(response => {
            this.$notify.error({
              title: '失败',
              message: response.data.errmsg
            })
          })
        }
      })
    },
    handleRefund(row) {
      this.refundForm.orderId = row.id
      this.refundForm.refundMoney = row.actualPrice

      this.refundDialogVisible = true
      this.$nextTick(() => {
        this.$refs['refundForm'].clearValidate()
      })
    },
    confirmRefund() {
      this.$refs['refundForm'].validate((valid) => {
        if (valid) {
          refundOrder(this.refundForm).then(response => {
            this.refundDialogVisible = false
            this.$notify.success({
              title: '成功',
              message: '确认退款成功'
            })
            this.getList()
          }).catch(response => {
            this.$notify.error({
              title: '失败',
              message: response.data.errmsg
            })
          })
        }
      })
    }
  }
}
</script>
