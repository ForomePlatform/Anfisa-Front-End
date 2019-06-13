<template>
    <div>
        <b-modal ref="annotationSearchModal"
                 centered
                 scrollable
                 size="lg"
                 title="GET ANNOTATIONS">
            <div>
                <b-card no-body
                        class="main-modal">
                    <b-tabs card
                            ref="myTabs">
                        <b-tab title="Type in"
                               class="tab">
                            <TypeInTab ref="typeInTab"
                                       :showInputs="showSubmit"
                                       :showRemoveAllRowsDialog="showRemoveAllRowsDialog"
                                       :showRemoveRowDialog="showRemoveRowDialog">
                            </TypeInTab>
                        </b-tab>
                        <b-tab title="Upload VCF" class="tab">
                            <UploadVcfTab ref="uploadVcfTab" :showInputs="showSubmit"/>
                        </b-tab>
                        <b-tab title="Paste VCF" class="tab">
                            <PasteVcfTab ref="pasteVcfTab" :showInputs="showSubmit"/>
                        </b-tab>
                    </b-tabs>
                </b-card>
            </div>
            <div slot="modal-footer"
                 class="w-100">
                <Button v-if="showSubmit"
                        className="btn_footer"
                        text="Submit"
                        variant="primary"
                        :onClick="getAnnotationsData"
                />
                <Button v-if="showFinished || showError"
                        className="btn_footer"
                        text="OK"
                        variant="primary"
                        :onClick="viewAnnotationsData"
                />
            </div>
        </b-modal>
        <ConfirmDialog
                :id="REMOVE_ALL_ROWS_MODAL_ID"
                text="Remove all variants?"
                :confirmFunction="removeAllRows"
        />
        <ConfirmDialog
                :id="REMOVE_ROW_MODAL_ID"
                text="Remove this variant?"
                :confirmFunction="removeRow"
        />
    </div>
</template>

<script>
import { ANNOTATION_SERVICE_CONTS } from '../../common/constants';
import Button from './Button.vue';
import ConfirmDialog from './ConfirmDialog.vue';
import PasteVcfTab from './tabs/PasteVcfTab.vue';
import TypeInTab from './tabs/TypeInTab.vue';
import UploadVcfTab from './tabs/UploadVcfTab.vue';

export default {
    name: 'AnnotationSearchDialog',
    data() {
        return {
            showSubmit: true,
            REMOVE_ROW_MODAL_ID: 'confirmRemoveRow',
            REMOVE_ALL_ROWS_MODAL_ID: 'confirmRemoveAllRows',
        };
    },
    components: {
        Button,
        ConfirmDialog,
        PasteVcfTab,
        TypeInTab,
        UploadVcfTab,
    },
    computed: {
        constants() {
            return ANNOTATION_SERVICE_CONTS;
        },
        showFinished() {
            return this.$store.state.annotations.showFinished;
        },
        showError() {
            return this.$store.state.annotations.error.show;
        },
        showErrorMessage() {
            return this.$store.state.annotations.error.message;
        },
    },
    methods: {
        show() {
            this.$store.commit('setShowFinished', false);
            this.$store.commit('setAnnotationSearchShowError', false);
            this.showSubmit = true;
            this.$refs.annotationSearchModal.show();
        },
        hide() {
            this.$refs.annotationSearchModal.hide();
        },
        getAnnotationsData() {
            switch (this.$refs.myTabs.currentTab) {
            case 0:
                this.$refs.typeInTab.postInputs();
                break;
            case 1:
                this.$refs.uploadVcfTab.uploadFile();
                break;
            case 2:
                this.$store.dispatch('formatVcf', this.vcfText);
                break;
            default:
                break;
            }
            this.showSubmit = false;
            this.$store.commit('setAnnotationSearchShowError', false);
        },
        viewAnnotationsData() {
            this.hide();
            this.toggleVariantsPanel();
        },
        toggleVariantsPanel() {
            this.$store.commit('setVariantsPanelCollapsed', true);
            setTimeout(() => window.dispatchEvent(new Event('resize')));
        },
        removeRow() {
            this.$refs.typeInTab.removeRow();
        },
        removeAllRows() {
            this.$refs.typeInTab.removeAllRows();
        },
        showRemoveAllRowsDialog() {
            this.$root.$emit('bv::show::modal', this.REMOVE_ALL_ROWS_MODAL_ID);
        },
        showRemoveRowDialog() {
            this.$root.$emit('bv::show::modal', this.REMOVE_ROW_MODAL_ID);
        },
    },
};
</script>
<style lang="scss" scoped>
    .main-modal {
        height: 400px;
    }

    .tab {
        outline: none !important;
    }

    /deep/ .modal-content {
        border-radius: 12px 12px 10px 10px;
        border: none;

        .modal-header {
            background-color: #0a1c34;
            border-radius: 10px 10px 0 0;
            border-bottom: 0;
            vertical-align: center;

            button {
                color: #fff;
                text-shadow: none;
                opacity: 1;
                outline: none;
            }

            .modal-title {
                font-size: 16px;
                letter-spacing: 0px;
                color: #2bb3ed;
                font-weight: 800;
            }
        }

        .modal-footer {
            background-color: #e7e7e7;
            border: none;
        }

        .card-header {
            background-color: #0a1c34;
            padding: 0 1.25em 0.75em 1.25em;
        }

        .card-header:first-child {
            border-radius: 0;
        }

        .card {
            border: none;
            background-color: #e7e7e7;
        }

        .nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link {
            font-weight: 700;
            color: #203b6a;
            background-color: #e7e7e7;
            pointer-events: none;
            user-select: none;
        }

        .nav-tabs .nav-link {
            border: none;
            border-top-left-radius: 0.25rem;
            border-top-right-radius: 0.25rem;
            background-color: #1a3e6c;
            margin: 0 3px 0 3px;
        }

        a {
            color: #ffffff;
        }

        a:hover {
            color: #2bb3ed;
            text-decoration: underline;
        }

        .modal-body {
            padding: 0;
            margin-bottom: 0;
            background-color: #e7e7e7;

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
