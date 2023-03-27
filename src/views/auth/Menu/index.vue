<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    row-key="id"
    border
    lazy
    :load="load"
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
    <el-table-column
      prop="date"
      label="名称">
    </el-table-column>
    <el-table-column
      prop="name"
      label="权限值">
    </el-table-column>
    <el-table-column
      prop="address"
      label="跳转权限值">
    </el-table-column>
    <el-table-column
      prop="address"
      label="操作"
      show-overflow-tooltip>
      <template v-slot="{row,$index}">
        <el-button type="info" icon="el-icon-user"></el-button>
        <el-button type="primary" icon="el-icon-edit"></el-button>
        <el-button type="danger" icon="el-icon-delete"></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      tableData:[],

    }
  },
  methods: {
    load(tree, treeNode, resolve) {
      // setTimeout(() => {
      //   resolve([
      //     {
      //       id: 31,
      //       date: '2016-05-01',
      //       name: '王小虎',
      //       address: '上海市普陀区金沙江路 1519 弄'
      //     }, {
      //       id: 32,
      //       date: '2016-05-01',
      //       name: '王小虎',
      //       address: '上海市普陀区金沙江路 1519 弄'
      //     }
      //   ])
      // }, 1000)
    }
  }
}
</script>

<style scoped>

</style>
