<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" :disabled="!isShow">
      <el-form-item label="一级分类">
        <el-select v-model="formInline.category1Id" placeholder="请选择" @change="handler1">
          <el-option :label="c1.name" :value="c1.id" v-for="(c1,index) in category1List" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select v-model="formInline.category2Id" placeholder="请选择" @change="handler2">
          <el-option :label="c2.name" :value="c2.id" v-for="(c2,index) in category2List" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select v-model="formInline.category3Id" placeholder="请选择" @change="handler3">
          <el-option :label="c3.name" :value="c3.id" v-for="(c3,index) in category3List" :key="index"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'CategorySelect',
  props: ['isShow'],
  data () {
    return {
      formInline: {
        category1Id: '',
        category2Id: '',
        category3Id: '',
      },
      category1List: [],
      category2List: [],
      category3List: [],
      attrInfoList: []
    }
  },
  methods: {
    // 获取一级分类
    async getCategory1List() {
      const result = await this.$API.attr.reqGetCategory1()
      // console.log(result)
      if (result.code  === 200){
        this.category1List = result.data
      }
    },
    // 获取二级分类
    async getCategory2List() {
      const result = await this.$API.attr.reqGetCategory2(this.formInline.category1Id)
      // console.log(result)
      if (result.code === 200) {
        this.category2List = result.data
      }
    },
    // 获取三级分类
    async getCategory3List() {
      const result = await this.$API.attr.reqGetCategory3(this.formInline.category2Id)
      // console.log(result)
      if (result.code === 200) {
        this.category3List = result.data
      }
    },
    // 一级分类 select 事件回调
    handler1() {
      this.formInline.category2Id = ''
      this.formInline.category3Id = ''
      this.category2List = []
      this.category3List = []
      this.$emit('sendCategoryId', { categoryId: this.formInline.category1Id, level: 1 })
      this.getCategory2List()
    },
    handler2() {
      this.formInline.category3Id = ''
      this.category3List = []
      // 携带给父组件的数据格式需要一致
      this.$emit('sendCategoryId',{ categoryId: this.formInline.category2Id, level: 2 })
      this.getCategory3List()
    },
    async handler3() {
      // const { category1Id,category2Id,category3Id} = this.formInline
      // const result = await this.$API.attr.reqGetAttrInfoList(category1Id,category2Id,category3Id)
      // console.log(result)
      // if (result.code === 200) {
      //   this.attrInfoList = result.data
      //   this.$emit('sendCategoryId',this.attrInfoList)
      // }

      this.$emit('sendCategoryId',{ categoryId: this.formInline.category3Id, level: 3 })
    }
  },
  mounted() {
    this.getCategory1List()
  },
  // watch: {
  //   'formInline.category1Id': {
  //     handler() {
  //       this.formInline.category2Id = ''
  //       this.formInline.category3Id = ''
  //       this.category2List = []
  //       this.category3List = []
  //       this.getCategory2List()
  //     }
  //   },
  //   'formInline.category2Id': {
  //     handler() {
  //       this.formInline.category3Id = ''
  //       this.category3List = []
  //       this.getCategory3List()
  //     }
  //   }
  // }

}
</script>

<style scoped>

</style>
