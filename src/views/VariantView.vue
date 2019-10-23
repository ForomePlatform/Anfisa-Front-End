<template>
    <div class="variant">
        <VariantsPanel />
        <VariantDetailsPanel />
    </div>
</template>

<script>
import VariantsPanel from '@/components/variantsListPanel/VariantsPanel.vue';
import VariantDetailsPanel from '@/components/variantDetailsPanel/VariantDetailsPanel.vue';

export default {
    name: 'VariantView',
    components: {
        VariantsPanel,
        VariantDetailsPanel,
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
