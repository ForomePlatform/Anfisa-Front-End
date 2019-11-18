import Vue from 'vue';
import Router from 'vue-router';
import VariantView from './views/VariantView.vue';
import ListView from './views/ListView.vue';
import AnnotationDev from './views/AnnotationDev.vue';


Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'variantView',
            component: VariantView,
        },
        {
            path: '/listView',
            name: 'listView',
            component: ListView,
        },
        {
            path: '/annotation-dev/',
            name: 'annotation-dev',
            component: AnnotationDev,
        },
    ],
});
