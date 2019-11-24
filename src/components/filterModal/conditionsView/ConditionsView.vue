<template>
    <div class="filter-modal-conditions">
        <div
          v-for="(condition, index) in currentConditions"
          class="filter-modal-conditions_item"
          :key="index"
        >
            <BaseConditionWrapper :onRemove="() => removeHandler(condition[1])">
                <BaseViewFloat
                  v-if="displayNumeric(condition)"
                  :name="condition[1]"
                  :data="condition[2]"
                />
                <BaseViewEnum
                  v-else-if="displayEnum(condition)"
                  :type="condition[0]"
                  :name="condition[1]"
                  :selectedOperator="condition[2]"
                  :data="condition[3]"
                  :changeOperator="changeOperatorHandler"
                  :removeItem="removeEnumItem"
                />
                <BaseViewZygosity
                  v-else-if="displayZygosity(condition)"
                  :name="condition[1]"
                  :data="condition[4]"
                  :removeItem="removeZygosityItem"
                />
            </BaseConditionWrapper>
        </div>
    </div>
</template>

<script>
import {
    STAT_NUMERIC,
    STAT_TYPE_ENUM,
    STAT_TYPE_IMPORT,
    STAT_TYPE_STATUS,
    STAT_TYPE_ZYGOSITY,
} from '@/common/constants';
import BaseConditionWrapper from './BaseConditionWrapper.vue';
import BaseViewEnum from './BaseViewEnum.vue';
import BaseViewFloat from './BaseViewFloat.vue';
import BaseViewZygosity from './BaseViewZygosity.vue';

export default {
    name: 'ConditionsView',
    components: {
        BaseConditionWrapper,
        BaseViewEnum,
        BaseViewFloat,
        BaseViewZygosity,
    },
    computed: {
        currentConditions() {
            return this.$store.getters.getCurrentConditionsByStatTypes([
                STAT_TYPE_ENUM,
                STAT_TYPE_STATUS,
                STAT_NUMERIC,
                STAT_TYPE_ZYGOSITY,
            ]);
        },
        importedConditions() {
            return this.$store.getters.getCurrentConditionsByStatTypes([STAT_TYPE_IMPORT]);
        },
    },
    methods: {
        displayEnum(condition) {
            return condition[0] === STAT_TYPE_ENUM || condition[0] === STAT_TYPE_STATUS;
        },
        displayNumeric(condition) {
            return condition[0] === STAT_NUMERIC;
        },
        displayZygosity(condition) {
            return condition[0] === STAT_TYPE_ZYGOSITY;
        },
        removeHandler(name) {
            if (this.importedConditions.find(condition => condition[1] === name)) {
                this.$store.commit('removeCurrentCondition', { name, type: STAT_TYPE_ENUM });
                this.$store.dispatch('getListByConditions').then(() => {
                    this.$store.commit('removeCurrentCondition', { name, type: 'import' });
                    this.$store.dispatch('getListByConditions');
                });
            } else {
                this.$store.commit('removeCurrentCondition', { name });
                this.$store.dispatch('getListByConditions');
            }
        },
        changeOperatorHandler(name, operator) {
            this.$store.commit('changeConditionOperator', { name, operator });
            this.$store.dispatch('getListByConditions');
        },
        removeEnumItem(name, itemIndex, data) {
            if (this.importedConditions.find(condition => condition[1] === name)) {
                this.removeHandler(name);
            } else {
                this.$store.commit('removeConditionItem', { name, itemIndex });
                if (!data.length) {
                    this.$store.commit('removeCurrentCondition', { name });
                }
                this.$store.dispatch('getListByConditions');
            }
        },
        removeZygosityItem(name, itemIndex) {
            this.$store.commit('removeZygosityItem', { name, itemIndex });
            this.$store.dispatch('getListByConditions');
        },
    },
};
</script>

<style lang="scss" scoped>
    .filter-modal-conditions {
        overflow-y: auto;
        padding: 0 21px;
        width: 100%;
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
