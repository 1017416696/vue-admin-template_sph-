<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>销售额类别占比</span>
      <div class="right-button">
        <el-radio-group v-model="radio">
          <el-radio-button label="全部渠道"></el-radio-button>
          <el-radio-button label="线上"></el-radio-button>
          <el-radio-button label="门店"></el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div class="pie-chart">
      <PieChart/>
    </div>
  </el-card>
</template>

<script>
import PieChart from '@/views/dashboard/Observe/Right/PieChart/index.vue'
export default {
  name: 'index',
  components:{
    PieChart
  },
  data() {
    return {
      radio: '全部渠道'
    }
  }
}
</script>

<style scoped>
.box-card{
  width: 100%;
  height: 400px;
  padding: 0px;
  margin: 0px;
}
.clearfix{
  position: relative;
  font-size: 18px;
  height: 36px;
  border-bottom: 1px solid #eee;
}
.right-button{
  position: absolute;
  right: 16px;
  top: -12px;
}
.pie-chart {
  margin: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
