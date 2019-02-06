<template>
  <div class="home">
    <SettingsPanel />
    <VariantsPanel />
    <VariantDetails />
  </div>
</template>

<script>
import SettingsPanel from '@/components/SettingsPanel.vue';
import VariantsPanel from '@/components/VariantsPanel.vue';
import VariantDetails from '@/components/VariantDetails.vue';

export default {
    name: 'home',
    components: {
        SettingsPanel,
        VariantsPanel,
        VariantDetails,
    },
    created() {
        this.$store.dispatch('getList');
        this.$store.dispatch('getZoneList');
        this.$store.dispatch('getPresets');
    },
};
</script>

<style lang="scss">
  .home {
    -webkit-font-smoothing: antialiased;
    display: flex;
    height: 100%;
    min-height: 600px;
    background-color: #f9f4e0;
  }
</style>
