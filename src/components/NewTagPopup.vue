<template>
    <CustomPopup id="newTagModal" title="CREATE NEW TAG" :onSubmit="addNewTag">
        <p class="mt-3 ml-3" > Are you sure you want to create a new tag {{ filterValue }}?</p>
    </CustomPopup>
</template>

<script>
import CustomPopup from './CustomPopup.vue';

export default {
    computed: {
        filterValue() {
            return this.$store.state.tagFilterValue;
        },
    },
    methods: {
        addNewTag() {
            this.$store.dispatch('addNewTag', this.filterValue);
        },
    },
    components: {
        CustomPopup,
    },
};
</script>
