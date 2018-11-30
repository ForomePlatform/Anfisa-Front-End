<template>
    <div :class="['baron baron__clipper _scrollbar', id]">
        <div class="baron__scroller">
            <slot />
        </div>
        <div class="baron__track">
            <div class="baron__free">
                <div class="baron__bar"></div>
            </div>
        </div>
        </div>
</template>

<script>
import baron from 'baron';

export default {
    name: 'CustomScroll',
    props: {
        id: String,
    },
    mounted() {
        baron({
            root: `.${this.id}`,
            scroller: '.baron__scroller',
            bar: '.baron__bar',
            scrollingCls: '_scrolling',
            draggingCls: '_dragging',
            direction: 'h',
        }).controls({
            track: '.baron__track',
        });
    },
};
</script>

<style lang="scss" scoped>
    .baron__clipper {
        position: relative;
        overflow: hidden;
        box-sizing: border-box;
        height: fit-content;
        overflow-x: scroll;
        padding: 10px;
    }
    .baron__scroller {
        overflow-x: scroll;
        overflow-y: hidden;
        -webkit-overflow-scrolling: touch;
        height:  fit-content !important;
        min-height: fit-content !important;
    }
    .baron__scroller::-webkit-scrollbar {
        width: 0;
        height: 0;
    }
    .baron__track {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 5px;
        background-color: #efeff3;
    }

    .baron._scrollbar .baron__track {
        display: block;
    }
    .baron__free {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
    }
    .baron__bar {
        display: none;
        position: absolute;
        top: 0;
        z-index: 1;
        height: 5px;
        background-color: #b7d5e9;
        &:hover {
            cursor: pointer;
        }
    }
    ._scrolling, ._dragging {
        .baron__bar {
            background-color: #11a9eb;
        }
        .baron__track {
            height: 5px;
            background-color: #b7d5e9;
        }
    }
    .baron._scrollbar .baron__bar {
        display: block;
    }
    .baron__control {
        display: none;
    }
</style>
