<template>
  <div class="ball-wrap">
    <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @afterEnter="afterEnter"
    >
      <!--当show为true的时候，钩子会执行-->
      <div class="ball" v-show="showBall" :style="pos">
        <div class="inner">
          <div class="cubeic-add"></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
    export default {
        name: "CartAnim",
        data() {
            return {
                //决定小球的隐藏和显示性,这个显示性的来回切换会触发这几个动画钩子的执行
                showBall: false
            }
        },
        props: ['pos'],
        methods: {
            start(el) {
                //启动动画接口，传递点击按钮元素
                this.el = el;
                //使.ball显示，激活动画钩子
                this.showBall = true;
                console.log(this.pos);
            },
            beforeEnter(el) {
                //把小球移动到点击的dom元素所在位置
                const rect = this.el.getBoundingClientRect();
                //转换为用于绝对定位的坐标
                const x = rect.left - window.innerWidth/2;
                const y = -(window.innerHeight - rect.top - 10 - 20);

                //ball只移动y
                el.style.transform = `translate3d(0, ${y}px, 0)`;
                //inner只移动x
                const inner = el.querySelector('.inner');
                inner.style.transform = `translate3d(${x}px, 0, 0)`;
            },
            enter(el, done) {
                //为了激活表演要让浏览器重绘,获取offsetHeight就会重绘
                document.body.offsetHeight;

                //指定动画结束位置
                el.style.transform = `translate3d(0, 0, 0)`;
                const inner = el.querySelector('.inner');
                inner.style.transform = `translate3d(0, 0, 0)`;
                //当只用js钩子过渡的时候，vue无法判断动画该执行多长时间，何时结束，所以需要done来通知vue，动画可以结束了
                el.addEventListener('transitionend', done);
            },
            afterEnter(el) {
                //动画结束，开始清理工作
                //把小球隐藏，并且删掉
                this.showBall = false;
                el.style.display = 'none';
                //事件派发，希望外界可以知道动画完事了
                this.$emit('transitionend');
            }
        }
    }
</script>

<style lang="stylus" scoped>
.ball-wrap {
  .ball {
    position: fixed;
    left: 50%;
    bottom: 10px;
    z-index: 100000;
    color: red;
    transition: all 0.5s cubic-bezier(0.49, -0.29, 0.75, 0.41);

    .inner {
      width: 16px;
      height: 16px;
      transition: all 0.5s linear;

      .cubeic-add {
        font-size: 22px;
      }
    }
  }
}
</style>