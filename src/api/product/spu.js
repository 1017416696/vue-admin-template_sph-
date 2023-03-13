import request from '@/utils/request'

// 获取 spu 列表  category3Id 也需要携带
// category3Id 通过 params 参数携带 !!!
// /admin/product/{page}/{limit} get
export const reqGetSpuList = (page,limit,category3Id) => request({
  url: `/admin/product/${page}/${limit}`,
  method: 'get',
  // 注意
  params: {
    category3Id
  }
})

// 获取 spu 基本信息
// /admin/product/getSpuById/{spuId} get
export const reqGetSpuInfoById = (spuId) => request.get(`/admin/product/getSpuById/${spuId}`)

// 获取品牌信息
// GET /admin/product/baseTrademark/getTrademarkList
export const reqGetTrademarkInfo = () => request.get(`/admin/product/baseTrademark/getTrademarkList`)

//  获取 SPU 图片
// /admin/product/spuImageList/{spuId} get
export const reqSpuImageList = (spuId) => request.get(`/admin/product/spuImageList/${spuId}`)

// 获取平台全部售卖属性
// /admin/product/baseSaleAttrList get
export const reqGetSaleAttrList = () => request.get(`/admin/product/baseSaleAttrList`)

// 新增和修改 spu
// /admin/product/saveSpuInfo post
// /admin/product/updateSpuInfo 修改时需要传递 id
export const reqAddOrUpdateSpuInfo = (data) => {
  if (data.id) {
    return request.post('/admin/product/updateSpuInfo',data)
  } else {
    return request.post('/admin/product/saveSpuInfo',data)
  }
}

// 删除 spu
// /admin/product/deleteSpu/{spuId}
export const reqDeleteSpuBySpuId = (spuId) => request.delete(`/admin/product/deleteSpu/${spuId}`)


// /admin/product/spuImageList/{spuId} get
// 获取 spu 图片
export const reqGetSpuImageList = (spuId) => request.get(`/admin/product/spuImageList/${spuId}`)

// /admin/product/spuSaleAttrList/{spuId} get
// 获取 spu 销售属性
export const reqGetSpuSaleAttrList = (spuId) => request.get(`/admin/product/spuSaleAttrList/${spuId}`)

// /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id} get
// 获取商品基础属性列表
export const reqGetAttrInfoList = (category1Id,category2Id,category3Id) => request.get(`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`)


// /admin/product/saveSkuInfo post
// 新增 sku
export const reqSaveSkuInfo = (data) => request.post('/admin/product/saveSkuInfo',data)

// /admin/product/findBySpuId/{spuId} get
// 查看当前 spu 下的实例
export const reqGetSpuInstanceBySpuId = (spuId) => request.get(`/admin/product/findBySpuId/${spuId}`)

