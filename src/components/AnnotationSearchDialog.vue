<template>
    <div>
        <b-modal ref="annotationSearchModal"
                 centered
                 scrollable
                 size="lg"
                 title="GET ANNOTATIONS"
        >
            <div>
                <b-card no-body id="mainModal">
                    <b-tabs card ref="myTabs">
                        <b-tab title="Type in" active id="typeInTab" class="tab">
                            <b-card-text>
                                <div v-if="!showFinished">
                                    <div v-if="showInputs">
                                        <p>To get annotations for specific variants,
                                            please insert their descriptions in Forome
                                            format in the forms
                                            below (each in separate form,
                                            up to 100 variants per query).</p>
                                        <p style="font-size: 0.7em;">
                                            For example:<br>
                                            chr15:89876828-89876836 TTGCTGCTGC&gt;TTGCTGC<br>
                                            chrX:153009197 G&gt;C<br>
                                        </p>
                                        <div v-for="(input, index) in inputs" :key="index">
                                            <div class="numberColumn">
                                                <span v-if="inputs.length>1">
                                                     {{ index + 1 }}
                                                </span>
                                            </div>
                                            <b-form-input
                                                    type="text"
                                                    v-model="input.text"
                                                    class="input"
                                                    trim
                                                    placeholder="Input data"
                                                    @change="setCookies"
                                            />
                                            <b-button class="button"
                                                      title="Remove this variant from your query"
                                                      @click="showDeleteRowDialog
                                                      (input.text, index)">-
                                            </b-button>
                                            <div v-if="input.error != null">
                                                <div v-for="(error) in input.error" :key="error">
                                                    <div class="error-message">
                                                        {{ error }}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-if="isRowsLimitExceeded" class="error-message">
                                            <p>{{ rowsLimitExceeded }}</p>
                                        </div>
                                        <div class="addRowWrapper">
                                            <b-button
                                                    :disabled="isRowsLimitExceeded"
                                                    class="button addRowButton"
                                                    v-bind:style="[isRowsLimitExceeded ?
                                                    {'background-color': '#597995'} : {}]"
                                                    @click="addRow">Add a variant
                                                to your query
                                            </b-button>
                                            <b-button v-if="inputs.length"
                                                      class="button addRowButton"
                                                      @click="showRemoveAllRowsDialog">Remove all
                                            </b-button>
                                        </div>
                                    </div>

                                    <div v-else-if="!showError">
                                        <p>{{ queryProcessingText }}</p>
                                    </div>
                                </div>
                                <div v-if="showFinished && !showError">
                                    <p> {{ queryFinishedText }}</p>
                                </div>
                                <div v-if="showError" class="error-message">
                                    {{ showErrorMessage }}
                                </div>
                            </b-card-text>
                        </b-tab>
                        <b-tab title="Upload VCF" class="tab">
                            <b-card-text>
                                <div v-if="!showFinished">
                                    <div v-if="showInputs">
                                        <p>Please choose the VCF file
                                            describing the variants to be annotated.
                                            Maximum file size: 10 MB.
                                            Maximum number of variants: 100.
                                        </p>
                                        <b-form-file
                                                v-model="file"
                                                :state="Boolean(file)"
                                                @change="checkFileSize()"
                                                accept=".vcf"
                                                placeholder="Choose a file..."
                                                drop-placeholder="Drop file here..."
                                        ></b-form-file>
                                        <div style="text-align: center">
                                            <b-button
                                                    centered
                                                    class="button addRowButton"
                                                    @click="clearFileUpload">Clear
                                            </b-button>
                                        </div>
                                        <div v-if="showFileSizeError"
                                             v-bind:style="{'color': '#ff0008'}">
                                            File too large
                                        </div>
                                    </div>
                                    <div v-else-if="!showError">
                                        <p>{{ queryProcessingText }}</p>
                                    </div>
                                </div>
                                <div v-if="showFinished && !showError">
                                    <p>{{ queryFinishedText }}</p>
                                </div>
                                <div v-if="showError" class="error-message">
                                    {{ showErrorMessage }}
                                </div>
                            </b-card-text>
                        </b-tab>
                        <b-tab title="Paste VCF" class="tab">
                            <b-card-text>
                                <div v-if="!showFinished">
                                    <div v-if="showInputs">
                                        To get annotations for specific variants,
                                        please paste the portion of VCF file with
                                        their descriptions in the form below
                                        (up to 100 variants per query).
                                        <b-form-textarea
                                                id="textarea-default"
                                                v-model="vcfText"
                                                placeholder="Paste VCF"
                                                rows="10"
                                                no-resize
                                        ></b-form-textarea>
                                    </div>
                                    <div v-else-if="!showError">
                                        <p>{{ queryProcessingText }}</p>
                                    </div>
                                </div>
                                <div v-if="showFinished && !showError">
                                    <p>{{ queryFinishedText }}</p>
                                </div>
                                <div v-if="showError" class="error-message">
                                    {{ showErrorMessage }}
                                </div>
                            </b-card-text>
                        </b-tab>
                    </b-tabs>
                </b-card>
            </div>

            <div slot="modal-footer" class="w-100">
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
        <b-modal ref="confirmRemoveRow"
                 centered
                 title="CONFIRM REMOVING">
            <span class="textRemove">Remove this variant?</span>
            <div slot="modal-footer" class="w-100">
                <b-button size="sm"
                          variant="primary"
                          class="footer-button float-right btn-primary"
                          @click="deleteRow(removeRowIndex)">
                    Confirm
                </b-button>
                <b-button size="sm"
                          class="footer-button float-right btn-secondary"
                          @click="hideDeleteRowDialog">
                    Cancel
                </b-button>
            </div>
        </b-modal>
        <b-modal ref="confirmRemoveAllRows"
                 centered
                 title="CONFIRM REMOVING">
            <span class="textRemove">Remove all variants?</span>
            <div slot="modal-footer" class="w-100">
                <b-button size="sm"
                          class="footer-button float-right btn-secondary"
                          @click="removeAllRows">
                    Confirm
                </b-button>
                <b-button size="sm"
                          class="footer-button float-right btn-primary"
                          variant="primary"
                          @click="hideRemoveAllRowsDialog">
                    Cancel
                </b-button>
            </div>
        </b-modal>
    </div>
</template>

<script>

export default {
    name: 'AnnotationSearchDialog',
    data() {
        return {
            inputs: [
                { text: '' },
            ],
            showInputs: true,
            removeRowIndex: 0,
            file: null,
            vcfText: null,
            showFileSizeError: false,
            queryFinishedText: 'Query processing finished. Click "OK" to display the annotations found.',
            rowsLimitExceeded: 'Can\'t add any more variants, 100 is the maximum number for one query',
            queryProcessingText: 'Query processing has been started. It may take a few minutes.\n' +
                    'Please don\'t close this tab in your browser.',
        };
    },
    computed: {
        isRowsLimitExceeded() {
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
    },
    methods: {
        uploadFile() {
            this.showFileSizeError = false;
            if (this.file.size > 10485760) {
                this.showFileSizeError = true;
            } else {
                this.showInputs = false;
                this.$store.state.annotations.error.show = false;
                this.$store.dispatch('formatVcf', this.file);
            }
        },
        postVcf() {
            this.showInputs = false;
            this.$store.state.annotations.error.show = false;
            this.$store.dispatch('formatVcf', this.vcfText);
        },
        postInputs() {
            this.inputs = this.inputs.filter(input => input.text);
            if (this.checkInputs()) {
                return;
            }
            const jsonData = this.generateJsonFromInputData(this.inputs);
            if (!jsonData) {
                this.viewAnnotationsData();
                return;
            }
            this.setCookies();
            this.showInputs = false;
            this.$store.dispatch('formatAnfisa', jsonData);
        },
        checkInputs() {
            for (let i = 0; i < this.inputs.length; i++) {
                const input = this.inputs[i];
                input.error = [];
                const elementArray = input.text.trim()
                    .split(/[\s:]+/);
                const rangeArray = elementArray[1].split(/[-]+/);
                for (let j = 0; j < rangeArray.length; j++) {
                    const numb = rangeArray[j];
                    if (Number.isNaN(Number(numb))) {
                        input.error.push(`${numb} is not a number.`);
                    }
                }
                const alternative = elementArray[2];
                if (alternative) {
                    const strings = alternative.split('>');
                    for (let j = 0; j < strings.length; j++) {
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
        checkFileSize() {
            this.showFileSizeError = false;
        },
        removeAllRows() {
            this.inputs = [];
            this.setCookies();
            this.$refs.confirmRemoveAllRows.hide();
        },
        addRow() {
            this.inputs.push({
                text: '',
            });
            this.file = null;
            this.setCookies();
            this.addScroll();
        },
        showDeleteRowDialog(inputText, index) {
            if (inputText) {
                this.removeRowIndex = index;
                this.$refs.confirmRemoveRow.show();
            } else {
                this.deleteRow(index);
            }
        },
        showRemoveAllRowsDialog() {
            this.$refs.confirmRemoveAllRows.show();
        },
        hideDeleteRowDialog() {
            this.$refs.confirmRemoveRow.hide();
        },
        hideRemoveAllRowsDialog() {
            this.$refs.confirmRemoveAllRows.hide();
        },
        deleteRow(index) {
            this.inputs.splice(index, 1);
            this.setCookies();
            this.$refs.confirmRemoveRow.hide();
        },
        clearFileUpload() {
            this.file = null;
        },
        show() {
            const inputData = this.getCookie('annotationJsonInputData');

            if (inputData !== '' && inputData !== undefined && inputData !== null) {
                this.inputs = JSON.parse(inputData);
            }
            this.showInputs = true;
            this.showFileSizeError = false;
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
                this.postVcf();
                break;
            default:
                break;
            }
        },
        setCookies() {
            document.cookie = `annotationJsonInputData = ${JSON.stringify(this.inputs)}`;
        },
        generateJsonFromInputData(data) {
            const result = [];
            data.forEach((input) => {
                const element = {};
                const dataArray = input.text.split(',');

                for (let i = 0; i < dataArray.length; i++) {
                    const elementArray = dataArray[i].trim()
                        .split(/[\s:]+/);
                    const rangeArray = elementArray[1].split(/[-]+/);
                    element.chromosome = elementArray[0].replace('chr', '');

                    const start = Number.isNaN(Number(rangeArray[0])) ?
                        rangeArray[0] : Number(rangeArray[0]);
                    let end;
                    if (rangeArray.length === 1) {
                        end = start;
                    } else if (Number.isNaN(Number(rangeArray[1]))) {
                        end = rangeArray[1];
                    } else {
                        end = Number(rangeArray[1]);
                    }
                    element.start = start;
                    element.end = end;
                    const alternative = elementArray[2];
                    if (alternative) {
                        if (alternative.indexOf('>') !== -1) {
                            element.alternative = alternative.split('>')[1];
                        } else {
                            element.alternative = alternative;
                        }
                    }
                    result.push(element);
                }
            });
            if (result.length) {
                return JSON.stringify(result);
            }
            return null;
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
                const elem = document.getElementById('typeInTab');
                elem.scrollTop = elem.scrollHeight;
            });
        },
    },
};
</script>
<style>
    a {
        outline: 0;
    }
</style>
<style lang="scss" scoped>
    .button {
        width: 35px;
        float: right;
        height: 35px;
        border-radius: 17px;
        background-color: #2bb3ed;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
        letter-spacing: 0px;
        color: #ffffff;
        font-weight: 800;
        cursor: pointer;
        user-select: none;
        margin-top: 2px;

        &:hover {
            background-color: #597995 !important;
        }
    }

    .disabledButton {
        background-color: #597995;
    }

    .numberColumn {
        float: left;
        margin-top: 7px;
        margin-right: 10px;
        width: 27px;
        text-align: center;
    }

    .addRowButton {
        float: none;
        display: inline;
        white-space: pre-line;
        width: 100px;
        height: 45px;
        margin-top: 10px;
        margin-right: 10px;
    }

    .input {
        width: 88%;
        display: inline !important;
        margin: 2px;
    }

    .addRowWrapper {
        text-align: center;
    }

    .error-message {
        color: #ff0008;
        margin-left: 25px;
    }

    .tab {
        outline: none !important;
    }

    #typeInTab {
        overflow: auto;
        height: 340px;
        border: 0;
        box-shadow: none;
    }

    #mainModal {
        height: 400px;
    }

    .footer-button {
        padding: 5px 18px;
        height: 25px;
        border-radius: 12px;
        background-color: #2bb3ed;
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

    .textRemove {
        margin-left: 15px;
    }

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
        }

        .card {
            border: none;
            background-color: #e7e7e7;
        }

        .card-header:first-child {
            border-radius: 0;
        }

        .nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link {
            font-weight: 700;
            color: #203b6a;
            background-color: #e7e7e7;
            border-color: #e7e7e7;
        }

        .nav-tabs .nav-item {
            background-color: #1a3e6c;
        }

        a {
            color: #ffffff;
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
    }
</style>

