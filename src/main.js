import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import VueYouTubeEmbed from 'vue-youtube-embed'
Vue.use(VueYouTubeEmbed);


new Vue({
  render: h => h(App)
}).$mount('#app')
