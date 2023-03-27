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
    let myPie = echarts.init(this.$refs.charts);
    const option = {
      // backgroundColor: '#f0f0f0',
      title : {
        text: 'Direct',
        subtext: '735',
        subtextStyle: {
          fontSize: 15,
          fontWeight: 'bolder'
        },
        // 让标题在容器中间显示
        left: 'center',
        top: 'center'
      },
      tooltip: {
        trigger: 'item'
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
            position: 'outside',
            formatter: '{b}: {c}'
          },
          labelLine: {
            show: true,
            length: 30,
            length2: 50
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ],
        }
        ],
    };

    // 使用刚指定的配置项和数据显示图表。
    myPie.setOption(option);

    // 为图表添加事件
    myPie.on('mouseover', (params) => {
      const {name,value} = params.data
      myPie.setOption({
        title: {
          text: name,
          subtext: value
        }
      })
    });
  }

}
</script>

<style scoped>
.charts{
  width: 100%;
  height: 320px;
  margin-top: -26px;
}
</style>
