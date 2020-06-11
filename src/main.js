import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router/router'
Vue.use(ElementUI)
Vue.config.productionTip = false
import echarts from 'echarts'
new Vue({
  render: h => h(App),
  router,
  echarts
}).$mount('#app')
