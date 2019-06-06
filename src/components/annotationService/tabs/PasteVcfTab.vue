<template>
    <div>
        <b-card-text>
            <div v-if="!showFinished">
                <div v-if="showInputs">
                    {{ constants.PASTE_VCF_DESC_TEXT }}
                    <b-form-textarea
                            v-model="vcfText"
                            placeholder="Paste VCF"
                            rows="10"
                            no-resize>
                    </b-form-textarea>
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
    </div>
</template>

<script>
import { ANNOTATION_SERVICE_CONTS } from '../../../common/constants';

export default {
    name: 'PasteVcfTab',
    props: ['showInputs'],
    data() {
        return {
            vcfText: '',
        };
    },
    computed: {
        showFinished() {
            return this.$store.state.annotations.showFinished;
        },
        constants() {
            return ANNOTATION_SERVICE_CONTS;
        },
        showError() {
            return this.$store.state.annotations.error.show;
        },
        showErrorMessage() {
            return this.$store.state.annotations.error.message;
        },
    },
    methods: {
        postVcf(content) {
            this.$store.dispatch('formatVcf', content);
        },
    },
};
</script>

<style lang="scss" scoped>
    @import '../annotationService.scss';
</style>
