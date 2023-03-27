import mockRequest from '@/utils/mockRequest'

const state = {
  chartData: {}
}

const mutations = {
  GETDATA(state,chartData) {
    state.chartData = chartData
  }
}

const actions = {
  async getData({commit}) {
    let result = await mockRequest.get('/home/list')
    if (result.code === 20000) {
      commit('GETDATA',result.data)
    }
  }

}
const getters = {

}

export default {
  state,mutations,actions,getters
}
