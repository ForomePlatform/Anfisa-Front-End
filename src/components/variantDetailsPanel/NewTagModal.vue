<template>
    <BaseModal id="newTagModal"
               title="CREATE NEW TAG"
               :onSubmit="addNewTag"
               :enterKeyFunc="addNewTag">
        <p class="mt-3 ml-3" > Are you sure you want to create a new tag {{ filterValue }}?</p>
    </BaseModal>
</template>

<script>
import BaseModal from '@/components/common/BaseModal.vue';

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
        BaseModal,
    },
};
</script>
