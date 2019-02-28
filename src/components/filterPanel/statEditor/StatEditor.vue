<template>
    <div>
        <IntEditor v-if="type === 'int'" />
        <FloatEditor
          v-else-if="type === 'float'"
          :min="data[0]"
          :max="data[1]"
          :preselectedMin="preselectedMin"
          :preselectedMax="preselectedMax"
          :onSubmit="submitHandler"
        />
        <EnumEditor
          v-else-if="type === 'enum'"
          :list="data"
          :preselectedData="preselectedData"
          :onSubmit="submitEnumHandler"
        />
    </div>
</template>

<script>
import IntEditor from './IntEditor.vue';
import FloatEditor from './FloatEditor.vue';
import EnumEditor from './EnumEditor.vue';
import { ENUM_DEFAULT_OPERATOR } from '../../../common/constants';

export default {
    props: ['type', 'data', 'name'],
    components: {
        IntEditor,
        FloatEditor,
        EnumEditor,
    },
    computed: {
        // return data for current condition, {data: ..., type: ...}
        oCurrentCondition() {
            return this.$store.getters.oCurrentConditions[this.name];
        },
        // for flaot type,  this.oCurrentCondition.data = [min, max, ...]
        preselectedMin() {
            if (this.oCurrentCondition && this.oCurrentCondition.data) {
                return this.oCurrentCondition.data[0];
            }
            return this.data[0];
        },
        // for flaot type,  this.oCurrentCondition.data = [min, max, ...]
        preselectedMax() {
            if (this.oCurrentCondition && this.oCurrentCondition.data) {
                return this.oCurrentCondition.data[1];
            }
            return this.data[1];
        },
        // For enum type, this.oCurrentCondition.data = [operator, selectedItemsArray]
        preselectedData() {
            if (this.oCurrentCondition && this.oCurrentCondition.data) {
                return this.oCurrentCondition.data[1];
            }
            return [];
        },
    },
    methods: {
        // Apply float editor changes: min and max values
        submitHandler(min, max) {
            const condition = [this.type, this.name, min, max];
            this.$store.commit('setCurrentConditions', condition);
        },
        // Apply  enum editor changes: selected list of items
        submitEnumHandler(data) {
            const condition = [this.type, this.name, ENUM_DEFAULT_OPERATOR, [...data]];
            this.$store.commit('setCurrentConditions', condition);
        },
    },
};
</script>

<style lang="scss" scoped>

</style>
