<template>
    <div class="variant">
        <VariantsPanel />
        <VariantDetailsPanel />
    </div>
</template>

<script>
import VariantsPanel from '@/components/variantsListPanel/VariantsPanel.vue';
import VariantDetailsPanel from '@/components/variantDetailsPanel/VariantDetailsPanel.vue';
import { version, backendVersion } from '../../package.json';

export default {
    name: 'VariantView',
    components: {
        VariantsPanel,
        VariantDetailsPanel,
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
        if (ws) {
            this.$store.commit('setWorkspace', ws);
        }
        this.updateAppData();
    },
    beforeRouteUpdate(to, from, next) {
        if (to.path === '/' && to.query.ws !== from.query.ws) {
            const nextWs = to.query.ws || null;
            this.$store.commit('setWorkspace', nextWs);
            this.updateAppData();
        }
        next();
    },
};
</script>

<style lang="scss" scoped>
    .variant {
        -webkit-font-smoothing: antialiased;
        display: flex;
        height: 100%;
        min-height: 600px;
        background-color: #f9f4e0;
        font-family: Arial;
    }
</style>
