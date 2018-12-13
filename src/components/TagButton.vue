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
                return `${this.title} &#10006;`;
            } else if (this.type === 'secondary') {
                return `${this.title} &#10010;`;
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
        border-radius: 12px;
        background-color: #C0C0C0;
        color: #000;
        padding: 2px 10px;
        display: inline-block;
        margin: 0 2px;
        cursor: pointer;
        user-select: none;
        &:hover {
            opacity: .8;
        }
        &-primary {
            font-size: 12px;
            line-height: 12px;
        }
        &-secondary {
            font-size: 10px;
            line-height: 12px;
            background-color: #DCDCDC;
            opacity: .4;
        }
    }
</style>
