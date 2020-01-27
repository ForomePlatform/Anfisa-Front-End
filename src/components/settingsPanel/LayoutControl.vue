<template>
    <div class="layout-control">
        <div class="layout-control_title">
            LAYOUT
        </div>
        <div>
            <img
              class="layout-control_icon"
              alt="Expand tables"
              src="@/assets/expandLayout.svg"
              @click="expand"
              v-b-popover.hover = "popoverHandler('Expand tables')"
            />
            <img
              class="layout-control_icon  ml-2"
              alt="Collapse tables"
              src="@/assets/collapseLayout.svg"
              @click="collapse"
              v-b-popover.hover = "popoverHandler('Collapse tables')"
            />
            <img
              class="layout-control_icon  ml-2"
              alt="Reset layout"
              src="@/assets/redo.svg"
              @click="resetTablesLayout"
              v-b-popover.hover = "popoverHandler('Reset layout')"
            />
        </div>
    </div>
</template>

<script>
import EventBus from '@/eventBus';
import { showPopover } from '@/common/utils';

export default {
    name: 'SettingsHeader',
    methods: {
        expand() {
            EventBus.$emit('EXPAND_TABLES', true);
        },
        collapse() {
            EventBus.$emit('EXPAND_TABLES', false);
        },
        resetTablesLayout() {
            EventBus.$emit('RESET_TABLES_LAYOUT');
        },
        popoverHandler(title) {
            return showPopover(title);
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
