<template>
    <div class="box4" ref="map">

    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import *as echarts from 'echarts';
import chinaJSON from './china.json'
let map = ref();
echarts.registerMap('china', chinaJSON as any)
onMounted(() => {
    let mycharts = echarts.init(map.value);
    mycharts.setOption({
        geo: {
            map: 'china',
            roam: true,
            zoom: 1.15,
            label: {
                show: true,
                color: 'white',
                fontSize: 16
            },
            itemStyle: {
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
            },
            emphasis: {
                itemStyle: {
                    color: 'white'
                },
                label: {
                    fontSize: 40
                }
            },
        },
        grid: {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        },

        series: [{
            type: 'lines',
            data: [
                {
                    coords: [
                        [116.405285,
                            39.904989],  // 起点
                        [121.472644,
                            31.231706]   // 终点
                        // 如果 polyline 为 true 还可以设置更多的点
                    ],
                    // 统一的样式设置
                    lineStyle: {
                        color: 'white',
                        width: 5
                    },
                },
                {
                    coords: [
                        [116.405285,
                            39.904989],  // 起点
                        [104.065735,
                            30.659462]   // 终点
                        // 如果 polyline 为 true 还可以设置更多的点
                    ],
                    // 统一的样式设置
                    lineStyle: {
                        color: 'white',
                        width: 5
                    },
                },
                {
                    coords: [
                        [116.405285,
                            39.904989],  // 起点
                        [106.713478,
                            26.578343]   // 终点
                        // 如果 polyline 为 true 还可以设置更多的点
                    ],
                    // 统一的样式设置
                    lineStyle: {
                        color: 'white',
                        width: 5
                    },
                },
                {
                    coords: [
                        [116.405285,
                            39.904989],  // 起点
                        [91.132212,
                            29.660361]   // 终点
                        // 如果 polyline 为 true 还可以设置更多的点
                    ],
                    // 统一的样式设置
                    lineStyle: {
                        color: 'white',
                        width: 5
                    },
                }, {
                    coords: [
                        [115.892151,
                            28.676493],  // 起点
                        [113.665412,
                            34.757975]   // 终点
                        // 如果 polyline 为 true 还可以设置更多的点
                    ],
                    // 统一的样式设置
                    lineStyle: {
                        color: 'white',
                        width: 5
                    },


                }, {
                    coords: [
                        [113.280637,
                            23.125178],  // 起点
                        [106.504962,
                            29.533155]   // 终点
                        // 如果 polyline 为 true 还可以设置更多的点
                    ],
                    // 统一的样式设置
                    lineStyle: {
                        color: 'white',
                        width: 5
                    },


                }
            ],
            effect: {
                show: true,
                symbol: 'arrow',
                symbolSize: 10,
                color: 'gery'
            }
        }],



    })
})
</script>

<style scoped>
.box4 {}
</style>