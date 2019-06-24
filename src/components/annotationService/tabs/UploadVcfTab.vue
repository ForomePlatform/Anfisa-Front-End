<template>
    <div>
        <b-card-text>
            <div v-if="!showFinished">
                <div v-if="showInputs">
                    <p>{{ constants.CHOOSE_VCF_TEXT}}</p>
                    <b-form-file
                            v-model="file"
                            :state="Boolean(file)"
                            accept=".vcf"
                            placeholder="Choose a file..."
                            drop-placeholder="Drop file here..."
                    >
                    </b-form-file>
                    <div style="text-align: center">
                        <Button text="Clear"
                                centered
                                className="btn_row-handlder"
                                :onClick="clearFileUpload"
                        />
                    </div>
                    <div v-if="showFileSizeError"
                         class="error-message">File too large</div>
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
import { ANNOTATION_SERVICE_CONTS } from '../../../common/constants';
import Button from '../Button.vue';
import ErrorMessage from './ErrorMessage.vue';

export default {
    name: 'UploadVcfTab',
    props: ['showInputs'],
    components: {
        Button,
        ErrorMessage,
    },
    data() {
        return {
            file: null,
        };
    },
    computed: {
        showFinished() {
            return this.$store.state.annotations.showFinished;
        },
        constants() {
            return ANNOTATION_SERVICE_CONTS;
        },
        showFileSizeError() {
            return this.file ? this.file.size > 10485760 : false;
        },
        showError() {
            return this.$store.state.annotations.error.show;
        },
    },
    methods: {
        clearFileUpload() {
            this.file = null;
        },
        uploadFile() {
            if (!this.showFileSizeError) {
                this.$store.commit('setAnnotationSearchShowError', false);
                this.$store.dispatch('formatVcf', this.file);
            }
        },
    },
};
</script>
