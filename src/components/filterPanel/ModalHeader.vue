<template>
        <div class="modal-header">
            <div class="modal-header_title">
                FILTER VARIANTS
                <span class="modal-header_title_descr">
                    {{ title }}
                </span>
            </div>
            <div class="modal-header_controls">
                <div
                  :class="[advancedView ? 'modal-header_controls_code__active' : '',
                    'modal-header_controls_code']"
                  @click="onAdvancedClick"
                >
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
    props: ['onClose', 'onAdvancedClick', 'advancedView'],
    computed: {
        title() {
            const { selectedPreset, selectedPresetSaved } = this.$store.state;
            return ` (${selectedPreset || 'New Filter'}${selectedPresetSaved ? '' : ' - Unsaved'})`;
        },
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
            &_descr {
                color: #fff;
            }
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
                cursor: pointer;
                &__active, &:hover {
                    background-color: #e3d989;
                }
            }
            &_close {
                cursor: pointer;
            }
        }
    }
</style>
