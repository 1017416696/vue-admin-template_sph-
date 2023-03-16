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
            backgroundColor: '#eee'
          }
        }
      },
      xAxis: {
        // 隐藏 x 轴
        show:false,
        // 设置最大值和最小值
        min:0,
        max:100
      },
      yAxis: {
        // 隐藏 y 轴
        show:false,
        // 在 y 轴均分
        type:'category'
      },
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [78],
          color:'cyan',
          // 线条宽度
          barWidth:10,
          // 设置背景颜色
          showBackground:true,
          backgroundStyle:{
            color:'#eee'
          },
          // 设置柱状图上的文本
          label:{
            show:true,
            formatter: '|',
            position:'right'
          }
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
