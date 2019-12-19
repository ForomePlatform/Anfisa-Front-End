<template>
    <div class="list-view-wrapper">
        <transition name="main-loading" mode="out-in">
            <div v-if="isMainLoading" class="loading-view" key="loading">
                <div class="spinner-wrapper">
                    <div class="spinner"></div>
                    <div class="spiner-label">
                        {{ getPageItems.length }} / {{ endIndex }}
                    </div>
                </div>
                <p class="loading">Loading<span>.</span><span>.</span><span>.</span></p>
            </div>
            <div v-else class="list-view" key="listView">
                <b-list-group @scroll="onScroll">
                    <div class="list-wrapper">
                        <b-list-group-item v-for="item in getPageItems" :key="item.id">
                            <viewList :item="item"/>
                        </b-list-group-item>
                        <div v-if="isSubLoading" class="sub-loading-view">
                            <div class="spinner-wrapper">
                                <div class="spinner"></div>
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
            return this.$store.getters.getListViewDetails;
        },
        isMainLoading() {
            return this.isLoading() && this.endIndex === this.itemPerPage;
        },
        isSubLoading() {
            console.log(this.isLoading());
            return this.isLoading();
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
        padding: 5px;
    }
    .progress-bar {
        width: 50%;
        margin-top: 10px;
    }
    .sub-loading-view {
        display: flex;
        justify-content: center;
        align-items: center;
        .spinner-wrapper {
            position: relative;
            width: 60px;
            height: 60px;
        }
    }
    .spinner-wrapper {
        position: relative;
        width: 120px;
        height: 120px;
        .spiner-label {
            position: absolute;
            top: 50px;
            width: 100%;
            text-align: center;
        }
    }
    .spinner {
        width: 100%;
        height: 100%;
        color: rgba(90, 90, 90, 0.2);
        position: relative;
        display: inline-block;
        border: 7px solid;
        border-radius: 50%;
        border-right-color: #2bb3ed;
        animation: rotate 1s linear infinite;
    }
    @keyframes rotate {
        0% {
            transform: rotate(0);
        }
        100% {
            transform: rotate(360deg);
        }
    }
    .loading {
        margin-top: 10px;
        @keyframes blink {
            0% {
                opacity: .2;
            }
            20% {
                opacity: 1;
            }
            100% {
                opacity: .2;
            }
        }
        span {
            animation-name: blink;
            animation-duration: 1.4s;
            animation-iteration-count: infinite;
            animation-fill-mode: both;
            margin: 0;
            font-size: 16px;
        }
        span:nth-child(2) {
            animation-delay: .2s;
        }
        span:nth-child(3) {
            animation-delay: .4s;
        }
    }
    .main-loading-enter-active, .main-loading-leave-active {
        transition: opacity .3s;
    }
    .main-loading-enter, .main-loading-leave-to{
        opacity: 0;
    }
</style>
