<template>
    <div class="view-control">
        <div class="view-control-wrapper">
            <div class="view-control_title">
                VIEW
            </div>
            <div>
                <b-link @click="getVariantLink">
                    <img
                            class="view-control_icon"
                            alt="Variant view"
                            src="@/assets/tableViewIcon.svg"
                    />
                </b-link>
                <b-link @click="getListViewLink">
                    <img
                            class="view-control_icon  ml-2"
                            alt="List view"
                            src="@/assets/listViewIcon.svg"
                    />
                </b-link>
            </div>
        </div>
        <BaseCheckbox v-if="isListView" label="Show All Notes" v-model="isShow"/>
    </div>
</template>

<script>
import router from '../../router';
import BaseCheckbox from '../common/BaseCheckbox.vue';
import { LIST_VIEW } from '../../common/constants';

export default {
    name: 'ViewControl',
    components: { BaseCheckbox },
    data() {
        return {
            isShow: false,
            isListView: this.$router.currentRoute.name === LIST_VIEW
        };
    },
    computed: {
        isShowAllNotes() {
            return this.$store.getters.isShowAllNotes;
        },
    },
    methods: {
        getVariantLink() {
            const ws = this.$store.getters.getWorkspace;
            router.push({ path: '/', query: { ws } });
        },
        getListViewLink() {
            const ws = this.$store.getters.getWorkspace;
            router.push({ path: '/listView', query: { ws } });
        },
    },
    watch: {
        isShow() {
            this.$store.commit('updateShowAllNotes', this.isShow);
        },
        $route (to){
            this.isListView = to.name === LIST_VIEW
        }
    },
};
</script>

<style lang="scss" scoped>
    .view-control {
        &-wrapper {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        &_title {
            font-size: 14px;
            line-height: 14px;
            letter-spacing: 0;
            color: #2bb3ed;
            font-weight: 800;
        }

        &_icon:hover {
            cursor: pointer;
        }
    }
</style>
