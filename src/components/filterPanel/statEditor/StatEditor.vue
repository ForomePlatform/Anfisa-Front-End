<template>
    <div>
        <IntEditor v-if="type === 'int'" />
        <FloatEditor
          v-else-if="type === 'float'"
          :min="data[0]"
          :max="data[1]"
          :onSubmit="submitHandler"
        />
        <EnumEditor
          v-else-if="type === 'enum'"
          :data="data"
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
    props: {
        type: String,
        data: Array,
        name: String,
    },
    components: {
        IntEditor,
        FloatEditor,
        EnumEditor,
    },
    computed: {
        currentConditions() {
            return this.$store.getters.currentConditions;
        },
    },
    methods: {
        submitHandler(min, max) {
            const condition = [this.type, this.name, min, max];
            this.$store.commit('setCurrentConditions', condition);
        },
        submitEnumHandler(data) {
            const condition = [this.type, this.name, ENUM_DEFAULT_OPERATOR, data];
            this.$store.commit('setCurrentConditions', condition);
        },
    },
};
</script>

<style lang="scss" scoped>

</style>
