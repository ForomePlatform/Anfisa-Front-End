<template>
    <div class="type-in-tab">
        <b-card-text>
            <div v-if="!showFinished">
                <div v-if="showInputs">
                    <p>{{ constants.TYPE_IN_DESC_TEXT}}</p>
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
                        <b-button class="btn btn_remove-row"
                                  title="Remove this variant from your query"
                                  @click="showDeleteRowDialog(input.text, index)">
                            -
                        </b-button>
                        <div v-if="input.error != null">
                            <div v-for="(error) in input.error" :key="error">
                                <div class="error-message">{{ error }}</div>
                            </div>
                        </div>
                    </div>
                    <div v-if="rowsLimitExceeded" class="error-message">
                        <p>{{ constants.ROWS_LIMIT_EXCEEDED }}</p>
                    </div>
                    <div class="add-row-wrapper">
                        <b-button
                                :disabled="rowsLimitExceeded"
                                :class="[rowsLimitExceeded ?
                                                    'btn_row-handlder_disabled' : '',
                                                    'btn_row-handlder']"
                                primary
                                @click="addRow">Add a variant to your query
                        </b-button>
                        <b-button v-if="inputs.length"
                                  class="btn_row-handlder"
                                  @click="showRemoveAllRowsDialog">Remove all
                        </b-button>
                    </div>
                </div>
                <div v-else-if="!showError">
                    <p>{{ constants.QUERY_PROCESSING_TEXT }}</p>
                </div>
            </div>
            <div v-if="showFinished && !showError">
                <p>{{ constants.QUERY_FINISHED_TEXT }}</p>
            </div>
            <div v-if="showError" class="error-message">
                {{ showErrorMessage }}
            </div>
        </b-card-text>
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
import * as utils from '../../../common/utils';
import { ANNOTATION_SERVICE_CONTS } from '../../../common/constants';
import ConfirmDialog from '../confirmDialogs/ConfirmDialog.vue';

export default {
    name: 'TypeInTab',
    components: {
        ConfirmDialog,
    },
    props: ['showInputs'],
    data() {
        return {
            inputs: [
                { text: '' },
            ],
            removeRowIndex: 0,
            REMOVE_ROW_MODAL_ID: 'confirmRemoveRow',
            REMOVE_ALL_ROWS_MODAL_ID: 'confirmRemoveAllRows',
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
    },
    methods: {
        setCookies() {
            document.cookie = `annotationJsonInputData = ${JSON.stringify(this.inputs)}`;
        },
        showDeleteRowDialog(inputText, index) {
            this.removeRowIndex = index;
            if (inputText) {
                this.$root.$emit('bv::show::modal', this.REMOVE_ROW_MODAL_ID);
            } else {
                this.removeRow(index);
            }
        },
        addRow() {
            this.inputs.push({
                text: '',
            });
            this.setCookies();
            this.addScroll();
        },
        removeRow() {
            this.inputs.splice(this.removeRowIndex, 1);
            this.setCookies();
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
        addScroll() {
            setTimeout(() => {
                const elem = document.getElementsByClassName('type-in-tab')[0];
                elem.scrollTop = elem.scrollHeight;
            });
        },
        removeAllRows() {
            this.inputs = [];
            this.setCookies();
        },
        showRemoveAllRowsDialog() {
            this.$root.$emit('bv::show::modal', this.REMOVE_ALL_ROWS_MODAL_ID);
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
    },
    created() {
        const inputData = this.getCookie('annotationJsonInputData');
        if (inputData) {
            this.inputs = JSON.parse(inputData);
        }
    },
};
</script>

<style lang="scss" scoped>
    @import '../annotationService.scss';
    .type-in-tab {
        overflow: auto;
        height: 340px;
        border: 0;
        box-shadow: none;
        width: 102%;
    }

    .example-text {
        font-size: 0.7em;
    }

    .add-row-wrapper {
        text-align: center;
    }

    .number-column {
        float: left;
        margin-top: 7px;
        margin-right: 10px;
        width: 27px;
        text-align: center;
    }

    .input {
        width: 88%;
        display: inline !important;
        margin: 2px;
    }

</style>
