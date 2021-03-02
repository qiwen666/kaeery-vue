<template>
  <div>系统管理
    <i class="icon-add"></i>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cityConfig: [
        { type: 'province', value: 0 },
        { type: 'city', value: 1 },
        { type: 'area', value: 2 },
        { type: 'street', value: 3 }
      ],
      jsonType: {
        0: { type: 'province' },
        1: { type: 'city' },
        2: { type: 'area' },
        3: { type: 'street' }
      }
    }
  },
  created() {
    const requestData = {}
    /**
     * requestData: {
     *  type: 'province'
     * }
     */
    /**
     * if(level === 0) {
     *  requestData.type = 'province' 
     * }else if(level === 1) {
     *  requestData.type = 'city'
     * }
     */
    /**
     * requestData.type = this.cityConfig.find(item => item.value === level).type
     */
    /**
     * requestData.type = this.jsonType[level].type
     */
  },
  mounted() {
    let breadcrumb = [
      {
        link: '#',
        title: '系统管理'
      }
    ];
    this.$store.commit('SET_BREADCRUMB',breadcrumb); 
  }
}
</script>

<style>

</style>