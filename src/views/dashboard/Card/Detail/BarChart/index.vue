<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'index',
  mounted() {
    // 用 Vue 的方式获取dom
    let myLine = echarts.init(this.$refs.charts);
    const option = {
      grid:{
        left:0,
        right:0,
        top:0,
        bottom:0,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      xAxis: {
        // 隐藏 x 轴
        show:false,
        type:'category'
      },
      yAxis: {
        // 隐藏 y 轴
        show:false
      },
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [7,10, 7, 33, 12, 48, 9,29,19,44,20,38]
        }
      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myLine.setOption(option);
  }
}
</script>

<style scoped>
.charts{
  width: 401px;
  height: 100%;
}
</style>
