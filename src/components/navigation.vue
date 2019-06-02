<template>
  <div class="navigation">
    <h2>啦啦啦，我是登陆成功的页面，嘿嘿嘿</h2>
    <div class="www" @click="change">
      <h1 v-if="lalala">就说你敢点我不？</h1>
      <h1 v-else>赏你一大嘴巴子，略略略~~~</h1>
    </div>
  </div>
</template>
<script>
export default {
  name: "navigation",
  data() {
    return {
      lalala: true
    };
  },
  methods: {
    change() {
      this.lalala = !this.lalala;
    }
  },
  directives: {
    focus: {
      // 指令的定义
      inserted: function(el) {
        el.focus();
      }
    },
    mycss: {
      inserted: function(el) {
        el.style.color = "blue";
      }
    }
  },
  components: {}
};
</script>
<style scoped>
.navigation {
  width: 450px;
  height: 115px;
  margin: 50px auto;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  align-content: space-around;
  justify-content: space-around;
}
.www{
  width: 450px;
  height: 100px;
}
</style>
