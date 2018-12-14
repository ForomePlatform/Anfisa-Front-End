<template>
    <button class="btn btn-secondary btn-sm advanced-btn" :onClick="onClick">
        {{text}}
    </button>
</template>

<script>
export default{
    name: 'AdvancedButton',
    props: {
        text: {
            default: 'Select',
            type: String,
        },
        onClick: {
            type: Function,
        },
    },
};
</script>

<style scoped lang="scss">
    .advanced-btn {
        text-align: left;
        position: relative;
        padding-right: 1.6em;
        overflow: hidden;
        width: 160px;
        background-color: #587a97;
        font-weight: bold;
        font-size: 11px;
        line-height: 1.9;
        &:hover{
            background-color: #587a97;
            &::after{
                color: #10aaef;
            }
        }
    }
    .advanced-btn::after {
        position: absolute;
        content: "\f0c9";
        right: 1.4em;
        top: 0.1em;
        display: inline-block;
        font-family: FontAwesome;
        width: 0;
        height: 0;
        margin-left: 0.455em;
        font-weight: normal;
        font-size: 14px;

    }
</style>
