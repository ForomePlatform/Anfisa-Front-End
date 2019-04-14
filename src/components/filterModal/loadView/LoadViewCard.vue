<template>
    <div class="filter-card">
        <div class="filter-card_header">
            <div class="filter-card_header_left">
                <div class="filter-card_header_left_name">
                    {{name}}
                </div>
                <div class="filter-card_header_left_date">
                    Created
                    <br/>
                    {{date}}
                </div>
            </div>
            <div class="filter-card_header_right">
                <div @click="onLoad" class="filter-card_header_right_load">
                    LOAD FILTER
                </div>
                <div @click="onRemove" class="filter-card_header_right_remove"/>
            </div>
        </div>
        <div class="filter-card_conditions">
            <div
              v-for="(condition, index) in conditions"
              v-bind:key="index + '-' + condition[1]"
              class="filter-card_conditions_item"
            >
                <BaseViewFloat
                  v-if="condition[0] === constants.numeric"
                  :name="condition[1]"
                  :data="condition[2]"
                />
                <BaseCardEnum
                  v-if="condition[0] === constants.enum || condition[0] === constants.status"
                  :name="condition[1]"
                  :operator="condition[2]"
                  :data="condition[3]"
                />
                <BaseCardZygosity
                  v-if="condition[0] === constants.zygosity"
                  :name="condition[1]"
                  :data="condition[4]"
                />
            </div>
        </div>
    </div>
</template>

<script>
import {
    STAT_NUMERIC,
    STAT_TYPE_ENUM,
    STAT_TYPE_STATUS,
    STAT_TYPE_ZYGOSITY,
} from '@/common/constants';
import BaseViewFloat from '../conditionsView/BaseViewFloat.vue';
import BaseCardEnum from './BaseCardEnum.vue';
import BaseCardZygosity from './BaseCardZygosity.vue';

export default {
    props: ['name', 'conditions', 'onLoad', 'onRemove', 'date'],
    computed: {
        constants() {
            return {
                numeric: STAT_NUMERIC,
                enum: STAT_TYPE_ENUM,
                status: STAT_TYPE_STATUS,
                zygosity: STAT_TYPE_ZYGOSITY,
            };
        },
    },
    components: {
        BaseViewFloat,
        BaseCardEnum,
        BaseCardZygosity,
    },
};
</script>

<style lang="scss" scoped>
    .filter-card {
        padding: 20px 8px;
        background-image: linear-gradient(to right, #b9bec5 25%,rgba(39, 63, 89, 0) 0%);
        background-position: bottom;
        background-size: 8px 2px;
        background-repeat: repeat-x;
        &_header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;
            &_left {
                display: flex;
                width: fit-content;
                &_name {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 0 10px;
                    height: 33px;
                    border-radius: 3px;
                    background-color: #2bb3ed;
                    font-size: 13px;
                    letter-spacing: 0px;
                    color: #ffffff;
                }
                &_date {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 11px;
                    letter-spacing: 0px;
                    color: #627490;
                    font-family: "Arial";
                    margin: 0 10px;
                }
            }
            &_right {
                display: flex;
                align-items: center;
                width: fit-content;
                &_load {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 107px;
                    height: 25px;
                    border-radius: 13px;
                    background-color: #0a1c34;
                    font-size: 11px;
                    letter-spacing: 0px;
                    color: #ffffff;
                    font-weight: 800;
                    text-align: center;
                    &:hover {
                        background-color: #1a3e6c;
                        cursor: pointer;
                    }
                }
                &_remove {
                    width: 30px;
                    height: 30px;
                    margin-left: 16px;
                    background-image: url('../../../assets/statRemoveIcon.png');
                    background-repeat: no-repeat;
                    background-position: center;
                    cursor: pointer;
                    &:hover {
                        background-image: url('../../../assets/statRemoveHoverIcon.png');
                    }
                }
            }
        }
        &_conditions {
            width: 100%;
            border-radius: 3px;
            background-color: #ededed;
            padding: 2px 12px;
            &_item {
                margin: 10px 0;
            }
        }
        .float-view {
            margin: 0;
            flex-wrap: wrap;
        }
    }
</style>
