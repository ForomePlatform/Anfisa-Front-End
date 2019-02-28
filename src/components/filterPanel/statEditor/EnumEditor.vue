<template>
    <div class="enum-editor">
        <div class="enum-editor_header">
            <b-form-input
              class="enum-editor_search"
              v-model="query" type="text"
              placeholder="Search"
            />
        </div>
         <div class="separator"/>
        <div class="enum-editor_list">
            <b-form-checkbox
              class="enum-editor_list_item"
              v-for="([prop, count], index) in filteredData"
              v-bind:key="index + '_' + prop"
              @change="changeHandler(prop)"
              :checked="selected.includes(prop)"
            >
                <div class="enum-editor_list_item_descr" >
                    <span>
                        {{prop}}
                    </span>
                    <span>
                        ({{count}})
                    </span>
                </div>
            </b-form-checkbox>
        </div>
        <div class="enum-editor_button" @click="addData">
            ADD
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            query: '',
            selected: [],
        };
    },
    props: ['data', 'onSubmit'],
    computed: {
        filteredData() {
            if (this.query) {
                return this.data.filter(item => item[0].includes(this.query));
            }
            return this.data;
        },
    },
    methods: {
        addData() {
            this.onSubmit(this.selected);
        },
        changeHandler(prop) {
            if (this.selected.includes(prop)) {
                const index = this.selected.indexOf(prop);
                this.selected.splice(index, 1);
            } else {
                this.selected.push(prop);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .enum-editor {
        margin: 0 30px;
        background-color: #fff;
        border-radius: 4px;
        &_header {
            padding: 10px;
        }
        &_search {
            height: 33px;
            border-radius: 3px;
            background-color: #e7e7e7;
            font-size: 13px;
            letter-spacing: 0px;
        }
        &_list {
            padding: 8px 16px;
            border-radius: 0 0 4px 4px;
            overflow-y: auto;
            max-height: 320px;
            background-color: #fff;
            &_item {
                display: block;
                margin: 2px 0;
                &_descr {
                    display: flex;
                    margin-left: 4px;
                    justify-content: space-between;
                    font-size: 13px;
                    letter-spacing: 0px;
                    color:#77869f;
                    align-content: center;
                }
            }
        }
        &_button {
            height: 44px;
            line-height: 44px;
            background-color: #2bb3ed;
            font-size: 16px;
            letter-spacing: 0px;
            color: #ffffff;
            font-weight: 800;
            text-align: center;
            border-radius: 0 0 4px 4px;
            cursor: pointer;
            &:hover {
                background-color: #48c3f7;
            }
        }
    }
    .separator {
        height: 1px;
        background-color: #dfe4ea;
    }
    /deep/ .custom-control-label {
        width: 100%;
        cursor: pointer;
        &::before {
            width: 19px;
            height: 19px;
            top: 0;
            background-color: #d8d8d8;
            border-radius: 3px;
        }
        &::after {
            width: 20px;
            height: 19px;
            top: 0;
            background-size: 55%;
            left: -1.55rem;
        }
    }
    /deep/ .custom-control-inline {
        margin-right: 0;
    }
    /deep/ .custom-checkbox .custom-control-input:checked ~ .custom-control-label::after {
        background-image: url('../../../assets/checkIcon.svg');
    }
    /deep/ .custom-checkbox .custom-control-input:checked ~ .custom-control-label::before {
        background-color: #12aaeb;
    }
    /deep/ .custom-checkbox .custom-control-input:checked ~ .custom-control-label
      .enum-editor_list_item_descr {
          color: #1a3e6c;
    }
</style>
