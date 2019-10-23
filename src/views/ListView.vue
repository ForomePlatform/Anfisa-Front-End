<template>
    <div class="view-list">
        <list-view-panel :itemsList="getItemsList"/>
    </div>
</template>

<script>
import listViewPanel from '@/components/listViewPanel/ListViewPanel.vue';

export default {
    name: 'ListView',
    components: {
        listViewPanel,
    },
    computed: {
        getItemsList() {
            return this.$store.getters.list;
        },
    },
};
</script>

<style lang="scss" scoped>

</style>
