<template>
    <div class="gnomad-wrapper">
        <div v-if="genome.af">
            <span class="subtitle">Overall AF:</span>
            {{ getFixedValue(genome.af, 5) }}
        </div>
        <div v-if="genome.af_popmax">
            <span class="subtitle">Overall AF PopMax:</span>
            {{ getFixedValue(genome.af_popmax, 5) }}
        </div>
        <div v-if="genome.af_g">
            <span class="subtitle">Genome AF:</span>
            {{ getFixedValue(genome.af_g, 5) }}
        </div>
        <div v-if="genome.af_g_popmax">
            <span class="subtitle">Genome AF PopMax:</span>
            {{ getFixedValue(genome.af_g_popmax, 5) }}
        </div>
        <div v-if="genome.af_e">
            <span class="subtitle">Exome AF:</span>
            {{ getFixedValue(genome.af_e, 5) }}

        </div>
        <div v-if="genome.hom">
            <span class="subtitle">Hom:</span>
            {{ getFixedValue(genome.hom, 5) }}
        </div>
        <div v-if="genome.hem">
            <span class="subtitle">Hem:</span>
            {{ getFixedValue(genome.hem, 5) }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'GnomADInfo',
    props: {
        genome: {
            type: Object,
            required: true,
        },
    },
    computed: {
        getFixedValue() {
            return (value, fractionDigits) => parseFloat(value).toFixed(fractionDigits);
        },
    },
};
</script>

<style lang="scss" scoped>
    .subtitle {
        font-size: 12px;
        font-weight: 600;
        margin: 0 5px 0 5px;
    }
</style>
