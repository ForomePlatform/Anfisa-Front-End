<template>
    <div class="second-header">
        <div v-if="!loadView" class="second-header_separator">
            <div class="second-header_variants" @click="$emit('close')">
                SEE {{variants || 0}} VARIANTS
            </div>
        </div>
        <div v-if="!loadView" class="tools">
            <div class="second-header_filters">
                <b>{{conditionsLength || 0}}</b> Active Filters
            </div>
            <b-button
                    variant="none"
                    class="second-header_clear"
                    :disabled="!enableClearAll"
                    @click="$emit('clearAll')"
            >
                <img v-if="enableClearAll" alt="close" src="@/assets/filterCloseIcon.svg"/>
                <img v-else alt="close" src="@/assets/filterCloseDisabledIcon.png"/>
                CLEAR ALL
            </b-button>
            <div class="save-load">
                <BaseSaveFilterDropdown
                        :enabled="Boolean(enableSave)"
                        :filterName="currentFilter"
                        :processing="processing"
                        :onSave="saveFilter"
                        :onSaveAs="removeFilterName"
                />
                <div
                    :class="[loadView ? 'second-header_load__active' : '', 'second-header_load']"
                    @click="onLoadClick"
                >
                    <img v-if="loadView" alt="load" src="@/assets/filterLoadActiveIcon.png"/>
                    <img v-else alt="load" src="@/assets/filterLoadIcon.svg"/>
                    LOAD
                </div>
            </div>
        </div>
        <div
                v-if="loadView"
                :class="['second-header_load__active', 'second-header_load', 'cancel']"
                @click="onCancel">
            <img alt="cancel" src="@/assets/crossIcon.svg"/>
            CANCEL
        </div>
    </div>
</template>

<script>import { STAT_TYPE_IMPORT } from '@/common/constants';
import BaseSaveFilterDropdown from './BaseSaveFilterDropdown.vue';

export default {
    props: ['onLoadClick', 'enableClearAll', 'enableSave', 'loadView', 'onCancel'],
    computed: {
        variants() {
            return this.$store.getters.getFilteredVariants;
        },
        conditionsLength() {
            return this.$store.state.currentConditions
                .filter(condition => condition[0] !== STAT_TYPE_IMPORT).length;
        },
        currentFilter() {
            return this.$store.getters.getSelectedPreset;
        },
        // display status of filter saving
        processing() {
            return false;
        },
    },
    methods: {
        saveFilter(filterName) {
            this.$store.dispatch('updateFilter', filterName);
        },
        removeFilterName() {
            this.$store.commit('setPreset', null);
        },

    },
    components: {
        BaseSaveFilterDropdown,
    },
};
</script>

<style lang="scss" scoped>
    .second-header {
        height: 62px;
        background-color: #1a3e6c;
        display: flex;
        align-items: center;
        padding: 0 20px;
        &_variants {
            width: 166px;
            height: 33px;
            line-height: 33px;
            border-radius: 17px;
            background-color: #2bb3ed;
            font-size: 11px;
            letter-spacing: 0px;
            color: #0a1c34;
            font-weight: 800;
            text-align: center;
            &:hover {
                cursor: pointer;
                background-color: #48c3f7;
            }
        }
        &_filters {
            width: 150px;
            font-size: 14px;
            letter-spacing: 0px;
            color: #ffffff;
            display: inline-block;
            float: left;
            padding-top: 5px;
        }
        &_clear, &_load {
            width: 134px;
            height: 33px;
            border-radius: 17px;
            background-color: #396398;
            font-size: 11px;
            letter-spacing: 0px;
            color: #ffffff;
            font-weight: 800;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
        }
        &_clear {
            padding: 0 23px 0 13px;
            float: left;
            background-color: #da5959;
            &:disabled {
                background-color: #15263e;
                color: #1a3e6c;
                cursor: default;
            }
            &.active, &:hover, &:focus {
                outline: none !important;
                box-shadow: none;
            }
            &:hover {
                background-color: #e68d8d;
            }
        }
        &_load {
            width: 103px;
            padding: 0 25px 0 20px;
            background-color: #2bb3ed;
            margin-left: 22px;
            float: right;
            &:hover {
                background-color: #48c3f7;
            }
            &__active {
                color: #0a1c34;
                background-color: #fff;
            }
        }
        &_separator {
            height: 33px;
            width: 334px;
            background-image: linear-gradient(to bottom, #5b7596 25%, rgba(39, 63, 89, 0) 0%);
            background-position: right;
            background-size: 2px 6px;
            background-repeat: repeat-y;
            margin-right: 37px;
        }
    }
    .save-load {
        display: inline-block;
        float: right;
    }
    .tools {
        width: 100%;
    }
    .cancel {
        float: left;
        width: 113px;
    }
</style>
