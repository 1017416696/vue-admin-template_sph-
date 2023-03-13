import request from '@/utils/request'

 // /admin/product/list/{page}/{limit} get
// 获取 sku 列表
export const reqGetSkuList = (page,limit) => request.get(`/admin/product/list/${page}/${limit}`)

// /admin/product/onSale/{skuId} get
// sku 上架
export const reqProductOnSale = (skuId) => request.get(`/admin/product/onSale/${skuId}`)

// /admin/product/cancelSale/{skuId} get
// sku 下架
export const reqProductOffSale = (skuId) => request.get(`/admin/product/cancelSale/${skuId}`)

// /admin/product/getSkuById/{skuId} get
// 查看 sku 详情
export const reqGetSkuById = (skuId) => request.get(`/admin/product/getSkuById/${skuId}`)
