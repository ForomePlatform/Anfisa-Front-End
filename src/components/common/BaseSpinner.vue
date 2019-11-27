<template>
    <div class="spinner-wrapper">
        <div class="spinner"></div>
        <div v-if="label" class="spiner-label">
            {{ label }}
        </div>
    </div>
</template>

<script>
    export default {
        name: "BaseSpinner",
        props: {
            label: {
                type: String
            }
        }
    }
</script>

<style lang="scss" scoped>
    .spinner-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        .spiner-label {
            position: absolute;
            top: 50px;
            width: 100%;
            text-align: center;
        }
    }
    .spinner {
        width: 100%;
        height: 100%;
        color: rgba(90, 90, 90, 0.2);
        position: relative;
        display: inline-block;
        border: 7px solid;
        border-radius: 50%;
        border-right-color: #2bb3ed;
        animation: rotate 1s linear infinite;
    }
    @keyframes rotate {
        0% {
            transform: rotate(0);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>