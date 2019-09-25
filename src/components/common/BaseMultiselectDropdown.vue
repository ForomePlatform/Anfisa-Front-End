<template>
    <b-dropdown>
        <template slot="button-content">
            <div class="dropdown-toggle-slot">{{labelText}}</div>
        </template>
        <b-dropdown-item-button
            @click="onCheck(item)"
            disabled
        >
            <div сlass="multiselect_item" @click="clearAll">
                <img class="multiselect_item_img" src="@/assets/clearAll.svg"/>
                <span class="clear_all">CLEAR ALL</span>
            </div>
        </b-dropdown-item-button>
        <b-dropdown-divider/>
        <b-dropdown-item-button
            v-for="item in dataFiltered"
            :key="item"
            class="multiselect_item"
            @click="onCheck(item)"
            disabled
        >
            <b-form-checkbox
                :class="{multiselect_item_checkbox:isChecked(item)}"
                @change="onCheck(item)"
                :checked="isChecked(item)"
            >
                {{item}}
            </b-form-checkbox>
        </b-dropdown-item-button>
    </b-dropdown>
</template>

<script>
export default{
    name: 'BaseMultiselectDropdown',
    props: {
        defaultText: {
            default: 'SELECT',
            type: String,
        },
        selectedValues: {
            type: Array,
        },
        data: {
            type: Array,
        },
        onChange: {
            type: Function,
        },
    },
    methods: {
        onCheck(item) {
            let newSelectedValues = this.selectedValues.slice();
            if (this.selectedValues.indexOf(item) === -1) {
                newSelectedValues.push(item);
            } else {
                newSelectedValues = newSelectedValues.filter(el => el !== item);
            }
            console.log('new: ' + newSelectedValues);
            this.onChange(newSelectedValues);
        },
        isChecked(item) {
            return this.selectedValues.indexOf(item) !== -1;
        },
        clearAll() {
            this.onChange([]);
        },
    },
    computed: {
        labelText() {
            if (this.selectedValues.length === 0) {
                return this.defaultText;
            } else if (this.selectedValues.length === 1) {
                return this.selectedValues[0];
            }
            return `(${this.selectedValues.length}) Options Selected`;
        },
        dataFiltered() {
            return this.data.filter(item => item);
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
        &_label {
            margin: 0px;
            padding: 0px;
        }
        &_img {
            height: 1.3em;
            width: 1.3em;
            opacity: 0.6;
        }
        &_checkbox {
            color: #1a3e6c;
        }
    }
    .clear_all {
        margin: 5px;
        padding: 5px;
        color: #1a3e6c;
        cursor: pointer;
    }
</style>
