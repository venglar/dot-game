import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSync, faPlay, faPause, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import 'reset-css';

library.add(faSync, faPlay, faPause, faCheck, faTimes)
Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
    el: '#app',
    store,
    render: h => h(App)
});