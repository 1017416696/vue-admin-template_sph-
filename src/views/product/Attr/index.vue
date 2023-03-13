<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect @sendCategoryId="getCategoryId" :is-show="isShow"/>
    </el-card>

    <el-card>
      <div v-show="isShow">
        <el-button type="primary"
                   icon="el-icon-plus"
                   style="margin-bottom: 20px"
                   @click="showEditAttrPage"
                   :disabled="category3Id == ''"
        >添加属性</el-button>
        <el-table
          :data="attrList"
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
            prop="attrName"
            label="属性名称">
          </el-table-column>
          <el-table-column
            prop="attrValueList"
            label="属性值列表"
            width="900"
          >
            <template v-slot="{row,$index}">
              <!--            {{row.attrValueList}}-->
              <!--            <div v-for="(attrInfo,index) in row" :key="index">-->
              <el-tag type="success" v-for="(attr,index) in row.attrValueList" :key="index" style="margin-right: 10px">{{attr.valueName}}</el-tag>
              <!--            </div>-->
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
          >
            <template v-slot="{row,$index}">
              <el-button type="warning" size="small" icon="el-icon-edit" @click="updateAttrInfo(row)">修改</el-button>
              <el-button type="danger" size="small" icon="el-icon-delete" @click="deleteAttrInfo(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div v-show="!isShow">
        <el-form :inline="true" ref="form" style="margin: 20px 0px 0px 0px" :model="formData">
          <el-form-item label="属性名">
            <el-input v-model="formData.attrName"  placeholder="请输入属性名称"></el-input>
          </el-form-item>
        </el-form>

        <el-button
            type="primary"
            icon="el-icon-plus"
            style="margin:15px 0px"
            @click="addAttrValue"
            :disabled="!formData.attrName"
        >添加属性值</el-button>
        <el-button @click="isShow = true">取消</el-button>

        <el-table
          :data="formData.attrValueList"
          border
          style="width: 100%;margin: 15px 0px">
          <el-table-column
            label="序号"
            type="index"
            width="80"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="属性值名称"
            prop="valueName"
          >
            <template v-slot={row,$index}>
<!--              这里使用 v-if 更方便，v-if v-else-->
              <el-input
                v-model="row.valueName"
                placeholder="请输入属性值"
                size="small"
                :ref="$index"
                v-if="row.flag"
                @blur="toLook(row)"
                @keydown.native.enter="toLook(row)"
              ></el-input>
<!--              如果用 span 最好将其 改为 display:block-->
<!--              点击 p 标签后，不仅需要让自身消息，还需要获取到 input 表单元素-->
              <p v-else @click="toEdit(row,$index)">{{row.valueName}}</p>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
          >
            <template v-slot="{row,$index}">
<!--               是给 popconfirm 组件加事件，而不是里面的按钮-->
<!--              不同版本的 ElementUI 事件可能不相同，需要查看对应的版本号-->
              <el-popconfirm
                :title="`确定要删除${row.valueName}吗？`"
                @onConfirm="deleteValueName($index)"
              >
                <template v-slot:reference>
                  <el-button type="danger" size="small" icon="el-icon-delete" >删除</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
<!-- 存在 bug 删除完了属性值，也就是数组长度为0-->
        <el-button type="primary" @click="handleAddOrUpdate" :disabled="formData.attrValueList.length < 1">保存</el-button>
        <el-button @click="isShow = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: 'Attr',
  data() {
    return {
      category1Id: '',
      category2Id: '',
      category3Id: '',
      attrList: [],
      isShow: true,
      formData: {
        attrName: '',
        attrValueList: [],
        categoryId: '',
        categoryLevel: 3
      }
    }
  },
  methods: {
    getCategoryId(payload) {
      //  level 是为了区分是几级ID
      const {categoryId, level} = payload
      if (level == 1) {
        this.category1Id = categoryId
        this.category2Id = ''
        this.category3Id = ''
      } else if (level == 2) {
        this.category2Id = categoryId
        this.category3Id = ''
      } else {
        this.category3Id = categoryId
        this.getAttrInfo()
      }
    },
    async getAttrInfo() {
      const result = await this.$API.attr.reqGetAttrInfoList(this.category1Id,this.category2Id,this.category3Id)
      if (result.code === 200) {
        this.attrList = result.data
      }
    },
    showEditAttrPage() {
      this.isShow = false
      // this.formData = {}
      // 清空上一次残留的数据
      this.formData = {
        attrName: '',
        attrValueList: [],
        categoryId: this.category3Id,
        categoryLevel: 3
      }
    },
    updateAttrInfo(row) {
      this.isShow = false
      // console.log(row)
      this.formData = cloneDeep(row)
      // 给每个数组元素添加一个 flag 属性，值为 false
      this.formData.attrValueList.forEach(item => {
        this.$set(item,'flag', false)
      })
    },
    // 删除属性
    deleteAttrInfo(row) {
      this.$confirm(`你确定删除"${row.attrName}"属性?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const result = await this.$API.attr.reqDeleteAttrInfo(row.id)
        if (result.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getAttrInfo()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    addAttrValue() {
      // attrId 和每个属性值的 id 是相同的
     this.formData.attrValueList.push({
       // 当对已有属性进行修改时，该属性已经有 id,所以每个属性值的 id 就是 该属性的 ID
       // 如果是新增属性，则该属性还没有 id，其对应的属性值 id 都为 undefined
       attrId: this.formData.id,
       valueName: '',
       flag: true
     })
      // 新增完之后自动聚焦
      this.$nextTick(()=> {
        // 让数组最后一个元素聚焦
        const index = this.formData.attrValueList.length - 1
        this.$refs[index].focus()
      })
    },
    // 气泡确认框确认按钮的回调函数
    // 删除属性值不需要发请求
    deleteValueName(index) {
      // console.log(row)
     if (this.formData.attrValueList.length > 1) {
       this.formData.attrValueList.splice(index,1)
     } else {
       this.$message({
         type: 'info',
         message: '请确保最少一个属性值'
       })
     }
    },
    // 失去焦点时的回调函数
    toLook(row) {
      // 需要判断输入的内容是否为空，数组中每个元素是否相同

      // row.flag = false
      // if (!row.valueName.trim()) {
      //   this.$message({
      //     type: 'error',
      //     message: '请输入正确的属性值'
      //   })
      //   this.deleteValueName(index)
      // }
      // 这样的交互逻辑更好一些
      if (row.valueName.trim() === '') {
        this.$message({
          type: 'error',
          message: '请输入正确的属性值'
        })
        // 直接退出函数
        return
      }
      // if (this.formData.attrValueList.includes(row.valueName)){
      //   this.$message({
      //     type: 'error',
      //     message: '属性值重复，请重新输入'
      //   })
      //   // 直接退出函数
      //   return
      // }

      const isRepeat = this.formData.attrValueList.some((currentValue,index,array)=>{
        // 需要除去自己和其他人比较
        // row 为数组的最后一项元素
        if (row != currentValue)
          return currentValue.valueName === row.valueName

      })

      if (isRepeat) {
          this.$message({
            type: 'error',
            message: '属性值重复，请重新输入'
          })
          // 直接退出函数
          return
      }

      row.flag = false
    },
    toEdit(row,index){
      row.flag = true
      // this.$refs.index 不能这样写，因为index 为一个变量
      // console.log(this.$refs[index])
      //  此时 input 还没有渲染完成，需要等渲染完成了才能获取到 input 组件
      this.$nextTick(()=>{
        // console.log(this.$refs[index])
        this.$refs[index].focus()
      })

    },
    async handleAddOrUpdate() {
      // 整理参数
      // 删除多余的参数
      // this.formData.attrValueList.forEach(item => {
      //   delete item.flag
      // })
      let flag = true
      // 空的属性值不用提交给服务器
      this.formData.attrValueList.forEach(item => {
        if (item.valueName === '') {
          flag = false
          return
        }
      })

      if (flag) {
        this.formData.attrValueList = this.formData.attrValueList.filter((item) => {
          if (item.valueName.trim()) {
            delete item.flag
            return true
          }
        })
        const result = await this.$API.attr.reqAddOrUpdateAttrInfo(this.formData)
        if (result.code === 200) {
          this.$message({
            type: 'success',
            message: '保存成功'
          })
          this.getAttrInfo()
          this.isShow = true
        }
      } else {
        this.$message({
          type: 'error',
          message: '属性值中存在空值，请补充完整或删除'
        })
      }
    }
  }
}
</script>

<style scoped>


</style>

