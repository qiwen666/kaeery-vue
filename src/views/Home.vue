<template>
  <div class="home">
    <sidebar></sidebar>
    <div class="main">
      <breadCrumb></breadCrumb>
      <adminMain></adminMain>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/layout/sideBar.vue';
import BreadCrumb from '@/components/layout//breadCrumb.vue';
import adminMain from '@/components/layout/adminMain.vue';

export default {
  name: 'Home',
  components: {
    Sidebar,
    BreadCrumb,
    adminMain
  }
}
</script>
<style lang="scss">
.home {
  display: flex;
  background: var(--bg-gray-color);
  .main {
    width: calc(100% - 250px);
    margin-left: 10px;
  }
}
</style>
