<template>
    <BaseModal
            :id="id"
            :title="title"
            :onSubmit="onSubmit"
            :ok-title="okTitle"
            :enterKeyFunc="onSubmit"
            :cancelTitle="cancelTitle"
            :size="size"
            :isFooterHide="isFooterHide"
            bodyClass="inheritence-modal-body"
    >
        <b-container fluid>
            <b-row class="mb-1">
                <b-col cols="3" class="section">
                    <b-form-group class="ml-4">
                        <b-form-radio
                                v-for="option in levelSelectionOptions"
                                :key="option.text"
                                v-model="levelSelection"
                                name="level-selection-radios"
                                :value="option.value"
                                class="my-2"
                                @change="setNextStep"
                        >
                            {{ option.text }}
                        </b-form-radio>
                    </b-form-group>
                </b-col>
                <b-col cols="6" class="section">
                    <div
                            v-if="currentStep === steps.prePopulateStep
                            || currentStep === steps.scopeStep"
                            class="pre-populate-wrapper"
                    >
                        <div class="pre-populate-title">Pre-populate with genotype suggestions</div>
                        <b-form-select
                                v-model="prePopulate"
                                :options="prePopulateOptions"
                                @change="setNextStep"
                        >
                        </b-form-select>
                    </div>
                    <div v-if="currentStep === steps.zygosityStep" class="w-100">
                        <div v-for="zygosity in zygosityData" :key="zygosity.sampleId">
                            <BaseEditorZygosityCheckbox :zygosity="zygosity"/>
                        </div>
                    </div>
                </b-col>
                <b-col cols="3" class="section">
                    <b-form-group v-if="currentStep === steps.scopeStep">
                        <b-form-radio
                                v-for="option in scopeOptions"
                                :key="option.text"
                                v-model="scope"
                                name="scope-selection-radios"
                                :value="option.value"
                                class="my-2"
                        >
                            {{ option.text }}
                        </b-form-radio>
                    </b-form-group>
                </b-col>
            </b-row>
        </b-container>
        <template slot="modal-footer">
            <div class="w-100 modal-footer">
                <div class="modal-footer-content">
                    {{ currentStep }}
                </div>
                <b-button
                        variant="secondary"
                        @click="clearAll"
                >
                    {{ cancelTitle }}
                </b-button>
                <b-button
                        variant="primary"
                        @click="onSubmit"
                        :disabled="currentStep !== steps.scopeStep"
                >
                    {{ okTitle }}
                </b-button>
            </div>
        </template>
    </BaseModal>
</template>

<script>
    import BaseModal from '@/components/common/BaseModal.vue';
    import BaseEditorZygosityCheckbox from "./zygosity/BaseEditorZygosityInterval.vue";

    const VARIANT = "variant";
    const GENE = "gene";
    const TRANSCRIPT = "transcript";

    export default {
        name: 'BaseEditorInheritenceModal',
        components: {
            BaseEditorZygosityCheckbox,
            BaseModal,
        },
        props: {
            id: String,
            title: String,
            okTitle: String,
            cancelTitle: String,
            onSubmit: Function,
            size: String,
            isFooterHide: Boolean,
        },
        data() {
            return {
                show: false,
                levelSelection: '',
                scope: '',
                prePopulate: '',
                currentStep: '',
                zygosityData: [
                    {
                        sampleId: 'bgm9001a1',
                        steps: {
                            step1: '',
                            step2: '',
                            step3: ''
                        },
                        interval: {
                            fromValue: '',
                            toValue: ''
                        }
                    }, {
                        sampleId: 'bgm9001u1',
                        steps: {
                            step1: '',
                            step2: '',
                            step3: ''
                        },
                        interval: {
                            fromValue: '',
                            toValue: ''
                        }
                    }, {
                        sampleId: 'bgm9001u2',
                        steps: {
                            step1: '',
                            step2: '',
                            step3: ''
                        },
                        interval: {
                            fromValue: '',
                            toValue: ''
                        }
                    }
                ],
                steps: {
                    levelStep: 'Select Level',
                    prePopulateStep: 'Select Pre-populate',
                    zygosityStep: 'Select Zygosity Interval (for custom range use WheelsIcon)',
                    scopeStep: 'Select Scope'
                },
                scopeOptions: [
                    { text: 'Entire Workspace', value: 'workspace' },
                    { text: 'Variants, remaining after application of all other filters', value: 'variants' },
                ],
                levelSelectionOptions: [
                    { text: 'Variant', value: VARIANT },
                    { text: 'Gene', value: GENE },
                    { text: 'Transcript', value: TRANSCRIPT },
                ],
                prePopulateOptions: [
                    { text: 'Autosomal dominant', value: 'autosomalDominant' },
                    { text: 'Homozygous recessive', value: 'homozygousRecessive' },
                    { text: 'X-linked', value: 'xLinked' },
                    { text: 'Compensational', value: 'compensational' },
                ]
            };
        },
        created() {
            this.currentStep = this.steps.levelStep
        },
        methods: {
            openModal() {
                this.$refs.inheritenceModal.show();
            },
            closeModal() {
                this.$refs.inheritenceModal.hide();
            },
            setNextStep(nextStep) {
                if (nextStep === TRANSCRIPT) {
                    this.currentStep = this.steps.zygosityStep
                } else if ((nextStep === GENE || nextStep === VARIANT)
                    && this.currentStep !== this.steps.scopeStep
                    && !this.prePopulate) {
                    this.currentStep = this.steps.prePopulateStep
                } else {
                    this.currentStep = this.steps.scopeStep
                }
            },
            clearAll() {
                this.currentStep = this.steps.levelStep;
                this.levelSelection = '';
                this.scope = '';
                this.prePopulate = '';
            }
        },
    };
</script>

<style lang="scss" scoped>
    .section {
        border-right: dashed 1px #b9bec5;
        display: flex;
        justify-content: left;
        align-items: center;
        &:last-child {
            border: none;
        }
        .form-group {
            margin-top: 20px;
            margin-bottom: 20px !important;
        }
    }
    .pre-populate-wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .inheritence-modal-body {
        select {
            width: 50%;
            outline: none;
            margin-top: 10px;
            option {
                font-size: 16px;
                letter-spacing: 0;
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
        &-content {
            width: 100%;
            color: #2bb3ed;
            font-weight: 600;
        }
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
</style>
