<template>
    <div class="error-message">
        {{ errorMessage }}
    </div>
</template>

<script>
export default {
    name: 'ErrorMessage',
    computed: {
        errorMessage() {
            return this.$store.state.annotations.error.message;
        },
    },
};
</script>

<style scoped>
    .error-message {
        color: #ff0008;
        margin-left: 25px;
    }
</style>
