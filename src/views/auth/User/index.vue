<template>
  <div>
    <div class="search-box">
      <el-form :inline="true" :model="formData" ref="form" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="formData.username" placeholder="用户名" ref="userInput"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
          <el-button @click="resetForm">清空</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="operation-box">
      <el-button type="primary" @click="addUser">添加</el-button>
      <el-button type="danger" :disabled="multipleSelection.length == 0" @click="batchDelete">批量删除</el-button>
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
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="nickName"
        label="用户昵称">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="权限列表">
      </el-table-column>
      <el-table-column
        prop="gmtCreate"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="gmtModified"
        label="更新时间">
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作"
        show-overflow-tooltip>
        <template v-slot="{row,$index}">
          <el-button type="info" icon="el-icon-user" @click="showAssignDialogue(row)"></el-button>
          <el-button type="primary" icon="el-icon-edit" @click="updateUser(row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" @click="deleteUser(row)"></el-button>
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

    <el-dialog :title="addUserForm.id ? '修改用户' : '添加用户'" :visible.sync="dialogUserVisible">
      <el-form :model="addUserForm" :rules="rules" ref="ruleForm" style="width: 100%" label-width="130px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUserForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="nickname">
          <el-input v-model="addUserForm.nickName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input v-model="addUserForm.password" type="password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUserVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddOrUpdateUser('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="设置角色" :visible.sync="dialogRoleVisible" >
      <el-form :model="addUserForm" style="width: 100%" label-width="100px">
        <el-form-item label="用户名" >
<!--          只需要展示值，这里用 value 属性-->
          <el-input :value="addUserForm.username" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色列表">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedRoles" @change="handleCheckedRolesChange">
<!--            复选框组中的每一项是根据 label 字段勾选的-->
            <el-checkbox v-for="role in allRolesList" :label="role.id" :key="role.id">{{role.roleName}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="doAssignRole">保 存</el-button>
        <el-button @click="dialogRoleVisible = false">取 消</el-button>
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
        username:''
      },
      searchObj:{},
      page: 1,
      limit: 3,
      total: 0,
      multipleSelection: [],
      dialogUserVisible: false,
      addUserForm: {
        username: '',
        nickName:'',
        password:'',
        delete: false,
        roleName:'',
        salt:'',
        token:''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 20, message: '名称在 3 到 20 个字符', trigger: 'blur' }
        ],
        nickName: [
          { min: 3, max: 20, message: '名称在 3 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          { min: 6, max: 20, message: '密码在 6 到 20 个字符', trigger: 'blur' }
        ]
      },

      dialogRoleVisible: false,
      checkAll: false,
      allRolesList:[],
      checkedRoles: [],
      isIndeterminate: true

    }
  },
  methods: {
    async getUserList() {
      const {page,limit} = this
      const result = await this.$API.user.getPageList(page,limit,this.searchObj)
      // console.log(result,"---")
      if (result.code === 20000) {
        this.total = result.data.total
        this.tableData = result.data.items
      }
    },
    handleSelectionChange(val) {
      // val 是一个数组，用于存储选中的对象
      // 这里只需要存储每个对象的 id 即可，因为删除只需要 id 即可
      this.multipleSelection = val.map(item => item.id);
    },
    handleSizeChange(limit) {
      this.limit = limit
      this.getUserList()
    },
    handleCurrentChange(page) {
      this.page = page
      this.getUserList()
    },
    resetForm() {
      this.formData.username = ''
      this.searchObj.username = ''
      this.$refs.userInput.focus()
      this.getUserList()
    },
    // 搜索按钮回调(支持模糊查询)
    search() {
      this.searchObj = {...this.formData}
      this.getUserList()
    },
    // 添加按钮的回调
    addUser() {
      this.addUserForm = { username: '', nickName:'', password:''}
      this.dialogUserVisible = true
      // 等表单渲染好后清除上一次的验证
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
    },
    // 编辑按钮的回调
    updateUser(row) {
      this.addUserForm = {...row}
      this.dialogUserVisible = true
    },
    handleAddOrUpdateUser(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.dialogFormVisible = false
          const result = await this.$API.user.addOrUpdateUser(this.addUserForm)
          if (result.code === 20000) {
            this.$message({
              type: 'success',
              message: this.addUserForm.id ? '修改成功' : '添加成功'
            })
            this.getUserList()
            this.dialogUserVisible = false
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    async deleteUser(row) {
      const result = await this.$API.user.removeById(row.id)
      if (result.code === 20000) {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.getUserList()
        this.handleCurrentChange(this.formData.length === 0 ? this.page - 1 : this.page)
      }
    },
    // 批量删除按钮回调
    async batchDelete() {
      const promiseAll = []
      this.multipleSelection.forEach((item) => {
        const promise = this.$API.user.removeById(item)
        promiseAll.push(promise)
      })
      await Promise.all(promiseAll)
      this.$message({
        type: 'success',
        message: '删除成功'
      })
      this.getUserList()
      this.handleCurrentChange(this.formData.length === 0 ? this.page - 1 : this.page)
    },

    // 分配角色按钮回调
    async showAssignDialogue(row) {
      this.dialogRoleVisible = true
      this.addUserForm = row
      const result = await this.$API.user.getRoles(row.id)
      console.log(result)
      if (result.code === 20000) {
        const { allRolesList ,assignRoles } = result.data
        this.allRolesList = allRolesList
        this.checkedRoles = assignRoles.map(item => item.id)
      }
    },

    // 全选复选框回调
    handleCheckAllChange(flag) {
      console.log(flag)
      this.checkedRoles = flag ? this.allRolesList.map(item => item.id) : []
      this.isIndeterminate = false
    },
    handleCheckedRolesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.checkedRoles.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.allRolesList.length;
    },
    async doAssignRole() {
      // roleId的结构: 字符串, 'rId1,rId2,rId3'
      const userId = this.addUserForm.id
      let roleId = this.checkedRoles.join()
      // console.log(roleId)
      const result = await this.$API.user.assignRoles(userId,roleId)
     if (result.code === 20000) {
       this.$message.success('分配角色成功')
       this.clearRole()
       this.getUserList()
     }
    },
    clearRole() {
      this.dialogRoleVisible = false
      this.allRolesList = []
      this.checkedRoles = []
      this.isIndeterminate = true
      this.checkAll = false
    }
  },
  mounted() {
    this.getUserList()
  }

}
</script>

<style scoped>

</style>
