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
            <VariantIcon :color="item.color" class="mr-2"/>
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
import VariantIcon from './VariantIcon.vue';

export default {
    name: 'VariantList',
    props: {
        data: Array,
        selectedItem: Number,
        selectItem: Function,
        root: Boolean,
    },
    components: {
        VariantIcon,
    },
    mounted() {
        if (this.root) {
            this.$store.commit('setListMounting', false);
        }
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
