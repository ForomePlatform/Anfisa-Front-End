<template>
    <div class="zygosity-view">
        <span class="zygosity-view_text">{{name}}</span>
        &nbsp;=&nbsp;
        <span v-for="(item, index) in data" v-bind:key="item">
            <span class="zygosity-view_text"> {{item}}</span>
            <span v-if="index+1 < data.length">,&nbsp;</span>
        </span>
    </div>
</template>

<script>
export default {
    props: ['name', 'operator', 'data'],
};
</script>

<style lang="scss" scoped>
    .zygosity-view {
        display: flex;
        align-content: center;
        margin: 13px 0;
        font-size: 16px;
        letter-spacing: 0px;
        color: #627490;
        &_text {
            color: #1a3e6c;
            font-weight: bold;
        }
    }
</style>
