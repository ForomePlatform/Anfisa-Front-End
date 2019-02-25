import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import AnnotationDev from './views/AnnotationDev.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/annotation-dev/',
            name: 'annotation-dev',
            component: AnnotationDev,
        },
    ],
});
