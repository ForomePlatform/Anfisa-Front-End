<template>
    <div class="zygosity-editor">
        <div class="zygosity-editor_list">
            <b-form-checkbox
              class="zygosity-editor_list_item"
              v-for="(item, index) in family"
              v-bind:key="index + '_' + item"
              @change="changeFamily(index)"
              :checked="selectedFamily.includes(index)"
            >
                <div class="zygosity-editor_list_item_descr" >
                    {{item}}
                 </div>
            </b-form-checkbox>
        </div>
        <div class="separator"/>
        <div class="zygosity-editor_list">
            <b-form-checkbox
              class="zygosity-editor_list_item"
              v-for="([item, count], index) in variants"
              v-bind:key="index + '_' + item"
              @change="changeVariants(item)"
              :checked="selectedVariants.includes(item)"
            >
                <div class="zygosity-editor_list_item_descr" >
                    <span>
                        {{item}}
                    </span>
                    <span>
                        ({{count}})
                    </span>
                </div>
            </b-form-checkbox>
        </div>
        <div
          :class="[allowAdding ? 'zygosity-editor_button__active' : '', 'zygosity-editor_button']"
          v-on="allowAdding ? { click: addVariants } : {}"
        >
            {{buttonText}}
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            query: '',
            selectedFamily: this.preselectedFamily.slice() || [],
            selectedVariants: this.preselectedVariants.slice() || [],
        };
    },
    computed: {
        allowAdding() {
            return this.selectedFamily.length && this.selectedVariants.length;
        },
    },
    props: ['family', 'variants', 'preselectedFamily', 'preselectedVariants', 'onSubmit', 'onFamilyChange', 'buttonText'],
    methods: {
        addVariants() {
            this.onSubmit(this.selectedFamily.slice(), this.selectedVariants.slice());
        },
        changeVariants(item) {
            if (this.selectedVariants.includes(item)) {
                const index = this.selectedVariants.indexOf(item);
                this.selectedVariants.splice(index, 1);
            } else {
                this.selectedVariants.push(item);
            }
        },
        changeFamily(item) {
            if (this.selectedFamily.includes(item)) {
                const index = this.selectedFamily.indexOf(item);
                this.selectedFamily.splice(index, 1);
            } else {
                this.selectedFamily.push(item);
            }
            this.selectedVariants = [];
            this.onFamilyChange(this.selectedFamily);
        },
        clearQuery() {
            this.query = '';
        },
    },
    // Update data if it was changed in the store
    // (e.g on change filter or on changes data via StatView)
    watch: {
        preselectedFamily(newVal) {
            // copy array to avoid direct changes in store
            this.selectedFamily = newVal.slice();
        },
        preselectedVariants(newVal) {
            // copy array to avoid direct changes in store
            this.selectedVariants = newVal.slice();
        },
    },
};
</script>

<style lang="scss" scoped>
    .zygosity-editor {
        margin: 0 30px;
        background-color: #fff;
        border-radius: 4px;
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
        &:hover .zygosity-editor_button__active {
            background-color: #2bb3ed;
        }
        &_button {
            height: 44px;
            line-height: 44px;
            font-size: 16px;
            letter-spacing: 0px;
            color: #ffffff;
            font-weight: 800;
            text-align: center;
            border-radius: 0 0 4px 4px;
            background-color: #a9a9a9;
            &__active {
                background-color: #a9a9a9;
                cursor: pointer;
                &:hover {
                    background-color: #48c3f7;
                }
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
