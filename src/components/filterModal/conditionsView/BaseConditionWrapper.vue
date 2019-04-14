<template>
    <div class="stat-view">
        <div class="stat-view_left">
            <slot />
        </div>
        <div class="stat-view_right" @click="onRemove"/>
    </div>
</template>

<script>
export default {
    props: ['onRemove'],
};
</script>

<style lang="scss" scoped>
    .stat-view {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 16px;
        letter-spacing: 0px;
        color: #627490;
        &_right {
            flex: 0 0 auto;
            width: 30px;
            height: 30px;
            background-image: url('../../../assets/statRemoveIcon.png');
            background-repeat: no-repeat;
            background-position: center;
            cursor: pointer;
            &:hover {
                background-image: url('../../../assets/statRemoveHoverIcon.png');
            }
        }
        &_left {
            flex: 1 1 auto;
        }

    }
</style>
