<template>
    <b-container v-if="getGenome" fluid>
        <b-row>
            <b-col cols="5">
                <BaseInfo :genome="getGenome" :id="item.id"></BaseInfo>
            </b-col>
            <b-col cols="2" class="d-flex flex-column">
                <PredicationInfo :genome="getGenome"></PredicationInfo>
            </b-col>
            <b-col cols="2" class="d-flex flex-column">
                <GnomADInfo :genome="getGenome"></GnomADInfo>
            </b-col>
            <b-col cols="3" class="d-flex flex-column">
                <SamplesInfo :genome="getGenome"></SamplesInfo>
            </b-col>
        </b-row>
        <div class="item-footer">
            <div class="note">
                <span v-if="getNote">Note:</span>
                {{ getNote }}
            </div>
            <div class="to-details-button">
                <b-link @click="toggleToDetails">More details</b-link>
            </div>
        </div>
    </b-container>
</template>

<script>
import BaseTagButton from '../variantDetailsPanel/BaseTagButton.vue';
import BaseInfo from './BaseInfo.vue';
import PredicationInfo from './PredicationInfo.vue';
import GnomADInfo from './GnomADInfo.vue';
import SamplesInfo from './SamplesInfo.vue';
import { ANNOTATION_SERVICE } from '../../common/constants';
import router from '../../router';

export default {
    name: 'ViewListItem',
    components: {
        SamplesInfo,
        GnomADInfo,
        PredicationInfo,
        BaseInfo,
        BaseTagButton,
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
            vcf: 'VCF',
            title: 'Title',
        };
    },
    computed: {
        getNote() {
            const genNotes = this.$store.getters.getNotesById(this.item.id);
            if (genNotes && genNotes[0]) {
                return genNotes[0].note;
            }
            return '';
        },
        getGenome() {
            const details = this.$store.getters.getListViewDetailsById(this.item.id);
            if (details && details.length > 0) {
                return {
                    gene: this.getDetailsValue(this.viewGen, 'Gene(s)'),
                    hg19: this.getDetailsValue(this.viewGen, 'hg19'),
                    igv: this.getDetailsValue(this.viewGen, 'IGV'),
                    canonicalAnnotation: this.getDetailsValue(this.viewGen, 'Canonical Annotation'),
                    canonicalPpos: this.getDetailsValue(this.viewGen, 'pPos (Canonical)'),
                    hgmd: this.getDetailsValue(this.viewDB, 'HGMD'),
                    gtex: this.getDetailsValue(this.viewDB, 'View on GTEx'),
                    polyphen: this.getDetailsValue(this.viewPred, 'Polyphen'),
                    sift: this.getDetailsValue(this.viewPred, 'SIFT from dbNSFP'),
                    mutation: this.getDetailsValue(this.viewPred, 'Mutation Taster'),
                    fathmm: this.getDetailsValue(this.viewPred, 'FATHMM'),
                    af: this.getDetailsValue(this.viewGnomAD, 'Overall AF'),
                    af_popmax: this.getDetailsValue(this.viewGnomAD, 'Overall AF PopMax'),
                    af_g: this.getDetailsValue(this.viewGnomAD, 'Genome AF'),
                    af_g_popmax: this.getDetailsValue(this.viewGnomAD, 'Genome AF PopMax'),
                    af_e: this.getDetailsValue(this.viewGnomAD, 'Exome AF'),
                    hom: this.getDetailsValue(this.viewGnomAD, 'hom'),
                    hem: this.getDetailsValue(this.viewGnomAD, 'hem'),
                    titles: this.getDetailsArray(this.viewQsamples, 'Title'),
                    genotype: this.getDetailsArray(this.viewQsamples, 'genotype'),
                    genotype_q: this.getDetailsArray(this.viewQsamples, 'Genotype Quality'),
                    filters: this.getDetailsValue(this.viewQsamples, 'FILTERs'),
                };
            }
            return null;
        },
        getDetailsArray() {
            return (view, name) => {
                let result = null;
                const itemData = this.$store.getters.getListViewDetailsById(this.item.id);
                const { details } = itemData[0];
                const viewData = details[view].data;
                viewData.forEach((data) => {
                    const dataName = data[0];
                    if (dataName && dataName.data === name) {
                        result = data;
                    }
                });
                return result;
            };
        },
        getDetailsValue() {
            return (view, name) => {
                const data = this.getDetailsArray(view, name);
                if (data) {
                    return data[1];
                }
                return '';
            };
        },
    },
    methods: {
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
    .item-footer {
        width: 100%;
        margin-top: 15px;
        font-size: 14px;
        .note {
            width: 80%;
            display: inline-block;
            span {
                font-weight: 600;
            }
        }
        .to-details-button {
            width: 20%;
            display: inline-block;
            position: relative;
            text-align: right;
        }
    }
</style>
