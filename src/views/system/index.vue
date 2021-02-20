<template>
  <div>系统管理
    <i class="icon-add"></i>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
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