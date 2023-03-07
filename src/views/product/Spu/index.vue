<template>
  <div>
    Spu 管理
    <el-button type="primary" icon="el-icon-plus" style="margin-bottom: 20px" @click="showDialog">添加</el-button>

    <el-dialog title="修改品牌"
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
import el from 'element-ui/src/locale/lang/el'

export default {
  name: 'Spu',
  data() {
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
          { required: true, message: '请上传品牌LOGO'}
        ]
      }
    }
  },
  methods:{
    showDialog(){
      this.dialogFormVisible = true
    },
    handleAvatarSuccess(res, file) {
      // URL.createObjectURL(file.raw);
      this.form.logoUrl = res.data
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
    handlerAddOrUpdate(){
      this.$refs.ruleForm.validate((valid) =>{
        if (valid){
          console.log('success')
        }else{
          console.log('error')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
