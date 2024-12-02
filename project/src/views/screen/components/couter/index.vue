<template>
    <div class="box8">
        <div class="title">
            <p>数据统计</p>
            <img src="../../images/dataScreen-title.png" alt="">
        </div>
        <div class="charts" ref="charts">
        </div>

    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import *as echarts from 'echarts'
let charts = ref();
onMounted(() => {
    let mycharts = echarts.init(charts.value);
    let option = {
        title: {
            text: '游客消费统计'
        },

        radar: {
            // shape: 'circle',
            indicator: [
                { name: '消费', max: 6500 },
                { name: '城市好感度', max: 16000 },
                { name: '出行', max: 30000 },
                { name: '小吃', max: 38000 },
                { name: '爱好', max: 52000 },
                { name: '景点', max: 25000 }
            ]
        },
        series: [
            {
                name: 'Budget vs spending',
                type: 'radar',
                data: [
                    {
                        value: [4200, 3000, 20000, 35000, 50000, 18000],
                        name: '购物'
                    },
                    {
                        value: [5000, 14000, 28000, 26000, 42000, 21000],
                        name: '饮食'
                    }
                ]
            }
        ]
    };
    mycharts.setOption(option)
})
</script>

<style scoped>
.box8 {
    background: url(../../images/dataScreen-main-lb.png);
    background-size: 100% 100%;
    margin: 20px 0px;
    width: 100%;
    height: 100%;

    .title {

        p {
            color: white;
            font-size: 20px;
        }
    }

    .sex {
        display: flex;
        justify-content: center;

        .man {
            margin: 20px;
            background: url(../../images/man-bg.png);
            width: 111px;
            height: 115px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .woman {
            margin: 20px;
            background: url(../../images/woman-bg.png);
            width: 111px;
            height: 115px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    .rate {
        display: flex;
        justify-content: space-between;
        color: white;
    }

    .charts {
        height: 90%;

    }
}
</style>