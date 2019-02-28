<template>
    <div class="filter-details">
        <div
          v-for="condition in currentConditions"
          v-bind:key="condition[1]"
          class="filter-details_item"
        >
            <FloatView
              v-if="condition[0] === 'float'"
              :name="condition[1]"
              :data="condition.slice(2)"
            />
            <IntView
              v-else-if="condition[0] === 'int'"
              :name="condition[1]"
              :data="condition.slice(2)"
            />
            <EnumView
              v-else-if="condition[0] === 'enum'"
              :name="condition[1]"
              :operator="condition[2]"
              :data="condition[3]"
            />
        </div>
    </div>
</template>

<script>
import EnumView from './statView/EnumView.vue';
import IntView from './statView/IntView.vue';
import FloatView from './statView/FloatView.vue';

export default {
    computed: {
        currentConditions() {
            return this.$store.state.currentConditions;
        },
    },
    components: {
        EnumView,
        IntView,
        FloatView,
    },
};
</script>

<style lang="scss" scoped>
    .filter-details {
        padding: 0 21px;
        width: 866px;
        max-height: 730px;
        box-shadow: 0px 12px 24px rgba(24,64,104,0.09);
        background-color: #ffffff;
        &_item {
            padding: 16px 0;
            background-image: linear-gradient(to right, #b9bec5 25%,rgba(39, 63, 89, 0) 0%);
            background-position: bottom;
            background-size: 8px 2px;
            background-repeat: repeat-x;
        }
    }
</style>
