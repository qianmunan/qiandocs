<script setup lang="ts">
import { onMounted, onUnmounted, Ref, ref } from 'vue'
import { ECharts, EChartsOption, init } from 'echarts'

let chart: ECharts;
const chartRef: Ref<HTMLElement | null> = ref(null)
// 初始化图表
const initChart = () => {
  const option: EChartsOption = {
    xAxis: {
      type: 'category'
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        type: 'line'
      }
    ]
  };
  chart.setOption(option);
}
// 更新图表
const updateChart = () => {
  const option: EChartsOption = {
    xAxis: {
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260]
      }
    ]
  };
  chart.setOption(option);
}
// 声明定时器
let interval: number | null = null;
onMounted(() => {
  chart = init(chartRef.value as HTMLElement)
  initChart()
  // 延时2秒后执行增量更新
  setTimeout(() => {
    updateChart()
  }, 2000)
  // 添加定时器，每隔5秒重新渲染图表
  interval = setInterval(() => {
    chart.clear()
    initChart()
    updateChart()
  }, 5000)
})
// 卸载组件时清除定时器
onUnmounted(() => {
  interval && clearInterval(interval)
})
</script>

<template>
  <div class="chart" ref="chartRef"></div>
</template>

<style scoped>
.chart {
  width: 370px;
  height: 400px;
}
</style>

