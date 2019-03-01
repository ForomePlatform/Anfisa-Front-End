<template>
    <b-modal
        ref="filterModal"
        hide-header
        hide-footer
        centered
        class="filter-modal"
    >
        <ModalHeader :onClose="closeModal"/>
        <ModalSecondHeader
          :onLoadClick="loadViewToggle"
          :enableClearAll="enableClearAll"
          :enableSave="enableSave"
        />
        <div v-if="loadView" class="filter-modal_load-view">
            <LoadView />
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

export default {
    data() {
        return {
            loadView: false,
        };
    },
    computed: {
        enableClearAll() {
            return !this.loadView && this.$store.state.currentConditions.length;
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
    }
</style>
