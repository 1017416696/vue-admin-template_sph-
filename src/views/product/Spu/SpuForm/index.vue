<template>
  <div>
    <el-form ref="form" :model="formData" label-width="80px">
      <el-form-item label="SPU名称">
        <el-input v-model="formData.spuName" placeholder="SPU名称"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select v-model="formData.tmId" placeholder="请选择品牌">
          <el-option :label="trade.tmName" :value="trade.id" v-for="(trade) in tradeInfoList" :key="trade.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input type="textarea" :rows="3" v-model="formData.description" placeholder="SPU描述"></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
<!--&lt;!&ndash;        上传的文件列表 file-list- ->-->
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :file-list="imageList"
          :on-preview="handlePictureCardPreview"
          :on-success="handleSuccess"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select v-model="attrIdAndName" :placeholder="`还有${unSelectedSaleAttr.length}个未选择`" >
          <el-option :label="sale.name" :value="`${sale.id}:${sale.name}`" v-for="(sale) in unSelectedSaleAttr" :key="sale.id"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus" :disabled="!attrIdAndName" @click="addSaleAttr">添加销售属性</el-button>
<!--        表格中展示的是当前spu自己的销售属性-->
        <el-table :data="formData.spuSaleAttrList"
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
            label="属性名"
            prop="saleAttrName"
            width="100"
          >
          </el-table-column>
          <el-table-column
            label="属性值名称列表"
          >
            <template v-slot={row,$index}>
              <el-tag
                :key="tag.id"
                v-for="tag in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="handleClose(row,tag)">
                {{ tag.saleAttrValueName }}
              </el-tag>
<!--              如果想加键盘时间，就需要让键盘回调 blur 的回调 $event.target.blur-->
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="$event.target.blur"
                @blur="handleInputConfirm(row)"
              >
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="addSaleAttrValue(row)">添加</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
          >
            <template v-slot="{row,$index}">
              <el-popconfirm
                :title="`确定要删除${row.saleAttrName}属性名吗？`"
                @onConfirm="deleteValueName($index)"
              >
                <template v-slot:reference>
                  <el-button type="danger" size="small" icon="el-icon-delete" >删除</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveSpuInfo">保存</el-button>
        <el-button @click="ToSceneOneAndUpdateShow">取消</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import { logger } from 'runjs/lib/common'

export default {
  name: 'SpuForm',
  props: [ 'isShow'],
  emits: ['sendSceneOne','updateShow'],
  data() {
    return {
      // 这部分的数据需要看 保存数据时的接口所需的字段
      // 修改时可直接利用服务器返回的数据收集最新的数据
      formData: {
        category3Id: '',
        // 品牌 id
        tmId: '',
        description: '',
        spuImageList:[],
        spuName: '',
        spuSaleAttrList: [],
      },
      // 收集未选中的销售属性 id name
      attrIdAndName: '',
      tradeInfoList:[],
      saleAttrList: [],
      imageList:[],
      dialogVisible: false,
      dialogImageUrl: '',
      dynamicTags: []
    }
  },
  computed: {
    unSelectedSaleAttr() {
      return this.saleAttrList.filter((item) => {
        return this.formData.spuSaleAttrList.every(item1 => {
          return item.name != item1.saleAttrName
        })
      })
    }
  },
  methods: {
    //  取消按钮的回调
    ToSceneOneAndUpdateShow() {
      this.$emit('sendSceneOne',0)
      this.$emit('updateShow',true)
      console.log(this.$refs)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.imageList = fileList
      // this.imageList.splice()
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleSuccess(response,file,fileList) {
      console.log(response)
      console.log(file)
      // this.formData.spuImageList = this.imageList
      // this.formData.spuImageList.push({
      //   imageName: file.name,
      //   name: file.name,
      //   imgUrl: res.data,
      //   url: res.data,
      //   spuId: this.imageList.spuId
      // })
      this.imageList = fileList
    },
    async initData(spu) {
      // console.log('发请求')
      const [spuInfoResult,tradeMarkInfoResult,spuImageListResult,saleAttrResult] = await Promise.all(
        [ this.$API.spu.reqGetSpuInfoById(spu.id),
          this.$API.spu.reqGetTrademarkInfo(),
          this.$API.spu.reqSpuImageList(spu.id),
          this.$API.spu.reqGetSaleAttrList()
        ])
      // const spuInfoResult = await this.$API.spu.reqGetSpuInfoById(spu.id)
      console.log(spuInfoResult)
      if (spuInfoResult.code === 200) {
        this.formData = spuInfoResult.data
      }
      // const tradeMarkInfoResult = await this.$API.spu.reqGetTrademarkInfo()
      if (tradeMarkInfoResult.code === 200) {
        this.tradeInfoList = tradeMarkInfoResult.data
      }
      // const spuImageListResult = await this.$API.spu.reqSpuImageList(spu.id)
      if (spuImageListResult.code === 200) {
        let imgArr = spuImageListResult.data
        // 照片墙中的图片必须有 name 和 url 两个字段才能显示图片
        imgArr.forEach(item => {
          item.name = item.imgName
          item.url = item.imgUrl
        })
        this.imageList = imgArr
      }
      // const saleAttrResult = await this.$API.spu.reqGetSaleAttrList()
      if (saleAttrResult.code === 200) {
        this.saleAttrList = saleAttrResult.data
      }
    },
    handleClose(row,tag) {
      row.spuSaleAttrValueList.splice(row.spuSaleAttrValueList.indexOf(tag), 1);
    },
    // 添加属性值的回调
    addSaleAttrValue(row) {
      // 这样添加的属性不是响应式的
      // row.inputVisible = true;
      this.$set(row,'inputVisible',true)
      this.$set(row,'inputValue','')
      this.$nextTick( () => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm(row) {
      console.log(row)
      let { baseSaleAttrId,inputValue} = row
      // 添加的属性值不能为空
      if (inputValue.trim() === '') {
        this.$message({
          type: 'info',
          message: '属性值不能为空,请重新输入'
        })
        row.inputValue = row.inputValue.trim()
        return
      }

      // 属性值不能重复
      const isRepeat = row.spuSaleAttrValueList.some((item,index,array) => {
        return item.saleAttrValueName === inputValue
      })
      if (isRepeat) {
        this.$message({
          type: 'info',
          message: '属性值不能重复,请重新输入'
        })
        row.inputValue = ''
        return
      }
      let newSaleAttrValue = {baseSaleAttrId,saleAttrValueName:inputValue,spuId:row.id}
      row.spuSaleAttrValueList.push(newSaleAttrValue)
      row.inputVisible = false

    },
    // 添加销售属性按钮回调
    addSaleAttr() {
      // console.log(this.attrIdAndName.split(':'))
      // 从数组中结构出 id 和 name
      const [baseSaleAttrId,saleAttrName] = this.attrIdAndName.split(':')
      let newSaleAttr = { baseSaleAttrId, saleAttrName , spuSaleAttrValueList:[], inputVisible: false ,inputValue:''}
      this.formData.spuSaleAttrList.push(newSaleAttr)
      // 清空下拉框选中的内容
      this.attrIdAndName = ''
    },
    // 删除属性名的回调
    deleteValueName(index) {
      this.formData.spuSaleAttrList.splice(index,1)
    },
    // 保存按钮的回调(更新或者新增)
    async saveSpuInfo() {
      // 整理参数

      // 图片参数(新增的图片没有 imgName 和 imgUrl 字段)
      // this.imageList.forEach(item => {
      //   delete item.name
      //   delete item.url
      //   delete item.status
      //   delete item.uid
      // })
      // this.formData.spuImageList = this.imageList
      this.formData.spuImageList = this.imageList.map( item => {
        return {
          imgName: item.name,
          imgUrl: item.response ? item.response.data : item.url
        }
      })

      // spuSaleAttrList
      this.formData.spuSaleAttrList.forEach(item => {
        delete item.inputValue
        delete item.inputVisible
      })

      const result = await this.$API.spu.reqAddOrUpdateSpuInfo(this.formData)
      if (result.code === 200) {
        this.$message({
          type:'success',
          message:'保存成功'
        })

        // 回到场景一 刷新数据 修改完后应该停留在当前页
        this.$emit('sendSceneOne',0)
        // this.$parent.getSpuList()


      }
    },
    async addSpuData(category3Id) {
      // 清空所有的数据 this._data为所有的响应式数据  this.$options.data()
      Object.assign(this._data,this.$options.data())
      let [tradeMarkInfoResult,saleAttrResult] = await Promise.all(
        [ this.$API.spu.reqGetTrademarkInfo(), this.$API.spu.reqGetSaleAttrList()].map(item => item.catch(e => console.log(e))))
      if (tradeMarkInfoResult.code === 200) {
        this.tradeInfoList = tradeMarkInfoResult.data
      }
      if (saleAttrResult.code === 200) {
        this.saleAttrList = saleAttrResult.data
      }
      this.formData.category3Id = category3Id
    }
  }
}
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
