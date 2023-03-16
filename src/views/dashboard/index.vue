<template>
  <div class="dashboard-container">
    <Card/>
    <Sale/>
    <Observe/>
  </div>
</template>

<script>
import Card from '@/views/dashboard/Card/index.vue'
import Sale from '@/views/dashboard/Sale/index.vue'
import Observe from '@/views/dashboard/Observe/index.vue'
export default {
  name: 'Dashboard',
  components:{Card,Sale,Observe}
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 5px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
