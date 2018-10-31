<template>
    <div class="settings-header">
        <div class="settings-header_title">
            {{title}}
        </div>
        <img v-if="!hideIcon" class="settings-header_icon" onClick="onClick" alt="settings icon" src="../assets/settingsIcon.svg" />
    </div>
</template>

<script>
    export default {
        name: 'SettingsHeader',
        props: {
            title: String,
            onClick: Function,
            hideIcon: Boolean,
        }
    }
</script>

<style lang="scss" scoped>
    .settings-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 16px;
        &_title {
            font-size: 14px;
            line-height: 14px;
            letter-spacing: 0px;
            color: #2bb3ed;
            font-family: "Arial";
            font-weight: 800;
        }
        &_icon:hover {
            cursor: pointer;
        }
    }
</style>
