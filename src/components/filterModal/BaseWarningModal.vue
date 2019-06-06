<template>
    <BaseModal
      :id="id"
      title="Warning"
      :onSubmit="onSubmit"
      :ok-title="okTitle"
      :enterKeyFunc="onSubmit"
    >
        <p class="mt-3 ml-3">
            You will lose all changes to the {{ preset }}<br/>
            Consider saving your changes
        </p>
    </BaseModal>
</template>

<script>
import BaseModal from '@/components/common/BaseModal.vue';

export default {
    components: {
        BaseModal,
    },
    props: ['id', 'okTitle', 'onSubmit', 'preset'],
};
</script>

