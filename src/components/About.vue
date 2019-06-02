<template>
	<div id="person">
		<div class="navBox">
			<div class="Nav">
				<div class="welcomes">
					<p >您好！欢迎来到会员积分管理系统</p>
				</div>
				
				<router-link class="exchange" to="/Integral" >积分兑换商城</router-link>
				<p class="out"><router-link to="/">【退出登录】</router-link></p>
			</div>
		</div>
		<div class="midBox1">
			<div class="classify">
				<p class="personTle">用户中心</p>
				<p class="personMes">个人信息</p>
				<!-- <p class="personMes"><a href="" class="text">积分详情</a></p> -->
			</div>
				<div class="personBox">
				<p class="rightTile">个人信息</p>
				<div class="messBox">
					<p class="nameBox"><span  @click="oo()">用&nbsp;&nbsp;户&nbsp;&nbsp;名： {{ name }}</span></p>
					<p class="nameBox" @change="oo()"><span>手&nbsp;&nbsp;机&nbsp;&nbsp;号: {{ phone }}</span></p>
					<p class="nameBox"><span>用户邮箱: {{email}}</span></p>
					<p class="nameBox"><span>真实姓名: {{trueName}}</span></p>
					<p class="nameBox"><span>用户积分： {{jifen}}</span></p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	// import Self from "@/self.js"
	export default {
		name: "about",
		data() {
			return {
				personData: [],
				name: '',
				phone: "",
				email:"",
				trueName:"",
				jifen:"",
				
			}
		},
		methods: {
			route(){
				this.$router.push({
					path: ""
				})
			},
			oo(){
				// console.log(localStorage.data,"1")
				
			}
		},
		destroyed(){
			// console.log("qwe")
		},
		mounted() {
			// let that=this;
		   var obj=JSON.parse(localStorage.data)					  
			 this.arr2 = obj;
			this.name = obj[0].name;
			this.phone = obj[0].phone;
			this.email = obj[0].email;
			this.trueName = obj[0].trueName;
			this.jifen = obj[0].jifen;
		}
	}
</script>
<style scoped>
	#person {
		margin: 0;
		padding: 0;
		list-style: none;
		max-width:1530px;
		margin: 0 auto;
		height: 710px;
		background: #ededed;
	}

	.navBox {
		width: 100%;
		height: 40px;
		background: #007acc;

	}

	.Nav {
		width: 90%;
		height: 40px;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
	}

	.welcomes {
		width: 300px;
		height: 100%;
		color: white;
		font-size: 16px;
		position: static;
		/* margin-left:20px; */
		line-height: 40px;
	}

	.out {
		width: 120px;
		height: 100%;
		line-height: 40px;
	}

	a {
		text-decoration: none;
		color: white;
		font-size: 16px;
		white-space:nowrap;
		/* margin-left: 20px; */
		display: block;
	}

	.midBox1 {
		width: 90%;
		height: 600px;
		background: white;
		margin: 40px auto;
		display: flex;
		justify-content: space-between;
		overflow: hidden;
	}

	.classify {
		margin-top: 25px;
		width: 15%;
		height: 500px;
		/* background:orange; */
		margin-left: 20px;
		border: 2px solid #fafafa;
	}

	.personBox {
		margin-top: 45px;
		width: 80%;
		height: 500px;
		/* background: pink; */
	}

	.personTle {
		width: 100%;
		height: 40px;
		background: #1289DB;
		color: white;
		font-size: 16px;
		line-height: 40px;
		text-align: center;
		font-weight: 700;
		border-bottom: 1px solid white;
	}

	.personMes {
		width: 100%;
		height: 40px;
		color: white;
		background:#1289DB;
		font-size: 16px;
		line-height: 40px;
		font-weight: 700;
		border-bottom: 1px solid white;
	}

	.personMes>.text {
		display: block;
		color:white;
		font-size: 14px;
		font-weight: 700;
		text-align: center;
	}

	.personMes:hover .text {
		color: white;
	}

	.rightTile {
		width: 100%;
		height: 40px;
		font-weight: 700;
		/* background: #aaa; */
		line-height: 40px;
		border-bottom: 1px dashed#aaa;
	}

	.messBox {
		width: 95%;
		height: 410px;
		/* background: red; */
		margin: 30px auto;
		border: 1px solid #ededed;
	}

	.messBox>P {
		height: 30px;
		text-align: left;
		background: #ededed;
		margin-bottom: 20px;
	}

	.messBox>P>span {
		display: block;
		margin-left: 10px;
		line-height: 30px;
		text-align: center;
	}

	.exchange {
		width: 120px;
		height: 100%;
		line-height: 40px;
		/* margin-left: 1030px; */
	}
</style>
