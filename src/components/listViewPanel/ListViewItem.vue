<template>
    <b-container fluid>
        <b-row>
            <b-col  class="d-flex flex-column">
                <div>{{ getDetailsValue(viewDB, 'HGMD') }}</div>
                <div class="title">
                    {{ getDetailsValue(viewGen, "Gene(s)") }}
                    <img
                            v-if="getNote"
                            class="notes-icon"
                            data-toggle="tooltip"
                            data-placement="top"
                            :title="getNote"
                            alt="Notes"
                            src="@/assets/bookIcon.svg"
                    />
                </div>
                <div v-html="getDetailsValue(viewDB, 'View on GTEx')"></div>
                <BaseTagButton
                        v-for="(item, index) in getTags"
                        :key="index"
                        :title="item"
                />
            </b-col>
            <b-col class="d-flex flex-column">
                <div>{{ getDetailsValue(viewGen, "hg19").split(/\s+/)[0] }}</div>
                <div v-html="getDetailsValue(viewGen, 'hg19').split(/\s+/)[1]"></div>
                <div>{{ getDetailsValue(viewGen, "IGV") }}</div>
            </b-col>
            <b-col class="d-flex flex-column">
                <div style="font-weight: 600;">
                    {{ getDetailsValue(viewGen, "Canonical Annotation") }}
                </div>
                <div>{{ getDetailsValue(viewGen, "pPos (Canonical)") }}</div>
            </b-col>
            <b-col class="d-flex flex-column">
                <div
                        class="d-flex flex-row predication"
                        v-if="getDetailsValue(viewPred, 'Polyphen')"
                >
                    <div :class="getColor(viewPred, 'Polyphen')"></div>
                    <div class="subtitle">Polyphen:</div>
                    {{ getDetailsValue(viewPred, 'Polyphen') }}
                </div>
                <div
                        class="d-flex flex-row predication"
                        v-if="getDetailsValue(viewPred, 'SIFT from dbNSFP')"
                >
                    <div :class="getColor(viewPred, 'SIFT from dbNSFP')"></div>
                    <div class="subtitle">SIFT:</div>
                    {{ getDetailsValue(viewPred, 'SIFT from dbNSFP') }}
                </div>
                <div
                        class="d-flex flex-row predication"
                        v-if="getDetailsValue(viewPred, 'Mutation Taster')"
                >
                    <div :class="getColor(viewPred, 'Mutation Taster')"></div>
                    <div class="subtitle">MUT TASTER:</div>
                    {{ getDetailsValue(viewPred, 'Mutation Taster') }}
                </div>
                <div
                        class="d-flex flex-row predication"
                        v-if="getDetailsValue(viewPred, 'FATHMM')"
                >
                    <div :class="getColor(viewPred, 'FATHMM')"></div>
                    <div class="subtitle">FATHMM:</div>
                    {{ getDetailsValue(viewPred, 'FATHMM') }}
                </div>
            </b-col>
            <b-col cols="3" class="d-flex flex-column">
                <div v-if="getDetailsValue(viewGnomAD, 'Overall AF')">
                    <div><span class="subtitle">gnomAD_Overall_AF:</span>
                        {{ getDetailsWithFixedValue(viewGnomAD, 'Overall AF', 5)}}
                    </div>
                </div>
                <div v-if="getDetailsValue(viewGnomAD, 'Overall AF PopMax')">
                    <div><span class="subtitle">gnomAD_Overall_AF_Popmax:</span>
                        {{ getDetailsWithFixedValue(viewGnomAD, 'Overall AF PopMax', 5) }}
                    </div>
                </div>
                <div v-if="getDetailsValue(viewGnomAD, 'Genome AF')">
                    <div><span class="subtitle">gnomAD_Genomes_AF:</span>
                        {{ getDetailsWithFixedValue(viewGnomAD, 'Genome AF', 5) }}
                    </div>
                </div>
                <div v-if="getDetailsValue(viewGnomAD, 'Genome AF PopMax')">
                    <div><span class="subtitle">gnomAD_Genomes_AF_Popmax:</span>
                        {{ getDetailsWithFixedValue(viewGnomAD, 'Genome AF PopMax', 5) }}
                    </div>
                </div>
                <div v-if="getDetailsValue(viewGnomAD, 'Exome AF')">
                    <div><span class="subtitle">gnomAD_Exomes_AF:</span>
                        {{ getDetailsWithFixedValue(viewGnomAD, 'Exome AF', 5) }}
                    </div>
                </div>
                <div v-if="getDetailsValue(viewGnomAD, 'hom')">
                    <div><span class="subtitle">gnomAD_Overall_Hom:</span>
                        {{ getDetailsWithFixedValue(viewGnomAD, 'hom', 5) }}
                    </div>
                </div>
                <div v-if="getDetailsValue(viewGnomAD, 'hem')">
                    <div><span class="subtitle">gnomAD_Overall_Hem:</span>
                        {{ getDetailsWithFixedValue(viewGnomAD, 'hem', 5) }}
                    </div>
                </div>
            </b-col>
            <b-col cols="3" class="d-flex flex-column">
                <div class="samples" v-for="sample in Object.values(getSamples)" :key="sample.id">
                    <div><span class="subtitle">Sample name:</span> {{ sample.name }}</div>
                    <div><span class="subtitle">Affected status:</span> {{ sample.affected }}</div>
                    <div><span class="subtitle">Sex:</span> {{ sample.sex }}</div>
                </div>
                <div>{{ getDetailsValue(viewQsamples, "Genotype Quality") }}</div>
                <div>{{ getDetailsValue(viewQsamples, "Quality by Depth") }}</div>
                <div>{{ getDetailsValue(viewQsamples, "FILTERs") }}</div>

                <b-link class="to-details-button" @click="toggleToDetails">More details</b-link>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import BaseTagButton from '../variantDetailsPanel/BaseTagButton.vue';
    import { ANNOTATION_SERVICE } from '@/common/constants';
    import router from '../../router';

    export default {
        name: 'ViewListItem',
        components: {
            BaseTagButton
        },
        props: {
            item: {
                type: Object,
                required: true,
            },
        },
        data() {
            return {
                viewGen: 'view_gen',
                viewQsamples: 'view_qsamples',
                viewGnomAD: 'view_gnomAD',
                viewGenetics: 'view_genetics',
                viewDB: 'view_db',
                viewColocatedV: 'colocated_v',
                viewMain: '_main',
                viewPred: 'view_pred',
                transcripts: 'transcripts',
                VCF: 'VCF',
                greenColorValues: ['benign', 'B', 'tolerated', 'T', 'P', 'N', 'L'],
                yellowColorValues: ['possibly_damaging', 'probably_damaging', 'P'],
                redColorValues: ['damaging', 'D', 'deleterious', 'D', 'A', 'M', 'H'],
            };
        },
        created() {
            this.loadItemsDetails(this.item.id);
        },
        computed: {
            getNote() {
                const genNotes = this.$store.getters.getNotesById(this.item.id);
                if (genNotes && genNotes[0]) {
                    return genNotes[0].note;
                }
                return '';
            },
            getTags() {
                const genTags = this.$store.getters.getTagsById(this.item.id);
                if (genTags && genTags[0]) {
                    return genTags[0].tags
                }
            },
            getSamples() {
                const meta = this.$store.getters.getMeta;
                if (meta && meta.samples) {
                    return meta.samples
                }
                return '';
            },
            getDetailsValue() {
                return (view, name) => {
                    let result = '';
                    const itemData = this.$store.getters.getDetailsById(this.item.id);
                    try {
                        const { details } = itemData[0];
                        const viewData = details[view].data;
                        viewData.forEach((data) => {
                            const dataName = data[0];
                            if (dataName && dataName.data === name) {
                                [, result] = data;
                            }
                        });
                    } catch (err) {
                        result = '';
                    }
                    return result;
                };
            },
            getDetailsWithFixedValue() {
                return (view, name, fractionDigits) => {
                    const details = this.getDetailsValue(view, name);
                    return parseFloat(details).toFixed(fractionDigits);
                }
            },
            getColor() {
                return (view, name) => {
                    let result = '';
                    const detailsValue = this.getDetailsValue(view, name).split(',')[0];
                    if (detailsValue) {
                        if (this.greenColorValues.includes(detailsValue)) {
                            result = 'circle-green';
                        } else if (this.yellowColorValues.includes(detailsValue)) {
                            result = 'circle-yellow';
                        } else if (this.redColorValues.includes(detailsValue)) {
                            result = 'circle-red';
                        }
                    }
                    return result;
                };
            }
        },
        methods: {
            loadItemsDetails(id) {
                this.$store.dispatch('getListViewDetails', id);
                this.$store.dispatch('getVariantTags', id);
            },
            toggleToDetails() {
                const { id } = this.item;
                const ws = this.$store.getters.getWorkspace;
                if (ws === ANNOTATION_SERVICE) {
                    const data = this.$store.state.annotations.annotationsSearchResult[id].result[0];
                    this.$store.commit('setSelectedVariant', id);
                    this.$store.dispatch('setVariantsDetails', data);
                } else {
                    this.$store.dispatch('getVariantDetails', id);
                    // this.$store.dispatch('getVariantTags', id);
                }
                router.push({ path: '/', query: { ws } });
            },
        },
    };
</script>

<style lang="scss" scoped>
    .title {
        font-size: 18px;
        letter-spacing: 0;
        font-weight: 800;
        margin-bottom: 5px;
    }
    .notes-icon {
        cursor: pointer;
        height: 20px;
        width: 20px;
        margin-left: 10px;
        transition-timing-function: ease-in-out;
        transition-duration: .2s;
        &:hover {
            transform: scale(1.3);
        }
    }
    .btn {
        font-size: 10px;
    }
    .subtitle {
        font-size: 14px;
        font-weight: 600;
        margin: 0 5px;
    }
    .predication {
        position: relative;
    }
    .circle-red {
        height: 10px;
        width: 10px;
        border-radius: 50%;
        background-color: #e74c3c;
        margin-top: 5px;
    }
    .circle-green {
        height: 10px;
        width: 10px;
        border-radius: 50%;
        background-color: #2ecc71;
        margin-top: 5px;
    }
    .circle-yellow {
        height: 10px;
        width: 10px;
        border-radius: 50%;
        background-color: #f1c40f;
        margin-top: 5px;
    }
    .to-details-button {
        position: relative;
        text-align: right;
        margin-top: 15px;
    }
    .samples {
        margin-bottom: 10px;
    }
</style>
