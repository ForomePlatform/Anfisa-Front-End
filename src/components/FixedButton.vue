<template>
    <div @click="onClick" class="fixed_button">
        <slot />
    </div>
</template>

<script>
export default {
    props: {
        onClick: Function,
    },
};
</script>

<style lang="scss" scoped>
    .fixed_button {
        position: fixed;
        width: 44px;
        height: 94px;
        border-radius: 8px 0 0 8px;
        margin-top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 1;
        opacity: .5;
        &:hover {
            opacity: 1;
        }
    }
</style>
