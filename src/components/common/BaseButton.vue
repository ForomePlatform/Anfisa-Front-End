<template>
    <div @click ="onClick" class="base-button">
        {{title}}
    </div>
</template>

<script>
export default {
    name: 'BaseButton',
    props: {
        title: String,
        onClick: {
            type: Function,
            default: () => {},
        },
    },
};
</script>

<style lang="scss" scoped>
    .base-button {
        width: 100%;
        height: 33px;
        border-radius: 17px;
        background-color: #2bb3ed;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
        letter-spacing: 0px;
        color: #ffffff;
        font-weight: 800;
        cursor: pointer;
        user-select: none;
        &:hover {
            background-color: #597995;
        }
    }
</style>

