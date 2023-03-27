<template>
  <div>
    <div class="search-box">
      <el-form :inline="true" :model="formData" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="formData.roleName" placeholder="角色名称" ref="roleInput"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
          <el-button  @click="resetForm">清空</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="operation-box">
      <el-button type="primary" @click="addRole">添加</el-button>
      <el-button type="danger" :disabled="multipleSelection.length == 0" @click="batchDeleteRole">批量删除</el-button>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%; margin-top: 20px"
      border
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="序号"
        width="120"
        type="index"
      >
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称">
      </el-table-column>
      <el-table-column
        label="操作"
        show-overflow-tooltip>
        <template v-slot="{row,$index}">
          <el-button type="info" icon="el-icon-user" @click="doAssignRole(row)"></el-button>
          <el-button type="primary" icon="el-icon-edit" @click="updateRole(row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" @click="deleteRole(row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      style="text-align: center;margin-top: 20px"
      :current-page="page"
      :pager-count="7"
      :page-sizes="[3, 5, 7]"
      :page-size="limit"
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>

    <el-dialog :title="addRoleForm.id ? '修改角色' : '添加角色'" :visible.sync="dialogAddVisible">
      <el-form :model="addRoleForm" ref="ruleForm" style="width: 100%" label-width="100px">
        <el-form-item label="角色名称">
          <el-input v-model="addRoleForm.roleName" autocomplete="off" style="width: 700px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateRole">确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      tableData: [],
      formData: {
        roleName: ''
      },
      searchObj: {
        roleName: ''
      },
      page: 1,
      limit: 3,
      total: 0,
      multipleSelection:[],
      dialogAddVisible: false,
      dialogRoleVisible: false,
      addRoleForm:{
        roleName:''
      },

    }
  },
  methods: {
    async getRoleList() {
      const {page,limit} = this
      const result = await this.$API.role.getPageList(page,limit,this.searchObj)
      // console.log(result,"---")
      if (result.code === 20000) {
        this.total = result.data.total
        this.tableData = result.data.items
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val.map(item => item.id);
    },
    handleSizeChange(limit) {
      this.limit = limit
      this.getRoleList()
    },
    handleCurrentChange(page) {
      this.page = page
      this.getRoleList()
    },
    addRole() {
      this.dialogAddVisible = true
      this.addRoleForm = { roleName:''}
    },
    updateRole(row) {
      this.addRoleForm = {...row}
      this.dialogAddVisible = true
    },
    search() {
      this.searchObj = {...this.formData}
      this.getRoleList()
    },
    resetForm() {
      this.formData.roleName = ''
      this.searchObj.roleName = ''
      this.$refs.roleInput.focus()
      this.getRoleList()
    },
    async addOrUpdateRole() {
      this.dialogAddVisible = false
      const result = await this.$API.role.addOrUpdateRole(this.addRoleForm)
      // console.log(result)
      if (result.code === 20000) {
        this.$message.success(this.addRoleForm.id ? '修改成功' : '添加成功')
        this.getRoleList()
      }
    },
    async deleteRole(row) {
      const result = await this.$API.role.removeById(row.id)
      if (result.code === 20000) {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.getRoleList()
        this.handleCurrentChange(this.formData.length === 0 ? this.page - 1 : this.page)
      }
    },
    async batchDeleteRole() {
      const promiseAll = []
      this.multipleSelection.forEach((item) => {
        const promise = this.$API.role.removeById(item)
        promiseAll.push(promise)
      })
      await Promise.all(promiseAll)
      this.$message({
        type: 'success',
        message: '删除成功'
      })
      this.getRoleList()
      this.handleCurrentChange(this.formData.length === 0 ? this.page - 1 : this.page)

    },

    async doAssignRole(row) {
      this.$router.push({
        name: 'RoleAuth',
        params: {
          id: row.id
        },
        query: {
          roleName: row.roleName
        }
      })
    }
  },
  mounted() {
    this.getRoleList()
  }
}
</script>

<style scoped>

</style>
