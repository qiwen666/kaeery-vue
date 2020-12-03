<template>
  <div class="sidebar">
    <div class="sidebar-top">KAEERY-VUE</div>
    <div class="sidebar-item">
      <el-menu
        :default-active="activeMenu"
        class="el-menu-vertical-demo"
        text-color="#fff"
        background-color="#545c64"
        active-text-color="#409EFF"
        router
      >
        <template v-for="item in routers" >
          <el-submenu :index="item.path + '/' + item.redirect" v-if="!item.hidden && item.meta" :key="item.name">
            <template slot="title">
              <i :class="item.meta.icon"></i>
              <span >{{item.name}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item :index="item.path + '/' + child.path" v-for="child in item.children" :key="child.name">{{child.name}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        <template  v-for="(first) in item.children" >
          <el-menu-item v-if="!item.hidden && !item.meta"  :index="first.path" :key="first.name">
            <i :class="first.meta.icon"></i>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </template>

        </template>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      routers: []
    }
  },
  mounted() {
    this.routers = JSON.parse(localStorage.getItem('menus'));
  },
  computed: {
    activeMenu() {
      if(this.routers.length) {
        return this.routers[2].path + '/' + this.routers[2].redirect ;
      }
    }
  },
};
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
.sidebar{
  .el-menu-item.is-active {
      background: rgba(0,0,0,.3) !important;
  }
  .el-menu-item,
  .el-submenu__title {
      &:hover {
        background: rgba(0,0,0, 0.3) !important;
      }
  }
} 
::v-deep .el-menu-item-group__title {
  padding: 0;
}
::v-deep .el-submenu .el-menu-item {
  height: 56px;
  line-height: 56px;
}
</style>