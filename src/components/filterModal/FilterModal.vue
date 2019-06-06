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
          :onClose="closeModal"
          :onAdvancedClick="advancedViewToggle"
          :advancedView="advancedView"
        />
        <FilterModalSecondHeader
          v-if="!advancedView"
          :loadView="loadView"
          :onLoadClick="loadViewToggle"
          :enableClearAll="enableClearAll"
          :clearAll="clearAllHandler"
          :enableSave="enableSave"
          :onShowClick="closeModal"
        />
        <div v-if="advancedView" class="filter-modal_advanced-view">
            <FilterModalAdvancedView />
        </div>
        <div v-else-if="loadView" class="filter-modal_load-view">
            <LoadView
              :onCancel="loadViewToggle"
              :onLoad="onFilterLoad"
              :onRemove="removeFilter"
            />
        </div>
        <div v-else class="filter-modal_content"
             ref="filterModalContent"
             :style="{'height' : `${modalContentHeight}px`}">
            <StatsList />
            <ConditionsView />
        </div>
    </b-modal>
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
    </div>
</template>

<script>
import FilterModalHeader from './FilterModalHeader.vue';
import FilterModalSecondHeader from './FilterModalSecondHeader.vue';
import StatsList from './statsList/StatsList.vue';
import ConditionsView from './conditionsView/ConditionsView.vue';
import LoadView from './loadView/LoadView.vue';
import FilterModalAdvancedView from './FilterModalAdvancedView.vue';
import BaseWarningModal from './BaseWarningModal.vue';

export default {
    data() {
        return {
            loadView: false,
            advancedView: false,
            CLEAR_MODAL_ID: 'filterModalClearWarning',
            LOAD_MODAL_ID: 'filterModalLoadWarning',
            modalContentHeight: 620,
        };
    },
    computed: {
        enableClearAll() {
            return !this.loadView && !this.advancedView
                && !(!this.selectedPreset && this.selectedPresetSaved);
        },
        enableSave() {
            return !this.loadView && !this.advancedView
              && this.$store.state.currentConditions.length;
        },
        selectedPreset() {
            return this.$store.state.selectedPreset;
        },
        selectedPresetSaved() {
            return this.$store.state.selectedPresetSaved;
        },
    },
    components: {
        FilterModalHeader,
        FilterModalSecondHeader,
        StatsList,
        ConditionsView,
        LoadView,
        FilterModalAdvancedView,
        BaseWarningModal,
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
        advancedViewToggle() {
            this.advancedView = !this.advancedView;
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
