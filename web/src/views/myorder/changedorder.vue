<template>
    <div>
        <div class="change-cont">
            <div class="change-goods">
                <p class="change-title">退款商品：</p>
                <div class="goods-info">
                    <img src="" alt="">
                    <p style="margin-left:20px;">商品名称</p>
                </div>
            </div>
            <div class="change-goods">
                <p class="change-title">退款原因：</p>
                <el-input
                    placeholder="请输入内容"
                    v-model="input"
                    clearable
                    size="medium"
                    style="width:200px;">
                </el-input>
            </div>
            <div class="change-goods">
                <p class="change-title">退款说明：</p>
                <el-input
                    type="textarea"
                    autosize
                    placeholder="请输入内容"
                    v-model="textarea1"
                    style="width:600px;">
                </el-input>
            </div>
            <div class="change-goods">
                <p class="change-title">上传图片：</p>
                <el-upload
                :headers="headers"
                :action="uploadPath"
                :show-file-list="false"
                :on-success="uploadIconUrl"
                class="avatar-uploader"
                style="width:100px;height:100px;line-height:100px;text-align:center;border: 1px dashed skyblue;"
                accept=".jpg,.jpeg,.png,.gif">
                <img v-if="dataForm.iconUrl" :src="dataForm.iconUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"/>
                </el-upload>
            </div>
            <p class="profit-send">提交</p>
        </div>
    </div>
</template>

<script>
import { uploadPath,filePath } from '@/api/storage'
import { getToken } from '@/utils/auth'
export default {
    name:"changedorder",
    data(){
        return{
            textarea1:'',
            uploadPath,
            filePath,
            dataForm: {
                iconUrl: undefined,
                picUrl: undefined
            },
        }
    },
    computed: {
        headers() {
        return {
            'X-Litemall-Admin-Token': getToken()
        }
        }
  },
  methods:{
      uploadIconUrl: function(response) { 
        this.dataForm.iconUrl = response.data.url.replace("http://localhost:8080/wx/storage/fetch",this.filePath)
        },
    }
}
</script>

<style scoped>
p{
    margin: 0;
}
.change-title{
    line-height: 40px;
}
.profit-send{
    width: 80px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    color: white;
    background: #ff3a59;
    margin-left: 100px;
    cursor: pointer;
    border-radius: 5px;
}
.change-cont{
    width: 1200px;
    height: 500px;
    margin: 0 auto;
    margin-top: 50px;
    background: white;
}
.change-goods{
    width: 100%;
    padding: 10px 20px;
    display: flex;
}
.change-goods /deep/ .el-textarea__inner{
    height: 150px !important;
}
.goods-info{
    display: flex;
}
.goods-info img{
    width: 60px;
    height: 60px;
}
</style>