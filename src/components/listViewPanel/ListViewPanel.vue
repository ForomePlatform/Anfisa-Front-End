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
            endIndex: 10,
        };
    },
    created() {
        const meta = this.$store.getters.getMeta;
        if (!meta) {
            this.$store.dispatch('getMeta');
        }
        if (this.itemsList.length > 0) {
            this.loadItemsDetails();
        }
    },
    computed: {
        getPageItems() {
            return this.itemsList.slice(0, this.endIndex);
        },
    },
    watch: {
        itemsList() {
            this.page = 1;
            this.endIndex = this.getEndIndex();
            this.loadItemsDetails();
        },
    },
    methods: {
        onScroll(event) {
            const el = event.target;
            const elItem = el.firstElementChild;
            const diffHeight = elItem.offsetHeight - el.offsetHeight;

            if (diffHeight - 1 <= el.scrollTop) {
                this.page = this.page + 1;
                this.endIndex = this.itemPerPage * this.page;
                this.loadItemsDetails();
            }
        },
        loadItemsDetails() {
            const startIndex = this.itemPerPage * (this.page - 1);
            const items = this.itemsList.slice(startIndex, this.endIndex);
            items.forEach((item) => {
                this.$store.dispatch('getListViewDetails', item.id);
                this.$store.dispatch('getListViewTags', item.id);
            });
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
        font-size: 12px;
    }
    .list-group-item {
        padding: 5px;
    }
</style>
