<template>
	<div class="c_member">
		<div class="c_inner">
			<!-- 标题 -->
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
			<!-- 信息导航 -->
			<div class="c_infonav">
				<p>姓名</p>
				<p>电话</p>
				<p>积分</p>
				<p style="cursor: pointer;" @click="addvip">增加</p>
			</div>
			<!-- 增加会员 -->
			<div class="c_add" ref="c_add">
				<!-- 点击c_add消失 -->
				<div class="c_addmove" @click="addmove"></div>
				<!-- 增加会员 -->
				<div class="c_addinner">
					<input type="text" @blur="getName($event)" placeholder="请输入会员名" />
					<input type="text" @blur="getNum($event)" placeholder="请输入手机号" />
					<input type="text" @blur="getScore($event)" placeholder="请输入会员积分" />
					<!-- sureAdd 确认增加 -->
					<button @click="sureAdd">确认增加</button>
				</div>
			</div>
			<!-- 信息盒子 -->
			<div class="c_infoitem" ref="c_infoitem" v-for="(item,index) in vipinfoArr" :key="index">
				<!-- 会员名 -->
				<div class="c_infoname">
					<!-- 点击修改信息事件 -->
					<span @click="changeInfo($event)" class="c_info" ref="c_info">{{item.name}}</span>
					<span class="c_change" ref="c_change">
						<!-- 修改信息事件 -->
						<input ref="inp" type="text" @blur="getNewInfo($event)" v-model="item.name"/>
						<!-- 确认修改事件 -->
						<button class="c_btn_name" @click="sureChange(index,$event)">确认修改</button>
					</span>
				</div>
				<!-- 会员手机号 -->
				<div class="c_infonumber">
					<span @click="changeInfo($event)" class="c_info" ref="c_info">{{item.phone}}</span>
					<span class="c_change" ref="c_change">
						<input ref="inp" type="text" @blur="getNewInfo($event)" v-model="item.phone"/>
						<button class="c_btn_number" @click="sureChange(index,$event)">确认修改</button>
					</span>
				</div>
				<!-- 会员积分 -->
				<div class="c_infoscore">
					<span @click="changeInfo($event)" class="c_info" ref="c_info">{{item.jifen}}</span>
					<span class="c_change" ref="c_change">
						<input ref="inp" type="text" @blur="getNewInfo($event)" v-model="item.jifen"/>
						<button class="c_btn_score" @click="sureChange(index,$event)">确认修改</button>
					</span>
				</div>
				<!-- 删除会员 -->
				<div style="cursor: pointer;" class="c_infomove" @click="moveVip(index,vipinfoArr)">删除</div>
			</div>
		</div>
		
		<div style="display: none;">{{flag}}</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				// 存放会员信息数组
				vipinfoArr: [],
				// 存放修改后的 name
				name: "",
				// 存放修改后的 number
				number: "",
				// 存放修改后的 score
				score: "",
				flag: false,
				current:0
			}
		},
		created() {
			// 初始化数据
			// this.getInfo();
		},
		mounted() {
			let that = this;
			const query = Bmob.Query('data');
			let getMemberInfo = () => {
				return query.find()
			}
			query.get('0yflAAAF').then(res => {
				console.log(res)
				// res.set("Data",str)
				that.vipinfoArr = JSON.parse(res.Data);
				console.log(that.vipinfoArr)
				// res.save()
			}).catch(err => {
				console.log(err)
			})
		},
		updated() {
			console.log("123456789")
			let str = JSON.stringify(this.vipinfoArr)
			//修改
			const query = Bmob.Query('data');
			query.get('0yflAAAF').then(res => {
				console.log(res)
				res.set('Data', str)
				res.save()
			}).catch(err => {
				console.log(err)
			})
		},
		destoryed() {
			let str = JSON.stringify(this.vipinfoArr)
			//修改
			const query = Bmob.Query('data');
			query.get('0yflAAAF').then(res => {
				console.log(res)
				res.set('Data', str)
				res.save()
			}).catch(err => {
				console.log(err)
			})
		},
		methods: {
			// 初始化信息
			initinfo() {
				for (var i = 0; i < this.$refs.c_change.length; i++) {
					this.$refs.c_change[i].style.display = "none";
					this.$refs.c_info[i].style.display = "block";
				}
			},
			// 获取用户信息
			async getInfo() {
				// let arr = await getMemberInfo();
				this.vipinfoArr = arr
			},
			// 删除会员
			moveVip(index,vipinfoArr) {
				if(!confirm("是否删除")){
					return false;
				}
				vipinfoArr.splice(index, 1);
				this.flag = true;
				this.current=index;
			},
			// 点击修改信息事件
			changeInfo(e) {
				this.initinfo()
				e.target.style.display = "none";
				e.target.nextElementSibling.style.display = "block";
				e.target.nextElementSibling.children[0].focus();
			},
			// 修改信息事件
			getNewInfo(e) {
				this.changeValue = e.target.value
			},
			// 确认修改信息事件
			sureChange(index, e) {
				this.flag=!this.flag;
				e.target.parentNode.style.display = "none"
				e.target.parentNode.previousElementSibling.style.display = "block";
				if (this.changeValue != "") {
					e.target.parentNode.previousElementSibling.innerHTML = this.changeValue;
					if (e.target.className == "c_btn_name") {
						resetMemberInfo(this.vipinfoArr[index].objectId, "name", this.changeValue)
					} else if (e.target.className == "c_btn_phone") {
						resetMemberInfo(this.vipinfoArr[index].objectId, "phone", this.changeValue)
					} else if (e.target.className == "c_btn_jifen") {
						resetMemberInfo(this.vipinfoArr[index].objectId, "jifen", this.changeValue)
					}

				}
			},
			// 点击显示增加会员会员
			addvip() {
				this.$refs.c_add.style.display = "block";
			},
			// 点击隐藏增加会员
			addmove() {
				this.$refs.c_add.style.display = "none";
			},
			// 获取增加的 name
			getName(e) {
				this.name = e.target.value
			},
			// 获取增加的 number
			getNum(e) {
				this.phone = e.target.value
			},
			// 获取增加的 score
			getScore(e) {
				this.jifen = e.target.value
			},
			// 点击 确定增加
			sureAdd() {
				console.log(this.name, this.phone, this.jifen)
				this.vipinfoArr.push({
					name: this.name,
					phone: this.phone,
					jifen: this.jifen
				})
				var jifen = parseInt(this.jifen)
				// addMemberInfo(this.name,this.phone,jifen)
				this.$refs.c_add.style.display = "none";
			}
		}
	}
</script>
<style scoped>
	/* 大盒子 */
	.c_member {
		width: 100%;
		/* background: #f6f6f6; */
	}

	.c_inner {
		width: 1170px;
		margin: 0 auto;
		overflow: hidden;
	}

	.c_inner div {
		border-radius: 2px;
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .02), 0 4px 8px 0 rgba(0, 0, 0, .02);
	}

	/* 标题 */
	.c_title {
		width: 100%;
		height: 100px;
		background: #007acc;
		text-align: center;
		line-height: 100px;
		font-size: 30px;
		margin-top: 20px;
		position: relative;
		color: white;
	}

	.c_sousuo {
		width: 150px;
		height: 40px;
		position: absolute;
		bottom: 20px;
		right: 30px;
		border: none;
		background-color: #007acc;
		text-align: center;
		color: white;
		cursor: pointer;
		font-size: 20px;
	}

	/* 导航 */
	.c_infonav {
		width: 100%;
		height: 40px;
		background: #f6f6f6;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 20px;
		padding: 0 20px;
		box-sizing: border-box;
	}

	/* 信息盒子 */
	.c_infoitem {
		width: 100%;
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 20px;
		padding: 0 20px;
		background: #f6f6f6;
		box-sizing: border-box;
	}

	/* 修改信息 */
	.c_change {
		display: none;
	}

	/* 增加 */
	.c_add {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		display: none;
	}

	/* 隐藏增加盒子 */
	.c_addmove {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.3);
	}

	/* 增加 */
	.c_addinner {
		width: 300px;
		height: 300px;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%)
	}

	/* 增加 input */
	.c_addinner input {
		width: 230px;
		height: 30px;
		margin-bottom: 20px;
		text-indent: 15px;
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
.greet {
  margin: 0 auto;
  width: 1496px;
  height: 52px;
  position: relative;
}
</style>
