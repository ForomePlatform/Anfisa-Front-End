<template>
    <b-dropdown size="sm" :text="text">
        <b-dropdown-item-button v-for="item in data" :key="item" @click="onChange(item)">
            {{item}}
        </b-dropdown-item-button>
    </b-dropdown>
</template>

<script>
    export default{
        name: 'AdvancedButton',
        props: {
            text: {
                default: 'SELECT',
                type: String
            },
            data: {
                type: Array
            },
            onChange: {
                type: Function,
            }
        }
    }
</script>




<style scoped lang="scss">
    .dropdown {
        min-width: 133px;
        .dropdown-item {
            font-size: 14px;
            padding: 2px 10px;
        }
    }
    /deep/ .dropdown-toggle  {
        
        width: 133px;
        height: 33px;
        border-radius: 3px;
        background-color: #15263e;
        text-align: left;
        font-size: 11px;
        line-height: 1.9;
        border-width: 0;
        letter-spacing: 0px;
        color: #95acbc;
        &:hover {
            background-color: #2bb3ed;
            border-width: 0;
            color: #ffffff;
            &::after{
                border-top-color: #10aaef;
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
</style>
