import Vue from 'vue';
import Router from 'vue-router';
import VariantView from './views/VariantView.vue';
import ListView from './views/ListView.vue';
import AnnotationDev from './views/AnnotationDev.vue';
import { VARIANT_VIEW, LIST_VIEW } from './common/constants';


Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: VARIANT_VIEW,
            component: VariantView,
        },
        {
            path: '/listView',
            name: LIST_VIEW,
            component: ListView,
        },
        {
            path: '/annotation-dev/',
            name: 'annotation-dev',
            component: AnnotationDev,
        },
    ],
});
