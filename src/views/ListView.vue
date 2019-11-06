<template>
    <div class="view-list">
        <list-view-panel :itemsList="getItemsList"/>
    </div>
</template>

<script>
import listViewPanel from '@/components/listViewPanel/ListViewPanel.vue';
import { version, backendVersion } from '../../package.json';

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
    methods: {
        updateAppData() {
            this.$store.dispatch('getList');
            this.$store.dispatch('getZoneList');
            this.$store.dispatch('getFilters');
            this.$store.dispatch('getRulesData');
            this.$store.dispatch('getWorkspaces').then(() => {
                console.log(`back v.${this.$store.state.version.slice(7)} | front v.${version} | back-required v.${backendVersion}`);
            });
        },
    },
    created() {
        const { ws } = this.$route.query;
        const currentWs = this.$store.getters.getWorkspace;
        if (currentWs.toLowerCase() !== ws.toLowerCase()) {
            this.$store.commit('setWorkspace', ws);
            this.updateAppData();
        }
    },
    beforeRouteUpdate(to, from, next) {
        if (to.path === '/listView' && to.query.ws !== from.query.ws) {
            const nextWs = to.query.ws || null;
            this.$store.commit('setWorkspace', nextWs);
            this.updateAppData();
        }
        next();
    },
};
</script>

<style lang="scss" scoped>

</style>
