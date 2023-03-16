<template>
  <!--          高度也需要指定-->
  <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'index',
  props:['yAxis'],
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
          type: 'line',
          data: this.yAxis,
          // 平滑曲线
          smooth: true,
          // 线条样式
          lineStyle: {
            color:"skyblue",
            width:1.5
          },
          // 控制折点的大小
          symbolSize: 0,
          // 填充颜色
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'skyblue' // 渐变色起始颜色
            }, {
              offset: 1,
              color: 'white' // 渐变色结束颜色
            }])
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
  width: 100%;
  height: 50px;
}
</style>
