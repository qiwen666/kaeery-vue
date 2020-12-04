<template>
  <div>系统管理</div>
</template>

<script>
export default {
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