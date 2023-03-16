<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名称">
        {{spuName}}
      </el-form-item>
      <el-form-item label="SKU名称">
        <el-input placeholder="SKU名称" v-model="formData.skuName"></el-input>
      </el-form-item>
<!--       为价格添加 number 属性-->
      <el-form-item label="价格(元)">
        <el-input placeholder="价格(元)" v-model="formData.price" type="number"></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input placeholder="重量(千克)" v-model="formData.weight" type="number"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input type="textarea" rows="3" placeholder="规格描述" v-model="formData.skuDesc"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
<!--        <el-form :inline="true" :model="formData.formInline" class="demo-form-inline" style="margin: 0 40px">-->
<!--          <el-form-item label="屏幕尺寸">-->
<!--            <el-select value="" placeholder="请选择">-->
<!--              <el-option label="区域一" value="shanghai"></el-option>-->
<!--              <el-option label="区域二" value="beijing"></el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="无线通信">-->
<!--            <el-select value="" placeholder="请选择">-->
<!--              <el-option label="区域一" value="shanghai"></el-option>-->
<!--              <el-option label="区域二" value="beijing"></el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
<!--        </el-form>-->
<!--         要收集的数据需要看 skuAttrValueList 的字段-->
<!--        attr.attrIdAndItemId 太妙了！-->
        <el-row>
          <el-col :span="24/attrInfoList.length" v-for="(attr,index) in attrInfoList" :key="attr.id">
            <el-form-item :label="attr.attrName" style="margin-bottom: 10px">
              <el-select placeholder="请选择" v-model="attr.attrIdAndItemId">
                <el-option :label="item.valueName" :value="`${attr.id}:${item.id}`" v-for="(item,index) in attr.attrValueList" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="销售属性">
<!--        <el-form :inline="true" :model="formData.formInline" class="demo-form-inline" style="margin: 0 67px">-->
<!--          <el-form-item label="颜色">-->
<!--            <el-select value="" placeholder="请选择">-->
<!--              <el-option label="区域一" value="shanghai"></el-option>-->
<!--              <el-option label="区域二" value="beijing"></el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
<!--        </el-form>-->
        <el-row>
          <el-col :span="24/spuSaleAttrList.length" v-for="(sale,index) in spuSaleAttrList" :key="sale.id">
            <el-form-item :label="sale.saleAttrName">
              <el-select placeholder="请选择" v-model="sale.saleIdAndItemId">
                <el-option :label="item.saleAttrValueName" :value="`${sale.id}:${item.id}`" v-for="(item,index) in sale.spuSaleAttrValueList" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table
          ref="multipleTable"
          border
          :data="spuImageList"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="图片"
            width="120">
            <template v-slot="{row,$index}">
              <img v-lazy="row.imgUrl" style="width: 100px;height: 100px" :key="$index" />
            </template>
          </el-table-column>
          <el-table-column
            prop="imgName"
            label="名称">
          </el-table-column>
          <el-table-column
            label="操作"
            show-overflow-tooltip>
            <template v-slot="{row,$index}">
<!--              <el-tag type="success" v-show="row.isDefault ? row.isDefault == '1' : false">默认</el-tag>-->
<!--              <el-button type="primary" @click="setDefault(row)" v-show="row.isDefault ? row.isDefault == '0' : true">设为默认</el-button>-->
              <el-tag type="success" v-if="row.isDefault == '1'">默认</el-tag>
              <el-button type="primary" @click="setDefault(row)" v-else>设为默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveSkuInfo">保存</el-button>
        <el-button @click="ToSceneOneAndUpdateShow">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'SkuForm',
  data() {
    return {
      spuName:'',
      formData: {
        category3Id:'',
        price:'',
        skuAttrValueList:[],
        skuDefaultImg:'',
        skuDesc:'',
        skuImageList:[],
        skuName:'',
        skuSaleAttrValueList:[],
        spuId:'',
        tmId:'',
        weight:''
      },
      // 平台属性
      attrInfoList:[],
      // 销售属性
      spuSaleAttrList: [],
      spuImageList:[],
      selectedImageList:[]
    }
  },
  methods: {
    ToSceneOneAndUpdateShow() {
      this.$emit('sendSceneOne',0)
      this.$emit('updateShow',true)
    },
    async getSKuData({ row,category1Id,category2Id,category3Id}) {
      // 清空数据
      Object.assign(this._data,this.$options.data())
      this.formData.category3Id = category3Id
      this.formData.spuId = row.id
      this.formData.tmId = row.tmId
      this.spuName = row.spuName
      const [attrInfoList, spuSaleAttrList,spuImageList] = await Promise.all([
        this.$API.spu.reqGetAttrInfoList(category1Id,category2Id,category3Id),
        this.$API.spu.reqGetSpuSaleAttrList(row.id),
        this.$API.spu.reqGetSpuImageList(row.id)])

      if (attrInfoList.code === 200) {
        this.attrInfoList = attrInfoList.data
      }
      if (spuSaleAttrList.code === 200) {
        this.spuSaleAttrList = spuSaleAttrList.data
      }
      if (spuImageList.code === 200) {
        // 在返回数据时追加 isDefault == '0'
        let imageList = spuImageList.data
        imageList.forEach(item => item.isDefault = '0')
        this.spuImageList = imageList
      }

    },
    // 设置默认按钮的回调函数 排他
    setDefault(row) {
      // this.spuImageList.forEach(item => {
      //   this.$set(item,'isDefault',0)
      // })
      this.spuImageList.forEach(item => item.isDefault = 0)
      row.isDefault = 1
      this.formData.skuDefaultImg = row.imgUrl
    },
    handleSelectionChange(selection) {
      // selection 为选中的内容，为一个数组
      console.log(selection)
      // 收集的数据目前缺少 isDefault 字段 (在获取到数据时为其添加 isDefault 字段)
      this.selectedImageList = selection
    },
    // 保存按钮的回调
    async saveSkuInfo() {
      // 整理参数
      // attskuAttrValueListrInfo
      this.attrInfoList.forEach(item => {
        // 需要保证所有的下拉菜单都选择了属性，不然就没有 attrIdAndItemId 属性
       if (item.attrIdAndItemId){
         let [attrId,valueId] = item.attrIdAndItemId.split(':')
         let attrValueObj = {attrId,valueId}
         this.formData.skuAttrValueList.push(attrValueObj)
       }
      })

      // 这种方式也可以
      //  this.formData.skuAttrValueList = this.attrInfoList.reduce((prev,item) => {
      //   if (item.attrIdAndItemId) {
      //     let [attrId,valueId] = item.attrIdAndItemId.split(':')
      //     prev.push({attrId,valueId})
      //   }
      //   return prev
      // },[])

      // skuSaleAttrValueList
      this.spuSaleAttrList.forEach(item => {
        // 如果不先判断这个属性有没有，则需要保证用户所有的下拉菜单都选择了属性
        if (item.saleIdAndItemId){
          let [saleAttrId,saleAttrValueId] = item.saleIdAndItemId.split(':')
          let saleAttrObj = {saleAttrId,saleAttrValueId}
          this.formData.skuSaleAttrValueList.push(saleAttrObj)
        }
      })

      // skuImageList
      //  两种方法都行
      // this.formData.skuImageList = this.spuImageList

      this.formData.skuImageList = this.spuImageList.map(item => {
        return {
          imgName:item.imgName,
          imgUrl:item.imgUrl,
          isDefault:item.isDefault,
          spuImgid: item.id
        }
      })

      let result = await this.$API.spu.reqSaveSkuInfo(this.formData)
      if (result.code === 200) {
        this.$message({
          type:'success',
          message:'保存成功'
        })
        this.ToSceneOneAndUpdateShow()
      }
    }
  }
}
</script>

<style scoped>

</style>
