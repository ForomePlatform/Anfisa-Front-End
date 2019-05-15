<template>
    <div class="base-expand-button" @click="onClick">
        <div class="base-expand-button_title">
            {{text}}
        </div>
        <img v-if="collapse" alt="collapse" src="@/assets/collapseFilterIcon.svg"/>
        <img v-else alt="expand" src="@/assets/expandFilterIcon.svg"/>
    </div>
</template>

<script>
export default {
    props: {
        collapse: Boolean,
        onClick: Function,
    },
    computed: {
        text() {
            return this.collapse ? 'Collapse all' : 'Expand all';
        },
    },
};

</script>

<style lang="scss" scoped>
    .base-expand-button {
        display: flex;
        justify-content: space-between;
        align-content: center;
        width: 85px;
        height: 21px;
        line-height: 21px;
        border-radius: 2px;
        background-color: #a5b7c6;
        padding: 0 8px;
        border-radius: 2px;
        cursor: pointer;
        &_title {
            font-size: 11px;
            letter-spacing: 0px;
            color: #ffffff;
            text-align: center;
        }
        &:hover {
            background-color: #2bb3ed;
        }
    }
</style>
