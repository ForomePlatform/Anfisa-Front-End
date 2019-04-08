<template>
    <div>
        <LinearEditor
          v-if="render === statTypes.linear || name === 'Dist_from_Exon'"
          :simple="name === 'Dist_from_Exon'"
          :min="data[0]"
          :max="data[1]"
          :preselectedMin="preselectedLinearMin"
          :preselectedMax="preselectedLinearMax"
          :onSubmit="submitHandler"
          :active="Boolean(oCurrentCondition)"
        />
        <LogarithmicEditor
          v-else-if="render === statTypes.logarithmic"
          :preselectedMin="preselectedLogMin"
          :preselectedMax="preselectedLogMax"
          :onSubmit="submitHandler"
        />
        <CoordinateEditor
          v-else-if="render === statTypes.coordinate"
          :min="data[0]"
          :max="data[1]"
          :preselectedMin="preselectedCoordMin"
          :preselectedMax="preselectedCoordMax"
          :onSubmit="submitHandler"
        />
        <EnumEditor
          v-else-if="type === statTypes.enum || type === statTypes.status"
          :list="data"
          :preselectedData="preselectedData"
          :onSubmit="submitEnumHandler"
        />
    </div>
</template>

<script>
import CoordinateEditor from './CoordinateEditor.vue';
import LogarithmicEditor from './LogarithmicEditor.vue';
import LinearEditor from './LinearEditor.vue';
import EnumEditor from './EnumEditor.vue';
import {
    STAT_TYPE_ENUM,
    STAT_TYPE_STATUS,
    ENUM_DEFAULT_OPERATOR,
    STAT_NUMERIC,
    NUMERIC_RENDER_TYPES,
} from '../../../common/constants';

export default {
    props: ['type', 'data', 'name', 'render'],
    components: {
        CoordinateEditor,
        LogarithmicEditor,
        EnumEditor,
        LinearEditor,
    },
    computed: {
        // return data for current condition, {data: ..., type: ...}
        oCurrentCondition() {
            return this.$store.getters.oCurrentConditions[this.name];
        },
        // for numeric type,  this.oCurrentCondition.data = [min, max, ...]
        preselectedLinearMin() {
            const condition = this.conditionByIndex(0);
            const [min, max] = this.data;
            return condition ? Math.max(Math.min(condition, max), min) : min;
        },
        preselectedLinearMax() {
            const condition = this.conditionByIndex(1);
            const [min, max] = this.data;
            return condition ? Math.min(Math.max(condition, min), max) : max;
        },
        preselectedLogMin() {
            return this.conditionByIndex(0) || 0;
        },
        preselectedLogMax() {
            return this.conditionByIndex(1) || 1;
        },
        preselectedCoordMin() {
            return this.conditionByIndex(0) || this.data[0];
        },
        preselectedCoordMax() {
            return this.conditionByIndex(1) || this.data[1];
        },
        // For enum type, this.oCurrentCondition.data = [operator, selectedItemsArray]
        preselectedData() {
            if (this.oCurrentCondition && this.oCurrentCondition.data) {
                return this.oCurrentCondition.list;
            }
            return [];
        },
        statTypes() {
            return {
                enum: STAT_TYPE_ENUM,
                status: STAT_TYPE_STATUS,
                linear: NUMERIC_RENDER_TYPES.LINEAR,
                coordinate: NUMERIC_RENDER_TYPES.COORDINATE,
                logarithmic: NUMERIC_RENDER_TYPES.LOGARITHMIC,
            };
        },
    },
    methods: {
        conditionByIndex(index) {
            return this.oCurrentCondition && this.oCurrentCondition.data
                && this.oCurrentCondition.data[index];
        },
        // Apply float editor changes: min and max values
        submitHandler(min, max) {
            const condition = [STAT_NUMERIC, this.name, [min, max], null];
            this.$store.commit('setCurrentConditions', condition);
            this.$store.dispatch('getListByConditions');
        },
        // Apply  enum editor changes: selected list of items
        submitEnumHandler(data) {
            const condition = [STAT_TYPE_ENUM, this.name, ENUM_DEFAULT_OPERATOR, [...data]];
            this.$store.commit('setCurrentConditions', condition);
            this.$store.dispatch('getListByConditions');
        },
    },
};
</script>

<style lang="scss" scoped>

</style>
