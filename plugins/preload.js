import Vue from 'vue'
import VueLodash from 'vue-lodash'
import uploader from 'vue-simple-uploader'
import * as bingMap from 'leaflet-bing-layer'
import Snackbar from '~/components/Snackbar'
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'

window.moment = require('moment')
Vue.use(VueLodash)
Vue.use(uploader)
Vue.use(PerfectScrollbar)
Vue.prototype.$BingMapKey =
  'AlKMmXInLFdVhCeCjVd6zkggdT9-UbKOlYwT2qxnZ50r5oNblJTmH2yhO90aVd1x'

Vue.component('app-snackbar', Snackbar)
