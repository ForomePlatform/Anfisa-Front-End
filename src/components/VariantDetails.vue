<template>
    <div class="variant-details">
        <FixedPanel v-if="isSelected" :data="annotation" />
        <FixedButton
          v-if="isSelected"
          :onClick="openNote"
          :class="['fixed-button_form', showNotes ? 'fixed-button_form__active' : '']"
        >
            <img v-if="showNotes" src="../assets/crossIcon.svg"/>
            <img v-else src="../assets/bookIcon.svg"/>
        </FixedButton>
        <NotesPanel v-if="showNotes" />
        <div class="variant-details_tables">
            <CustomTable
            v-if="variantDetails.view_gen"
            :title="variantDetails.view_gen.title"
            id="view_gen"
            :data="variantDetails.view_gen.data"
            />
            <b-row no-gutters>
                <b-col cols="8">
                    <CustomTable
                    v-if="variantDetails.view_qsamples"
                    :title="variantDetails.view_qsamples.title"
                    id="view_qsamples"
                    :data="variantDetails.view_qsamples.data"
                    />
                    <CustomTable
                    v-if="variantDetails.view_genetics"
                    :title="variantDetails.view_genetics.title"
                    id="view_genetics"
                    :data="variantDetails.view_genetics.data"
                    />
                </b-col>
                <b-col cols="4">
                    <CustomTable
                    v-if="variantDetails.view_gnomAD"
                    :title="variantDetails.view_gnomAD.title"
                    id="view_gnomAD"
                    :data="variantDetails.view_gnomAD.data"
                    />
                    <CustomTable
                    v-if="variantDetails.view_db"
                    :title="variantDetails.view_db.title"
                    id="view_db"
                    :data="variantDetails.view_db.data"
                    />
                </b-col>
            </b-row>
            <b-row no-gutters>
                <b-col cols="6">
                    <CustomTable
                    v-if="variantDetails.colocated_v"
                    :title="variantDetails.colocated_v.title"
                    id="colocated_v"
                    :data="variantDetails.colocated_v.data"
                    secondary
                    />
                    <CustomTable
                        v-if="variantDetails.view_pred"
                        :title="variantDetails.view_pred.title"
                        id="view_pred"
                        :data="variantDetails.view_pred.data"
                        secondary
                    />
                </b-col>
                <b-col cols="6">
                    <CustomTable
                    v-if="variantDetails._main"
                    :title="variantDetails._main.title"
                    id="table_main"
                    :data="variantDetails._main.data"
                    secondary
                    />
                </b-col>
            </b-row>
            <CustomTable
            v-if="variantDetails.transcripts"
            :title="variantDetails.transcripts.title"
            id="transcripts"
            :data="variantDetails.transcripts.data"
            secondary
            />
            <CustomTable
            v-if="variantDetails.VCF"
            :title="variantDetails.VCF.title"
            id="vcf"
            :content="variantDetails.VCF.content"
            secondary
            />

            <CustomTable v-if="variantDetails.transcripts.data.length > 0" :title="variantDetails.transcripts.title" id="transcripts" :data="variantDetails.transcripts.data" secondary />
        </div>
    </div>
</template>

<script>
import CustomTable from './CustomTable.vue';
import FixedPanel from './FixedPanel.vue';
import FixedButton from './FixedButton.vue';
import NotesPanel from './NotesPanel.vue';

export default {
    data() {
        return {
            showNotes: false,
            expandTables: true
        };
    },
    components: {
        CustomTable,
        FixedPanel,
        FixedButton,
        NotesPanel,
    },
    computed: {
        isAnnotationService() {
            return this.$store.state.workspace === "ANNOTATION SERVICE";
        },
        variantDetails() {
            return this.$store.state.variantDetails;
        },
        annotation() {
            return this.$store.getters.annotation;
        },
        isSelected() {
            return this.$store.state.selectedVariant !== null;
        },
    },
    methods: {
        openNote() {
            this.showNotes = !this.showNotes;
        },
    },
};
</script>

<style lang="scss" scoped>
    .variant-details {
        flex: 1 1 auto;
        overflow: hidden;
        overflow-y: scroll;
        background-color: #f9f4e0;
        &_tables {
            margin-top: 100px;
        }
    }
    .fixed-button {
        &_form {
            top: 180px;
            right: 0;
            background-image: url('./../assets/fixedBtnBg.svg');
            background-position: center -14px;
            &__active {
                opacity: 1;
                right: 299px;
            }
        }
    }
</style>
