<template>
  <div class="sidebar">
    <div class="sidebar-top">KAEERY-VUE</div>
    <div class="sidebar-item">
      <el-menu
        default-active="/user/register"
        class="el-menu-vertical-demo"
        text-color="#fff"
        background-color="#545c64"
        active-text-color="#409EFF"
        router
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-user"></i>
            <span>用户管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/user/register">注册用户</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-document-copy"></i>
            <span>内容管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/content/article">文章管理</el-menu-item>
            <el-menu-item index="2-2">教程管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>系统设置</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1">焦点图</el-menu-item>
            <el-menu-item index="3-2">后台菜单</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-warning-outline"></i>
            <span>权限管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="4-1">后台管理员</el-menu-item>
            <el-menu-item index="4-2">角色设置</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="5">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.sidebar {
  width: 250px;
  height: 100vh;
  background: #545c64;
  box-sizing: border-box;
  .sidebar-top {
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: var(--font-xxl);
    color: var(--bg-white-color);
    background: #545c64;
  }
}
</style>
<style lang="scss" scoped>
.el-menu-item-group .el-menu-item {
  padding-left: 60px!important;
}
.el-menu-item {
  padding-left: 20px!important;
  font-size: 16px;
}
.el-menu {
  border-right: 0;
}
::v-deep .el-submenu__title {
  font-size: 16px;
}
.el-submenu [class^=el-icon-] , .el-menu-item [class^=el-icon-]{
  margin-right: 15px;
}
::v-deep .el-submenu__title i, .el-menu-item i {
  color: var(--bg-white-color);
}
::v-deep .el-menu-item.is-active {
  border-left-color: var(--bg-add-color);
}
::v-deep .el-submenu__title:focus, .el-submenu__title:hover {
  background: rgba(255,255,255,.3);
}
</style>