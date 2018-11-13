<template>
    <div @click="toggle" class="custom-toggle mr-3">
        <div v-bind:class="{'custom-toggle_item': true, 'custom-toggle_item__active': isActive}">
            GROUPS
        </div>
        <div v-bind:class="{'custom-toggle_item': true, 'custom-toggle_item__active': !isActive}">
            LIST
        </div>
        <div ref="toggle" v-bind:class="[isActive ? 'custom-toggle_slider__active' 
            : 'custom-toggle_slider__inactive', 'custom-toggle_slider']" 
        />
    </div>
</template>

<script>
    export default {
        name: 'CustomToggle',
        props: {
            isActive: Boolean,
            toggle: Function,
        }
    }
</script>

<style lang="scss" scoped>
    .custom-toggle {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 132px;
        height: 24px;
        border-radius: 12px;
        background-color: #0b2341;
        font-size: 11px;
        letter-spacing: 0px;
        color: #597a96;
        padding: 0 15px;
        cursor: pointer;
        &_slider {
            position: absolute;
            top: 0;
            margin: 2px;
            background-color: #11a9eb;
            width: 74px;
            height: 100%;
            border-radius: 10px;
            transition: 0.3s ease all;
            height: 20px;
            &__active {
                left: 0;
                width: 71px;
            }
            &__inactive {
                left: 76px;
                width: 52px;
            }
        }
        &_item {
            z-index: 3;
            user-select: none; 
            &__active {
                color: #fff;
            }
        }
    }
</style>

