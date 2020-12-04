<template>
  <div>添加角色</div>
</template>

<script>
export default {
  mounted() {
    let breadcrumb = [
      {
        link: '#',
        title: '用户管理'
      },
      {
        link: '',
        title: '角色设置'
      },
      {
        link: '',
        title: '添加角色'
      }
    ];
    this.$store.commit('SET_BREADCRUMB',breadcrumb);
  }

}
</script>

<style>

</style>