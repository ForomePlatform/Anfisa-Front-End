<template>
    <div>
    <b-modal
      ref="filterModal"
      hide-header
      hide-footer
      centered
      class="filter-modal"
    >
        <ModalHeader
          :onClose="closeModal"
          :onAdvancedClick="advancedViewToggle"
          :advancedView="advancedView"
        />
        <ModalSecondHeader
          v-if="!advancedView"
          :loadView="loadView"
          :onLoadClick="loadViewToggle"
          :enableClearAll="enableClearAll"
          :clearAll="clearAllHandler"
          :enableSave="enableSave"
          :onShowClick="closeModal"
        />
        <div v-if="advancedView" class="filter-modal_advanced-view">
            <AdvancedView />
        </div>
        <div v-else-if="loadView" class="filter-modal_load-view">
            <LoadView
              :onCancel="loadViewToggle"
              :onLoad="onFilterLoad"
              :onRemove="removeFilter"
            />
        </div>
        <div v-else class="filter-modal_content">
            <FiltersList />
            <FilterDetails />
        </div>
    </b-modal>
    <FilterModalWarning
      :id="LOAD_MODAL_ID"
      okTitle="Continue to LOAD"
      :onSubmit="openLoadView"
      :preset="selectedPreset || 'New Filter'"
    />
    <FilterModalWarning
      :id="CLEAR_MODAL_ID"
      okTitle="Continue to CLEAR ALL"
      :onSubmit="clearAllSubmit"
      :preset="selectedPreset"
    />
    </div>
</template>

<script>
import ModalHeader from './ModalHeader.vue';
import ModalSecondHeader from './ModalSecondHeader.vue';
import FiltersList from './FiltersList.vue';
import FilterDetails from './FilterDetails.vue';
import LoadView from './loadView/LoadView.vue';
import AdvancedView from './AdvancedView.vue';
import FilterModalWarning from './FilterModalWarning.vue';

export default {
    data() {
        return {
            loadView: false,
            advancedView: false,
            CLEAR_MODAL_ID: 'filterModalClearWarning',
            LOAD_MODAL_ID: 'filterModalLoadWarning',
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
        ModalHeader,
        ModalSecondHeader,
        FiltersList,
        FilterDetails,
        LoadView,
        AdvancedView,
        FilterModalWarning,
    },
    methods: {
        openModal() {
            this.$refs.filterModal.show();
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
            height: 620px;
            overflow: hidden;
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
