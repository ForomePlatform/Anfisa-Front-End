<template>
    <div class="advanced-view">
        <div class="advanced-view_content">
            <div class="advanced-view_content_filters">
                <div
                  v-for="(rule, index) in rulesData"
                  :class="[rule[0] === selectedRule
                    ? 'advanced-view_content_filters_item__selected' : '',
                    'advanced-view_content_filters_item']"
                  :key="index + '-' + rule"
                  @click="() => openData(index)"
                >
                    {{rule[0]}}
                </div>
            </div>
            <div class="advanced-view_content_editor">
                <textarea v-model="selectedData" />
            </div>
        </div>
        <div class="advanced-view_footer">
            <div class="advanced-view_footer_param" @click="openParams">
                PARAMETERS
            </div>
            <div class="advanced-view_footer_btns">
                <div class="advanced-view_footer_btns_apply" @click="applyChanges">
                    APPLY CHANGES
                </div>
                <div class="advanced-view_footer_btns_reset" @click="resetChanges">
                    RESET CHANGES
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectedRule: null,
            selectedData: null,
            paramsView: false,
        };
    },
    computed: {
        rulesData() {
            return this.$store.state.rulesData;
        },
        rulesParams() {
            return this.$store.state.rulesParams;
        },
    },
    methods: {
        openData(index) {
            const [ruleName, data] = this.rulesData[index];
            this.selectedRule = ruleName;
            this.selectedData = data;
            this.paramsView = false;
        },
        openParams() {
            this.selectedRule = null;
            this.paramsView = true;
            this.selectedData = this.rulesParams;
        },
        resetChanges() {
            if (this.paramsView) {
                this.paramsView = true;
                this.selectedData = this.rulesParams;
            } else {
                const [, data] = this.rulesData.find(rule => rule[0] === this.selectedRule);
                this.selectedData = data;
            }
        },
        applyChanges() {
            const name = this.paramsView ? '--param' : this.selectedRule;
            this.$store.dispatch('modifyRules', { name, data: this.selectedData });
        },
    },
};
</script>


<style lang="scss" scoped>
    .advanced-view {
        display: flex;
        flex-direction: column;
        height: 100%;
        &_content {
            display: flex;
            flex-direction: row;
            height: 632px;
            &_filters {
                width: 430px;
                background-color: #e7e7e7;
                height: 100%;
                overflow: auto;
                &_item {
                    cursor: pointer;
                    padding: 6px 20px;
                    &__selected {
                        background-color: #e1d988;
                    }
                    &:hover {
                        background-color: #fff;
                    }
                }
            }
            &_editor {
                width: 100%;
                height: inherit;
                textarea {
                    padding: 5px 15px;
                    width: 100%;
                    height: inherit;
                    resize: none;
                    border: none;
                    &:focus {
                        border: none;
                        outline: none;
                    }
                }
                height: 100%;
            }
        }
        &_footer {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            background-color: #193e6b;
            height: 50px;
            padding: 0 20px;

            font-size: 11px;
            letter-spacing: 0px;
            color: #0a1c34;
            font-weight: 800;
            text-align: center;
            &_param {
                border-radius: 13px;
                background-color: #e7dea4;
                height: 30px;
                padding: 0 14px;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                &:hover {
                    cursor: pointer;
                    background-color: #fff;
                }
            }
            &_btns {
                display: flex;
                flex-direction: row;
                align-items: center;
                color: #fff;
                &_apply {
                    background-color: #386399;
                    border-radius: 13px;
                    height: 25px;
                    padding: 0 10px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    &:hover {
                        background-color: #1b994f;
                    }
                }
                &_reset {
                    background-color: #386399;
                    border-radius: 13px;
                    height: 25px;
                    padding: 0 10px;
                    margin-left: 15px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    &:hover {
                        background-color: #e2585b;
                    }
                }
            }
        }
    }
</style>
