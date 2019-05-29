<template>
    <div>
        <b-modal ref="annotationSearchModal"
                 centered
                 scrollable
                 size="lg"
                 title="GET ANNOTATIONS">
            <div>
                <b-card no-body
                        class="mainModal">
                    <b-tabs card
                            ref="myTabs">
                        <b-tab title="Type in"
                               class="tab typeInTab">
                            <b-card-text>
                                <div v-if="!showFinished">
                                    <div v-if="showInputs">
                                        <p>{{ constants.TYPE_IN_DESC_TEXT}}
                                        </p>
                                        <p class="example-text">
                                            For example:<br>
                                            chr15:89876828-89876836 TTGCTGCTGC&gt;TTGCTGC<br>
                                            chrX:153009197 G&gt;C<br>
                                        </p>
                                        <div v-for="(input, index) in inputs" :key="index">
                                            <div class="number-column">
                                                {{ inputs.length > 1 ? index + 1 : '' }}
                                            </div>
                                            <b-form-input
                                                    type="text"
                                                    v-model="input.text"
                                                    class="input"
                                                    trim
                                                    placeholder="Input data"
                                                    @change="setCookies"/>
                                            <b-button class="button"
                                                      title="Remove this variant from your query"
                                                      @click="
                                                      showDeleteRowDialog(input.text, index)">-
                                            </b-button>
                                            <div v-if="input.error != null">
                                                <div v-for="(error) in input.error" :key="error">
                                                    <div class="error-message">
                                                        {{ error }}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-if="rowsLimitExceeded" class="error-message">
                                            <p>{{ ROWS_LIMIT_EXCEEDED }}
                                            </p>
                                        </div>
                                        <div class="addRowWrapper">
                                            <b-button
                                                    :disabled="rowsLimitExceeded"
                                                    :class="[rowsLimitExceeded ?
                                                    'disabledButton' : '',
                                                    'button addRowButton']"
                                                    @click="addRow">Add a variant to your query
                                            </b-button>
                                            <b-button v-if="inputs.length"
                                                      class="button addRowButton"
                                                      @click="showRemoveAllRowsDialog">Remove all
                                            </b-button>
                                        </div>
                                    </div>
                                    <div v-else-if="!showError">
                                        <p>{{ constants.QUERY_PROCESSING_TEXT }}
                                        </p>
                                    </div>
                                </div>
                                <div v-if="showFinished && !showError">
                                    <p>{{ constants.QUERY_FINISHED_TEXT }}
                                    </p>
                                </div>
                                <div v-if="showError" class="error-message">
                                    {{ showErrorMessage }}
                                </div>
                            </b-card-text>
                        </b-tab>
                        <b-tab title="Upload VCF"
                               class="tab">
                            <b-card-text>
                                <div v-if="!showFinished">
                                    <div v-if="showInputs">
                                        <p>{{ constants.CHOOSE_VCF_TEXT}}
                                        </p>
                                        <b-form-file
                                                v-model="file"
                                                :state="Boolean(file)"
                                                accept=".vcf"
                                                placeholder="Choose a file..."
                                                drop-placeholder="Drop file here...">
                                        </b-form-file>
                                        <div style="text-align: center">
                                            <b-button
                                                    centered
                                                    class="button addRowButton"
                                                    @click="clearFileUpload">Clear
                                            </b-button>
                                        </div>
                                        <div v-if="showFileSizeError"
                                             class="error-message">
                                            File too large
                                        </div>
                                    </div>
                                    <div v-else-if="!showError">
                                        <p>{{ constants.QUERY_PROCESSING_TEXT }}
                                        </p>
                                    </div>
                                </div>
                                <div v-if="showFinished && !showError">
                                    <p>{{ constants.QUERY_FINISHED_TEXT }}
                                    </p>
                                </div>
                                <div v-if="showError" class="error-message">
                                    {{ showErrorMessage }}
                                </div>
                            </b-card-text>
                        </b-tab>
                        <b-tab title="Paste VCF"
                               class="tab">
                            <b-card-text>
                                <div v-if="!showFinished">
                                    <div v-if="showInputs">
                                        {{ constants.PASTE_VCF_DESC_TEXT}}
                                        <b-form-textarea
                                                v-model="vcfText"
                                                placeholder="Paste VCF"
                                                rows="10"
                                                no-resize>
                                        </b-form-textarea>
                                    </div>
                                    <div v-else-if="!showError">
                                        <p>{{ constants.QUERY_PROCESSING_TEXT }}
                                        </p>
                                    </div>
                                </div>
                                <div v-if="showFinished && !showError">
                                    <p>{{ constants.QUERY_PROCESSING_TEXT }}
                                    </p>
                                </div>
                                <div v-if="showError" class="error-message">
                                    {{ showErrorMessage }}
                                </div>
                            </b-card-text>
                        </b-tab>
                    </b-tabs>
                </b-card>
            </div>
            <div slot="modal-footer"
                 class="w-100">
                <b-button v-if="showInputs"
                          size="sm"
                          class="footer-button float-right"
                          variant="primary"
                          @click="getAnnotationsData">
                    Submit
                </b-button>
                <b-button v-if="showFinished || showError"
                          size="sm"
                          class="footer-button float-right"
                          variant="primary"
                          @click="viewAnnotationsData">
                    OK
                </b-button>
            </div>
        </b-modal>
        <ConfirmDialog
                ref="confirmRemoveAllRows"
                text="Remove all variants?"
                :confirmFunction="removeAllRows"
        />
        <ConfirmDialog
                ref="confirmRemoveRow"
                text="Remove this variant?"
                :confirmFunction="removeRow"
        />
        <footer>
            <cookie-law theme="forome"
                        message="This website uses cookies
                        to ensure you get the best experience on our website.">
            </cookie-law>
        </footer>
    </div>
</template>

<script>
import CookieLaw from 'vue-cookie-law';
import ConfirmDialog from './confirmDialogs/ConfirmDialog.vue';
import * as utils from '../../common/utils';
import { ANNOTATION_SERVICE_CONTS } from '../../common/constants';

export default {
    name: 'AnnotationSearchDialog',
    components: {
        CookieLaw,
        ConfirmDialog,
    },
    data() {
        return {
            inputs: [
                { text: '' },
            ],
            removeRowIndex: 0,
            showInputs: true,
            file: null,
            vcfText: null,
        };
    },
    computed: {
        constants() {
            return ANNOTATION_SERVICE_CONTS;
        },
        rowsLimitExceeded() {
            return this.inputs.length >= 100;
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
        showFileSizeError() {
            return this.file ? this.file.size > 10485760 : false;
        },
    },
    methods: {
        show() {
            const inputData = this.getCookie('annotationJsonInputData');
            if (inputData !== '' && inputData !== undefined && inputData !== null) {
                this.inputs = JSON.parse(inputData);
            }
            this.$store.commit('setShowFinished', false);
            this.$store.commit('setAnnotationSearchShowError', false);
            this.$refs.annotationSearchModal.show();
        },
        hide() {
            this.$refs.annotationSearchModal.hide();
        },
        getAnnotationsData() {
            const tab = this.$refs.myTabs.currentTab;
            switch (tab) {
            case 0:
                this.postInputs();
                break;
            case 1:
                this.uploadFile();
                break;
            case 2:
                this.postVcf(this.vcfText);
                break;
            default:
                break;
            }
            this.$store.commit('setAnnotationSearchShowError', false);
        },
        viewAnnotationsData() {
            this.$refs.annotationSearchModal.hide();
            this.toggleVariantsPanel();
        },
        toggleVariantsPanel() {
            this.$store.state.panels.variantsPanelCollapsed = true;
            setTimeout(() => window.dispatchEvent(new Event('resize')));
        },
        addScroll() {
            setTimeout(() => {
                const elem = document.getElementsByClassName('typeInTab')[0];
                elem.scrollTop = elem.scrollHeight;
            });
        },
        removeAllRows() {
            this.inputs = [];
            this.setCookies();
            this.$refs.confirmRemoveAllRows.hide();
        },
        showRemoveAllRowsDialog() {
            this.$refs.confirmRemoveAllRows.show();
        },
        postInputs() {
            this.inputs = this.inputs.filter(input => input.text);
            if (this.checkInputs()) {
                return;
            }
            const jsonData = utils.generateJsonFromInputData(this.inputs);
            if (!jsonData) {
                this.viewAnnotationsData();
                return;
            }
            this.setCookies();
            this.showInputs = false;
            this.$store.dispatch('formatAnfisa', jsonData);
        },
        checkInputs() {
            for (let i = 0; i < this.inputs.length; i += 1) {
                const input = this.inputs[i];
                input.error = [];
                const elementArray = input.text.trim()
                    .split(/[\s:]+/);
                const rangeArray = elementArray[1].split(/[-]+/);
                for (let j = 0; j < rangeArray.length; j += 1) {
                    const numb = rangeArray[j];
                    if (Number.isNaN(Number(numb))) {
                        input.error.push(`${numb} is not a number.`);
                    }
                }
                const alternative = elementArray[2];
                if (alternative) {
                    const strings = alternative.split('>');
                    for (let j = 0; j < strings.length; j += 1) {
                        const string = strings[j];
                        if (typeof (string) !== 'string' || !Number.isNaN(Number(string))) {
                            input.error.push(`${string} is not a string.`);
                        }
                    }
                }
                if (input.error.length) {
                    return true;
                }
                input.error = null;
            }
            return false;
        },
        addRow() {
            this.inputs.push({
                text: '',
            });
            this.clearFileUpload();
            this.setCookies();
            this.addScroll();
        },
        showDeleteRowDialog(inputText, index) {
            this.removeRowIndex = index;
            if (inputText) {
                this.$refs.confirmRemoveRow.show();
            } else {
                this.removeRow(index);
            }
        },
        removeRow() {
            this.inputs.splice(this.removeRowIndex, 1);
            this.setCookies();
            this.$refs.confirmRemoveRow.hide();
        },
        setCookies() {
            document.cookie = `annotationJsonInputData = ${JSON.stringify(this.inputs)}`;
        },
        getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) {
                return parts.pop()
                    .split(';')
                    .shift();
            }
            return null;
        },
        clearFileUpload() {
            this.file = null;
        },
        uploadFile() {
            if (!this.showFileSizeError) {
                this.showInputs = false;
                this.$store.commit('setAnnotationSearchShowError', false);
                this.postVcf(this.file);
            }
        },
        postVcf(content) {
            this.$store.dispatch('formatVcf', content);
        },
    },
};
</script>
<style lang="scss">
    .Cookie--forome {
        background: #091b34;
        color: #fff;
        padding: 1.25em
    }

    .Cookie--forome .Cookie__button {
        background: #2bb3ed;
        padding: .625em 3.125em;
        color: #fff;
        border-radius: 17px;
        border: 0;
    }

    .Cookie--forome .Cookie__button:hover {
        background: #597995
    }
</style>
<style lang="scss" scoped>
    @import 'annotationService.scss';
</style>
