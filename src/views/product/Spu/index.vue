<template>
  <div>
    <el-card>
      <CategorySelect @sendCategoryId="getCategoryId" :is-show="show"/>
    </el-card>

    <el-card style="margin-top:20px ">
      <div v-show="scene == 0">
        <el-button type="primary"
                   icon="el-icon-plus"
                   style="margin-bottom: 20px"
                   @click="showEditSpuPage"
                   :disabled="!category3Id"
        >添加SPU</el-button>
        <el-table
          :data="spuList"
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
            prop="spuName"
            label="spu名称">
          </el-table-column>
          <el-table-column
            prop="description"
            label="spu描述"
          >
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
          >
            <template v-slot="{row,$index}">
              <MyButton type="success" size="small" icon="el-icon-plus" title="添加sku" @click="addSpu(row)"/>
              <MyButton type="warning" size="small" icon="el-icon-edit" title="修改spu" @click="updateFormData(row)"/>
              <MyButton type="info" size="small" icon="el-icon-info" title="查看spu" @click="showSpuList(row)"/>
              <MyButton type="danger" size="small" icon="el-icon-delete" title="删除spu" @click="deleteSpuById(row)"/>
<!--              实际这里可以直接通过 title 属性为按钮添加提示信息，这里只是为了学习，也可以使用 Tooltip 文字提示-->
<!--              <el-button type="success" size="small" icon="el-icon-plus"></el-button>-->
<!--              <el-button type="warning" size="small" icon="el-icon-edit" @click="updateAttrInfo(row)"></el-button>-->
<!--              <el-button type="info" size="small" icon="el-icon-stopwatch"></el-button>-->
<!--              <el-button type="danger" size="small" icon="el-icon-delete" @click="deleteAttrInfo(row)"></el-button>-->
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

<!--        @close="closeDialog"-->
        <el-dialog :title="`${spu.spuName}的sku列表`" :visible.sync="dialogTableVisible" >
          <el-table :data="tableData" border v-loading="loading">
            <el-table-column property="skuName" label="名称" width="200"></el-table-column>
            <el-table-column property="price" label="价格"></el-table-column>
            <el-table-column property="weight" label="重量"></el-table-column>
            <el-table-column label="默认图片">
              <template v-slot="{row,$index}">
                <img :src="row.skuDefaultImg" style="width: 100px;height: 100px" />
              </template>
            </el-table-column>
          </el-table>
        </el-dialog>
      </div>

      <div >
        <SpuForm
          v-show="scene == 1"
          @sendSceneOne="sendSceneOne"
          @updateShow="updateShow"
          ref="spu"
        />
        <skuForm
          v-show="scene == 2"
          @sendSceneOne="sendSceneOne"
          @updateShow="updateShow"
          ref="sku"
        />
      </div>

    </el-card>
  </div>
</template>

<script>

import SpuForm from '@/views/product/Spu/SpuForm/index.vue'
import SkuForm from '@/views/product/Spu/SkuForm/index.vue'
export default {
  name: 'Spu',
  components: { SpuForm , SkuForm },
  data() {
    return {
      show: true,
      // 三个组件的切换 0 1 2
      scene: 0,
      category1Id: '',
      category2Id: '',
      category3Id: '',
      spuList:[],
      spu: {},
      // 分页器第几页
      page: 1,
      // 每页展示多少条数据
      limit: 3,
      // 总的记录数
      total: 0,
      dialogTableVisible: false,
      tableData: [],
      loading: true
    }
  },
  methods: {
    getCategoryId(payload) {
      //  level 是为了区分是几级ID
      const {categoryId, level } = payload
      if (level == 1) {
        this.category1Id = categoryId
        this.category2Id = ''
        this.category3Id = ''
      } else if (level == 2) {
        this.category2Id = categoryId
        this.category3Id = ''
      } else {
        this.category3Id = categoryId
        this.getSpuList()
      }
    },
    // 获取 SPU 列表
    async getSpuList() {
      let { page, limit, category3Id } = this
      const result = await this.$API.spu.reqGetSpuList(page,limit, category3Id)
      if (result.code === 200) {
        this.spuList = result.data.records
        this.total = result.data.total
      }
    },
    handleSizeChange(limit) {
      this.limit = limit
      this.getSpuList()
    },
    handleCurrentChange(page) {
      this.page = page
      this.getSpuList()
    },
    // 添加 spu 按钮回调
    async showEditSpuPage() {
      this.scene = 1
      this.show = false
      this.$refs.spu.addSpuData(this.category3Id)
    },
    sendSceneOne(payload) {
      this.scene = payload
      // 切换到场景一时再发一次请求
      this.getSpuList()
    },
    updateShow(payload) {
      this.show = payload
    },
    // 修改 spu 按钮回调
    updateFormData(row) {
      this.scene = 1
      this.show = false
      console.log(row)
      // 可以直接获取到子组件的数据和方法
      // console.log(this.$refs.spu)
      this.$refs.spu.initData(row)
    },
    // 删除 spu 按钮回调
    async deleteSpuById(row) {
      const result = await this.$API.spu.reqDeleteSpuBySpuId(row.id)
      if (result.code === 200) {
        this.$message({
          type:'success',
          message:'删除成功'
        })
        this.getSpuList()
        this.handleCurrentChange(this.spuList.length > 1 ? this.page : this.page - 1)
      }
    },
    // 添加 spu按钮回调
    addSpu(row) {
      this.scene = 2
      this.$refs.sku.getSKuData({row,category1Id: this.category1Id,category2Id:this.category2Id,category3Id:this.category3Id})
    },
    // 查看 spu 按钮的回调
    async showSpuList(row) {
      this.spu = row
      this.dialogTableVisible = true
      this.loading = true
      this.tableData = []
      // console.log(row)
      const result = await this.$API.spu.reqGetSpuInstanceBySpuId(row.id)
      if (result.code === 200) {
        this.tableData = result.data
        this.loading = false
      }
    },
  }
}
</script>

<style scoped>

</style>

