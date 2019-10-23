<template>
    <b-list-group @scroll="onScroll">
        <div class="list-wrapper">
            <b-list-group-item v-for="item in getPageItems" :key="item.id">
                <view-list :item="item"/>
            </b-list-group-item>
        </div>
    </b-list-group>
</template>

<script>
import viewList from '@/components/listViewPanel/ListViewItem.vue';

export default {
    name: 'ListViewPanel',
    components: {
        viewList,
    },
    props: {
        itemsList: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            itemPerPage: 10,
            page: 1,
        };
    },
    created() {
        this.$store.dispatch('getMeta');
    },
    computed: {
        getPageItems() {
            const endIndex = this.itemPerPage * this.page;
            return this.itemsList.slice(0, endIndex);
        },
    },
    methods: {
        onScroll(event) {
            const el = event.target;
            const elItem = el.firstElementChild;
            const diffHeight = elItem.offsetHeight - el.offsetHeight;

            if (diffHeight - 1 <= el.scrollTop) {
                this.page = this.page + 1;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .list-group {
        position:relative;
        height: 100vh;
        overflow-y:auto;
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch;
        font-size: 14px;
    }
</style>
