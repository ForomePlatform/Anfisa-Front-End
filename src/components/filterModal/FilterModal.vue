<template>
    <div>
        <b-modal
                ref="filterModal"
                hide-header
                hide-footer
                centered
                class="filter-modal"
                lazy
        >
            <FilterModalHeader
                    @close="closeModal"
                    :title="title"
            >
            <span slot="subheader" v-if="!loadView" class="modal-header_title_descr">
                {{ getSubtitle }}
            </span>
                <div slot="extra-buttons">
                    <b-button variant="none" :pressed.sync="advancedView">
                        &lt;/&gt;
                    </b-button>
                </div>
            </FilterModalHeader>
            <FilterModalSecondHeader
                    v-if="!advancedView"
                    :loadView="loadView"
                    :onLoadClick="loadViewToggle"
                    :enableClearAll="enableClearAll"
                    :enableSave="enableSave"
                    :onCancel="loadViewToggle"
                    @clearAll="clearAllHandler"
                    @close="closeModal"
            />
            <div v-if="advancedView" class="filter-modal_advanced-view">
                <FilterModalAdvancedView />
            </div>
            <div v-else-if="loadView" class="filter-modal_load-view">
                <LoadView
                        :onLoad="onFilterLoad"
                        :onRemove="removeFilter"
                />
            </div>
            <div v-else class="filter-modal_content"
                 ref="filterModalContent"
                 :style="{'height' : `${modalContentHeight}px`}">
                <StatsList
                        :modalId="CUSTOM_INHERITENCE_ID"
                />
                <ConditionsView />
            </div>
        </b-modal>
        <BaseEditorInheritenceModal
                :id="CUSTOM_INHERITENCE_ID"
                title="CUSTOM INHERITENCE DIALOG"
                okTitle="APPLY"
                cancelTitle="CLEAR"
                :isFooterHide="true"
                :onSubmit="openLoadView"
                size="xl"
        />
        <BaseWarningModal
                :id="LOAD_MODAL_ID"
                okTitle="LOAD ANYWAY"
                :onSubmit="openLoadView"
                :preset="selectedPreset || 'New Filter'"
        />
        <BaseWarningModal
                :id="CLEAR_MODAL_ID"
                okTitle="Continue to CLEAR ALL"
                :onSubmit="clearAllSubmit"
                :preset="selectedPreset"
        />
        <BaseModal
                ref="importStatWarning"
                :title="IMPORT_STAT_MODAL.title"
                :onSubmit="importStat"
                :okTitle="IMPORT_STAT_MODAL.ok"
        >
            <p class="mt-3 ml-3">{{ IMPORT_STAT_MODAL.text }}</p>
        </BaseModal>
    </div>
</template>

<script>
import EventBus from '@/eventBus';
import { IMPORT_STAT_MODAL } from '@/common/constants';
import BaseModal from '@/components/common/BaseModal.vue';
import FilterModalHeader from './FilterModalHeader.vue';
import FilterModalSecondHeader from './FilterModalSecondHeader.vue';
import StatsList from './statsList/StatsList.vue';
import ConditionsView from './conditionsView/ConditionsView.vue';
import LoadView from './loadView/LoadView.vue';
import FilterModalAdvancedView from './FilterModalAdvancedView.vue';
import BaseWarningModal from './BaseWarningModal.vue';
import BaseEditorInheritenceModal from './statsList/BaseEditorInheritenceModal.vue';

export default {
    name: 'FilterModal',
    components: {
        BaseEditorInheritenceModal,
        FilterModalHeader,
        FilterModalSecondHeader,
        StatsList,
        ConditionsView,
        LoadView,
        FilterModalAdvancedView,
        BaseWarningModal,
        BaseModal,
    },
    data() {
        return {
            title: 'FILTER VARIANTS',
            loadView: false,
            advancedView: false,
            CLEAR_MODAL_ID: 'filterModalClearWarning',
            LOAD_MODAL_ID: 'filterModalLoadWarning',
            CUSTOM_INHERITENCE_ID: 'customInheritenceId',
            modalContentHeight: 620,
            importedStat: null,
            IMPORT_STAT_MODAL,
        };
    },
    computed: {
        enableClearAll() {
            return !this.loadView && !this.advancedView
                    && !(!this.selectedPreset && this.selectedPresetSaved);
        },
        enableSave() {
            return !this.loadView && !this.advancedView && !this.selectedPresetSaved
                    && this.$store.state.currentConditions.length;
        },
        selectedPreset() {
            return this.$store.getters.getSelectedPreset;
        },
        selectedPresetSaved() {
            return this.$store.getters.getSelectedPresetSaved;
        },
        getSubtitle() {
            const { selectedPreset, selectedPresetSaved } = this.$store.state;
            return ` (${selectedPreset || 'New Filter'}${selectedPresetSaved ? '' : ' - Unsaved'})`;
        },
    },
    methods: {
        openModal() {
            this.$refs.filterModal.show();
            setTimeout(() => {
                this.modalContentHeight = this.$refs.filterModalContent.offsetWidth / 2.3;
            }, 1);
        },
        closeModal() {
            this.$refs.filterModal.hide();
        },
        loadViewToggle() {
            if (this.loadView) {
                this.loadView = false;
            } else if (this.selectedPresetSaved) {
                this.loadView = true;
            } else {
                this.$root.$emit('bv::show::modal', this.LOAD_MODAL_ID);
            }
        },
        onFilterLoad(preset, conditions) {
            this.$store.commit('setPreset', preset);
            this.$store.commit('setAllCurrentConditions', conditions);
            this.$store.dispatch('getListByFilter');
            this.loadView = false;
        },
        removeFilter(filterName) {
            this.$store.dispatch('removeFilter', filterName);
        },
        openLoadView() {
            this.loadView = true;
            this.$store.dispatch('getList');
        },
        clearAllHandler() {
            if (this.enableClearAll) {
                if (this.selectedPreset && !this.selectedPresetSaved) {
                    this.$root.$emit('bv::show::modal', this.CLEAR_MODAL_ID);
                } else {
                    this.$store.dispatch('getList');
                    this.$store.dispatch('getFilters');
                }
            }
        },
        clearAllSubmit() {
            this.$store.dispatch('getList');
        },
        importStat() {
            this.$store.commit('setCurrentConditions', ['import', this.importedStat]);
            this.$store.dispatch('getListByConditions').then(() => {
                this.$store.commit('setCurrentConditions', ['enum', this.importedStat, null, ['Proband']]);
                this.$store.dispatch('getListByConditions');
            });
        },
    },
    mounted() {
        EventBus.$on('IMPORT_STAT', (statName) => {
            this.importedStat = statName;
            this.$refs.importStatWarning.openModal();
        });
    },
};
</script>

<style lang="scss" scoped>
    .filter-modal {
        &_content {
            display: flex;
            overflow: hidden;
            min-height: 620px;
        }
        &_load-view {
            height: 620px;
            overflow: auto;
        }
        &_advanced-view {
            height: 682px;
            overflow: auto;
        }
        /deep/ .modal-dialog {
            min-width: 1224px !important;
            max-width: 85%;
        }
        /deep/ .modal-body {
            padding: 0;
        }
        /deep/ .modal-content {
            border: 0;
            border-radius: 8px;
        }
    }
</style>
