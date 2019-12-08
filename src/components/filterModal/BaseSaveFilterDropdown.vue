<template>
<b-dropdown
  right
  :class="[processing ? 'popup-processing' : filterName ? 'popup-menu' : 'popup-form']"
  :disabled="!enabled"
  ref="dropdown"
>
    <template slot="button-content" >
        <div :class="[!enabled ? 'main-btn__disabled' : 'main-btn__enabled', 'main-btn']">
            <img v-if="enabled" alt="save" src="@/assets/filterSaveIcon.svg"/>
            <img v-else alt="save" src="@/assets/filterSaveDisabledIcon.png"/>
            SAVE
        </div>
    </template>

    <b-dropdown-form v-if="processing">
        <b-dropdown-item class="popup-processing_info">
            <img alt="processing" src="@/assets/processingIcon.png" class="mr-2"/>
            "{{filterName}}" has been saved
        </b-dropdown-item>
    </b-dropdown-form>

    <b-dropdown-form v-else-if="!filterName">
        <b-form-group label="Filters Name" label-for="filter-name">
            <b-form-input @keydown.enter.stop.prevent="onSaveHandler" size="sm" id="filter-name" v-model="name"/>
        </b-form-group>
        <b-form-group class="popup-form_btns">
            <b-button
              class="popup-form_btns_save"
              variant="primary"
              size="sm"
              @click="onSaveHandler"
            >
                SAVE FILTER
            </b-button>
            <b-button class="popup-form_btns_cancel" variant="primary" size="sm" @click="onCancel">
                CANCEL
            </b-button>
        </b-form-group>
    </b-dropdown-form>

    <b-dropdown-form v-else-if="filterName">
        <b-dropdown-item-button class="popup-menu_save" @click="onUpdateHandler">
            Save chaneges to "{{filterName}}"
        </b-dropdown-item-button>
        <b-dropdown-item-button class="popup-menu_save-as" @click="onSaveAsHandler">
            SAVE AS NEW FILTER
        </b-dropdown-item-button>
    </b-dropdown-form>

</b-dropdown>
</template>

<script>
export default {
    props: ['enabled', 'filterName', 'processing', 'onSave', 'onSaveAs'],
    data() {
        return {
            name: this.filterName || '',
        };
    },
    methods: {
        onUpdateHandler() {
            this.$refs.dropdown.hide();
            this.onSave(this.filterName);
        },
        onSaveHandler() {
            this.$refs.dropdown.hide();
            this.onSave(this.name);
        },
        onSaveAsHandler() {
            this.onSaveAs();
            const that = this;
            setTimeout(() => that.$refs.dropdown.show(), 0);
        },
        onCancel() {
            this.$refs.dropdown.hide();
        },
    },
};
</script>

<style lang="scss" scoped>
    .main-btn {
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
        width: 103px;
        padding: 0 25px 0 20px;
        background-color: #2bb3ed;
        &__disabled {
            background-color: #15263e;
            color: #1a3e6c;
            cursor: default;
        }
        &__enabled {
            &:hover {
                background-color: #48c3f7;
            }
        }
    }
    /deep/ .dropdown-toggle {
        background: none;
        color: inherit;
        border: none;
        padding: 0;
        font: inherit;
        cursor: pointer;
        outline: none;
        width: 103px;
        height: 33px;
        margin-left: 22px;
        border-radius: 17px;
        &:focus {
            box-shadow: none;
            &:after {
                display: none;
            }
        }
        &:after {
            display: none;
        }
    }
    .popup-form {
        /deep/ .dropdown-menu {
            top: 26px !important;
            min-width: 268px;
            width: fit-content;
            border-radius: 3px;
            background-color: #2bb3ed;
            padding: 14px 16px 0 16px;
            font-size: 12px;
            letter-spacing: 0px;
            color: #0a1c34;
            &:before {
                content: '';
                position: absolute;
                display: block;
                width: 0;
                height: 0;
                top: -16px;
                right: 24px;
                border-style: solid;
                border-color: transparent;
                border-width: 8px 8px;
                border-bottom-color: #2bb3ed;
            }
            .b-dropdown-form {
                padding: 0;
            }
        }
        &_btns {
            display: flex;
            justify-content: end;
            &_cancel {
                width: 77px;
                height: 25px;
                border-radius: 13px;
                background-color: #ffffff;
                font-size: 11px;
                letter-spacing: 0px;
                color: #0a1c34;
                font-weight: 800;
                text-align: center;
                border: none;
                float: right;
                &:hover {
                    background-color: #e8e8e8;
                }
            }
            &_save {
                width: 107px;
                height: 25px;
                border-radius: 13px;
                background-color: #0a1c34;
                font-size: 11px;
                letter-spacing: 0px;
                color: #ffffff;
                font-family: "Arial";
                font-weight: 800;
                text-align: center;
                border: none;
                float: right;
                margin-left: 14px;
                &:hover {
                    background-color: #1a3e6c;
                }
            }
        }
    }
    .popup-menu {
        .b-dropdown-form {
            padding: 0;
        }
        /deep/ .dropdown-menu {
            top: 26px !important;
            width: fit-content;
            min-width: 268px;
            border-radius: 3px;
            background-color: #e7e7e7;
            font-size: 12px;
            letter-spacing: 0px;
            color: #0a1c34;
            padding: 0;
            margin: 0;
            &:before {
                content: '';
                position: absolute;
                display: block;
                width: 0;
                height: 0;
                top: -16px;
                right: 24px;
                border-style: solid;
                border-color: transparent;
                border-width: 8px 8px;
                border-bottom-color: #e7e7e7;
            }
        }
        &_save {
            height: 40px;
            font-size: 12px;
            letter-spacing: 0px;
            color: #0a1c34;
            text-align: center;
            cursor: pointer;
            &:hover {
                background-color: #bfe8fa;
            }
            &:focus {
                outline: 0;
            }
        }
        &_save-as {
            height: 40px;
            font-size: 11px;
            letter-spacing: 0px;
            color: #ffffff;
            font-weight: 800;
            text-align: center;
            background-color: #2bb3ed;
            border-radius: 0 0 3px 3px;
            cursor: pointer;
            &:hover {
                background-color: #48c3f7;
            }
            &:focus {
                outline: 0;
            }
        }
    }
    .popup-processing {
        .b-dropdown-form {
            padding: 0;
        }
        /deep/ .dropdown-menu {
            top: 26px !important;
            width: 259px;
            border-radius: 3px;
            font-size: 12px;
            letter-spacing: 0px;
            color: #0a1c34;
            padding: 0;
            margin: 0;
            &:before {
                content: '';
                position: absolute;
                display: block;
                width: 0;
                height: 0;
                top: -16px;
                right: 24px;
                border-style: solid;
                border-color: transparent;
                border-width: 8px 8px;
                border-bottom-color: #e2d988;
            }
        }
        &_info {
            height: 40px;
            line-height: 30px;
            text-align: center;
            font-size: 14px;
            letter-spacing: 0px;
            color: #0a1c34;
            cursor: default;
            background-color: #e2d988;
        }
    }
</style>
