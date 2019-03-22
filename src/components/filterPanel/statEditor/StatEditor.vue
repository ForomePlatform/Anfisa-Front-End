<template>
    <div>
        <FloatEditor
          v-if="type === statTypes.float || logEditorFields.includes(name)"
          :logScale="logEditorFields.includes(name)"
          :min="data[0]"
          :max="data[1]"
          :preselectedMin="preselectedMin"
          :preselectedMax="preselectedMax"
          :onSubmit="submitHandler"
        />
        <IntEditor
          v-else-if="type === statTypes.int"
          :min="data[0]"
          :max="data[1]"
          :preselectedMin="preselectedMin"
          :preselectedMax="preselectedMax"
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
import IntEditor from './IntEditor.vue';
import FloatEditor from './FloatEditor.vue';
import EnumEditor from './EnumEditor.vue';
import {
    STAT_TYPE_INT,
    STAT_TYPE_FLOAT,
    STAT_TYPE_ENUM,
    STAT_TYPE_STATUS,
    ENUM_DEFAULT_OPERATOR,
    STAT_NUMERIC,
    LOG_EDITOR_FIELDS,
} from '../../../common/constants';

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
                return this.oCurrentCondition.list;
            }
            return [];
        },
        statTypes() {
            return {
                int: STAT_TYPE_INT,
                float: STAT_TYPE_FLOAT,
                enum: STAT_TYPE_ENUM,
                status: STAT_TYPE_STATUS,
            };
        },
        logEditorFields() {
            return LOG_EDITOR_FIELDS;
        },
    },
    methods: {
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
