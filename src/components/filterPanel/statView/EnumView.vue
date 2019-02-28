<template>
    <div class="enum-view">
        <div class="enum-view_content">
            <div>
                <span class="enum-view_text">{{name}} </span>
                is
                <b-dropdown :text="operator" class="m-md-2" size="sm">
                    <b-dropdown-item
                    v-for="operator in operators"
                    v-bind:key="operator"
                    >
                        {{operator}}
                    </b-dropdown-item>
                </b-dropdown>
                of the following:
            </div>
            <div
             v-for="(item, index) in data"
             v-bind:key="item + '-' + index"
             class="enum-view_item"
            >
                {{item}}
                <div>x</div>
            </div>
        </div>
        <div>
            x
        </div>
    </div>
</template>

<script>
import { ENUM_DEFAULT_OPERATOR, ENUM_OPERATORS } from '../../../common/constants.js';

export default {
    data() {
        return {
            operators: ENUM_OPERATORS,
        };
    },
    props: ['name', 'operator', 'data', 'remove'],
};
</script>

<style lang="scss" scoped>
    .enum-view {
        display: flex;
        justify-content: space-between;
        align-content: center;
        font-size: 16px;
        letter-spacing: 0px;
        color: #627490;
        &_content {
            width: 100%;
        }
        &_text {
            color: #1a3e6c;
            font-weight: bold;
        }
        &_item {
            border-radius: 3px;
            background-color: #e7e7e7;
            height: 33px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 16px;
            letter-spacing: 0px;
            color: #0a1c34;
            font-weight: bold;
            margin: 0 10px 10px 0;
            padding: 0 12px;
            width: fit-content;
            float: left;
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
