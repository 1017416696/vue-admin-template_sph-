import request from '@/utils/request'

// 获取一级分类 /admin/product/getCategory1 get
export const reqGetCategory1 = () => request.get(`/admin/product/getCategory1`)

// 获取二级分类 /admin/product/getCategory2/{category1Id} get
export const reqGetCategory2 = (category1Id) => request.get(`/admin/product/getCategory2/${category1Id}`)

// 获取三级分类 /admin/product/getCategory3/{category2Id} get
export const reqGetCategory3 = (category2Id) => request.get(`/admin/product/getCategory3/${category2Id}`)

// 获取商品基础属性
// /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqGetAttrInfoList = (category1Id,category2Id,category3Id) => request.get(`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`)

// 删除属性
// /admin/product/deleteAttr/{attrId}
export const reqDeleteAttrInfo = (attrId) => request.delete(`/admin/product/deleteAttr/${attrId}`)


// 添加商品属性和属性值
// POST /admin/product/saveAttrInfo
/*
{
  "attrName": "string",
  "attrValueList": [
    {
      "attrId": 0,
      "valueName": "string"
    }
  ],
  "categoryId": 0, category3Id
  "categoryLevel": 3,
}
* */
export const reqAddOrUpdateAttrInfo = (data)=> request.post(`/admin/product/saveAttrInfo`,data)
