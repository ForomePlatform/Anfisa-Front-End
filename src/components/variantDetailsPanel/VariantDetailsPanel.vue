<template>
    <div class="variant-details">
        <TopFixedPanel v-if="isSelected" :data="annotation" />
        <BaseFixedButton
          v-if="isSelected"
          :onClick="openNote"
          :class="['fixed-button_form', showNotes ? 'fixed-button_form__active' : '',
          notesCount ? 'fixed-button_form_nonEmpty' : '']"
          title="Add/edit notes"
        >
            <img v-if="showNotes" src="@/assets/crossIcon.svg"/>
            <img v-else src="@/assets/bookIcon.svg"/>
        </BaseFixedButton>
        <NotesFixedPanel v-if="showNotes" />
        <div class="variant-details_tables">
            <BaseTable
            v-if="isDataFilled(variantDetails.view_gen)"
            :title="variantDetails.view_gen.title"
            id="view_gen"
            :data="variantDetails.view_gen.data"
            />
            <b-row no-gutters>
                <b-col cols="8">
                    <BaseTable
                    v-if="isDataFilled(variantDetails.view_qsamples)"
                    :title="variantDetails.view_qsamples.title"
                    id="view_qsamples"
                    :data="variantDetails.view_qsamples.data"
                    />
                    <BaseTable
                    v-if="isDataFilled(variantDetails.view_genetics)"
                    :title="variantDetails.view_genetics.title"
                    id="view_genetics"
                    :data="variantDetails.view_genetics.data"
                    />
                </b-col>
                <b-col cols="4">
                    <BaseTable
                    v-if="isDataFilled(variantDetails.view_gnomAD)"
                    :title="variantDetails.view_gnomAD.title"
                    id="view_gnomAD"
                    :data="variantDetails.view_gnomAD.data"
                    />
                    <BaseTable
                    v-if="isDataFilled(variantDetails.view_db)"
                    :title="variantDetails.view_db.title"
                    id="view_db"
                    :data="variantDetails.view_db.data"
                    />
                </b-col>
            </b-row>
            <b-row no-gutters>
                <b-col cols="6">
                    <BaseTable
                    v-if="isDataFilled(variantDetails.colocated_v)"
                    :title="variantDetails.colocated_v.title"
                    id="colocated_v"
                    :data="variantDetails.colocated_v.data"
                    secondary
                    />
                    <BaseTable
                        v-if="isDataFilled(variantDetails.view_pred)"
                        :title="variantDetails.view_pred.title"
                        id="view_pred"
                        :data="variantDetails.view_pred.data"
                        secondary
                    />
                </b-col>
                <b-col cols="6">
                    <BaseTable
                    v-if="isDataFilled(variantDetails._main)"
                    :title="variantDetails._main.title"
                    id="table_main"
                    :data="variantDetails._main.data"
                    secondary
                    />
                </b-col>
            </b-row>
            <BaseTable
            v-if="isDataFilled(variantDetails.transcripts)"
            :title="variantDetails.transcripts.title"
            id="transcripts"
            :data="variantDetails.transcripts.data"
            secondary
            />
            <BaseTable
            v-if="variantDetails.VCF"
            :title="variantDetails.VCF.title"
            id="vcf"
            :content="variantDetails.VCF.content"
            secondary
            />
        </div>
        <NewTagModal/>
    </div>
</template>

<script>
import BaseTable from './BaseTable.vue';
import TopFixedPanel from './TopFixedPanel.vue';
import BaseFixedButton from './BaseFixedButton.vue';
import NotesFixedPanel from './NotesFixedPanel.vue';
import NewTagModal from './NewTagModal.vue';

export default {
    data() {
        return {
            showNotes: false,
        };
    },
    components: {
        BaseTable,
        TopFixedPanel,
        BaseFixedButton,
        NotesFixedPanel,
        NewTagModal,
    },
    computed: {
        variantDetails() {
            return this.$store.state.variantDetails;
        },
        annotation() {
            return this.$store.getters.annotation;
        },
        isSelected() {
            return this.$store.state.selectedVariant !== null;
        },
        notesCount() {
            return this.$store.state.note.trim();
        },
    },
    methods: {
        openNote() {
            this.showNotes = !this.showNotes;
        },
        isDataFilled(obj) {
            return obj && obj.data && obj.data.length;
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
            background-image: url('../../assets/fixedBtnBg.svg');
            background-position: center -14px;
            &__active {
                opacity: 1;
                right: 299px;
            }
            &_nonEmpty {
                opacity: 1;
            }
        }
    }
    .notes-count {
        padding-left: 5px;
    }
    .igv_comment {
        font-size:12px;
    }
</style>
