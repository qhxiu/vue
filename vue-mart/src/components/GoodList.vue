<template>
  <div>
    <div class="item" v-for="(item,index) in data" :key="item.id">
      <router-link :to="`/detail/${item.id}`">
        <div class="left">
          <img :src="item.img" alt @click.stop.prevent="imgPreview(item.img)">
        </div>
        <div class="right">
          <div class="title">{{item.title}}</div>
          <div class="info">
            <span>{{item.count}}人购买</span>
            <i class="cubeic-add" @click.stop.prevent="addCart($event, item)"></i>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
    export default {
        name: "GoodList",
        props: {
            data: Array
        },
        created() {},
        methods: {
            imgPreview(img) {
                this.$createImagePreview({
                    imgs: [img]
                })
            },
            addCart(e, item) {
                this.$store.commit("addCart", item);
                this.$emit('cartanim', event.target);
            }
        }
    }
</script>

<style scoped lang="stylus">
  .item {
    padding: 10px;
    overflow: hidden;

    .left {
      width: 100px;
      float: left;

      img {
        width: 100%;
      }
    }

    .right {
      margin-left: 120px;
      text-align: left;

      .title {
        line-height: 30px;
      }

      .cubeic-add {
        font-size: 22px;
      }

      .info {
        text-align right
      }
    }
  }
</style>