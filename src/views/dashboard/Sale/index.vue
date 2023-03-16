<template>
  <el-card class="card-box">
    <div slot="header" class="clearfix">
      <el-tabs class="tab" @tab-click="handleClick"  v-model="activeName">
<!--        收集的内容最好别是中文-->
        <el-tab-pane label="销售额" name="sale" lazy>
          <div class="content">
            <el-row :gutter="15">
              <el-col :span="18">
                <div class="chart1" ref="chart1"></div>
              </el-col>
              <el-col :span="6">
                <div class="rank">
                  <h3>门店销售额排名</h3>
                  <ul>
                    <li>
                      <el-row>
                        <el-col :span="5">
                          <span class="number">1</span>
                        </el-col>
                        <el-col :span="10">
                          <span>肯德基</span>
                        </el-col>
                        <el-col :span="9">
                          12345
                        </el-col>
                      </el-row>
                    </li>
                    <li>
                      <el-row>
                        <el-col :span="5">
                          <span class="number">2</span>
                        </el-col>
                        <el-col :span="10">
                          <span>肯德基</span>
                        </el-col>
                        <el-col :span="9">
                          12345
                        </el-col>
                      </el-row>
                    </li>
                    <li>
                      <el-row>
                        <el-col :span="5">
                          <span class="number">3</span>
                        </el-col>
                        <el-col :span="10">
                          <span>肯德基</span>
                        </el-col>
                        <el-col :span="9">
                          12345
                        </el-col>
                      </el-row>
                    </li>
                    <li>
                      <el-row>
                        <el-col :span="5">
                          <span class="number-else">4</span>
                        </el-col>
                        <el-col :span="10">
                          <span>肯德基</span>
                        </el-col>
                        <el-col :span="9">
                          12345
                        </el-col>
                      </el-row>
                    </li>
                    <li>
                      <el-row>
                        <el-col :span="5">
                          <span class="number-else">5</span>
                        </el-col>
                        <el-col :span="10">
                          <span>肯德基</span>
                        </el-col>
                        <el-col :span="9">
                          12345
                        </el-col>
                      </el-row>
                    </li>
                    <li>
                      <el-row>
                        <el-col :span="5">
                          <span class="number-else">6</span>
                        </el-col>
                        <el-col :span="10">
                          <span>肯德基</span>
                        </el-col>
                        <el-col :span="9">
                          12345
                        </el-col>
                      </el-row>
                    </li>
                    <li>
                      <el-row>
                        <el-col :span="5">
                          <span class="number-else">7</span>
                        </el-col>
                        <el-col :span="10">
                          <span>肯德基</span>
                        </el-col>
                        <el-col :span="9">
                          12345
                        </el-col>
                      </el-row>
                    </li>
                  </ul>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane label="访问量" name="visit">
          <div class="content">
            <el-row :gutter="15">
              <el-col :span="18">
                <div class="chart2" ref="chart2"></div>
              </el-col>
              <el-col :span="6">
                <div class="rank">
                  <h3>门店访问量排名</h3>
                  <ul>
                    <li>
                      <el-row>
                        <el-col :span="5">
                          <span class="number">1</span>
                        </el-col>
                        <el-col :span="10">
                          <span>肯德基</span>
                        </el-col>
                        <el-col :span="9">
                          12345
                        </el-col>
                      </el-row>
                    </li>
                    <li>
                      <el-row>
                        <el-col :span="5">
                          <span class="number">2</span>
                        </el-col>
                        <el-col :span="10">
                          <span>肯德基</span>
                        </el-col>
                        <el-col :span="9">
                          12345
                        </el-col>
                      </el-row>
                    </li>
                    <li>
                      <el-row>
                        <el-col :span="5">
                          <span class="number">3</span>
                        </el-col>
                        <el-col :span="10">
                          <span>肯德基</span>
                        </el-col>
                        <el-col :span="9">
                          12345
                        </el-col>
                      </el-row>
                    </li>
                    <li>
                      <el-row>
                        <el-col :span="5">
                          <span class="number-else">4</span>
                        </el-col>
                        <el-col :span="10">
                          <span>肯德基</span>
                        </el-col>
                        <el-col :span="9">
                          12345
                        </el-col>
                      </el-row>
                    </li>
                    <li>
                      <el-row>
                        <el-col :span="5">
                          <span class="number-else">5</span>
                        </el-col>
                        <el-col :span="10">
                          <span>肯德基</span>
                        </el-col>
                        <el-col :span="9">
                          12345
                        </el-col>
                      </el-row>
                    </li>
                    <li>
                      <el-row>
                        <el-col :span="5">
                          <span class="number-else">6</span>
                        </el-col>
                        <el-col :span="10">
                          <span>肯德基</span>
                        </el-col>
                        <el-col :span="9">
                          12345
                        </el-col>
                      </el-row>
                    </li>
                    <li>
                      <el-row>
                        <el-col :span="5">
                          <span class="number-else">7</span>
                        </el-col>
                        <el-col :span="10">
                          <span>肯德基</span>
                        </el-col>
                        <el-col :span="9">
                          12345
                        </el-col>
                      </el-row>
                    </li>
                  </ul>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div class="right">
        <span @click="setToday">今日</span>
        <span @click="setWeek">本周</span>
        <span @click="setMonth">本月</span>
        <span @click="setYear">本年</span>
<!--        value-format 收集日期的格式 -->
        <el-date-picker
          class="date"
          v-model="date"
          type="daterange"
          value-format="yyyy-MM-dd"
          size="small"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
    </div>

  </el-card>
</template>

<script>
import * as echarts from 'echarts'
import dayjs from 'dayjs'
export default {
  name: 'index',
  data(){
    return {
      // tab 栏默认值
      activeName: 'sale',
      chart1:null,
      chart2:null,
      chart1Options: {
        title: {
          text: '销售额趋势'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            // data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            data:[],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Direct',
            type: 'bar',
            barWidth: '25%',
            // data: [400, 52, 200, 334, 390, 330, 220,90, 88, 78, 67, 65],
            data: []
          }
        ]
      },
      dataX: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      dataY1:  [400, 52, 200, 334, 390, 330, 220,90, 88, 78, 67, 65],
      dataY2:  [30, 52, 600, 334, 390, 330, 110,90, 44, 78, 67, 65],
      initData: {
        dataX:[],
        dataY:[]
      },
      // 日历数据
      date:[]
    }
  },
  methods: {
    //  tab.label tab.name
    handleClick(tab) {
      this.chart1.setOption({
        xAxis: [
          {
            type: 'category',
            data: this.dataX,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        series: [
          {
            data:  tab.name == 'sale' ? this.dataY1 : this.dataY2
          }
        ]
      })
      this.chart2.setOption({
          xAxis: [
            {
              type: 'category',
              data: this.dataX,
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          series: [
            {
              data:  tab.name == 'sale' ? this.dataY1 : this.dataY2
            }
          ]
        })
    },
    // 今天
    setToday() {
      const day = dayjs().format('YYYY-MM-DD')
      this.date = [day,day]
    },
    // 本周
    setWeek() {
      const start = dayjs().day(1).format('YYYY-MM-DD')
      const end = dayjs().day(7).format('YYYY-MM-DD')
      this.date = [start,end]
    },
    // 本月
    setMonth() {
      const start = dayjs().startOf('month').format('YYYY-MM-DD')
      const end = dayjs().endOf('month').format('YYYY-MM-DD')
      this.date = [start,end]
    },
    // 本年
    setYear() {
      const start = dayjs().startOf('year').format('YYYY-MM-DD')
      const end = dayjs().endOf('year').format('YYYY-MM-DD')
      this.date = [start,end]
    }

  },
  mounted() {
    // 用 Vue 的方式获取dom
    this.chart1 = echarts.init(this.$refs.chart1)
    this.chart1.setOption(this.chart1Options)
    this.chart2 = echarts.init(this.$refs.chart2)
    this.chart2.setOption(this.chart1Options)
    setTimeout(()=>{
      this.initData.dataX = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
      this.initData.dataY = [30, 52, 600, 334, 390, 330, 110,90, 44, 78, 67, 65]
      this.chart1.setOption({
        xAxis: [
          {
            data: this.initData.dataX,
          }
        ],
        series: [
          {
            data:  this.initData.dataY,
          }
        ]
      })
    },500)
  }
}
</script>

<style>
.el-card__header{
  border-bottom:none;
}
.clearfix{
  position: relative;
  display: flex;
  justify-content: space-between;
}
.card-box{
  margin-top: 30px;
}
.box-card{
  height: 200px;
  padding: 0px;
}
.tab{
  width: 100%;
}
.right{
  position: absolute;
  right: 0px;
}
.right span{
  margin-right: 15px;
}
.date{
  margin-left: 10px;
}
.chart1{
  width: 100%;
  height: 300px;
}
.chart2{
  width: 1327px;
  height: 300px;
}
.el-col-6{
  padding-top: 0px;
  margin-top: 0px;
}
.rank{
  height: 300px;
}
.rank h3{
  margin-top: 0px;
  margin-bottom: 0px;
}
.number{
  display: inline-block;
  font-size: 18px;
  width: 25px;
  height: 25px;
  border-radius: 60%;
  background: #000;
  color: white;
  text-align: center;
}

.number-else{
  display: inline-block;
  font-size: 18px;
  width: 25px;
  height: 25px;
  border-radius: 60%;
  text-align: center;
}

ul{
  list-style: none;
  margin-top: 8px;
}
ul li{
  padding: 7px 0px;
}
</style>
