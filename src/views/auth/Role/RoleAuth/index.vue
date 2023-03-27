<template>
  <div>
    <el-input v-model="$route.query.roleName" disabled></el-input>
    <el-tree
      style="margin: 20px 0px"
      :data="data"
      show-checkbox
      node-key="id"
      default-expand-all
      :props="defaultProps">
    </el-tree>
    <el-button type="primary">保存</el-button>
    <el-button @click="$router.push('/auth/role')">取消</el-button>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      data:[],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  methods: {
    async getPermissionData() {
      const roleId = this.$route.params.id
      console.log(roleId)
      const result = await this.$API.permission.toAssign(roleId)
      console.log(result)
      if (result.code === 20000) {
        this.data = result.data.children
      }
    }
  },
  mounted() {
    this.getPermissionData()
  }
}
</script>

<style scoped>

</style>
