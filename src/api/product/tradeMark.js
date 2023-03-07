import request from '@/utils/request'
import el from 'element-ui/src/locale/lang/el'

// 获取品牌列表
// GET /admin/product/baseTrademark/{page}/{limit}
export const reqGetTrademarkList = (page,limit)=> request.get(`/admin/product/baseTrademark/${page}/${limit}`)

// 修改品牌
// /admin/product/baseTrademark/update put
// 需要携带三个参数，id tmName logoUrl
export const reqUpdateTradeList = (data)=> request({
  method: 'put',
  url: `/admin/product/baseTrademark/update`,
  data
})

// 添加品牌
// /admin/product/baseTrademark/save post
// 新增品牌时不需要传递ID，因为 id 是服务器生成的
export const reqAddTradeMark = (data)=>request({
  method: 'post',
  url: '/admin/product/baseTrademark/save',
  data
})

// 整合修改和添加品牌接口
// 两个接口携带的参数是类似的，添加品牌不需要 id
export const reqUpdateOrAddTradeMark = (data)=>{
  // 修改品牌
  if (data.id) {
    return request({
      method: 'put',
      url: `/admin/product/baseTrademark/update`,
      data
    })
  }else {
    // 添加品牌
    return request({
      method: 'post',
      url: `/admin/product/baseTrademark/save`,
      data
    })
  }
}

// 删除商品
// /admin/product/baseTrademark/remove/{id}
export const reqDeleteTradeMarkById = (id)=> request.delete(`/admin/product/baseTrademark/remove/${id}`)
