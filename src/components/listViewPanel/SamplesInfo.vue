<template>
    <div class="samples-wrapper">
        <div class="samples-list">
            <div class="samples" v-for="sample in Object.values(getSamples)" :key="sample.id">
                <div>
                    <div :class="getAffectedIcon(sample.affected, sample.sex)" style="display: inline-block"></div>
                    <div style="display: inline-block">{{ sample.name }}</div>
                    <div>{{ getValueByName(sample.name, genome.titles, genome.genotype) }}</div>
                    <div>{{ getValueByName(sample.name, genome.titles, genome.genotype_q) }}</div>
                </div>
            </div>
        </div>
        <div>{{ getFilters }}</div>

        <div class="to-details-button"><b-link @click="toggleToDetails">More details</b-link></div>
    </div>
</template>

<script>
    import {ANNOTATION_SERVICE} from '../../common/constants';
    import router from '../../router';

    export default {
        name: "SamplesInfo",
        props: {
            genome: {
                type: Object,
                required: true
            },
            id: {
                type: Number,
                required: true
            }
        },
        data() {
            return {
                pass: 'PASS',
                failed: 'FAILED: '
            }
        },
        computed: {
            getSamples() {
                const meta = this.$store.getters.getMeta;
                if (meta && meta.samples) {
                    return meta.samples;
                }
                return '';
            },
            getValueByName() {
                return (currentName, names, values) => {
                    for (let i = 2; i < names.length; i++) {
                        if (values && names[i].toLowerCase().includes(currentName.toLowerCase())) {
                            return values[i];
                        }
                    }
                    return '';
                }
            },
            getFilters() {
                const filtersString = this.genome.filters.toString();
                if (filtersString.toLowerCase() !== this.pass.toLowerCase()) {
                    return this.failed + filtersString
                } else {
                    return this.pass;
                }
            }
        },
        methods: {
            getAffectedIcon(affected, sex) {
                if (affected) {
                    return sex === 1 ? 'fill-rect' : 'outline-rect';
                } else {
                    return sex === 1 ? 'fill-circle' : 'outline-circle';
                }
            },
            toggleToDetails() {
                const ws = this.$store.getters.getWorkspace;
                if (ws === ANNOTATION_SERVICE) {
                    const data = this.$store.state.annotations.annotationsSearchResult[this.id].result[0];
                    this.$store.commit('setSelectedVariant', this.id);
                    this.$store.dispatch('setVariantsDetails', data);
                } else {
                    this.$store.dispatch('getVariantDetails', this.id);
                }
                router.push({ path: '/', query: { ws } });
            }
        }
    }
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
</style>