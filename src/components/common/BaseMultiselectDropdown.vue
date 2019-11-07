<template>
    <b-dropdown>
        <template slot="button-content">
            <div class="dropdown-toggle-slot">{{labelText}}</div>
        </template>
        <b-dropdown-item-button>
            <div class="multiselect_item clear_all_item" @click="clearAll">
                <img class="multiselect_item_img" src="@/assets/clearAll.svg" alt="clear all"/>
                <span class="clear_all">CLEAR ALL</span>
            </div>
        </b-dropdown-item-button>
        <b-dropdown-divider/>
        <div
                v-for="item in data"
                :key="item"
                class="multiselect_item"
        >
            <b-form-checkbox
                    :key="item"
                    :value="item"
                    v-model="selected"
                    class="multiselect_checkbox"
            >
                {{ item }}
            </b-form-checkbox>
        </div>
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
    data() {
        return {
            selected: this.selectedValues,
        };
    },
    watch: {
        selected(newSelectedValues) {
            this.$emit('onChange', newSelectedValues);
        },
    },
    methods: {
        clearAll() {
            this.selected = [];
        },
    },
    computed: {
        labelText() {
            if (this.selected.length === 0) {
                return this.defaultText;
            } else if (this.selected.length === 1) {
                return this.selected[0];
            }
            return `(${this.selected.length}) Options Selected`;
        },
    },
};
</script>

<style scoped lang="scss">
    label {
        display: inline-block;
    }
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
        min-width: 170px;
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
        letter-spacing: 0;
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
            vertical-align: 0;
            font-size: 14px;

        }
    }
    .multiselect_checkbox {
        position: relative;
        top: 0.2em;
        margin-right: 0.5em;
    }
    .multiselect_item {
        margin: 0;
        padding: 2px 10px;
        min-height: 20px;
        font-size: 14px;
        color: #1a3e6c;
        white-space: nowrap;
        &:hover {
            background-color:#2bb3ed;
        }
        &_img {
            height: 1.3em;
            width: 1.3em;
            opacity: 0.6;
        }
    }
    .clear_all {
        margin: 5px;
        padding: 5px;
        color: #1a3e6c;
        cursor: pointer;
        &_item {
            text-align: center;
        }
    }
</style>
