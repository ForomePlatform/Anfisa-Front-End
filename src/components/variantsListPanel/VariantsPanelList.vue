<template>
    <div class="variants-list">
        <div v-for="item in data"
          v-bind:key="item.id"
          v-bind:class="{
              'variants-list_item': true,
              'variants-list_item__active': selectedItem === item.id
          }"
          @click="selectItem(item.id)"
        >
            <BaseVariantIcon :color="item.color" class="mr-2"/>
            <span
              v-html="item.name"
              v-b-popover.hover = "{
                  content: item.name,
                  html: true,
                  placement: 'top',
                  delay: { show: 400, hide: 0 }
                }"
            />
        </div>
    </div>
</template>

<script>
import BaseVariantIcon from './BaseVariantIcon.vue';

export default {
    name: 'VariantList',
    props: {
        data: Array,
        selectedItem: Number,
        selectItem: Function,
        root: Boolean,
    },
    components: {
        BaseVariantIcon,
    },
    mounted() {
        if (this.root) {
            this.$store.commit('setListMounting', false);
        }
    },
    updated() {
        const ItemElement = document.querySelector('.variants-list > .variants-list_item__active');
        const ListElement = document.querySelector('.baron__scroller');
        if ((!ListElement) || (!ItemElement)) {
            return;
        }
        const ItemRect = ItemElement.getBoundingClientRect();
        const ListRect = ListElement.getBoundingClientRect();
        let diff = 0;
        if (ListRect.top > ItemRect.top) {
            diff = ItemRect.top - ListRect.top;
        }
        if (ItemRect.bottom > ListRect.bottom) {
            diff = ItemRect.bottom - ListRect.bottom;
        }
        ListElement.scrollTop += diff;
    },
};
</script>

<style lang="scss" scoped>
    .variants-list {
        &_item {
            display: flex;
            align-items: center;
            height: 29px;
            width: 100%;
            font-size: 12px;
            letter-spacing: 0px;
            color: #95acbc;
            cursor: pointer;
            padding: 0 14px;
            white-space: nowrap;
            overflow: hidden;
            user-select: none;
            &:hover {
                color: #ffffff;
            }
            &__active {
                color: #ffffff;
                font-weight: 600;
                background-color: #182e4b;
            }
        }
    }
</style>
