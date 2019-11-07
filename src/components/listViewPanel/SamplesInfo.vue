<template>
    <div class="samples-wrapper">
        <div class="samples-list">
            <div class="samples" v-for="(name, index) in names" :key="index">
                <div>
                    <div
                            :class="getAffectedIcon(name)"
                            style="display: inline-block">

                    </div>
                    <div style="display: inline-block">{{ getSampleName(name) }}</div>
                    <div class="genotype">
                        {{ getValueByName(name, genome.genotype) }}
                    </div>
                    <div>{{ getValueByName(name, genome.genotype_q) }}</div>
                </div>
            </div>
        </div>
        <div>{{ getFilters }}</div>

        <div class="to-details-button"><b-link @click="toggleToDetails">More details</b-link></div>
    </div>
</template>

<script>
import { ANNOTATION_SERVICE } from '../../common/constants';
import router from '../../router';

export default {
    name: 'SamplesInfo',
    props: {
        genome: {
            type: Object,
            required: true,
        },
        id: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            pass: 'PASS',
            failed: 'FAILED: ',
            names: this.genome.titles.slice(2),
        };
    },
    computed: {
        getSampleName() {
            return name => this.getSample(name).name;
        },
        getValueByName() {
            return (name, values) => {
                const valueIndex = this.genome.titles.indexOf(name);
                if (values && valueIndex !== -1) {
                    return values[valueIndex];
                }
                return '';
            };
        },
        getFilters() {
            const filtersString = this.genome.filters.toString();
            if (filtersString.toLowerCase() !== this.pass.toLowerCase()) {
                return this.failed + filtersString;
            }
            return this.pass;
        },
        getAffectedIcon() {
            return (name) => {
                const { affected } = this.getSample(name);
                const { sex } = this.getSample(name);
                if (affected) {
                    return sex === 1 ? 'fill-rect' : 'outline-rect';
                }
                return sex === 1 ? 'fill-circle' : 'outline-circle';
            };
        },
    },
    methods: {
        getSample(name) {
            let result = {};
            const meta = this.$store.getters.getMeta;
            if (meta && meta.samples) {
                Object.keys(meta.samples).forEach((sample) => {
                    if (name.includes(sample)) {
                        result = meta.samples[sample];
                    }
                });
            }
            return result;
        },
        toggleToDetails() {
            const ws = this.$store.getters.getWorkspace;
            const variant = this.id;
            if (ws === ANNOTATION_SERVICE) {
                const { annotations } = this.$store.state.annotations;
                const data = annotations.annotationsSearchResult[this.id].result[0];
                this.$store.commit('setSelectedVariant', this.id);
                this.$store.dispatch('setVariantsDetails', data);
            } else {
                this.$store.dispatch('getVariantDetails', this.id);
            }
            router.push({ path: '/', query: { ws, variant } });
        },
    },
};
</script>

<style lang="scss" scoped>
    .samples-list {
        margin-bottom: 20px;
    }
    .samples {
        display: inline-block;
        margin: 5px;
    }
    .outline-rect {
        height: 10px;
        width: 10px;
        border: 2px solid #000;
        margin-right: 5px;
    }
    .fill-rect {
        height: 10px;
        width: 10px;
        background-color: #000;
        margin-right: 5px;
    }
    .outline-circle {
        height: 10px;
        width: 10px;
        border-radius: 50%;
        border: 2px solid #000;
        margin-right: 5px;
    }
    .fill-circle {
        height: 10px;
        width: 10px;
        border-radius: 50%;
        background-color: #000;
        margin-right: 5px;
    }
    .to-details-button {
        position: relative;
        text-align: right;
        margin-top: 15px;
        font-size: 14px;
    }
    .genotype {
        font-size: 10px;
    }
</style>
