<template>
  <div style="display: inline;margin: 0px 10px">
    <a :title="title">
      <el-button v-bind="$attrs" v-on="$listeners"></el-button>
    </a>
  </div>
</template>

<script>
export default {
  name: 'MyButton',
  props: ['title']
}
</script>

<style scoped>

</style>
