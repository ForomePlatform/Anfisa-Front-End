<template>
    <div :class="['baron baron__root baron__clipper', className]">
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
    name: 'BaseScrollVertical',
    props: {
        className: String,
    },
    mounted() {
        baron({
            root: `.${this.className}`,
            scroller: '.baron__scroller',
            bar: '.baron__bar',
            scrollingCls: '_scrolling',
            draggingCls: '_dragging',
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
    }
    .baron__scroller {
        overflow-y: scroll;
        -ms-overflow-style: none;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        margin: 0;
        border: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        -webkit-overflow-scrolling: touch;
    }
    .baron__scroller::-webkit-scrollbar {
        width: 0;
        height: 0;
    }
    .baron__track {
        display: none;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: 10px;
        background-color: #132747;
    }

    .baron._scrollbar .baron__track {
        display: block;
    }
    .baron__free {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
    }
    .baron__bar {
        display: none;
        position: absolute;
        right: 0;
        z-index: 1;
        width: 10px;
        background-color: #193b67;
        &:hover {
            cursor: pointer;
        }
    }
    ._scrolling, ._dragging {
        .baron__bar {
            background-color: #11a9eb;
        }
        .baron__track {
            width: 10px;
            background-color: #353c61;
        }
    }
    .baron._scrollbar .baron__bar {
        display: block;
    }
    .baron__control {
        display: none;
    }
</style>
