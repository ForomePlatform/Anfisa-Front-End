<template>
    <b-modal
        ref="filterModal"
        hide-header
        hide-footer
        centered
        class="filter-modal"
    >
        <ModalHeader :onClose="closeModal"/>
        <ModalSecondHeader />
        <div class="filter-modal_content">
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

export default {
    components: {
        ModalHeader,
        ModalSecondHeader,
        FiltersList,
        FilterDetails,
    },
    methods: {
        openModal() {
            this.$refs.filterModal.show();
        },
        closeModal() {
            this.$refs.filterModal.hide();
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
    }
</style>
