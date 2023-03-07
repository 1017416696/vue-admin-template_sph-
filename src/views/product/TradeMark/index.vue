<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" style="margin-bottom: 20px" @click="showDialog">添加</el-button>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        label="序号"
        type="index"
        width="80"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="tmName"
        label="品牌名称">
      </el-table-column>
      <el-table-column
        prop="logoUrl"
        label="品牌LOGO"
      >
<!--        <template slot-scope="scope">-->
<!--          <img :src="scope.row.logoUrl" style="width: 120px;height: 70px"/>-->
<!--        </template>-->
        <template v-slot="{row,$index}">
          <img :src="row.logoUrl" style="width: 120px;height: 70px"/>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template v-slot="{row,$index}">
          <el-button type="warning" size="small" icon="el-icon-edit" @click="updateTradeMark(row)">修改</el-button>
          <el-button type="danger" size="small" icon="el-icon-delete" @click="deleteTradeMark(row)">删除</el-button>
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

<!--    对话框-->
    <el-dialog :title="form.id ? '修改品牌' : '添加品牌'"
               :visible.sync="dialogFormVisible"
    >
      <el-form
        :model="form"
        :rules="rules"
        ref="ruleForm"
        style="width:80%"
        label-width="100px"
      >
<!--        <el-form-item label="品牌ID" prop="id" v-show="form.id">-->
<!--          <el-input v-model="form.id" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="品牌名称" prop="tmName">
          <el-input v-model="form.tmName" autocomplete="off"></el-input>
        </el-form-item>

<!--        路径上携带/dev-api 才能走代理接口-->
        <el-form-item label="品牌LOGO" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="form.logoUrl" :src="form.logoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">只能上传jpg文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handlerAddOrUpdate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'TradeMark',
  data() {
    // 自定义验证规则
    var checkImg = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error('请上传图片'));
      } else {
        callback();
      }
    }
    return {
      tableData: [],
      // 分页器第几页
      page: 1,
      // 每页展示多少条数据
      limit: 3,
      // 总的记录数
      total: 0,
      dialogFormVisible: false,
      form: {
        tmName: '',
        logoUrl: ''
      },
      rules: {
        tmName: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        logoUrl: [
          { required: true,validator: checkImg}
        ]
      },
      resultCode: ''
    }
  },
  methods: {
    // 获取品牌列表数据
    async getTradeMarkList() {
      // 从当前组件中解构参数
      const { page, limit } = this
      let result = await this.$API.tradeMark.reqGetTrademarkList(page, limit)
      console.log(result)
      if (result.code === 200) {
        this.tableData = result.data.records
        this.total = result.data.total
      }
    },
    handleSizeChange(limit) {
      this.limit = limit
      this.getTradeMarkList()
    },
    handleCurrentChange(page) {
      this.page = page
      this.getTradeMarkList()
    },
    // 打开添加对话框
    showDialog() {
      this.dialogFormVisible = true
      // 每次打开对话框前清空上一次遗留的数据
      this.form = { tmName: '', logoUrl: '' }
    },
    // 修改品牌
    async updateTradeMark(row) {
      this.dialogFormVisible = true
      // this.form.tmName = row.tmName
      // this.form.logoUrl = row.logoUrl
      // 浅拷贝
      this.form = { ...row }
      // let result = await this.$API.tradeMark.reqUpdateTradeList(row)
      // console.log(result)
    },
    // 图片上传成功时的回调
    handleAvatarSuccess(res, file) {
      // URL.createObjectURL(file.raw);
      this.form.logoUrl = res.data
      // 图片上传成功后，手动清除组件的验证状态
      this.$refs.ruleForm.clearValidate('logoUrl')
    },
    // 图片上传前的回调
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    // 新增或者修改品牌信息
    handlerAddOrUpdate() {
      this.$refs.ruleForm.validate(async(valid) => {
        if (valid) {
          const result = await this.$API.tradeMark.reqUpdateOrAddTradeMark({
            tmName: this.form.tmName,
            logoUrl: this.form.logoUrl,
            id: this.form.id
          })
          if (result.code === 200) {
            this.$message({
              message: this.form.id ? '修改品牌成功' : '添加品牌成功',
              type: 'success'
            });
            this.getTradeMarkList()
            this.dialogFormVisible = false
          }
        } else {
          console.log('error submit!!');
          return false;
        }
        // this.dialogFormVisible = false

      });
    },
    // 删除品牌
    async deleteTradeMark(row) {
      this.$confirm(`你确定删除${row.tmName}品牌信息?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // (第五页前的数据) 不能删除，删除时会报错
        const result = await this.$API.tradeMark.reqDeleteTradeMarkById(row.id)
        if (result.code === 200){
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          // 如果当前页没数据了，就要回到上一页
          this.handleCurrentChange(this.tableData.length > 1 ? this.page : this.page - 1)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
  },
  mounted() {
    this.getTradeMarkList()
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
