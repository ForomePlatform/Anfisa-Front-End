<template>
    <div class="variant-details">
        <FixedPanel v-if="isSelected" :data="annotation" />
        <FixedButton v-if="isSelected" :onClick="collapseAllCustomTables" class="fixed-button_collapse-tables">
            <img src="../assets/collapse.png">
        </FixedButton>

        <FixedButton v-if="isSelected && !isAnnotationService" :onClick="openNote" :class="['fixed-button_form', showNotes ? 'fixed-button_form__active' : '']">
            <img src="../assets/formIcon.svg">
        </FixedButton>

        <NotesPanel v-if="showNotes && !isAnnotationService" />

        <div class="variant-details_tables">
            <CustomTable v-if="variantDetails !== {} && isAnnotationService" :title="getAnnotationsResultTitle" id="result-title" :data="[]" />
            <CustomTable v-if="variantDetails.view_gen.data.length > 0" :title="variantDetails.view_gen.title" id="view_gen" :data="variantDetails.view_gen.data"/>

            <b-row no-gutters>
                <b-col cols="8">
                    <CustomTable v-if="variantDetails.view_qsamples.data.length > 0" :title="variantDetails.view_qsamples.title" id="view_qsamples" :data="variantDetails.view_qsamples.data"/>
                    <CustomTable v-if="variantDetails.view_genetics.data.length > 0" :title="variantDetails.view_genetics.title" id="view_genetics" :data="variantDetails.view_genetics.data"/>
                </b-col>

                <b-col cols="4">
                    <CustomTable v-if="variantDetails.view_gnomAD.data.length > 0" :title="variantDetails.view_gnomAD.title" id="view_gnomAD" :data="variantDetails.view_gnomAD.data"/>
                    <CustomTable v-if="variantDetails.view_db.data.length > 0" :title="variantDetails.view_db.title" id="view_db" :data="variantDetails.view_db.data"/>
                </b-col>

            </b-row>
            <b-row no-gutters>
                <b-col cols="6">
                    <CustomTable v-if="variantDetails.colocated_v.data.length > 0" :title="variantDetails.colocated_v.title" id="colocated_v" :data="variantDetails.colocated_v.data" secondary/>
                    <CustomTable v-if="variantDetails.view_pred.data.length > 0" :title="variantDetails.view_pred.title" id="view_pred" :data="variantDetails.view_pred.data" secondary/>
                </b-col>

                <b-col cols="6">
                    <CustomTable v-if="variantDetails._main.data.length > 0" :title="variantDetails._main.title" id="table_main" :data="variantDetails._main.data" secondary/>
                </b-col>

            </b-row>

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
        getAnnotationsResultTitle() {
            return this.$store.state.annotations.title;
        },
    },
    methods: {
        collapseAllCustomTables() {
            const elements = document.getElementsByClassName('custom-table_header');
            Array.from(elements).forEach((element) => {
                element.click();
            });
        },
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
        &_collapse-tables {
            top: 160px;
            right: 0;
            background-color: #cfebfd;
        }
        &_form {
            top: 220px;
            right: 0;
            background-color: #c2ebdd;
            &__active {
                background-color: #deefde;
                opacity: 1;
                right: 299px;
            }
        }
    }
</style>
