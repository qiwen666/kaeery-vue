<template>
  <div class="breadcrump">
    <span>当前位置：</span>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item,index) in result" :key="index" >
        <router-link :to="item.link" v-if="item.link">{{item.title}}</router-link>
        <a v-else>{{item.title}}</a>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {
      result: []
    }
  },  
  props: {
    breadcrumb: {
      type: Array
    }
  },
  watch: {
    breadcrumb(newVal) {
      console.log(newVal,'breadcrumb');
      this.result = newVal;
    }
  }
}
</script>

<style lang="scss">
  .breadcrump {
    display: flex;
    align-items: center;
    height: 56px;
    line-height: 56px;
    padding: 20px;
    background: var(--bg-white-color);
    box-shadow: 2px 2px 3px #dedede;
  }
</style>