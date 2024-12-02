<template>
    <div class="box5">
        <div class="title">
            <p>未来七天游客趋势图</p>
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
            text: '访问量',

        },
        xAxis: {
            type: 'category',
            // boundaryGap: false,
            // splitLine: {
            //     show: false
            // }
            data: ['周一', '周二', '周三', '周死', '周五', '周六', '周日'],
            axisLine: {
                show: true
            },
            axisTick: {
                show: true
            }
        },
        yAxis: {
            //  boundaryGap: false,
            // splitLine: {
            //     show: false
            // }
            axisLine: {
                show: true
            },
            axisTick: {
                show: true
            }
        },
        series: [{
            type: 'line',
            data: [120, 1240, 66, 2299, 321, 890, 1200],
            smooth: true,
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: 'white' // 0% 处的颜色
                    }, {
                        offset: 1, color: 'blue' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                }
            }
        },
        ],
        grid: {
            left: 40,
            right: 0,
            top: 0,
            bottom: 20
        }
    })
})
</script>

<style scoped lang="scss">
.box5 {
    background: url(../../images/dataScreen-main-lb.png);
    background-size: 100% 100%;
    margin: 0px 20px;
    width: 100%;
    height: 100%;

    .title {

        p {
            color: white;
            font-size: 20px;
        }
    }


    .charts {
        height: 150px;
    }
}
</style>