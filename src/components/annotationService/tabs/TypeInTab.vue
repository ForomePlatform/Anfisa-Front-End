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
                        <div style="float: right;">
                            <Button v-if="inputs.length"
                                    className="btn_remove-row"
                                    text="-"
                                    :title="constants.REMOVE_ROW_BTN_TITLE"
                                    :onClick="showDeleteRowDialog.bind(this, input.text, index)"/>
                        </div>
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
                        <Button className="btn_row-handlder"
                                text="Add a variant
                               to your query"
                                class="inlineBlock"
                                :disabled="rowsLimitExceeded"
                                :onClick="addRow"/>
                        <Button v-if="inputs.length"
                                class="inlineBlock"
                                className="btn_row-handlder"
                                text="Remove all"
                                :onClick="showRemoveAllRowsDialog"/>
                    </div>
                </div>
                <div v-else-if="!showError">
                    <p>{{ constants.QUERY_PROCESSING_TEXT }}</p>
                </div>
            </div>
            <div v-if="showFinished && !showError">
                <p>{{ constants.QUERY_FINISHED_TEXT }}</p>
            </div>
            <div v-if="showError">
                <ErrorMessage></ErrorMessage>
            </div>
        </b-card-text>
    </div>
</template>

<script>
import * as utils from '../../../common/utils';
import { ANNOTATION_SERVICE_CONTS } from '../../../common/constants';
import Button from '../Button.vue';
import ErrorMessage from './ErrorMessage.vue';

export default {
    name: 'TypeInTab',
    props: ['showInputs', 'showRemoveAllRowsDialog', 'showRemoveRowDialog'],
    components: {
        Button,
        ErrorMessage,
    },
    data() {
        return {
            inputs: [
                { text: '' },
            ],
            removeRowIndex: 0,
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
    },
    methods: {
        setCookies() {
            document.cookie = `annotationJsonInputData = ${JSON.stringify(this.inputs)}`;
        },
        showDeleteRowDialog(inputText, index) {
            this.removeRowIndex = index;
            if (inputText) {
                this.showRemoveRowDialog();
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

    .inlineBlock {
        display: inline-block;
    }
</style>
