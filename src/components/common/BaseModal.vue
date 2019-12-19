<template>
        <b-modal
          :id="id ? id : ''"
          ref="customPopup"
          class="custom-popup"
          centered
          :title="title"
          @ok="onSubmit"
          :ok-disabled="okDisabled"
          :cancel-title="cancelTitle || 'CANCEL'"
          :ok-title="okTitle || 'OK'"
          @hide="hideHandler"
          :no-close-on-backdrop="noBgClose || false"
          @keyup.enter.native="enterKeyHandler"
          :ok-only="okOnly || false"
        >
            <slot />
        </b-modal>
</template>

<script>
export default {
    props: ['id', 'title', 'onSubmit', 'okDisabled', 'onHide', 'cancelTitle', 'ok-title', 'noBgClose', 'enterKeyFunc', 'okOnly'],
    methods: {
        openModal() {
            this.$refs.customPopup.show();
        },
        closeModal() {
            this.$refs.customPopup.hide();
        },
        enterKeyHandler() {
            if (this.enterKeyFunc) {
                this.enterKeyFunc();
                this.closeModal();
            }
        },
        hideHandler(e) {
            if (this.onHide && e.trigger !== 'ok') {
                this.onHide(e);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    /deep/ .modal-content {
        border-radius: 12px 12px 10px 10px;
        border: none;
        .modal-header {
            height: 54px;
            background-color: #0a1c34;
            border-radius: 10px 10px 0 0;
            border-bottom: 0;
            button {
                color: #fff;
                text-shadow: none;
                opacity: 1;
                outline: none;
            }
            .modal-title {
                font-size: 14px;
                letter-spacing: 0px;
                color: #ffffff;
                font-weight: 800;
            }
        }
        .modal-body {
            padding: 0;
            margin-bottom: 0;
            select {
                outline: none;
                border: none;
                margin-bottom: 0 !important;
                padding: 0;
                border-radius: 0;
                &:focus {
                    box-shadow: none;
                }
                option {
                    font-size: 16px;
                    letter-spacing: 0px;
                    color: #1a3e6c;
                    padding: 10px 20px;
                    cursor: pointer;
                    &:hover {
                        background-color: #e7e7e7;
                    }
                }
            }
        }
        .modal-footer {
            button {
                padding: 5px 18px;
                height: 25px;
                border-radius: 12px;
                background-color: #e7e7e7;
                font-size: 11px;
                letter-spacing: 0px;
                color: #0a1c34;
                font-weight: 800;
                text-align: center;
                border: none;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .btn-secondary {
                &:hover {
                    background-color: #ededed;
                }
            }
            .btn-primary {
                color: #fff;
                background-color: #2bb3ed;
                &:hover {
                    background-color: #48c3f7;
                }
            }
        }
    }
</style>
