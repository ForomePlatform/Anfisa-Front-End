<template>
    <div class="enum-view">
        <div class="enum-view_descr">
            <span class="enum-view_descr_text">{{name}} </span>
            is
            <b-dropdown :text="operators[this.selectedOperator]" class="m-md-2" size="sm">
                <b-dropdown-item
                  v-for="operator in Object.entries(operators)"
                  :key="operator[1]"
                  @click="() => changeOperator(name, operator[0])"
                >
                    {{operator[1]}}
                </b-dropdown-item>
            </b-dropdown>
            of the following:
        </div>
        <div
         v-for="(item, index) in data"
         v-bind:key="item + '-' + index"
         class="enum-view_item"
         @click="() => removeItem(name, index, data)"
        >
            {{item}}
            <div class="enum-view_item_cross"/>
        </div>
    </div>
</template>

<script>
import {
    STAT_TYPE_ENUM,
    LOGICAL_OPERATORS,
    LOGICAL_OPERATORS_STATUS,
} from '@/common/constants';

export default {
    data() {
        return {
            operators: this.type === STAT_TYPE_ENUM ? LOGICAL_OPERATORS : LOGICAL_OPERATORS_STATUS,
        };
    },
    props: ['name', 'selectedOperator', 'data', 'remove', 'changeOperator', 'removeItem', 'type'],
};
</script>

<style lang="scss" scoped>
    .enum-view {
        &_descr{
            margin-bottom: 5px;
            &_text {
                color: #1a3e6c;
                font-weight: bold;
            }
        }
        &_item {
            border-radius: 3px;
            background-color: #e7e7e7;
            height: 33px;
            line-height: 33px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 16px;
            letter-spacing: 0px;
            color: #0a1c34;
            font-weight: bold;
            margin: 0 10px 10px 0;
            padding: 0 8px 0 12px;
            width: fit-content;
            float: left;
            &:hover {
                background-color: #fae9e9;
                cursor: pointer;
                .enum-view_item_cross {
                    background-image: url('../../../assets/enumRemoveHoverIcon.png');
                }
            }
            &_cross {
                width: 24px;
                height: 24px;
                margin-top: -2px;
                margin-left: 4px;
                background-image: url('../../../assets/enumRemoveIcon.png');
                background-repeat: no-repeat;
                background-position: center;
            }
        }
        /deep/ .btn-secondary {
            font-size: 16px;
            letter-spacing: 0px;
            color: #627490;
            background-color: #fff;
            border-color: #d0d5dd;
            height: 31px;
        }
        /deep/ .dropdown-menu {
            min-width: fit-content;
            /deep/ .dropdown-item {
                padding: 0.1rem 0.6rem;
            }
        }
    }
</style>
