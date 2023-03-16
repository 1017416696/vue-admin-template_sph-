<template>
  <div>
    <el-row :gutter="20" class="row">
      <el-col :span="12">
        <Left></Left>
      </el-col>
      <el-col :span="12">
        <Right></Right>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Left from '@/views/dashboard/Observe/Left/index.vue'
import Right from '@/views/dashboard/Observe/Right/index.vue'
export default {
  name: 'index',
  components:{
    Left,Right
  }
}
</script>

<style scoped>
.row{
  height: 320px;
  margin-top: 30px;
}
</style>
