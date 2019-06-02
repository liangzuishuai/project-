<template>
  <div id="Integral">
    <div class="shadow" v-if="flag"></div>
    <div v-if="flag2" class="convert">
      <span @click="close()" class="close"></span>
      <div class="record">
        <ul class="historys">
          <li v-for="(items,index) in user[0].history" :key="index+'e'">
            <img :src="items.img">
            <h3>{{items.title}}</h3>
          </li>
        </ul>
      </div>
    </div>
    <transition name="slide-fade">
      <div class="success" v-if="showss">
        <p class="trans">兑换成功</p>
      </div>
    </transition>
    <div class="exchange">
      <div class="login">
        <div class="greet">
          <span class="welcome">您好，欢迎来到会员积分商城</span>
          <ul class="jf-nav">
            <li class="personal jf">
              <router-link to="/About">个人中心</router-link>
            </li>
            <li class="history jf">
              <div @click="open()" class="conversion">兑换历史</div>
            </li>
          </ul>
          <div class="greet-right">
            <router-link to="/">[退出]</router-link>
          </div>
        </div>
      </div>
      <div class="search-in">
        <img
          src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1115244311,3611558761&fm=26&gp=0.jpg"
          alt
        >
      </div>
      <div class="cent">
        <!-- <div class="headPic">
					<img src="../images/user_pic.png" alt>
        </div>-->
        <span class="loginBtn">用户名:{{nam}}</span>
        <span class="loginBtn2">积分:{{jif}}</span>
        <span class="loginBtn2">邮箱:{{emai}}</span>
      </div>
    </div>
    <div class="clearfix">
      <div class="cont_left">
        <div class="pro_hot">
          <div class="hc">热门推荐</div>
          <div class="hcH">
            <ul class="popular">
              <li v-for="(items,index) in list" :key="index+'a'">
                <div class="avt-image">
                  <img :src="items.img">
                  <h3>{{items.title}}</h3>
                  <p class="JF">
                    <span class="cx-jf0">{{items.jf}}</span>
                    积分
                  </p>
                  <div class="redeem" @click="show(index,'list')">
                    <span>立即兑换</span>
                  </div>
                </div>
                <div class="YN" style="height:190px" v-if="flag3">
                  <div>
                    <h3 class="Yn1">是否兑换此商品</h3>
                    <button class="btn" @click="yes">是</button>
                    <button class="btn" @click="no">否</button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="merchandise">
        <div class="all">所有商品</div>
        <div class="hcH1"></div>
        <div class="own">
          <ul class="having">
            <li v-for="(items,index) in possess" :key="index+'b'">
              <div class="firstSp">
                <img :src="items.img">
                <h3>{{items.title}}</h3>
                <p class="JF">
                  <span class="cx-jf0">{{items.jf}}</span>
                  积分
                </p>
                <div class="redeem" @click="show(index,'possess')">
                  <span>立即兑换</span>
                </div>
              </div>
            </li>
          </ul>
          <div class="YN" v-if="flag4">
            <div>
              <h3 class="Yn1">是否兑换此商品</h3>
              <button class="btn" @click="sure">是</button>
              <button class="btn" @click="fou">否</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Integral",
  data() {
    return {
      flag: false,
      flag2: false,
      flag3: false,
      flag4: false,
      nam: "",
      jif: "",
      emai: "",
      current: 0,
      current2: 0,
      showss: false,
      list: [],
      possess: [],
      name: "",
      jifen: "",
      history: [],
      user: {},
      goodsList: [],
      pro: ""
    };
  },
  mounted() {
    // console.log(this.$route.query.user);
    let obj = JSON.parse(localStorage.data);
    this.user = obj;
    this.nam = this.user[0].name;
    this.jif = this.user[0].jifen;
    this.emai = this.user[0].email;
    // console.log(this.user[0]);
    this.jifen = obj.jifen;
    this.name = obj.name;
    let that = this;
    const query = Bmob.Query("data");
    query
      .get("TxvjLLLl")
      .then(res => {
        // console.log(res);
        // res.set("Data",str)
        that.list = JSON.parse(res.Data);
        // console.log(that.list);
        // res.save()
      })
      .catch(err => {
        console.log(err);
      });
    const query2 = Bmob.Query("data");
    query2
      .get("0rNDJJJl")
      .then(res => {
        // console.log(res);
        // res.set("Data",str)
        that.possess = JSON.parse(res.Data);
        // console.log(that.possess);
        // res.save()
      })
      .catch(err => {
        console.log(err);
      });
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
        el.style.display = "none";
      }
    }
  },
  methods: {
    open() {
      // console.log("ddd");
      this.flag = true;
      this.flag2 = true;
      // convert.style.display = "block";
    },
    close() {
      // shadow.style.display = "none";
      this.flag = false;
      this.flag2 = false;
    },
    shows(index) {
      // console.log(index);
      this.current = index;
      this.flag3 = true;
    },
    yes(index, event) {
      this.history.push(this.list[this.current]);
      // console.log(this.history);
      this.flag3 = false;
      this.showss = !this.showss;
      window.location.reload();
      setTimeout(() => {
        this.showss = !this.showss;
      }, 1500);
      if (this[this.pro][this.current2].jf > this.user[0].jifen) {
        return alert("积分不够");
      }
      this.user[0].jifen -= this[this.pro][this.current2].jf;

      // console.log(this.user);
      let that = this;
      this.user[0].history.push(this[this.pro][this.current2]);

      const query2 = Bmob.Query("data");
      query2
        .get("0yflAAAF")
        .then(res => {
          // res.set("Data", str)
          that.goodsList = JSON.parse(res.Data);

          // console.log(that.goodsList);

          for (var i = 0; i < that.goodsList.length; i++) {
            if (that.goodsList[i].name == that.user[0].name) {
              that.goodsList[i] = that.user[0];
              // console.log("over", i, that.goodsList);
              var str = JSON.stringify(that.goodsList);

              //修改
              const query = Bmob.Query("data");
              query
                .get("0yflAAAF")
                .then(res => {
                  // console.log(res);
                  res.set("Data", str);
                  res.save();
                })
                .catch(err => {
                  console.log(err);
                });
            }
          }
          // res.save()
        })
        .catch(err => {
          console.log(err);
        });
      localStorage.setItem("data", JSON.stringify(this.user));
    },
    no() {
      this.flag3 = false;
    },
    show(index, pro) {
      this.flag4 = true;
      this.current2 = index;
      this.pro = pro;

    },
    sure() {
      this.history.push(this.possess[this.current]);
      this.flag4 = false
      window.location.reload();
      this.showss = !this.showss;
      setTimeout(() => {
        this.showss = !this.showss;
      }, 1500);
      if (this[this.pro][this.current2].jf > this.user[0].jifen) {
        return alert("积分不够");
      }
      this.user[0].jifen -= this[this.pro][this.current2].jf;

      // console.log(this.user);
      let that = this;
      this.user[0].history.push(this[this.pro][this.current2]);

      const query2 = Bmob.Query("data");
      query2
        .get("0yflAAAF")
        .then(res => {
          // res.set("Data", str)
          that.goodsList = JSON.parse(res.Data);

          // console.log(that.goodsList);

          for (var i = 0; i < that.goodsList.length; i++) {
            if (that.goodsList[i].name == that.user[0].name) {
              that.goodsList[i] = that.user[0];
              // console.log("over", i, that.goodsList);
              var str = JSON.stringify(that.goodsList);
             
              //修改
              const query = Bmob.Query("data");
              query
                .get("0yflAAAF")
                .then(res => {
                  console.log(res);
                  res.set("Data", str);
                  res.save();
                })
                .catch(err => {
                  console.log(err);
                });
               
            }
          }
          
          // res.save()
        })
        .catch(err => {
          console.log(err);
        });
      localStorage.setItem("data", JSON.stringify(this.user));      
    },
    fou() {
      this.flag4 = false;
    }
  }
};
</script>

<style src="../css/Integral.css"></style>
