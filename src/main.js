import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/base.css'
import vueAxios from './lib/vue-axios'
import router from './lib/router'
import myBreadcrumb from './components/myBreadcrumb.vue'

Vue.use(ElementUI);
Vue.use(vueAxios);


Vue.config.productionTip = false

// 全局注册面包屑组件
Vue.component('myBreadcrumb',myBreadcrumb)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
