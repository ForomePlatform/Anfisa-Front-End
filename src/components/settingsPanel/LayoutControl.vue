<template>
    <div class="layout-control">
        <div class="layout-control_title">
            LAYOUT
        </div>
        <div>
            <img
              class="layout-control_icon"
              alt="settings icon"
              src="@/assets/expandLayout.svg"
              @click="expand"
            />
            <img
              class="layout-control_icon  ml-2"
              alt="open site"
              src="@/assets/collapseLayout.svg"
              @click="collapse"
            />
        </div>
    </div>
</template>

<script>
import EventBus from '@/eventBus';

export default {
    name: 'SettingsHeader',
    methods: {
        expand() {
            EventBus.$emit('EXPAND_TABLES', true);
        },
        collapse() {
            EventBus.$emit('EXPAND_TABLES', false);
        },
    },
};
</script>

<style lang="scss" scoped>
    .layout-control {
        display: flex;
        align-items: center;
        justify-content: space-between;
        &_title {
            font-size: 14px;
            line-height: 14px;
            letter-spacing: 0px;
            color: #2bb3ed;
            font-family: "Arial";
            font-weight: 800;
        }
        &_icon:hover {
            cursor: pointer;
        }
    }
</style>
