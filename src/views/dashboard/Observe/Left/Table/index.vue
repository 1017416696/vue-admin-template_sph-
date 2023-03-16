<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    border
    :default-sort = "{prop: 'date', order: 'descending'}"
  >
    <el-table-column
      prop="date"
      label="排名"
      type="index"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="搜索关键字"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="用户数"
      sortable>
    </el-table-column>
    <el-table-column
      prop="name"
      label="周涨幅"
      sortable
      width="180">
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      tableData: [{}]
    }
  }
}
</script>

<style scoped>

</style>
