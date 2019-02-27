<template>
    <div>
        <IntEditor v-if="type === 'int'" />
        <FloatEditor v-else-if="type === 'float'" :min="data[0]" :max="data[1]" :onSubmit="submitHandler"/>
        <EnumEditor v-else-if="type === 'enum'" />
    </div>
</template>

<script>
import IntEditor from './IntEditor.vue';
import FloatEditor from './FloatEditor.vue';
import EnumEditor from './EnumEditor.vue';

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
    methods: {
        submitHandler(min, max) {

        },
    },
};
</script>

<style lang="scss" scoped>

</style>
