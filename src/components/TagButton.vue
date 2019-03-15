<template>
    <div
      v-html="text"
      :class="{
        'tag-button': true,
        'tag-button-primary': type === 'primary',
        'tag-button-secondary': type === 'secondary',
      }"
      :style="{'background-color': color}"
      v-on:click="() => onClick(title)"
    />
</template>

<script>
import { TAGS_COLORS } from '../common/constants';

export default {
    props: {
        title: String,
        type: String,
        onClick: Function,
    },
    computed: {
        text() {
            if (this.type === 'primary') {
                return `${this.title} <span>&#10006;</span>`;
            } else if (this.type === 'secondary') {
                return `${this.title} <span>&#128933;</span>`;
            }
            return this.title;
        },
        color() {
            return TAGS_COLORS[this.title] || null;
        },
    },
};
</script>

<style lang="scss" scoped>
    .tag-button {
        height: 18px;
        line-height: 18px;
        border-radius: 2px;
        background-color: #959595;
        color: #fff;
        padding: 0 6px;
        display: inline-block;
        margin: 2px 2px;
        cursor: pointer;
        user-select: none;
        font-size: 12px;
        /deep/ span {
            font-size: 10px;
        }
        &:hover {
            opacity: .8;
        }
        &-primary {
            opacity: 1;
        }
        &-secondary {
            font-size: 12px;
            background-color: #DCDCDC;
            opacity: .4;
        }
    }
</style>
