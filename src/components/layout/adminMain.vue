<template>
  <div class="admin-main">
    <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
  .admin-main {
    height: calc(100% - 56px);
    padding: 15px;
    margin-top: 10px;
    background: var(--bg-white-color);
  }
</style>