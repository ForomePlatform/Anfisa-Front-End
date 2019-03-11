<template>
    <div class="filter-details">
        <div
          v-for="(condition, index) in currentConditions"
          v-bind:key="index + '-' + condition[1]"
          class="filter-details_item"
        >
            <StatView :onRemove="() => removeHandler(condition[1])">
                <FloatView
                  v-if="condition[0] === statTypes.numeric"
                  :name="condition[1]"
                  :data="condition.slice(2)"
                />
                <EnumView
                  v-else-if="condition[0] === statTypes.enum || condition[0] === statTypes.status"
                  :type="condition[0]"
                  :name="condition[1]"
                  :selectedOperator="condition[2]"
                  :data="condition[3]"
                  :changeOperator="changeOperatorHandler"
                  :removeItem="removeEnumItem"
                />
            </StatView>
        </div>
    </div>
</template>

<script>
import EnumView from './statView/EnumView.vue';
import FloatView from './statView/FloatView.vue';
import StatView from './statView/StatView.vue';
import {
    STAT_TYPE_ENUM,
    STAT_TYPE_STATUS,
    STAT_NUMERIC,
} from './../../common/constants';

export default {
    computed: {
        currentConditions() {
            return this.$store.state.currentConditions;
        },
        statTypes() {
            return {
                enum: STAT_TYPE_ENUM,
                status: STAT_TYPE_STATUS,
                numeric: STAT_NUMERIC,
            };
        },
    },
    components: {
        StatView,
        EnumView,
        FloatView,
    },
    methods: {
        removeHandler(name) {
            this.$store.commit('removeCurrentCondition', name);
            this.$store.dispatch('getListByFilters');
        },
        changeOperatorHandler(name, operator) {
            this.$store.commit('changeConditionOperator', { name, operator });
            this.$store.dispatch('getListByFilters');
        },
        removeEnumItem(name, itemIndex) {
            this.$store.commit('removeConditionItem', { name, itemIndex });
            this.$store.dispatch('getListByFilters');
        },
    },
};
</script>

<style lang="scss" scoped>
    .filter-details {
        overflow-y: auto;
        padding: 0 21px;
        width: 866px;
        max-height: 730px;
        box-shadow: 0px 12px 24px rgba(24,64,104,0.09);
        background-color: #ffffff;
        &_item {
            padding: 10px 0;
            background-image: linear-gradient(to right, #b9bec5 25%,rgba(39, 63, 89, 0) 0%);
            background-position: bottom;
            background-size: 8px 2px;
            background-repeat: repeat-x;
        }
    }
</style>
