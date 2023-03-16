<template>
  <el-row :gutter="15">
    <el-col :span="6">
      <Detail title="总销售额" number="¥ 126560">
        <template #charts>
          <div class="charts">
            <span>周同比 56.67%</span> &nbsp; &nbsp; &nbsp; &nbsp;
            <svg t="1678785245462" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3067" width="12" height="12"><path d="M960 704L512 256l-448 448z" fill="#d81e06" p-id="3068"></path></svg>
            &nbsp; &nbsp;
            <span>日同比 19.16%</span> &nbsp; &nbsp; &nbsp; &nbsp;
            <svg t="1678785317314" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4123" width="12" height="12"><path d="M64 320l448 448 448-448z" fill="#1afa29" p-id="4124"></path></svg>
          </div>
        </template>
        <template #footer>
          <div class="footer">
            <span>日销售额¥ &nbsp; 12423</span>
          </div>
        </template>
      </Detail>

    </el-col>
    <el-col :span="6">
      <Detail title="访问量" number="88460">
        <template #charts>
          <LineChart></LineChart>
        </template>
        <template #footer>
          <div class="footer">
            <span>日访问量¥ &nbsp; 1243</span>
          </div>
        </template>
      </Detail>
    </el-col>
    <el-col :span="6">
      <Detail title="支付笔数" number="88460">
        <template #charts>
          <BarChart></BarChart>
        </template>
        <template #footer>
          <div class="footer">
            <span>转换率 &nbsp; 64%</span>
          </div>
        </template>
      </Detail>
    </el-col>
    <el-col :span="6">
      <Detail title="运营活动效果" number="78%">
        <template #charts>
          <Progress></Progress>
        </template>
        <template #footer>
          <div class="footer">
            <span>周同比 56.67%</span> &nbsp; &nbsp; &nbsp; &nbsp;
            <svg t="1678785245462" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3067" width="12" height="12"><path d="M960 704L512 256l-448 448z" fill="#d81e06" p-id="3068"></path></svg>
            &nbsp; &nbsp;
            <span>日同比 19.16%</span> &nbsp; &nbsp; &nbsp; &nbsp;
            <svg t="1678785317314" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4123" width="12" height="12"><path d="M64 320l448 448 448-448z" fill="#1afa29" p-id="4124"></path></svg>
          </div>
        </template>
      </Detail>
    </el-col>
  </el-row>
</template>

<script>
import Detail from '@/views/dashboard/Card/Detail/index.vue'
import LineChart from '@/views/dashboard/Card/Detail/LineChart/index.vue'
import BarChart from '@/views/dashboard/Card/Detail/BarChart/index.vue'
import Progress from '@/views/dashboard/Card/Detail/Progress/index.vue'
export default {
  name: 'index',
  components:{Detail ,LineChart,BarChart,Progress},
}
</script>

<style>
.charts{
  text-align: left;
  line-height: 60px
}
.charts span{
  display: inline-block;
}
</style>
