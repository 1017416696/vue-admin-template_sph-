<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>线上热门搜索</span>
      <span class="right-button">...</span>
    </div>
    <div class="chart-card">
      <el-row :gutter="10" class="row">
        <el-col :span="12">
          <div class="header">
            <span>搜索用户数</span>
            <svg t="1678784303089" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1914" width="16" height="16"><path d="M512 1024C230.4 1024 0 793.6 0 512S230.4 0 512 0s512 230.4 512 512S793.6 1024 512 1024zM512 85.333333C277.333333 85.333333 85.333333 277.333333 85.333333 512s192 426.666667 426.666667 426.666667 426.666667-192 426.666667-426.666667S746.666667 85.333333 512 85.333333z" p-id="1915"></path><path d="M469.333333 768c-17.066667 0-29.866667-8.533333-42.666667-21.333333-21.333333-29.866667-4.266667-72.533333 42.666667-187.733333 8.533333-17.066667 17.066667-38.4 25.6-55.466667-17.066667 12.8-42.666667 12.8-59.733333-4.266667-17.066667-17.066667-17.066667-42.666667 0-59.733333C443.733333 435.2 494.933333 384 554.666667 384c17.066667 0 29.866667 8.533333 42.666667 21.333333 21.333333 29.866667 4.266667 72.533333-42.666667 187.733333-8.533333 17.066667-17.066667 38.4-25.6 55.466667 17.066667-12.8 42.666667-12.8 59.733333 4.266667 17.066667 17.066667 17.066667 42.666667 0 59.733333C580.266667 716.8 529.066667 768 469.333333 768z" p-id="1916"></path><path d="M576 277.333333m-64 0a1.5 1.5 0 1 0 128 0 1.5 1.5 0 1 0-128 0Z" p-id="1917"></path><path d="M576 362.666667c-46.933333 0-85.333333-38.4-85.333333-85.333333s38.4-85.333333 85.333333-85.333333 85.333333 38.4 85.333333 85.333333S622.933333 362.666667 576 362.666667zM576 234.666667c-25.6 0-42.666667 17.066667-42.666667 42.666667s17.066667 42.666667 42.666667 42.666667 42.666667-17.066667 42.666667-42.666667S601.6 234.666667 576 234.666667z" p-id="1918"></path></svg>
          </div>
          <div class="content">
            <span class="subtitle">12321 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span>17.1 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <svg t="1678785245462" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3067" width="12" height="12"><path d="M960 704L512 256l-448 448z" fill="#d81e06" p-id="3068"></path></svg>
          </div>
          <LineChart :y-axis="line1Data"/>
        </el-col>

        <el-col :span="12">
          <div class="header">
            <span>人均搜索次数</span>
            <svg t="1678784303089" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1914" width="16" height="16"><path d="M512 1024C230.4 1024 0 793.6 0 512S230.4 0 512 0s512 230.4 512 512S793.6 1024 512 1024zM512 85.333333C277.333333 85.333333 85.333333 277.333333 85.333333 512s192 426.666667 426.666667 426.666667 426.666667-192 426.666667-426.666667S746.666667 85.333333 512 85.333333z" p-id="1915"></path><path d="M469.333333 768c-17.066667 0-29.866667-8.533333-42.666667-21.333333-21.333333-29.866667-4.266667-72.533333 42.666667-187.733333 8.533333-17.066667 17.066667-38.4 25.6-55.466667-17.066667 12.8-42.666667 12.8-59.733333-4.266667-17.066667-17.066667-17.066667-42.666667 0-59.733333C443.733333 435.2 494.933333 384 554.666667 384c17.066667 0 29.866667 8.533333 42.666667 21.333333 21.333333 29.866667 4.266667 72.533333-42.666667 187.733333-8.533333 17.066667-17.066667 38.4-25.6 55.466667 17.066667-12.8 42.666667-12.8 59.733333 4.266667 17.066667 17.066667 17.066667 42.666667 0 59.733333C580.266667 716.8 529.066667 768 469.333333 768z" p-id="1916"></path><path d="M576 277.333333m-64 0a1.5 1.5 0 1 0 128 0 1.5 1.5 0 1 0-128 0Z" p-id="1917"></path><path d="M576 362.666667c-46.933333 0-85.333333-38.4-85.333333-85.333333s38.4-85.333333 85.333333-85.333333 85.333333 38.4 85.333333 85.333333S622.933333 362.666667 576 362.666667zM576 234.666667c-25.6 0-42.666667 17.066667-42.666667 42.666667s17.066667 42.666667 42.666667 42.666667 42.666667-17.066667 42.666667-42.666667S601.6 234.666667 576 234.666667z" p-id="1918"></path></svg>
          </div>
          <div class="content">
            <span class="subtitle">2.7 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span>26.2 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <svg t="1678785317314" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4123" width="12" height="12"><path d="M64 320l448 448 448-448z" fill="#1afa29" p-id="4124"></path></svg>
          </div>
          <LineChart :y-axis="line2Data"/>
        </el-col>
      </el-row>
      <div class="table">
        <Table></Table>
      </div>

      <el-pagination
        style="text-align: center;margin-top: 20px"
        :current-page="page"
        :pager-count="7"
        :page-size="limit"
        layout="prev, pager, next, jumper,total"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </el-card>
</template>

<script>
import LineChart from '@/views/dashboard/Observe/Left/LineChart/index.vue'
import Table from '@/views/dashboard/Observe/Left/Table/index.vue'
export default {
  name: 'index',
  components:{
    LineChart,Table
  },
  data() {
    return {
      line1Data:[0,10, 7, 33, 3, 48, 9,29,10,44,55],
      line2Data:[15,10, 7, 29, 12, 48, 19,29,10,44,27],
      tableData:[],
      page: 1,
      // 每页展示多少条数据
      limit: 3,
      // 总的记录数
      total: 0,
    }
  },
  methods: {
    handleSizeChange(limit) {
      this.limit = limit
    },
    handleCurrentChange(page) {
      this.page = page
    },
  }
}
</script>

<style scoped>
.box-card{
  width: 100%;
  height: 400px;
}
.clearfix{
  position: relative;
  font-size: 18px;
  height: 36px;
  border-bottom: 1px solid #eee;
}
.right-button{
  position: absolute;
  right: 10px;
  top: -5px;
}
.header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0px;
  color: darkgray;
}
.header span{
  padding-right: 9px;
}

.subtitle {
  display: inline-block;
  font-size: 23px;
  margin-top: 15px;
  margin-right: 25px;
}

.table {
  margin-top: 20px;
}
</style>
