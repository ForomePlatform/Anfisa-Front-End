<template>
    <b-modal ref="confirmDialog"
             centered>
        <div slot="modal-title">CONFIRM REMOVING</div>
        <span class="textRemove">{{ text }}</span>
        <div slot="modal-footer" class="w-100">
            <b-button size="sm"
                      class="footer-button float-right"
                      variant="primary"
                      @click="confirmFunction">
                Confirm
            </b-button>
            <b-button size="sm"
                      class="footer-button float-right btn-secondary"
                      @click="hide">
                Cancel
            </b-button>
        </div>
    </b-modal>
</template>

<script>
export default {
    name: 'ConfirmDialog',
    props: {
        text: {
            type: String,
            default: '',
        },
        confirmFunction: {
            type: Function,
            default: null,
        },
    },
    methods: {
        show() {
            this.$refs.confirmDialog.show();
        },
        hide() {
            this.$refs.confirmDialog.hide();
        },
    },
};
</script>

<style lang="scss" scoped>
    @import '../annotationService.scss';
    .btn-secondary {
        color: black;
        &:hover {
            background-color: #ededed;
        }
    }
</style>
