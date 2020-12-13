<template>
  <div class="sidebar">
    <div class="sidebar-top">KAEERY-VUE</div>
    <div class="sidebar-item">
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        text-color="#fff"
        background-color="#545c64"
        active-text-color="#409EFF"
        router
      >
        <template v-for="item in routers" >
          <!-- 二级目录 user/register-->
          <el-submenu :index="item.path + '/' + item.redirect" v-if="!item.hidden && item.meta" :key="item.name">
            <template slot="title">
              <i :class="item.meta.icon"></i>
              <span >{{item.name}}</span>
            </template>
            <el-menu-item-group >
              <template v-for="child in item.children">
                <el-menu-item :index="item.path + '/' + child.path" v-if="!child.children ||child.children.length === 0" :key="child.name">{{child.name}}</el-menu-item>
              </template>
            </el-menu-item-group>
            <!-- 三级目录 user/role/create-->
            <template v-for="second in item.children">
              <el-submenu :index="item.path + '/' + second.path" v-if="second.children&&second.children.length" :key="second.name" class="more-sidebar">
                <template slot="title">
                  <i :class="second.meta.icon"></i>
                  {{second.name}}
                </template>
                <el-menu-item v-for="third in second.children" :key="third.name" :index="item.path + '/' +second.path + '/' + third.path">{{third.name}}</el-menu-item>
              </el-submenu>
            </template>
          </el-submenu>
        <template  v-for="(first) in item.children" >
          <!-- 一级目录 system-->
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
    this.routers.forEach(route => {
      if(route.children) {
        console.log(route.children);
        route.children.filter(child => {
          if(child.children&&child.children[0].hidden) {
            child.children.splice(0,1)
          }
        })  
      }
    })

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
.more-sidebar {
  .el-submenu__title {
    padding-left: 60px!important;
  }
  .el-menu .el-menu-item {
    padding-left: 70px!important;
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
  margin-right: 8px;
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