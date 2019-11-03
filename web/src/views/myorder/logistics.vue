<template>
    <div class="contain">
        <p class="logis-title">物流详情</p>
        <div class="logis-cont">
            <p class="order-num">订单编号：XXXXXXXX</p>
            <div class="order-goods">
                <div class="order-pic">
                    <img :src="pic" alt="">
                </div>
                <div class="order-right">
                    <p>商品名字</p>
                    <p class="order-size">规格</p>
                </div>
                <div class="order-price">
                    <p>￥9.9</p>
                    <p class="order-size">x1</p>
                </div>
            </div>
        </div>
        <p class="logis-info">物流信息</p>
        <div class="logis-timeline">
            <el-timeline :reverse="true">
                <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                :timestamp="activity.timestamp">
                {{activity.content}}
                </el-timeline-item>
            </el-timeline>
        </div>
    </div>
</template>

<script>
export default {
    name:"logistics",
    data(){
        return{
            pic:"",
            activities: [{
            content: '快递到达南京',
            timestamp: '2018-04-15'
            }, {
            content: '快递到达洛阳',
            timestamp: '2018-04-13'
            }, {
            content: '快件到达郑州',
            timestamp: '2018-04-11'
            }]
        }
    }
}
</script>

<style scoped>
    p{
        margin: 0;
        padding: 0;
    }
    .contain{
        width: 1000px;
        margin: 0 auto;
        margin-top: 30px;
    }
    .logis-title{
        width: 100%;
        text-align: center;
        font-size: 28px;
        height: 40px;
        line-height: 40px;
    }
    .logis-cont{
        width: 100%;
        padding: 20px;
        border: 1px solid #cccccc;
        margin-top: 30px;
    }
    .order-num{
        width: 100%;
        font-size: 18px;
    }
    .order-goods{
        width: 100%;
        display: flex;
        position: relative;
        margin-top: 10px;
    }
    .order-pic{
        width: 100px;
        height: 100px;
        background: gray;
    }
    .order-pic img{
        width: 100%;
        height: 100%;
    }
    .order-right{
        font-size: 18px;
        line-height: 50px;
        margin-left: 20px;
    }
    .order-size{
        font-size: 16px;
        color: gray;
    }
    .order-price{
        font-size: 18px;
        line-height: 25px;
        position: absolute;
        text-align: right;
        bottom: 10px;
        right: 20px;
    }
    .logis-info{
        width: 100%;
        height: 60px;
        line-height: 60px;
        text-indent: 16px;
    }
    .logis-timeline{
        width: 100%;
        padding: 15px;
        border: 1px solid #cccccc;
    }
</style>