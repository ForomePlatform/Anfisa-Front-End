<template>
        <div class="modal-header">
            <div class="modal-header_title">
                FILTER VARIANTS
            </div>
            <div class="modal-header_controls">
                <div class="modal-header_controls_code">
                    &lt;/&gt;
                </div>
                <img
                  class="modal-header_controls_close"
                  alt="close icon"
                  src="../../assets/closeIcon.svg"
                  @click="onClose"
                />
            </div>
        </div>
</template>

<script>
export default {
    props: {
        onClose: Function,
    },
};
</script>

<style lang="scss" scoped>
    .modal-header {
        width: 1224px;
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
            letter-spacing: 0px;
            color: #2bb3ed;
            font-weight: 800;
        }
        &_controls {
            display: flex;
            &_code {
                border: 2px solid #1a3e6c;
                font-size: 16px;
                letter-spacing: 2px;
                color: #2bb3ed;
                font-weight: bold;
                padding: 3px 6px 1px 10px;
                border-radius: 20px;
                margin-right: 24px;
            }
            &_close {
                cursor: pointer;
            }
        }
    }
</style>
