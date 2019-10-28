import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../static/css/global.css'   // 全局样式
import Mixins from './mixin'
Vue.use(Mixins);

new Vue({
    router,
    store,
    components: {App},
    template: '<App/>'
}).$mount('#app');
