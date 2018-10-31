<template>
  <div class="home">
    <SettingsPanel />
    <VariantsPanel />
    <VariantDetails />
  </div>
</template>

<script>
import SettingsPanel from '@/components/SettingsPanel';
import VariantsPanel from '@/components/VariantsPanel';
import VariantDetails from '@/components/VariantDetails';

export default {
  name: 'home',
  components: {
    SettingsPanel,
    VariantsPanel,
    VariantDetails,
  },
  methods: {
    
  },
  created: function() {
    this.$store.dispatch('getList');
    this.$store.dispatch('getFilters');
    this.$store.dispatch('getTags');
  }
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
