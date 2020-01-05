<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
    <cube-tab-bar v-model="selectLabel" :data="tabs" @change="changeHandler">
      <cube-tab v-for="(item, index) in tabs"
                :icon="item.icon"
                :label="item.value"
                :key="index">
        <div>{{item.label}}</div>
        <span class="badge" v-if="item.label=='Cart'">{{cartTotal}}</span>
      </cube-tab>
    </cube-tab-bar>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex';
  export default {
      data() {
          return {
              transitionName: 'route-forward',
              selectLabel: '/',
              tabs: [
                  {
                      label: 'Home',
                      value: '/',
                      icon: 'cubeic-home'
                  },
                  {
                      label: 'Cart',
                      value: '/Cart',
                      icon: 'cubeic-mall'
                  },
                  {
                      label: 'Me',
                      value: '/about',
                      icon: 'cubeic-person'
                  }
              ]
          }
      },
      created() {
          //初始化页签设置,避免页面刷新
          this.selectLabel = this.$route.path;
      },
      watch: {
          $route(route) {
              //监听路由变化并动态设置页签选中状态
              this.selectLabel = route.path;
              this.transitionName = this.$router.transitionName;
          }
      },
      computed: {
          ...mapGetters(['cartTotal'])
      },
      methods: {
          logout() {
              this.$store.dispatch('logout');
          },
          changeHandler(val) {
              this.$router.push(val);
          }
      }
  }
</script>
<style lang="scss">
  .cube-tab-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #edf0f4;
  }

  //动画
  .route-forward-enter { //  入场前状态
    transform: translate3d(-100%, 0, 0);
  }

  .route-back-enter { //  入场前状态
    transform: translate3d(100%, 0, 0);
  }

  .route-forward-leave-to { // 离场后状态
    transform: translate3d(100%, 0, 0);
  }

  .route-back-leave-to { // 离场后状态
    transform: translate3d(100%, 0, 0);
  }

  //激活状态
  .route-forward-enter-active,
  .route-forward-leave-active,
  .route-back-enter-active,
  .route-back-leave-active {
    transition: transform .3s;
  }

  .child-view { // 添加到每个页面上的样式，确保页面间不挤占位置
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    padding-bottom: 40px;
  }

  .cube-tab {
    position: relative;
  }

  span.badge {
    background: red;
    color: white;
    border-radius: 50%;
    padding: 2px;
    min-width: 16px;
    min-height: 16px;
    position: absolute;
    right: 25%;
    top: 0;
  }
</style>