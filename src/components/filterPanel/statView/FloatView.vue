<template>
    <div class="float-view">
        <div>
            <span class="float-view_text">{{name}} </span>
            is between
            <span class="float-view_text"> {{data[0]}} </span>
            and
            <span class="float-view_text"> {{data[1]}}</span>
        </div>
        <div>
            x
        </div>
    </div>
</template>

<script>
export default {
    props: ['name', 'data', 'remove'],
};
</script>

<style lang="scss" scoped>
    .float-view {
        display: flex;
        justify-content: space-between;
        align-content: center;
        font-size: 16px;
        letter-spacing: 0px;
        color: #627490;
        &_text {
            color: #1a3e6c;
            font-weight: bold;
        }
    }
</style>
