<template>
    <CustomPopup
      :id="id"
      title="Warning"
      :onSubmit="onSubmit"
      :ok-title="okTitle"
    >
        <p class="mt-3 ml-3">
            You will lose all changes to the {{ preset }}<br/>
            Consider saving your changes
        </p>
    </CustomPopup>
</template>

<script>
import CustomPopup from '../CustomPopup.vue';

export default {
    components: {
        CustomPopup,
    },
    props: ['id', 'okTitle', 'onSubmit', 'preset'],
};
</script>

