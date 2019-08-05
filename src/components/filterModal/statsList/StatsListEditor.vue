<template>
    <div>
        <BaseEditorLinear
                v-if="render === statTypes.linear || name === 'Dist_from_Exon'"
                :simple="name === 'Dist_from_Exon'"
                :int="type === statTypes.int"
                :min="data[0]"
                :max="data[1]"
                :preselectedMin="preselectedLinearMin"
                :preselectedMax="preselectedLinearMax"
                :onSubmit="submitHandler"
                :active="Boolean(oCurrentCondition)"
                :buttonText="buttonText"
        />
        <BaseEditorLogarithmic
                v-else-if="render === statTypes.logarithmic"
                :preselectedMin="preselectedLogMin"
                :preselectedMax="preselectedLogMax"
                :onSubmit="submitHandler"
                :buttonText="buttonText"
        />
        <BaseEditorCoordinate
                v-else-if="render === statTypes.coordinate"
                :min="data[0]"
                :max="data[1]"
                :preselectedMin="preselectedCoordMin"
                :preselectedMax="preselectedCoordMax"
                :onSubmit="submitHandler"
                :buttonText="buttonText"
        />
        <BaseEditorEnum
                v-else-if="type === statTypes.enum || type === statTypes.status"
                :list="data"
                :preselectedData="preselectedData"
                :onSubmit="submitEnumHandler"
                :buttonText="buttonText"
                ref="editorEnum"
        />
        <BaseEditorZygosity
                v-else-if="type === statTypes.zygosity"
                :family="data.family"
                :variants="data.variants"
                :preselectedFamily="preselectedFamily"
                :preselectedVariants="preselectedVariants"
                :onSubmit="submitZygosityHandler"
                :onFamilyChange = "changeFamily"
                :buttonText="buttonText"
                ref="editorZygosity"
        />
    </div>
</template>

<script>
import {
    STAT_TYPE_INT,
    STAT_TYPE_ENUM,
    STAT_TYPE_STATUS,
    ENUM_DEFAULT_OPERATOR,
    STAT_NUMERIC,
    STAT_TYPE_ZYGOSITY,
    NUMERIC_RENDER_TYPES,
} from '@/common/constants';
import BaseEditorCoordinate from './BaseEditorCoordinate.vue';
import BaseEditorLogarithmic from './BaseEditorLogarithmic.vue';
import BaseEditorLinear from './BaseEditorLinear.vue';
import BaseEditorEnum from './BaseEditorEnum.vue';
import BaseEditorZygosity from './BaseEditorZygosity.vue';

export default {
    props: ['type', 'data', 'name', 'render'],
    components: {
        BaseEditorCoordinate,
        BaseEditorLogarithmic,
        BaseEditorLinear,
        BaseEditorEnum,
        BaseEditorZygosity,
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
        preselectedData() {
            return (this.oCurrentCondition && this.oCurrentCondition.list) || [];
        },
        preselectedFamily() {
            return (this.oCurrentCondition && this.oCurrentCondition.family)
                    || this.data.selectedFamily || [];
        },
        preselectedVariants() {
            return (this.oCurrentCondition && this.oCurrentCondition.variants) || [];
        },
        statTypes() {
            return {
                int: STAT_TYPE_INT,
                enum: STAT_TYPE_ENUM,
                status: STAT_TYPE_STATUS,
                zygosity: STAT_TYPE_ZYGOSITY,
                linear: NUMERIC_RENDER_TYPES.LINEAR,
                coordinate: NUMERIC_RENDER_TYPES.COORDINATE,
                logarithmic: NUMERIC_RENDER_TYPES.LOGARITHMIC,
            };
        },
        buttonText() {
            return this.oCurrentCondition ? 'UPDATE' : 'ADD';
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
            this.clearSearchQuery();
            this.$refs.editorEnum.clearQuery();
            const condition = [STAT_TYPE_ENUM, this.name, ENUM_DEFAULT_OPERATOR, [...data]];
            this.$store.commit('setCurrentConditions', condition);
            this.$store.dispatch('getListByConditions');
        },
        submitZygosityHandler(family, variants) {
            this.clearSearchQuery();
            this.$refs.editorZygosity.clearQuery();
            const condition = [STAT_TYPE_ZYGOSITY, this.name, family, '', variants];
            this.$store.commit('setCurrentConditions', condition);
            this.$store.dispatch('getListByConditions');
        },
        changeFamily(family) {
            this.$store.dispatch('getZygosityByFamily', { family, name: this.name });
        },
        clearSearchQuery() {
            this.$store.commit('setFilterSearchQuery', '');
        }
    },
};
</script>
