<template>
    <BaseModal
            :id="id"
            title="CONFIRM REMOVING"
            :onSubmit="confirmFunction"
            :ok-title="'Confirm'"
    >
        <p class="mt-3 ml-3">{{ text }}</p>
    </BaseModal>
</template>

<script>
import BaseModal from '@/components/common/BaseModal.vue';

export default {
    name: 'ConfirmDialog',
    components: {
        BaseModal,
    },
    props: ['text', 'id', 'confirmFunction'],
};
</script>
