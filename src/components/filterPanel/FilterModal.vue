<template>
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
          :onLoadClick="loadViewToggle"
          :enableClearAll="enableClearAll"
          :enableSave="enableSave"
          :onShowClick="closeModal"
          :loadView="loadView"
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
</template>

<script>
import ModalHeader from './ModalHeader.vue';
import ModalSecondHeader from './ModalSecondHeader.vue';
import FiltersList from './FiltersList.vue';
import FilterDetails from './FilterDetails.vue';
import LoadView from './loadView/LoadView.vue';
import AdvancedView from './AdvancedView.vue';

export default {
    data() {
        return {
            loadView: false,
            advancedView: false,
        };
    },
    computed: {
        enableClearAll() {
            return !this.loadView && !this.advancedView
              && this.$store.state.currentConditions.length;
        },
        enableSave() {
            return this.enableClearAll;
        },
    },
    components: {
        ModalHeader,
        ModalSecondHeader,
        FiltersList,
        FilterDetails,
        LoadView,
        AdvancedView,
    },
    methods: {
        openModal() {
            this.$refs.filterModal.show();
        },
        closeModal() {
            this.$refs.filterModal.hide();
        },
        loadViewToggle() {
            this.loadView = !this.loadView;
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
    },
};
</script>

<style lang="scss" scoped>

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
    }
</style>
