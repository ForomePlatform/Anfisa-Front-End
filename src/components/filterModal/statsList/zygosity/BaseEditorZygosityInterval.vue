<template>
    <div class="zygosity-wrapper">
        <div class="samplesId mr-2">{{ zygosity.sampleId }}</div>
        <ZygosityCheckboxesRange
                :steps="zygosity.steps"
                :sampleId="zygosity.sampleId"
        />
        <ZygosityCustomRange
                v-show="false"
                :interval="zygosity.interval"
        />
    </div>
</template>

<script>
import ZygosityCheckboxesRange from './ZygosityCheckboxesRange.vue';
import ZygosityCustomRange from './ZygosityCustomRange.vue';

export default {
    name: 'BaseEditorZygosityInterval',
    components: { ZygosityCustomRange, ZygosityCheckboxesRange },
    props: {
        zygosity: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
    .zygosity-wrapper {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>
