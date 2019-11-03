<template>
    <div>
        <div class="profit-set">
            <p class="profit-title">分成设置</p>
            <div class="profit-cont">
                <div class="profit-one">
                    <p>分成比例 (%)</p>
                    <p>操作</p>
                </div>
                <div class="profit-two">
                    <div>
                        平台<el-input
                                v-model="input"
                                clearable
                                maxlength="3"
                                style="width:80px;">
                            </el-input>
                        门店<el-input
                                v-model="input1"
                                maxlength="3"
                                clearable
                                style="width:80px;">
                            </el-input>
                    </div>
                    <p style="margin:0px;line-height:25px;color:#ff3a59;">确认</p>
                </div>

            </div>
            <br>
            <p class="profit-save">保存</p>
        </div>
    </div>
</template>
<script>
export default {
    name:'profit',
    data(){
        return{
            input:'',
            input1:''
        }
    }
}
</script>
<style scoped>
.app-main[data-v-6beed8bc]{
    background: #f3f3f3;
}
.profit-set{
    width: 1000px;
    margin: 0 auto;
    margin-top: 20px;
}
.profit-cont{
    width: 600px;
    height: 140px;
    background: white;
    margin: 0 auto;
    border-radius: 5px;
}
.profit-save{
    width: 100px;
    height: 30px;
    background: #ff3a59;
    text-align: center;
    line-height: 30px;
    margin-top: 30px;
    color: white;
    margin: 0 auto;
    border-radius: 5px;
    cursor: pointer;
}
.profit-one{
    width: 95%;
    margin: 0 auto;
    border-bottom: 1px solid gray;
    display: flex;
    justify-content: space-between;
}
.profit-two{
    width: 95%;
    margin: 0 auto;
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
}
</style>