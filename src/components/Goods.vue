<template>
  <div id="Goods">
    <div class="exchange">
      <div class="login">
        <div class="greet">
          <span class="welcome" style="top:0">商品操作页</span>
          <ul class="jf-nav">
            <li class="personal jf">
              <router-link to="/Member">管理员操作页</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="add" :data="obj">
      <div @click="addGoods()" class="add-button">
        <button>添加</button>
      </div>
      <div class="sureShadow" v-if="flag3">
        <img :src="obj.img" alt>
        <div class="edit">
          <div>
            图&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;片:
            <input ref="wen" @change="chen" type="file">
          </div>
          <div>
            商品名称:
            <input ref="ind" v-model="obj.title" type="text">
          </div>
          <div>
            商品信息:
            <input ref="ind" v-model="obj.message" type="text">
          </div>
          <div>
            兑换人数:
            <input ref="ind" v-model="obj.jf" type="text">
          </div>
          <div>
            所需积分:
            <input ref="ind" v-model="obj.province" type="text">
          </div>
          <el-button style="left:15px" @click="addGood(obj)">确定</el-button>
          <el-button style="left:105px" @click="qxaddGood()">取消</el-button>
        </div>
      </div>
    </div>
    <el-table :data="tableData">
      <el-table-column
        prop="img"
        label="商品图片"
        align="center"
        width="150px"
        :show-overflow-tooltip="true"
      >
        <template scope="scope">
          <img :src="scope.row.img" alt style="width: 36px;height:36px">
        </template>
      </el-table-column>
      <el-table-column prop="title" label="商品名称" width="250"></el-table-column>
      <el-table-column prop="message" label="商品信息" width="300"></el-table-column>

      <el-table-column prop="jf" label="所需积分" width="150"></el-table-column>
      <el-table-column prop="province" label="兑换人数" width="150"></el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="changeGoods(scope.$index, tableData)"
            type="text"
            size="small"
          >编辑</el-button>
          <div class="sureShadow2" v-if="flag2">
            <div class="edit">
              <div>
                图&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;片:
                <input ref="inp" v-model="tableData[ind].img" type="text">
              </div>
              <div>
                商品名称:
                <input ref="inp" v-model="tableData[ind].title" type="text">
              </div>
              <div>
                商品信息:
                <input ref="inp" v-model="tableData[ind].message" type="text">
              </div>
              <div>
                所需积分:
                <input ref="inp" v-model="tableData[ind].jf" type="text">
              </div>
              <div>
                兑换人数:
                <input ref="inp" v-model="tableData[ind].province" type="text">
              </div>

              <el-button @click="modifyData(ind)">确定</el-button>
            </div>
          </div>
          <span>/</span>
          <el-button @click="deleteGoods(scope.$index)" type="text" size="small">删除</el-button>
          <div v-if="flag">
            <div class="sure">
              <span>是否确定移除该商品</span>
              <el-button @click.native.prevent="deleteRow(index, tableData)">是</el-button>
              <el-button @click="nodeleteGoods()">否</el-button>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div style="display: none;">{{flag2}}</div>
  </div>
</template>
<script>
export default {
  name: "Goods",

  mounted() {
    let arr = [
      {
        now: "立即兑换",
        jf: "104.00",
        title: "多功能手环运动计步器防水",
        message: "aaa",
        province: "100",
        img:
          "//img1.360buyimg.com/n6/jfs/t18109/39/2408843457/56243/f946c905/5af29ed5N1d44b4f4.png"
      },
      {
        now: "立即兑换",
        jf: "58.00",
        title: "平安夜居家办公室摆件 牛顿摆球撞球",
        message: "aaa",
        province: "100",
        img:
          "//img1.360buyimg.com/n6/jfs/t17134/201/2332235441/208938/59d2e131/5af03b5bN4e577a12.jpg"
      },
      {
        now: "立即兑换",
        jf: "175.00",
        title: "创意多功能车载手机支架",
        message: "aaa",
        province: "100",
        img:
          "//img1.360buyimg.com/n6/jfs/t16693/186/2335629607/103332/3f01b009/5af26f6fNf8b14ee9.png"
      },
      {
        now: "立即兑换",
        jf: "3200",
        title: "埃及进口长绒棉毛巾",
        message: "aaa",
        province: "100",
        img:
          "https://m.jf.10010.com/cms/jf-res/decorate/72cc0c0a-aa94-4130-8b11-62a800188a31_210_210.png"
      },
      {
        now: "立即兑换",
        jf: "4460",
        title: "大嘴猴创意学生迷你随手杯HC201-280",
        message: "aaa",
        province: "100",
        img:
          "https://m.jf.10010.com/cms/jf-res/decorate/72cc0c0a-aa94-4130-8b11-62a800188a31_210_210.png"
      },
      {
        now: "立即兑换 ",
        jf: "1390.00 ",
        title: "Ferrero Rocher费列罗榛果威化糖果巧克力礼盒48粒600g ",
        message: "aaa",
        province: "100",
        img:
          "//img14.360buyimg.com/n2/jfs/t8950/191/2498215367/134480/55ee65d2/59dad98dN844ade9a.jpg!q80.webp"
      },
      {
        now: "立即兑换",
        jf: "1190.00",
        title:
          "原装进口纯正椰子水，富含多种矿物质，快速补充电解质，夏季解暑补水佳品",
        message: "aaa",
        province: "100",
        img:
          "//img14.360buyimg.com/n7/jfs/t16492/318/2262306511/213313/f8aa07be/5a9e5e11N7a7a400f.jpg"
      },
      {
        now: "立即兑换",
        jf: "1080.0",
        title: "美恩 泰国进口奇亚籽石榴味果汁饮料290ml 12瓶",
        message: "aaa",
        province: "100",
        img:
          "//img12.360buyimg.com/n7/jfs/t20755/207/437583524/268974/20a2023f/5b0cf1a0N0936fc65.jpg"
      },
      {
        now: "立即兑换",
        jf: "280.00",
        title:
          "亨利摩根（Henry Morgan）每日坚果 混合果仁零食年货大礼包 孕妇零食 进口干果零食礼盒750g",
        message: "aaa",
        province: "100",
        img:
          "//img13.360buyimg.com/n7/jfs/t1/9667/30/14647/393971/5c665e85E5c9298e0/f72af2111386392a.jpg"
      },
      {
        now: "立即兑换",
        jf: "239.00",
        title: "沃隆每日坚果，满188元换购大罐果干",
        message: "aaa",
        province: "100",
        img:
          "//img13.360buyimg.com/n7/jfs/t1/23522/25/14780/343537/5caaa379E2ae7ebf6/a5a09f75f158584b.jpg"
      },
      {
        now: "立即兑换",
        jf: "234.00",
        title: "三只松鼠 蜜饯果干组合328g芒果干草莓干黄桃干",
        message: "aaa",
        province: "100",
        img:
          "//img11.360buyimg.com/n7/jfs/t1/35275/13/772/321806/5cacb522E5be9e71d/cc0e53a1d4389bce.jpg"
      },
      {
        now: "立即兑换",
        jf: "9699.0",
        title:
          "【限时特价，抢券再减700元！选换修无忧版享只换不修！】iPhone7Plus秒杀价4199元抢！详情请点击！",
        message: "aaa",
        province: "100",
        img:
          "//img12.360buyimg.com/n7/jfs/t1/4528/10/3590/153299/5b997bf5E4a513949/45ab3dd6c35d981b.jpg"
      },
      {
        now: "立即兑换",
        jf: "99999.0",
        title: "凯迪拉克XT5",
        message: "aaa",
        province: "100",
        img:
          "//m.360buyimg.com/babel/s390x390_jfs/t1/26293/26/6241/22928/5c497f36E6622a045/6fdf9e1f84f276e0.jpg"
      }
    ];
    let str = JSON.stringify(arr);

    let that = this;
    const query = Bmob.Query("data");
    query
      .get("0rNDJJJl")
      .then(res => {
        console.log(res);
        // res.set("Data",str)
        that.tableData = JSON.parse(res.Data);
        // console.log(that.tableData)
        // res.save()
      })
      .catch(err => {
        console.log(err);
      });
  },
  updated() {
    console.log("111");
    let str = JSON.stringify(this.tableData);
    //修改
    let that = this;
    const query = Bmob.Query("data");
    query
      .get("0rNDJJJl")
      .then(res => {
        // console.log(res)
        res.set("Data", str);
        res.save();
        // that.tableData=JSON.parse(res.Data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  destoryed() {
    let str = JSON.stringify(this.tableData);
    //修改
    const query = Bmob.Query("data");
    query
      .get("0rNDJJJl")
      .then(res => {
        console.log(res);
        res.set("Data", str);
        res.save();
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    chen() {
      // 上传文件
      console.log("111111111");
      const pic = this.$refs.wen.files;
      let file;
      let that = this;
      for (let item of pic) {
        file = Bmob.File(item.name, item);
      }
      file.save().then(res => {
        console.log(res.length);
        console.log("文件", res);
        that.obj.img = res[0].url;

        console.log("obj", that.obj);
      });
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
      this.flag = false;
    },
    deleteGoods(index) {
      this.index = index;
      this.flag = true;
    },
    nodeleteGoods() {
      this.flag = false;
    },
    changeGoods(i) {
      this.flag2 = true;
      this.ind = i;
    },

    modifyData(index) {
      this.tableData[index].province = this.$refs.inp.value;
      this.flag2 = false;
      console.log(this.$refs.inp);
    },
    addGoods() {
      this.flag3 = true;
    },
    qxaddGood() {
      this.flag3 = false;
    },
    addGood(rows) {
      if (
        rows.name == "" ||
        rows.message == "" ||
        rows.province == "" ||
        rows.province == "" ||
        rows.img == ""
      ) {
        alert("添加失败");
        return false;
      }

      this.tableData.push(JSON.parse(JSON.stringify(rows)));

      this.obj = {
        img: "",
        title: "",
        message: "",
        jf: "",
        province: ""
      };
      this.flag3 = false;
    }
  },
  data() {
    return {
      name: ["商品图片", "商品名称", "商品信息"],
      flag: false,
      index: 0,
      ind: 0,
      flag2: false,
      flag3: false,
      value: "",
      selectedlist: "",
      obj: {
        img: "",
        title: "",
        message: "",
        jf: "",
        province: ""
      },
      tableData: []
    };
  }
};
</script>

<style scoped>
.exchange {
  height: 100px;
  line-height: 30px;
  /* background: #f4f3f3; */
  font-size: 16px;
}

.login {
  /* position: relative; */
  z-index: 10;
  max-width:1530px;
  margin: 0 auto;
  height: 52px;
  background: #188eee;
}

.greet {
  margin: 0 auto;
  width: 1496px;
  height: 52px;
  position: relative;
}

.welcome {
  color: #fff;
  background-color: #188eee;
  text-align: center;
  font-size: 16px;
  font-family: "΢���ź�";
  position: absolute;
  line-height: 52px;
  left: 520px;
  width: 122px;
  height: 52px;
}
.welcome:hover{
	background-color: #4ba9f7;
}
.jf-nav {
  float: left;
  margin-left: 770px;
  font-size: 16px;
}

.jf {
  position: relative;
  float: left;
  width: 122px;
  height: 52px;
  margin-right: 70px;
}

.jf > a,
.ware {
  position: relative;
  display: block;
  width: 100%;
  height: 52px;
  line-height: 52px;
  color: #fff;
  background-color: #188eee;
  text-align: center;
  font-size: 16px;
  font-family: "΢���ź�";
}

.jf > a:hover {
  background-color: #4ba9f7;
}

h1 {
  height: 70px;
  line-height: 70px;
}

.back {
  background-color: #66b1ff;
  width: 100px;
  height: 50px;
}

.add {
  height: 50px;
  /* position: relative; */
  max-width: 1530px;
  margin: 0 auto;
  /* right: 0px; */
}

.add-button {
  background-color: #66b1ff;
  width: 100px;
  height: 50px;
  margin-right: 50px;
  float: right;
  border-radius: 6px;
  font-size: 15px;
}
img {
  height: 60px;
  width: 60px;
}

.add-button button {
  position: relative;
  top: 25%;
  text-align: center;
  display: inline-block;
  width: 80%;
  outline: none;
  font-size: 22px;
  border: 1px solid transparent;
  cursor: pointer;
  background: #66b1ff;
  color: #fff;
  line-height: 25px;
}

.el-table {
  /* height: 500px; */
  /* max-height: 500px; */
  max-width: 1450px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-wrap: wrap;
  width: 100%;
  margin: 0 auto;
  text-align: center;
}
.is-scrolling-none {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.el-table__fixed-body-wrapper {
  max-height: 500px;
}

.sureShadow {
  width: 100%;
  height: 900px;
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
}

.sureShadow2 {
  width: 100%;
  height: 900px;
  background: rgba(10, 10, 10, 0.05);
  /* opacity: 0.1; */
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
}

.sureShadow2:hover {
  background-color: rgba(105, 105, 105, 0.1);
}

.sure {
  width: 300px;
  height: 200px;
  background-color: skyblue;
  margin: 0 auto;
  position: fixed;
  top: 30%;
  left: 40%;
}

/* .sureShadow:hover span {
		color: black;
	} */

.sure span {
  position: relative;
  top: 30%;
  text-align: center;
  display: inline-block;
  width: 100%;
  color: black;
}

.sure .el-button {
  position: relative;
  top: 50%;
  text-align: center;
  display: inline-block;
  width: 30%;
  outline: none;
  border: 1px solid transparent;
  cursor: pointer;
  background: #fff;
  left: 20%;
}

.edit {
  margin: 0 auto;
  width: 700px;
  margin-top: 100px;
  font-size: 24px;
  color: #34393e;
  font-weight: 600;
}

.edit input {
  display: block;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  height: 35px;
  width: 400px;
  display: inline-block;
  margin-left: 12px;
}

.edit button {
  left: 45%;
  position: relative;
}

.el-table__body,
.el-table__header {
  width: 1250px !important;
}
</style>
