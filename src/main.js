// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
import Bmob from "hydrogen-js-sdk";

Bmob.initialize("46eea7c45485b5f3260323d235fb5d8c", "2c9d133ae5b2f17bb5c031a33fe34bb6");

Vue.prototype.Bmob = Bmob
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  data: {
        eventVue: new Vue()
    },
  components: { App },
  template: '<App/>'
})
