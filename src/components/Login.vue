<template>
  <div class="hello">
    <img id="bgimg" src="http://pic1.win4000.com/wallpaper/1/57ac35a8644a0.jpg" alt>
    <div class="enter">
      <div class="enter_f">
        <h2>积分登录系统</h2>
      </div>
    </div>
    <div class="register">
      <div class="register_f">
        <div class="nav">
          <div class="navs">
            <ul>
              <router-link to="/">
                <li >管理员登录</li>
              </router-link>
            </ul>
          </div>
        </div>
        <div class="nasevt1">
          <!-- <Navigation/> -->
          <div class="navigation">
            <div class="Maxbox">
              <span class="simages"></span>
              <input v-focus type="text" placeholder="请输入管理员ID" v-model="name" @keyup="vconf()">
            </div>
            <div class="Maxbox">
              <span class="simagest"></span>
              <input type="password" placeholder="请输入密码" @keyup="vconf()" v-model="searcBarCode">
            </div>
          </div>
        </div>
        <div class="dlubtn" @click="changef">
          <div class="gotob">
            <router-link to>
              <span v-if="zzz">点击登录</span>
              <span v-else>{{ message }}</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Self from "@/self.js";
export default {
  name: "Login",
  data() {
    return {
      name: "",
      password: "",
      message: "",
      zzz: true,
      searcBarCode: "",
      goodsList: [],
      goodsLists: []
    };
  },
  mounted() {
    let arr = [
      {
        name: "sanxing",
        searcBarCode: 520,
        phone: 15152354456,
        email: "12345678@163.com",
        trueName: "张三",
        jifen: 100,
        history: [{ img: "", title: "" }]
      },
      {
        name: "iphone5s",
        searcBarCode: 2500,
        phone: 15152354456,
        email: "12345678@163.com",
        trueName: "张三",
        jifen: 100,
        history: [{ img: "", title: "" }]
      },
      {
        name: "iphone6",
        searcBarCode: 2800,
        phone: 15152354456,
        email: "12345678@163.com",
        trueName: "张三",
        jifen: 100,
        history: [{ img: "", title: "" }]
      },
      {
        name: "iphone6s",
        searcBarCode: 3200,
        phone: 15152354456,
        email: "12345678@163.com",
        trueName: "张三",
        jifen: 100,
        history: [{ img: "", title: "" }]
      },
      {
        name: "iphone7",
        searcBarCode: 3800,
        phone: 15152354456,
        email: "12345678@163.com",
        trueName: "张三",
        jifen: 100,
        history: [{ img: "", title: "" }]
      }
    ];
    let str = JSON.stringify(arr);
    let that = this;
    const query = Bmob.Query("data");
    query
      .get("9vYhEEET")
      .then(res => {
        // console.log(res)
        // res.set("Data", str)
        that.goodsLists = JSON.parse(res.Data);
        // res.save()
      })
      .catch(err => {
        console.log(err);
      });
    const query2 = Bmob.Query("data");
    query2
      .get("0yflAAAF")
      .then(res => {
        // res.set("Data", str)
        that.goodsList = JSON.parse(res.Data);
        // res.save()
      })
      .catch(err => {
        console.log(err);
      });
  },
  computed: {},
  directives: {
    focus: {
      // 指令的定义
      inserted: function(el) {
        el.focus();
      }
    },
    mycss: {
      inserted: function(el) {
        el.style.color = "red";
      }
    }
  },
  methods: {
    changef() {
      let name = this.name;
      let password = this.searcBarCode;
      if (name == "" || password == "") {
        this.message = "账号或密码为空！";
        this.zzz = false;
        return false;
      }
      var arr1 = this.goodsLists.filter(
        x => x.name == name && x.searcBarCode == password
      );
      if (arr1.length == 1) {
        this.$router.push({
          path: "/Member",
          query: {
            user: arr1
          }
        });
      } else {
        alert("账号或密码错误！");
      }
    },
    vconf() {
      if (this.name !== "" && this.searcBarCode !== "") {
        this.zzz = true;
      }
    }
  },
  watch: {
    searcBarCode: function() {
      this.searcBarCode = this.searcBarCode.replace(/[\W]/g, "");
    },
    searchGoodsName: function() {
      this.searchGoodsName = this.searchGoodsName.replace(
        /[^A-Za-z0-9\u4e00-\u9fa5]/g,
        ""
      );
    },
    searchProName: function() {
      this.searchProName = this.searchProName.replace(
        /[^A-Za-z0-9\u4e00-\u9fa5]/g,
        ""
      );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  list-style: none;
  text-decoration: none;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: white;
}

.hello {
  width: 100%;
  max-width: 1540px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-content: flex-start;
  height: 754px;
}

.gotob {
  width: 100%;
  height: 100%;
}

#bgimg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.enter {
  width: 100%;
  height: 10%;
  margin-top: 10%;
}

.enter_f {
  width: 30%;
  height: 100%;
  margin: 0px auto;
  background-color: rgba(245, 234, 234, 0.8);
  border: 1px solid #9999;
}

.enter_f h2 {
  padding-top: 4%;
}

.register {
  width: 100%;
  height: 40%;
}

.register_f {
  width: 30%;
  height: 100%;
  margin: 0 auto;
  background-color: rgba(245, 234, 234, 0.8);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
}

.nav {
  width: 72%;
  height: 15%;
  background-color: white;
  margin-bottom: 20px;
}

.dlubtn {
  width: 72%;
  height: 16%;
  background-color: #4caf50;
  line-height: 52px;
  color: aliceblue;
  border: 1px solid 82bd84;
  font-weight: 500;
  cursor: pointer;
}

.dlubtn:hover {
  background-color: #3e8e41;
}

/* 導航 */
.navs {
  width: 100%;
  height: 100%;
}

ul {
  display: flex;
  justify-content: space-around;
  flex-wrap: nowrap;
  width: 100%;
  height: 100%;
}

ul li {
  display: inline-block;
  width: 80%;
  line-height: 45px;
  height: 100%;
  color: #685f5f;
  white-space: nowrap;
  font-size: 17px;
}

/* 这里是input */
.navigation {
  width: 100%;
  height: 115px;
}

.Maxbox {
  max-width: 328px;
  position: relative;
  width: 100%;
  height: 50px;
  background-color: white;
  margin: 5px auto;
  line-height: 47px;
}
.nasevt2 {
  width: 73%;
  height: 36%;
  margin-bottom: 20px;
}
.nasevt1 {
  width: 73%;
  height: 36%;
  margin-bottom: 20px;
}
.Maxbox span {
  position: absolute;
  top: 15px;
  left: 15px;
}

.Maxbox input {
  border-width: 0;
  width: 275px;
  height: 42px;
  margin-left: 40px;
}

.simages {
  width: 18px;
  height: 18px;
  display: inline-block;
  background: url(https://res.wx.qq.com/mpres/zh_CN/htmledition/comm_htmledition/style/page/page_login_z3b5429.png)
    0 0 no-repeat;
}

.simagest {
  background: url(https://res.wx.qq.com/mpres/zh_CN/htmledition/comm_htmledition/style/page/page_login_z3b5429.png)
    0 -22px no-repeat;
  width: 18px;
  height: 18px;
  display: inline-block;
}

input {
  background: none;
  outline: none;
  border: 0px;
}
</style>
