<template>
    <div>
        <b-button :class="[disabled ? 'btn_row-handlder_disabled' : '',
        `${className}`]"
                  :disabled="disabled"
                  :title="titleProp"
                  :variant="variant"
                  @click="onClick">{{ text }}
        </b-button>
    </div>
</template>

<script>
export default {
    name: 'Button',
    props: {
        text: {
            type: String,
            default: '',
        },
        className: {
            type: String,
            default: '',
        },
        onClick: {
            type: Function,
            default: () => {},
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: '',
        },
        variant: {
            type: String,
            default: 'primary',
        },
    },
    computed: {
        titleProp() {
            return this.title ? this.title : this.text;
        },
    },
};
</script>

<style lang="scss" scoped>
    .btn {
        width: 35px;
        float: right;
        height: 35px;
        border-radius: 17px;
        background-color: #2bb3ed;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
        letter-spacing: 0;
        color: #ffffff;
        font-weight: 800;
        cursor: pointer;
        user-select: none;
        margin-top: 2px;

        &:hover {
            background-color: #597995 !important;
        }

        &_disabled {
            background-color: #597995;
        }

        &_row-handlder {
            float: none;
            display: inline;
            white-space: pre-line;
            width: 120px;
            height: 45px;
            margin-top: 10px;
            margin-right: 10px;
        }

        &_footer {
            padding: 5px 18px;
            height: 25px;
            border: none;
            display: flex;
            width: 78px;
        }

        &_remove-row {
            margin-right: 5px;
        }
    }
</style>
