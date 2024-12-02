<template>
    <div class="box2">
        <div class="title">
            <p>年龄比例</p>
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
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: 40,
            right: 10,
            orient: 'vertical',
            textStyle: {
                color: 'white',
                fontSize: 14
            }

        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: true,
                    position: 'inside',
                    color: 'white'
                },

                labelLine: {
                    show: false
                },
                data: [
                    { value: 1048, name: 'errormaker3' },
                    { value: 735, name: 'Direct' },
                    { value: 580, name: 'Email' },
                    { value: 484, name: 'Union Ads' },
                    { value: 300, name: 'Video Ads' }
                ]
            }
        ],
        grid: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        }
    };
    mycharts.setOption(option)
})
</script>

<style scoped>
.box2 {
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