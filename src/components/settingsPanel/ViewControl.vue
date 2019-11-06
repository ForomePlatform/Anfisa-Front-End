<template>
    <div class="view-control">
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
            <b-link @click="getLisViewLink">
                <img
                        class="view-control_icon  ml-2"
                        alt="List view"
                        src="@/assets/listViewIcon.svg"
                />
            </b-link>
        </div>
    </div>
</template>

<script>
import router from '../../router';

export default {
    name: 'ViewControl',
    methods: {
        getVariantLink() {
            const ws = this.$store.getters.getWorkspace;
            router.push({ path: '/', query: { ws } });
        },
        getLisViewLink() {
            const ws = this.$store.getters.getWorkspace;
            router.push({ path: '/listView', query: { ws } });
        },
    },
};
</script>

<style lang="scss" scoped>
    .view-control {
        display: flex;
        align-items: center;
        justify-content: space-between;
        &_title {
            font-size: 14px;
            line-height: 14px;
            letter-spacing: 0;
            color: #2bb3ed;
            font-family: "Arial";
            font-weight: 800;
        }
        &_icon:hover {
            cursor: pointer;
        }
    }
</style>
