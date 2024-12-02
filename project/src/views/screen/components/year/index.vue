<template>
    <div class="box7">
        <div class="title">
            <p>年度游客量对比</p>
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
    mycharts.setOption({
        title: {
            text: '散点图',
            textStyle: {
                color: 'skyblue'
            },
            left: '40%'
        },
        xAxis: { type: 'category' },
        yAxis: {
            show: true
        },
        series: [{
            type: 'scatter',
            data: [80, 33, 24, 55, 15, 33, 13, 55, 22, 43, , 33, 11, 1, 32, 3],
            symbol: 'arrow',
            symbolSize: 16,
            label: {
                show: true,
                position: 'top',
                fontSize: 20
            }
        }],
        grid: {
            left: 20,
            right: 0,
            top: 30,
            bottom: 10
        }
    })
})
</script>

<style scoped>
.box7 {
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
        height: 200px;

    }
}
</style>