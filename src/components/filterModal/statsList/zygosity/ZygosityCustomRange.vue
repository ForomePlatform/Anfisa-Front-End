<template>
    <div class="custom-range-wrapper">
        <span>FROM</span>
        <b-form-input
                max="3"
                v-model="interval.fromValue"
                placeholder="0"
                maxlength="3"
        >
        </b-form-input>
        <span>TO</span>
        <b-form-input
                v-model="interval.toValue"
                placeholder="5"
                maxlength="3"
        >
        </b-form-input>
    </div>
</template>

<script>
export default {
    name: 'ZygosityCustomRange',
    props: {
        interval: {
            fromValue: '',
            toValue: '',
        },
    },
};
</script>

<style lang="scss" scoped>
    .custom-range-wrapper {
        width: 80%;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        input.form-control{
            max-width: 60px;
        }
        span {
            margin: 0 10px;
        }
    }
</style>
