<template>
    <div class="base-header">
        <div class="base-header_title">
            {{title}}
        </div>
        <div>
            <img
              v-if="type === 'project'"
              class="base-header_icon"
              alt="select project"
              src="@/assets/selectProjectIcon.svg"
              v-b-popover.hover = "popoverHandler('Select workspace')"
              @click="onClick"
            />
            <img
              v-if="type === 'project'"
              class="base-header_icon  ml-2"
              alt="project"
              src="@/assets/projectIcon.svg"
              v-b-popover.hover = "popoverHandler('Project')"
            />
            <img
              v-if="type === 'filter' && active"
              class="base-header_icon  ml-2"
              alt="filter"
              src="@/assets/filterIconRed.svg"
              @click="onClick"
              v-b-popover.hover = "popoverHandler('Edit filter')"
            />
            <img
              v-else-if="type === 'filter'"
              class="base-header_icon  ml-2"
              alt="filter"
              src="@/assets/filterIcon.svg"
              @click="onClick"
              v-b-popover.hover = "popoverHandler('Edit filter')"
            />
        </div>
    </div>
</template>

<script>
import { showPopover } from '@/common/utils';

export default {
    name: 'BaseHeader',
    props: {
        title: String,
        type: String,
        active: Boolean,
        onClick: {
            type: Function,
            default: () => {},
        },
    },
    methods: {
        popoverHandler(title) {
            return showPopover(title);
        },
    },
};
</script>

<style lang="scss" scoped>
    .base-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 16px;
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
