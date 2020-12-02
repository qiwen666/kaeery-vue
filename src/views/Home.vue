<template>
  <div class="home">
    <sidebar></sidebar>
    <div>
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
