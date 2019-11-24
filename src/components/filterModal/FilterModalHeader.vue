<template>
        <div class="modal-header">
            <div class="modal-header_title">
                {{ title }}
                <slot name="subheader"></slot>
            </div>
            <div class="modal-header_controls">
                <slot name="extra-buttons"></slot>
                <img
                  alt="close icon"
                  src="@/assets/closeIcon.svg"
                  @click="$emit('close')"
                />
            </div>
        </div>
</template>

<script>
export default {
    name: 'FilterModalHeader',
    props: {
        title: {
            type: String,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        width: 100%;
        height: 50px;
        background-color: #091b33;
        border-bottom: 0;
        &_title {
            font-size: 16px;
            letter-spacing: 0;
            color: #2bb3ed;
            font-weight: 800;
            &_descr {
                color: #fff;
            }
        }
        &_controls {
            display: flex;
            img {
                cursor: pointer;
            }
        }
    }

    .btn {
        background-color: #091b33;
        border: 2px solid #1a3e6c;
        font-size: 16px;
        letter-spacing: 2px;
        color: #2bb3ed;
        font-weight: bold;
        padding: 3px 6px 1px 10px;
        border-radius: 20px;
        margin-right: 24px;
        &.active, &:hover {
            background-color: #e3d989;
        }
        &.active, &:hover, &:focus {
            outline: none !important;
            box-shadow: none;
        }
    }
</style>
