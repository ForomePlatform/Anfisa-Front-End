<template>
    <div class="float-view">
        <span class="float-view_text">{{name}}</span>
        &nbsp;is between&nbsp;
        <span class="float-view_text"> {{data[0]}} </span>
        &nbsp;and&nbsp;
        <span class="float-view_text"> {{data[1]}}</span>
    </div>
</template>

<script>
export default {
    props: ['name', 'data'],
};
</script>

<style lang="scss" scoped>
    .float-view {
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
