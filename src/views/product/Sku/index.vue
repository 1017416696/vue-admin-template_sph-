<template>
  <div>
    <el-table
      :data="skuList"
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
        prop="skuName"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="skuDesc"
        label="描述"
      >
      </el-table-column>
      <el-table-column
        label="默认图片"
        width="160"
        align="center"
      >
        <template v-slot="{row,$index}">
          <img :src="row.skuDefaultImg" style="width: 100px;height: 100px" />
        </template>
      </el-table-column>
      <el-table-column
        prop="weight"
        label="重量(KG)"
        width="80"
      >
      </el-table-column>
      <el-table-column
        prop="price"
        label="价格(元)"
        width="80"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
      >
        <template v-slot="{row,$index}">
          <MyButton type="success" size="small" icon="el-icon-bottom" title="下架sku" v-if="row.isSale == 1" @click="offSale(row)"/>
          <MyButton type="info" size="small" icon="el-icon-top" title="上架sku" v-else @click="onSale(row)"/>
          <MyButton type="warning" size="small" icon="el-icon-edit" title="修改sku" @click="updateFormData(row)"/>
          <MyButton type="info" size="small" icon="el-icon-info" title="查看详情" @click="showSku(row)"/>
          <MyButton type="danger" size="small" icon="el-icon-delete" title="删除spu" @click="deleteSpuById(row)"/>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="text-align: center;margin-top: 20px"
      :current-page="page"
      :pager-count="7"
      :page-sizes="[10, 15, 20]"
      :page-size="limit"
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>

<!--    抽屉-->
<!--    size 改变抽屉大小-->
    <el-drawer
      :visible.sync="drawer"
      :show-close="false"
      size="50%"
    >
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{skuDetailInfo.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{skuDetailInfo.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{skuDetailInfo.price }}元</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <el-tag
            type="success"
            v-for="(attr,index) in skuDetailInfo.skuAttrValueList"
            :key="attr.attrId"
            style="margin-right: 10px"
          >{{attr.attrName}}</el-tag>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <el-carousel trigger="click" height="400px">
            <el-carousel-item v-for="item in skuDetailInfo.skuImageList" :key="item.id">
              <img :src="item.imgUrl" style="width: 400px;height: 400px"/>
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>

</template>

<script>

export default {
  name: 'Sku',
  data() {
    return {
      skuList:[],
      // 分页器第几页
      page: 1,
      // 每页展示多少条数据
      limit: 10,
      // 总的记录数
      total: 0,
      drawer: false,
      skuDetailInfo:{},
      loading: false,
    }
  },
  methods: {
    async getSkuList() {
      let {page,limit} = this
      const result = await this.$API.sku.reqGetSkuList(page,limit)
      console.log(result)
      if (result.code === 200) {
        this.skuList = result.data.records
        this.total = result.data.total
      }
    },
    handleSizeChange(limit) {
      this.limit = limit
      this.getSkuList()
    },
    handleCurrentChange(page) {
      this.page = page
      this.getSkuList()
    },
    // isSale = 1 表示上架
    async offSale(row) {
      const result = await this.$API.sku.reqProductOffSale(row.id)
      if (result.code === 200) {
        row.isSale = 0
        this.$message({
          type:'success',
          message:'商品下架'
        })
      }
    },
    async onSale(row) {
      const result = await this.$API.sku.reqProductOnSale(row.id)
      if (result.code === 200) {
        row.isSale = 1
        this.$message({
          type:'success',
          message:'商品上架'
        })
      }
    },
    // 查看 sku 回调
    async showSku(row) {
      this.drawer = true
      const result = await this.$API.sku.reqGetSkuById(row.id)
      console.log(result)
      if (result.code === 200) {
        this.skuDetailInfo = result.data
      }
    },

  },
  mounted() {
    this.getSkuList()
  }
}
</script>

<style>
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

/*放在 scope 样式中不起作用*/
.el-carousel__button{
  width: 10px;
  height: 10px;
  background: red;
  border-radius: 50%;
}

.el-carousel__container{
  width: 400px;
  margin-left: 100px;
}
</style>

<style scoped>
.el-row .el-col-5 {
  text-align: right;
  font-weight: bold;
  font-size: 18px;
}
.el-col {
  margin: 10px 10px;
}
</style>
