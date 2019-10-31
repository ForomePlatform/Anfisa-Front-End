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
                <SamplesInfo :genome="getGenome" :id="item.id"></SamplesInfo>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import BaseTagButton from '../variantDetailsPanel/BaseTagButton.vue';
import BaseInfo from './BaseInfo.vue';
import PredicationInfo from './PredicationInfo.vue';
import GnomADInfo from './GnomADInfo.vue';
import SamplesInfo from './SamplesInfo.vue';

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
    created() {
        this.loadItemsDetails(this.item.id);
    },
    computed: {
        getGenome() {
            const details = this.$store.getters.getDetailsById(this.item.id);
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
                    genotype: this.getDetailsArray(this.viewQsamples, 'Genotype'),
                    genotype_q: this.getDetailsArray(this.viewQsamples, 'Genotype Quality'),
                    filters: this.getDetailsValue(this.viewQsamples, 'FILTERs'),
                };
            }
            return null;
        },
        getDetailsArray() {
            return (view, name) => {
                let result = null;
                const itemData = this.$store.getters.getDetailsById(this.item.id);
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
        loadItemsDetails(id) {
            this.$store.dispatch('getListViewDetails', id);
            this.$store.dispatch('getVariantTags', id);
        },
    },
};
</script>

<style lang="scss" scoped>

</style>
