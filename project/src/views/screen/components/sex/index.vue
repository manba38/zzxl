<template>
    <div class="box1">
        <div class="title">
            <p>男女比例</p>
            <img src="../../images/dataScreen-title.png" alt="">
        </div>
        <div class="sex">
            <div class="man">
                <img src="../../images/man.png" alt="">
            </div>
            <div class="woman">
                <img src="../../images/woman.png" alt="">
            </div>

        </div>
        <div class="rate">
            <p>男士80%</p>
            <p>女士20%</p>
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
            text: '男女比例',
            textStyle: {
                color: 'skyblue'
            },
            left: '40%'
        },
        xAxis: {
            show: false,
            min: 0,
            max: 100
        },
        yAxis: {
            show: false,
            type: 'category'
        },
        series: [{
            type: 'bar',
            data: [80],
            barWidth: 20,
            z: 100,
            itemStyle: {
                borderRadius: 20,
            }
        },
        {
            type: 'bar',
            data: [100],
            barWidth: 20,
            barGap: '-100%',
            itemStyle: {
                color: 'pink',
                borderRadius: 20,
            }

        }],
        grid: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        }
    })
})
</script>

<style scoped>
.box1 {
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
        height: 20px;

    }
}
</style>