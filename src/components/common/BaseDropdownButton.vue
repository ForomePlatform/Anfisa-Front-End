<template>
    <b-dropdown size="sm">
        <template slot="button-content">
            <div class="dropdown-toggle-slot">{{labelText}}</div>
        </template>
        <b-dropdown-item-button
            v-if="multiselect"
            @click="onCheck(item)"
            disabled
        >
            <div сlass="multiselect_item">
                Clear all
            </div>
        </b-dropdown-item-button>
        <b-dropdown-divider/>
        <b-dropdown-item-button
            v-if="multiselect && item"
            v-for="item in data"
            :key="item"
            @click="onCheck(item)"
            disabled
        >
            <div сlass="multiselect_item">
                <label>
                    <input
                        type="checkbox"
                        class="multiselect_checkbox"
                        :ref="item"
                        :checked="isChecked(item)"
                        @change="onCheck(item)"
                    />
                    {{item}}
                </label>
            </div>
        </b-dropdown-item-button>
        <b-dropdown-item-button
            v-if="!multiselect"
            v-for="item in data"
            :key="item"
            @click="onChange(item)"
        >
            {{item}}
        </b-dropdown-item-button>
    </b-dropdown>
</template>

<script>
export default{
    name: 'BaseDropdownButton',
    data() {
        return {
            selectedItems: this.selected,
        }
    },
    props: {
        defaultText: {
            default: 'SELECT',
            type: String,
        },
        data: {
            type: Array,
        },
        onChange: {
            type: Function,
        },
        multiselect: {
            type: Boolean,
        },
        selected: {
            type: Array,
        }
    },
    methods: {
        onCheck(item) {
            if (!this.selected.find(el => el === item)) {
                console.log('Checked');
                this.selectedItems.push(item);
            }
            else {
                this.selectedItems = this.selectedItems.filter(el => el !== item);
            }
            console.log(item + ' was checked. Items: ' + this.selectedItems);
            this.onChange(this.selectedItems);
        },
        isChecked(item) {
            return this.selected.find(el => el === item) !== undefined;
        },
    },
    computed: {
        labelText() {
            if (this.multiselect) {
                if (this.selected.length === 0) {
                    return this.defaultText;
                }
                else if (this.selected.length === 1) {
                    return this.selected[0];
                }
                else {
                    return '(' + this.selected.length + ') Options Selected';
                }
            }
            else {
                return this.selected ? this.selected : this.defaultText;
            }
        },
    },
};
</script>

<style scoped lang="scss">
    .dropdown {
        flex: 0 1 auto;
        width: 100%;
        min-width: 133px;
        .dropdown-item {
            font-size: 14px;
            padding: 2px 10px;
            min-height: 20px;
        }
    }
    /deep/ .dropdown-menu.show {
        max-height: 300px;
        overflow-y: auto;
    }
    /deep/ .dropdown-toggle  {
        width: 100%;
        height: 33px;
        border-radius: 3px;
        background-color: #15263e;
        text-align: left;
        font-size: 11px;
        line-height: 1.9;
        border-width: 0;
        letter-spacing: 0px;
        color: #95acbc;
        padding-right: 15px;
        &-slot {
            overflow: hidden;
        }
        &:hover {
            background-color: #2bb3ed;
            border-width: 0;
            color: #ffffff;
            &::after{
                border-top-color: #ffffff;
            }
        }
        &::after {
            position: absolute;
            right: .4em;
            top: 1em;
            display: inline-block;
            width: 0;
            height: 0;
            margin-left: 0.455em;
            vertical-align: 0m;
            font-size: 14px;

        }
    }
    .multiselect_checkbox {
        position: relative;
        top: 0.2em;
        margin-right: 0.5em;
    }
    .multiselect_item {
        margin: 0px;
        padding: 0px;
        &:hover {
            background-color:#2bb3ed;
        }
    }
</style>
