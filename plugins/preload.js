import Vue from 'vue'
import VueLodash from 'vue-lodash'
import uploader from 'vue-simple-uploader'
import * as bingMap from "leaflet-bing-layer";

window.moment = require('moment')
Vue.use(VueLodash)
Vue.use(uploader)
Vue.prototype.$BingMapKey =
    "AlKMmXInLFdVhCeCjVd6zkggdT9-UbKOlYwT2qxnZ50r5oNblJTmH2yhO90aVd1x";
