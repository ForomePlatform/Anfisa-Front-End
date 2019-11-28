<template>
    <div class="list-view-wrapper">
        <transition name="main-loading" mode="out-in">
            <div v-if="isMainLoading" class="loading-view" key="loading">
                <div class="loading-spinner">
                    <BaseSpinner
                            :label="getSpinnerLabel"
                            :show-loading="true"
                    />
                </div>
                <BaseLoadingLabel/>
            </div>
            <div v-else class="list-view" key="listView">
                <b-list-group @scroll="onScroll">
                    <div class="list-wrapper">
                        <b-list-group-item v-for="item in getPageItems" :key="item.id">
                            <viewList :item="item"/>
                        </b-list-group-item>
                        <div v-if="isSubLoading" class="sub-loading-view">
                            <div class="sub-loading-spinner">
                                <BaseSpinner/>
                            </div>
                        </div>
                    </div>
                </b-list-group>
            </div>
        </transition>
    </div>
</template>

<script>
import viewList from '@/components/listViewPanel/ListViewItem.vue';
import BaseSpinner from '../common/BaseSpinner.vue';
import BaseLoadingLabel from '../common/BaseLoadingLabel.vue';

export default {
    name: 'ListViewPanel',
    components: {
        BaseLoadingLabel,
        BaseSpinner,
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
            return this.$store.getters.getListViewDetails;
        },
        isMainLoading() {
            return this.isLoading() && this.endIndex === this.itemPerPage;
        },
        isSubLoading() {
            return this.isLoading();
        },
        getSpinnerLabel() {
            const min = this.$store.getters.getListViewDetails.length;
            const max = this.endIndex;
            return `${min} / ${max}`;
        },
    },
    watch: {
        itemsList() {
            this.loadItemsDetails();
        },
    },
    methods: {
        isLoading() {
            const listViewDetails = this.$store.getters.getListViewDetails;
            return listViewDetails.length < this.endIndex;
        },
        onScroll(event) {
            const el = event.target;
            const elItem = el.firstElementChild;
            const diffHeight = elItem.offsetHeight - el.offsetHeight;

            if (diffHeight - 1 <= el.scrollTop && !this.isLoading()) {
                this.page = this.page + 1;
                this.endIndex = this.itemPerPage * this.page;
                this.loadItemsDetails();
            }
        },
        loadItemsDetails() {
            const startIndex = this.itemPerPage * (this.page - 1);
            const items = this.itemsList.slice(startIndex, this.endIndex);
            items.forEach((item) => {
                const foundItems = this.$store.getters.getListViewDetailsById(item.id);
                if (foundItems && foundItems.length === 0) {
                    this.$store.dispatch('getListViewDetails', item.id);
                    this.$store.dispatch('getListViewTags', item.id);
                }
            });
        },
    },
};
</script>

<style lang="scss" scoped>
    .list-view-wrapper {
        background-color: #fff;
    }
    .loading-view {
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        transition: width 1s ease 0s;
        color: #2bb3ed;
        font-weight: 600;
        .loading-spinner {
            width: 120px;
            height: 120px;
        }
        span {
            font-size: 14px;
            margin: 15px;
        }
    }
    .sub-loading-view {
        width: 100%;
        height: 150px;
    }
    .list-group {
        position:relative;
        height: 100vh;
        overflow-y:auto;
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch;
        font-size: 12px;
    }
    .list-group-item {
        padding: 0;
    }
    .progress-bar {
        width: 50%;
        margin-top: 10px;
    }
    .sub-loading-view {
        display: flex;
        justify-content: center;
        align-items: center;
        .sub-loading-spinner {
            width: 60px;
            height: 60px;
        }
    }
    .main-loading-enter-active, .main-loading-leave-active {
        transition: opacity .3s;
    }
    .main-loading-enter, .main-loading-leave-to{
        opacity: 0;
    }
</style>
