<template>
    <div class="loading">Loading<span>.</span><span>.</span><span>.</span></div>
</template>

<script>
    export default {
        name: "BaseLoadingLabel"
    }
</script>

<style lang="scss" scoped>
    .loading {
        margin-top: 10px;
        @keyframes blink {
            0% {
                opacity: .2;
            }
            20% {
                opacity: 1;
            }
            100% {
                opacity: .2;
            }
        }
        span {
            animation-name: blink;
            animation-duration: 1.4s;
            animation-iteration-count: infinite;
            animation-fill-mode: both;
            margin: 0;
            font-size: 16px;
        }
        span:nth-child(2) {
            animation-delay: .2s;
        }
        span:nth-child(3) {
            animation-delay: .4s;
        }
    }
</style>